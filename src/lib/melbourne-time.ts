/* ===========================================================
   Melbourne timezone helpers — pure, dependency-free, safe on
   server and client. All wall-clock maths go through Intl so
   AEST/AEDT daylight-saving transitions are handled correctly.
   =========================================================== */

export const MELBOURNE_TZ = "Australia/Melbourne";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Parse "GMT+10:00" / "GMT+11" style longOffset names to minutes. */
export function melOffsetMinutes(utcMs: number): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: MELBOURNE_TZ,
    timeZoneName: "longOffset",
  })
    .formatToParts(utcMs)
    .find((p) => p.type === "timeZoneName")?.value;
  const m = name?.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!m) return 600; // AEST fallback — never expected in practice
  const sign = m[1] === "-" ? -1 : 1;
  return sign * (Number(m[2]) * 60 + Number(m[3] ?? 0));
}

/**
 * Convert a Melbourne wall-clock time (date + minutes from midnight) to a
 * UTC Date. Two-pass offset resolution handles DST boundaries: the first
 * guess uses the offset at the naive UTC instant, the second corrects it
 * if the true offset at the resulting instant differs.
 */
export function melWallToUtc(dateISO: string, minutesFromMidnight: number): Date {
  if (!DATE_RE.test(dateISO)) throw new Error(`Invalid date: ${dateISO}`);
  const [y, mo, d] = dateISO.split("-").map(Number);
  const naive = Date.UTC(y, mo - 1, d, 0, minutesFromMidnight);
  let offset = melOffsetMinutes(naive);
  let utc = naive - offset * 60_000;
  const check = melOffsetMinutes(utc);
  if (check !== offset) {
    offset = check;
    utc = naive - offset * 60_000;
  }
  return new Date(utc);
}

/** The Melbourne calendar date (YYYY-MM-DD) of a UTC instant. */
export function melDateOf(instant: Date | number): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: MELBOURNE_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(instant);
}

/** Today's date (YYYY-MM-DD) in Melbourne. */
export function melbourneToday(now: Date = new Date()): string {
  return melDateOf(now);
}

/** Weekday of a Melbourne calendar date: 0=Sunday … 6=Saturday. */
export function melWeekday(dateISO: string): number {
  // Noon UTC is the same calendar day in Melbourne (UTC+10/+11), so the
  // weekday can be read straight off the UTC date.
  const [y, mo, d] = dateISO.split("-").map(Number);
  return new Date(Date.UTC(y, mo - 1, d, 12)).getUTCDay();
}

/** Month (1–12) of a Melbourne calendar date. */
export function melMonth(dateISO: string): number {
  return Number(dateISO.slice(5, 7));
}

/** dateISO + n days (calendar arithmetic, DST-proof). */
export function addDays(dateISO: string, n: number): string {
  const [y, mo, d] = dateISO.split("-").map(Number);
  const t = new Date(Date.UTC(y, mo - 1, d + n, 12));
  return t.toISOString().slice(0, 10);
}

/** Compare helper: a < b for YYYY-MM-DD strings is lexicographic. */
export function clampDate(d: string, min: string, max: string): string {
  return d < min ? min : d > max ? max : d;
}

/* ---------- display formatting ---------- */

/** "9:30am" — lowercase, no space, Melbourne wall clock. */
export function formatMelTime(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: MELBOURNE_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(iso))
    .replace(/\s/g, "")
    .toLowerCase();
}

/** "Tue 14 July" */
export function formatMelDate(dateISO: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: MELBOURNE_TZ,
    weekday: "short",
    day: "numeric",
    month: "long",
  }).format(melWallToUtc(dateISO, 12 * 60));
}

/** "Tuesday 14 July 2026" */
export function formatMelDateLong(dateISO: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: MELBOURNE_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(melWallToUtc(dateISO, 12 * 60));
}

/** "9:30am – 11:30am" */
export function formatMelRange(startIso: string, endIso: string): string {
  return `${formatMelTime(startIso)} – ${formatMelTime(endIso)}`;
}

/** "20260714T093000" — local wall-clock stamp for Google Calendar links. */
export function gcalLocalStamp(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: MELBOURNE_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  const hour = get("hour") === "24" ? "00" : get("hour");
  return `${get("year")}${get("month")}${get("day")}T${hour}${get("minute")}${get("second")}`;
}
