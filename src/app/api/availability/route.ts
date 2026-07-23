import { NextResponse } from "next/server";
import { availabilityRange, horizonEnd } from "@/lib/availability";
import type { BusyInterval } from "@/lib/availability";
import { getBookingStore } from "@/lib/bookings-store";
import { getGcalBusy } from "@/lib/google-calendar";
import {
  addDays,
  clampDate,
  melbourneToday,
  melWallToUtc,
} from "@/lib/melbourne-time";

/* ===========================================================
   GET /api/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
   -----------------------------------------------------------
   The photographer's live diary: engine rules minus persisted
   bookings minus his own Google Calendar events (when the gcal
   integration is configured — a no-op otherwise). Defaults to
   the full bookable window [today, horizon]. Never cached —
   the whole point is freshness.

   Responses:
   - 200 { days: DayAvailability[] }
   - 200 { days: DayAvailability[], degraded: true }  — a busy
     source (store or Google Calendar) failed; slots from the
     remaining sources so the page stays alive (POST /api/book
     still guards conflicts atomically)
   - 400 { error: string }                            — bad dates
   =========================================================== */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Strict YYYY-MM-DD check: the regex plus a round-trip through calendar
 * arithmetic, which rejects impossible dates like "2026-02-30" (they
 * normalise to a different string).
 */
function isValidDate(d: string): boolean {
  return DATE_RE.test(d) && addDays(d, 0) === d;
}

export async function GET(request: Request) {
  const now = new Date();
  const today = melbourneToday(now);
  const max = horizonEnd(now);

  const { searchParams } = new URL(request.url);
  const fromRaw = searchParams.get("from") ?? today;
  const toRaw = searchParams.get("to") ?? max;

  if (!isValidDate(fromRaw) || !isValidDate(toRaw)) {
    return NextResponse.json(
      { error: "Invalid date — expected YYYY-MM-DD." },
      { status: 400, headers: NO_STORE }
    );
  }

  // Clamp to the bookable window; an inverted range simply yields no days.
  const from = clampDate(fromRaw, today, max);
  const to = clampDate(toRaw, today, max);

  const store = getBookingStore();

  // Cover whole Melbourne days: midnight on `from` to midnight after `to`.
  const fromIso = melWallToUtc(from, 0).toISOString();
  const toIso = melWallToUtc(addDays(to, 1), 0).toISOString();

  // Both busy sources concurrently: persisted bookings + the photographer's
  // own Google Calendar (resolves [] when the integration is disabled).
  const [storeBusy, gcalBusy] = await Promise.allSettled([
    store.getBusyBetween(fromIso, toIso),
    getGcalBusy(fromIso, toIso),
  ]);

  // An outage in either source must not take the booking page down. Merge
  // whatever fulfilled, flag the response as degraded; double-booking is
  // still impossible because POST /api/book rejects conflicts atomically
  // at insert time.
  const busy: BusyInterval[] = [];
  let degraded = false;

  if (storeBusy.status === "fulfilled") {
    busy.push(...storeBusy.value);
  } else {
    console.error(
      "[availability] busy lookup failed — responding degraded:",
      storeBusy.reason
    );
    degraded = true;
  }

  if (gcalBusy.status === "fulfilled") {
    busy.push(...gcalBusy.value);
  } else {
    console.error(
      "[availability] Google Calendar busy lookup failed — responding degraded:",
      gcalBusy.reason
    );
    degraded = true;
  }

  return NextResponse.json(
    degraded
      ? { days: availabilityRange(from, to, now, busy), degraded: true }
      : { days: availabilityRange(from, to, now, busy) },
    { headers: NO_STORE }
  );
}
