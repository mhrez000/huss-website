"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Info, Sunset } from "lucide-react";
import {
  demoAvailabilityRange,
  horizonEnd,
  type DayAvailability,
  type Slot,
} from "@/lib/availability";
import {
  formatMelDate,
  formatMelDateLong,
  melbourneToday,
  melDateOf,
  melMonth,
  melWeekday,
} from "@/lib/melbourne-time";
import { cn } from "@/lib/utils";

/* ===========================================================
   SlotPicker — live availability calendar for the booking form.
   Loads the full booking horizon (today -> horizonEnd) once on
   mount and again whenever `refreshToken` changes (e.g. after a
   409 slot conflict). In demo mode (static hosting, no API) the
   diary is computed client-side from the same pure engine.
   =========================================================== */

const DEMO = process.env.NEXT_PUBLIC_DEMO === "1";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const ERROR_ID = "slot-picker-error";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

/** Reduced-motion-aware scroll behavior, checked at call time. */
function scrollBehavior(): ScrollBehavior {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

type LoadStatus = "loading" | "error" | "ready";

type SlotPickerProps = {
  /** Currently selected slot (owned by the parent form). */
  value: Slot | null;
  onSelect: (slot: Slot) => void;
  /** Bump to force a fresh availability load (e.g. after a 409). */
  refreshToken?: number;
  /** Validation message from the form (errors.slotStart). */
  error?: string;
};

export function SlotPicker({
  value,
  onSelect,
  refreshToken = 0,
  error,
}: SlotPickerProps) {
  const [days, setDays] = useState<DayAvailability[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);
  /** API served cached/fallback data — surface a non-blocking notice. */
  const [degraded, setDegraded] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      const now = new Date();
      const from = melbourneToday(now);
      const to = horizonEnd(now);
      try {
        let next: DayAvailability[];
        let nextDegraded = false;
        if (DEMO) {
          // Static demo build — no API; compute the diary client-side.
          next = demoAvailabilityRange(from, to, now);
        } else {
          const res = await fetch(`/api/availability?from=${from}&to=${to}`);
          if (!res.ok) throw new Error(`Availability request failed (${res.status})`);
          const data = (await res.json()) as
            | { days?: DayAvailability[]; degraded?: boolean }
            | null;
          if (!data || !Array.isArray(data.days)) {
            throw new Error("Malformed availability response");
          }
          next = data.days;
          nextDegraded = data.degraded === true;
        }
        if (cancelled) return;
        setDays(next);
        setDegraded(nextDegraded);
        setSelectedDate((prev) => {
          if (prev && next.some((d) => d.date === prev)) return prev;
          const first = next.find((d) => d.slots.length > 0) ?? next[0];
          return first ? first.date : null;
        });
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [refreshToken, retryToken]);

  function scrollRail(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.round(rail.clientWidth * 0.8),
      behavior: scrollBehavior(),
    });
  }

  const todayISO = days[0]?.date;
  const selectedDay = days.find((d) => d.date === selectedDate) ?? null;
  const valueDate = value ? melDateOf(Date.parse(value.start)) : null;

  // Roving tabindex — the rail is one tab stop; arrows move within it.
  const enabledDays = days.filter((d) => d.slots.length > 0);
  const rovingDate = enabledDays.some((d) => d.date === selectedDate)
    ? selectedDate
    : enabledDays[0]?.date ?? null;

  /** ArrowLeft/Right, Home, End across ENABLED day pills only. */
  function onPillKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    date: string
  ) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (enabledDays.length === 0) return;
    const current = enabledDays.findIndex((d) => d.date === date);
    let target: DayAvailability | undefined;
    if (event.key === "Home") target = enabledDays[0];
    else if (event.key === "End") target = enabledDays[enabledDays.length - 1];
    else if (event.key === "ArrowLeft")
      target = current > 0 ? enabledDays[current - 1] : undefined;
    else
      target =
        current !== -1 && current < enabledDays.length - 1
          ? enabledDays[current + 1]
          : undefined;
    if (!target || target.date === date) return;
    setSelectedDate(target.date);
    const pill = pillRefs.current.get(target.date);
    if (pill) {
      pill.scrollIntoView({
        behavior: scrollBehavior(),
        block: "nearest",
        inline: "center",
      });
      pill.focus({ preventScroll: true });
    }
  }

  return (
    <div
      role="group"
      id="slot-picker"
      tabIndex={-1}
      aria-label="Choose a time"
      aria-describedby={error ? ERROR_ID : undefined}
      className="space-y-4"
    >
      {/* Single persistent announcer — swaps its text instead of mounting
          new live regions, so day changes read as one calm status update. */}
      <div role="status" className="sr-only">
        {status === "loading"
          ? "Loading available times…"
          : status === "ready" && selectedDay
            ? selectedDay.slots.length === 0
              ? `Fully booked ${formatMelDateLong(selectedDay.date)}`
              : `${selectedDay.slots.length} times available for ${formatMelDateLong(selectedDay.date)}`
            : ""}
      </div>

      {status === "loading" && (
        <div aria-hidden className="space-y-4">
          <div className="flex gap-2 overflow-hidden pb-1">
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                className="h-[68px] w-16 shrink-0 animate-pulse rounded-2xl bg-ivory"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="h-11 w-36 animate-pulse rounded-full bg-ivory"
              />
            ))}
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-ivory px-4 py-3"
        >
          <p className="text-sm text-stone">Couldn&apos;t load availability.</p>
          <button
            type="button"
            onClick={() => setRetryToken((t) => t + 1)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold text-accent-text transition-colors duration-300 hover:text-ink",
              focusRing
            )}
          >
            Try again
          </button>
        </div>
      )}

      {status === "ready" &&
        (days.length === 0 ? (
          <p className="rounded-xl bg-ivory px-4 py-3 text-sm text-stone">
            No times are open right now — please call us and we&apos;ll fit you
            in.
          </p>
        ) : (
          <>
            {degraded && (
              <div className="flex items-start gap-2 rounded-xl bg-ivory p-3 text-sm text-ink">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
                <p>
                  Live availability is briefly unavailable — times shown may
                  already be taken; your booking is only confirmed once
                  accepted.
                </p>
              </div>
            )}

            {/* Date rail */}
            <div className="flex items-stretch gap-2">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label="Earlier dates"
                className={cn(
                  "hidden w-9 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-ink transition-colors duration-300 hover:border-ink pointer-fine:grid",
                  focusRing
                )}
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>

              <div
                ref={railRef}
                className="no-scrollbar flex min-w-0 flex-1 snap-x gap-2 overflow-x-auto pb-1"
              >
                {days.map((day, i) => {
                  const isDisabled = day.slots.length === 0;
                  const isSelected = day.date === selectedDate;
                  const isToday = day.date === todayISO;
                  const showMonth =
                    i === 0 || melMonth(day.date) !== melMonth(days[i - 1].date);
                  return (
                    <button
                      key={day.date}
                      ref={(el) => {
                        if (el) pillRefs.current.set(day.date, el);
                        else pillRefs.current.delete(day.date);
                      }}
                      type="button"
                      disabled={isDisabled}
                      aria-disabled={isDisabled || undefined}
                      aria-pressed={isSelected}
                      tabIndex={!isDisabled && day.date === rovingDate ? 0 : -1}
                      onKeyDown={(e) => onPillKeyDown(e, day.date)}
                      onClick={() => setSelectedDate(day.date)}
                      className={cn(
                        "flex min-h-11 w-16 shrink-0 snap-start flex-col items-center justify-center rounded-2xl border px-1 py-2 transition-all duration-300",
                        focusRing,
                        isSelected
                          ? "border-ink bg-ink text-cream"
                          : isDisabled
                            ? "cursor-not-allowed border-line/70 bg-ivory text-stone"
                            : "border-line bg-surface text-ink hover:border-ink/40"
                      )}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wide">
                        {isToday ? "Today" : WEEKDAYS[melWeekday(day.date)]}
                      </span>
                      <span className="mt-0.5 text-base font-bold leading-none">
                        {Number(day.date.slice(8, 10))}
                      </span>
                      {/* month is always rendered (keeps pill heights
                          equal) but only visible when it changes */}
                      <span
                        className={cn(
                          "mt-0.5 text-[10px] font-medium",
                          isSelected ? "text-cream/70" : "text-stone",
                          !showMonth && "invisible"
                        )}
                      >
                        {MONTHS[melMonth(day.date) - 1]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label="Later dates"
                className={cn(
                  "hidden w-9 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-ink transition-colors duration-300 hover:border-ink pointer-fine:grid",
                  focusRing
                )}
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>

            {/* Selected day's slots — announced via the status region above,
                NOT aria-live: a live grid re-reads every chip on day change. */}
            <div className="space-y-4">
              {selectedDay &&
                (selectedDay.slots.length === 0 ? (
                  <p className="rounded-xl bg-ivory px-4 py-3 text-sm text-stone">
                    Fully booked {formatMelDate(selectedDay.date)} — try another
                    day.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2.5">
                    {selectedDay.slots.map((slot) => {
                      const isSelected = value?.start === slot.start;
                      const isTwilight = slot.kind === "twilight";
                      return (
                        <button
                          key={slot.start}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => onSelect(slot)}
                          className={cn(
                            "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                            focusRing,
                            isSelected
                              ? "border-accent bg-accent text-white"
                              : "border-line bg-surface text-ink hover:-translate-y-0.5 hover:border-accent/60",
                            isTwilight && !isSelected && "ring-1 ring-accent/35"
                          )}
                        >
                          {isTwilight && (
                            <Sunset
                              className={cn(
                                "size-4",
                                isSelected ? "text-white" : "text-accent-text"
                              )}
                              aria-hidden
                            />
                          )}
                          {isTwilight ? `Twilight ${slot.label}` : slot.label}
                        </button>
                      );
                    })}
                  </div>
                ))}

              {/* Polite region around ONLY the selection confirmation —
                  kept mounted so picking a slot is announced once. */}
              <div aria-live="polite">
                {value && valueDate && (
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {formatMelDateLong(valueDate)} · {value.label} · Melbourne
                      time
                    </p>
                    {value.kind === "twilight" && (
                      <p className="mt-1 text-xs text-stone">
                        Exact dusk timing reconfirmed the day before.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        ))}

      <p className="text-xs text-stone">
        On-site window includes set-up and pack-up.
      </p>

      {error && (
        <p id={ERROR_ID} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
