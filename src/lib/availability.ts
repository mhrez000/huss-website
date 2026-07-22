/* ===========================================================
   Availability engine — pure and deterministic, so it runs
   identically in API routes (real bookings) and in the static
   demo (client-side, seeded pseudo-random "busy" pattern).
   All rules come from bookingConfig in the content layer.
   =========================================================== */

import { bookingConfig } from "@/content/site";
import {
  addDays,
  formatMelRange,
  melbourneToday,
  melMonth,
  melOffsetMinutes,
  melWallToUtc,
  melWeekday,
} from "@/lib/melbourne-time";

export type SlotKind = "standard" | "twilight";

export type Slot = {
  /** UTC instant, ISO 8601 (e.g. "2026-07-14T22:00:00.000Z"). */
  start: string;
  end: string;
  kind: SlotKind;
  /** "9:30am – 11:30am" in Melbourne time. */
  label: string;
};

export type DayAvailability = {
  /** Melbourne calendar date, YYYY-MM-DD. */
  date: string;
  slots: Slot[];
};

export type BusyInterval = { start: string; end: string };

const HHMM_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

function hhmmToMinutes(hhmm: string): number {
  const m = hhmm.match(HHMM_RE);
  if (!m) throw new Error(`Invalid HH:MM time: ${hhmm}`);
  return Number(m[1]) * 60 + Number(m[2]);
}

function overlaps(aStart: number, aEnd: number, b: BusyInterval): boolean {
  const bStart = Date.parse(b.start);
  const bEnd = Date.parse(b.end);
  return aStart < bEnd && bStart < aEnd;
}

/** Latest Melbourne date the diary is open for, inclusive. */
export function horizonEnd(now: Date = new Date()): string {
  return addDays(melbourneToday(now), bookingConfig.horizonDays);
}

/**
 * All bookable slots for one Melbourne calendar date, before subtracting
 * busy intervals. Empty for blocked dates, days off, and dates outside
 * [today, horizon].
 */
function rawSlotsForDate(dateISO: string, now: Date): Slot[] {
  const today = melbourneToday(now);
  if (dateISO < today || dateISO > horizonEnd(now)) return [];
  if (bookingConfig.blockedDates.includes(dateISO)) return [];

  const weekday = melWeekday(dateISO);
  const notBefore = now.getTime() + bookingConfig.minNoticeHours * 3_600_000;
  const slots: Slot[] = [];

  for (const hhmm of bookingConfig.standardStarts[weekday] ?? []) {
    const start = melWallToUtc(dateISO, hhmmToMinutes(hhmm));
    const end = new Date(start.getTime() + bookingConfig.slotMinutes * 60_000);
    if (start.getTime() < notBefore) continue;
    slots.push({
      start: start.toISOString(),
      end: end.toISOString(),
      kind: "standard",
      label: formatMelRange(start.toISOString(), end.toISOString()),
    });
  }

  if (bookingConfig.twilightDays.includes(weekday)) {
    // duskMinutes is calibrated to standard time (AEST); add the DST hour
    // when this specific date is in daylight saving (AEDT, UTC+11 = 660).
    const base = bookingConfig.duskMinutes[melMonth(dateISO)] ?? 18 * 60;
    const isDst = melOffsetMinutes(melWallToUtc(dateISO, 12 * 60).getTime()) === 660;
    const dusk = base + (isDst ? 60 : 0);
    const start = melWallToUtc(dateISO, dusk - 30);
    const end = new Date(start.getTime() + bookingConfig.twilightSlotMinutes * 60_000);
    if (start.getTime() >= notBefore) {
      slots.push({
        start: start.toISOString(),
        end: end.toISOString(),
        kind: "twilight",
        label: formatMelRange(start.toISOString(), end.toISOString()),
      });
    }
  }

  return slots;
}

/** Bookable slots for one date, minus anything overlapping a busy interval. */
export function slotsForDate(
  dateISO: string,
  now: Date,
  busy: BusyInterval[]
): Slot[] {
  return rawSlotsForDate(dateISO, now).filter(
    (s) => !busy.some((b) => overlaps(Date.parse(s.start), Date.parse(s.end), b))
  );
}

/**
 * Availability for an inclusive Melbourne date range (clamped to
 * [today, horizon] and capped at horizonDays+1 entries).
 */
export function availabilityRange(
  fromISO: string,
  toISO: string,
  now: Date,
  busy: BusyInterval[]
): DayAvailability[] {
  const today = melbourneToday(now);
  const max = horizonEnd(now);
  const from = fromISO < today ? today : fromISO;
  const to = toISO > max ? max : toISO;
  if (to < from) return [];

  const days: DayAvailability[] = [];
  let d = from;
  for (let i = 0; i <= bookingConfig.horizonDays && d <= to; i++) {
    days.push({ date: d, slots: slotsForDate(d, now, busy) });
    d = addDays(d, 1);
  }
  return days;
}

/**
 * Server-side guard for POST /api/book: the requested start must exactly
 * match a slot the engine would offer right now (rules, notice, horizon —
 * but NOT busy state, which the store checks atomically on insert).
 * Returns the matched slot so callers get the canonical end time.
 */
export function matchBookableSlot(startIso: string, now: Date): Slot | null {
  const t = Date.parse(startIso);
  if (Number.isNaN(t)) return null;
  const dateISO = new Intl.DateTimeFormat("en-CA", {
    timeZone: bookingConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(t);
  return (
    rawSlotsForDate(dateISO, now).find((s) => Date.parse(s.start) === t) ?? null
  );
}

/* ---------- demo mode (static hosting, no API) ----------
   Deterministic pseudo-random busy pattern so the shared demo
   looks realistic and every visitor sees the same diary. */

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * ~45% of a day's slots marked busy, deterministically per slot identity
 * (seeded by each slot's UTC start), so the pattern stays stable even as
 * the min-notice cutoff trims earlier slots from the list over time.
 */
export function demoBusyForDate(dateISO: string, now: Date): BusyInterval[] {
  return rawSlotsForDate(dateISO, now)
    .filter((s) => mulberry32(hashString(`luxevisuals:${s.start}`))() < 0.45)
    .map((s) => ({ start: s.start, end: s.end }));
}

export function demoAvailabilityRange(
  fromISO: string,
  toISO: string,
  now: Date
): DayAvailability[] {
  const today = melbourneToday(now);
  const max = horizonEnd(now);
  const from = fromISO < today ? today : fromISO;
  const to = toISO > max ? max : toISO;
  if (to < from) return [];

  const days: DayAvailability[] = [];
  let d = from;
  for (let i = 0; i <= bookingConfig.horizonDays && d <= to; i++) {
    days.push({ date: d, slots: slotsForDate(d, now, demoBusyForDate(d, now)) });
    d = addDays(d, 1);
  }
  return days;
}
