/* ===========================================================
   Booking persistence — pluggable drivers, selected by env:

   - Supabase (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set):
     Postgres via the REST API, no SDK dependency. Double-booking
     is prevented ATOMICALLY by the bookings_no_overlap gist
     EXCLUSION constraint on tstzrange(slot_start, slot_end) — slots
     overlap by design, so this (not the unique index on slot_start)
     is the real guard (see supabase/bookings.sql). A lost race
     returns HTTP 409 (or a body carrying 23P01/23505), which we
     surface as a "conflict".

   - Local JSON file (default in dev): .data/bookings.json.
     Fine for a single next dev/start process; NOT for serverless
     production (ephemeral filesystem) — set up Supabase there.
   =========================================================== */

import { promises as fs } from "fs";
import path from "path";
import type { BusyInterval } from "@/lib/availability";

export type NewBooking = {
  slotStart: string; // UTC ISO
  slotEnd: string;
  propertyAddress: string;
  agentName: string;
  agency?: string;
  email: string;
  phone: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  propertySize: string;
  services: string[];
  notes?: string;
};

export type CreateResult =
  | { ok: true; id: string }
  | { ok: false; reason: "conflict" }
  | { ok: false; reason: "error"; message: string };

export interface BookingStore {
  /** Active bookings overlapping [fromIso, toIso) as busy intervals. */
  getBusyBetween(fromIso: string, toIso: string): Promise<BusyInterval[]>;
  /** Insert a booking; must fail with "conflict" if the slot is taken. */
  createBooking(b: NewBooking): Promise<CreateResult>;
}

/* ---------- Supabase driver (REST, service-role key) ---------- */

function supabaseHeaders(key: string): Record<string, string> {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

function supabaseStore(url: string, key: string): BookingStore {
  const rest = `${url.replace(/\/$/, "")}/rest/v1/bookings`;
  return {
    async getBusyBetween(fromIso, toIso) {
      const q =
        `${rest}?select=slot_start,slot_end` +
        `&status=neq.cancelled` +
        `&slot_end=gt.${encodeURIComponent(fromIso)}` +
        `&slot_start=lt.${encodeURIComponent(toIso)}`;
      const res = await fetch(q, { headers: supabaseHeaders(key), cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Supabase busy query failed: ${res.status} ${await res.text()}`);
      }
      const rows = (await res.json()) as { slot_start: string; slot_end: string }[];
      return rows.map((r) => ({ start: r.slot_start, end: r.slot_end }));
    },

    async createBooking(b) {
      const res = await fetch(rest, {
        method: "POST",
        headers: {
          ...supabaseHeaders(key),
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          slot_start: b.slotStart,
          slot_end: b.slotEnd,
          property_address: b.propertyAddress,
          agent_name: b.agentName,
          agency: b.agency || null,
          email: b.email,
          phone: b.phone,
          property_type: b.propertyType,
          bedrooms: b.bedrooms,
          bathrooms: b.bathrooms,
          property_size: b.propertySize,
          services: b.services,
          notes: b.notes || null,
        }),
      });
      if (res.status === 409) return { ok: false, reason: "conflict" };
      if (!res.ok) {
        const text = await res.text();
        // 23P01 = exclusion violation (overlap guard), 23505 = unique
        // violation — either means the slot is taken, even if PostgREST
        // delivers it as a 400 instead of a 409.
        if (text.includes("23P01") || text.includes("23505")) {
          return { ok: false, reason: "conflict" };
        }
        return { ok: false, reason: "error", message: `Supabase insert failed: ${res.status} ${text.slice(0, 300)}` };
      }
      const rows = (await res.json()) as { id: string }[];
      return { ok: true, id: rows[0]?.id ?? "unknown" };
    },
  };
}

/* ---------- local JSON file driver (dev) ---------- */

type FileBooking = NewBooking & { id: string; createdAt: string; status: string };

const DATA_FILE = path.join(process.cwd(), ".data", "bookings.json");

async function readFileBookings(): Promise<FileBooking[]> {
  let raw: string;
  try {
    raw = await fs.readFile(DATA_FILE, "utf8");
  } catch (e) {
    // Only "file doesn't exist yet" means "no bookings". Anything else
    // (permissions, I/O, ...) must propagate — returning [] here would
    // silently resell booked slots and let the next write erase history.
    if ((e as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw e;
  }
  // Corrupt JSON (or a non-array payload) also propagates, for the same
  // reason: better a failed request than a phantom-empty booking book.
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`Corrupt bookings file (expected a JSON array): ${DATA_FILE}`);
  }
  return parsed as FileBooking[];
}

function fileStore(): BookingStore {
  return {
    async getBusyBetween(fromIso, toIso) {
      const all = await readFileBookings();
      return all
        .filter(
          (b) =>
            b.status !== "cancelled" &&
            b.slotEnd > fromIso &&
            b.slotStart < toIso
        )
        .map((b) => ({ start: b.slotStart, end: b.slotEnd }));
    },

    async createBooking(b) {
      const all = await readFileBookings();
      const clash = all.some(
        (x) =>
          x.status !== "cancelled" &&
          Date.parse(x.slotStart) < Date.parse(b.slotEnd) &&
          Date.parse(b.slotStart) < Date.parse(x.slotEnd)
      );
      if (clash) return { ok: false, reason: "conflict" };
      const booking: FileBooking = {
        ...b,
        id: `bk_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      };
      try {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        // Atomic-ish write: full content to a temp file, then rename over
        // the target, so a crash mid-write can't leave a truncated file.
        const tmpFile = `${DATA_FILE}.tmp`;
        await fs.writeFile(tmpFile, JSON.stringify([...all, booking], null, 2), "utf8");
        await fs.rename(tmpFile, DATA_FILE);
        return { ok: true, id: booking.id };
      } catch (e) {
        return {
          ok: false,
          reason: "error",
          message: e instanceof Error ? e.message : "file write failed",
        };
      }
    },
  };
}

/* ---------- driver selection ---------- */

export function getBookingStore(): BookingStore {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) return supabaseStore(url, key);
  return fileStore();
}

export function bookingStoreKind(): "supabase" | "file" {
  return process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? "supabase"
    : "file";
}
