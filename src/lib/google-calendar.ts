/* ===========================================================
   Google Calendar integration (service account, no SDK)
   -----------------------------------------------------------
   Two-way "connected diary":
   - getGcalBusy(): the photographer's own calendar events become
     busy intervals that the availability engine subtracts, so
     personal appointments block bookable slots.
   - createBookingEvent(): confirmed website bookings are inserted
     into his calendar with full job details.

   Enabled when BOTH env vars are set:
   - GOOGLE_SERVICE_ACCOUNT_JSON — the full JSON key file of a
     Google Cloud service account (raw JSON, or base64 of it)
   - GOOGLE_CALENDAR_ID — the calendar to read/write, i.e. the
     photographer's Gmail address (he must share his calendar
     with the service account's client_email: "Make changes").

   Auth: OAuth2 JWT-bearer flow signed RS256 with node:crypto —
   zero dependencies, works on Vercel's Node runtime.
   =========================================================== */

import crypto from "crypto";
import type { BusyInterval } from "@/lib/availability";

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

type GcalConfig = {
  sa: ServiceAccount;
  calendarId: string;
};

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/calendar";
const API = "https://www.googleapis.com/calendar/v3";

/**
 * Hard timeout on every Google call. A HANGING endpoint (connection up,
 * response never arrives) must convert into a rejection so the already-
 * handled failure paths engage — availability degrades, bookings proceed.
 * Without this, a stalled request rides until the platform kills the
 * function and bookings would be blocked for the whole outage.
 */
const GOOGLE_TIMEOUT_MS = 5000;

/** Parse config from env. Returns null when the integration is off. */
export function gcalConfig(): GcalConfig | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!raw || !calendarId) return null;
  try {
    let text = raw.trim();
    if (!text.startsWith("{")) {
      // Tolerate a base64-encoded key file (easier to paste in some UIs).
      text = Buffer.from(text, "base64").toString("utf8");
    }
    const parsed = JSON.parse(text) as Partial<ServiceAccount>;
    if (!parsed.client_email || !parsed.private_key) return null;
    // Normalize double-escaped newlines (a key copied out of another .env or
    // secret manager often arrives with literal "\n" sequences) — a no-op for
    // correctly-pasted keys — then validate ONCE here so a broken key surfaces
    // as one clear config error instead of a cryptic decoder error per request.
    const privateKey = parsed.private_key.replace(/\\n/g, "\n");
    crypto.createPrivateKey(privateKey);
    return {
      sa: { client_email: parsed.client_email, private_key: privateKey },
      calendarId,
    };
  } catch {
    // Malformed JSON or an unusable private key: treat as disabled, but make
    // the misconfiguration visible.
    console.error(
      "[gcal] GOOGLE_SERVICE_ACCOUNT_JSON is set but could not be parsed/validated — integration disabled"
    );
    return null;
  }
}

export function gcalEnabled(): boolean {
  return gcalConfig() !== null;
}

/* ---------- access token (JWT bearer), cached per instance ---------- */

let tokenCache: { token: string; expiresAt: number } | null = null;

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

async function getAccessToken(cfg: GcalConfig): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (tokenCache && tokenCache.expiresAt - 300 > now) return tokenCache.token;

  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: cfg.sa.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(cfg.sa.private_key).toString("base64url");
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:
      `grant_type=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}` +
      `&assertion=${assertion}`,
    cache: "no-store",
    signal: AbortSignal.timeout(GOOGLE_TIMEOUT_MS),
  });
  if (!res.ok) {
    // Never include the assertion/key material in errors.
    throw new Error(
      `[gcal] token exchange failed: ${res.status} ${(await res.text()).slice(0, 200)}`
    );
  }
  const data = (await res.json()) as { access_token: string; expires_in?: number };
  tokenCache = { token: data.access_token, expiresAt: now + (data.expires_in ?? 3600) };
  return tokenCache.token;
}

/* ---------- free/busy: his calendar blocks site availability ---------- */

/**
 * Busy intervals from the photographer's Google Calendar between two
 * instants. Throws on failure — callers decide how to degrade.
 */
export async function getGcalBusy(
  fromIso: string,
  toIso: string
): Promise<BusyInterval[]> {
  const cfg = gcalConfig();
  if (!cfg) return [];
  const token = await getAccessToken(cfg);
  const res = await fetch(`${API}/freeBusy`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: fromIso,
      timeMax: toIso,
      items: [{ id: cfg.calendarId }],
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(GOOGLE_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(
      `[gcal] freeBusy failed: ${res.status} ${(await res.text()).slice(0, 200)}`
    );
  }
  const data = (await res.json()) as {
    calendars?: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown[] }>;
  };
  const cal = data.calendars?.[cfg.calendarId];
  if (!cal || cal.errors?.length) {
    // Typical cause: calendar not shared with the service account.
    throw new Error(
      `[gcal] freeBusy returned errors for "${cfg.calendarId}" — is the calendar shared with the service account?`
    );
  }
  return (cal.busy ?? []).map((b) => ({ start: b.start, end: b.end }));
}

/* ---------- event creation: bookings land in his calendar ---------- */

export type BookingEventInput = {
  bookingId: string;
  slotStart: string; // UTC ISO
  slotEnd: string;
  kind: string; // "standard" | "twilight"
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

/**
 * Insert the booking as an event in the photographer's calendar.
 * Returns the event id + link. Throws on failure — the caller must
 * treat this as non-fatal (the booking is already persisted).
 */
export async function createBookingEvent(
  b: BookingEventInput
): Promise<{ id: string; htmlLink: string }> {
  const cfg = gcalConfig();
  if (!cfg) throw new Error("[gcal] not configured");
  const token = await getAccessToken(cfg);

  const lines = [
    `Agent: ${b.agentName}${b.agency ? ` (${b.agency})` : ""}`,
    `Phone: ${b.phone}`,
    `Email: ${b.email}`,
    `Property: ${b.propertyType}, ${b.bedrooms} bed / ${b.bathrooms} bath, ${b.propertySize}`,
    `Services: ${b.services.join(", ")}`,
    b.notes ? `Notes: ${b.notes}` : "",
    "",
    `Booked via luxevisuals.com.au — booking ${b.bookingId}`,
  ].filter(Boolean);

  const res = await fetch(
    `${API}/calendars/${encodeURIComponent(cfg.calendarId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: `${b.kind === "twilight" ? "Twilight shoot" : "Photo shoot"} — ${b.propertyAddress}`,
        location: b.propertyAddress,
        description: lines.join("\n"),
        start: { dateTime: b.slotStart, timeZone: "Australia/Melbourne" },
        end: { dateTime: b.slotEnd, timeZone: "Australia/Melbourne" },
        extendedProperties: { private: { luxevisualsBookingId: b.bookingId } },
      }),
      cache: "no-store",
    signal: AbortSignal.timeout(GOOGLE_TIMEOUT_MS),
    }
  );
  if (!res.ok) {
    throw new Error(
      `[gcal] event insert failed: ${res.status} ${(await res.text()).slice(0, 200)}`
    );
  }
  const data = (await res.json()) as { id: string; htmlLink?: string };
  return { id: data.id, htmlLink: data.htmlLink ?? "" };
}
