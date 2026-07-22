"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, Loader2, CalendarPlus } from "lucide-react";
import { bookingSchema, type BookingInput } from "@/lib/booking-schema";
import { bookingOptions, site } from "@/content/site";
import type { Slot } from "@/lib/availability";
import {
  MELBOURNE_TZ,
  formatMelDateLong,
  gcalLocalStamp,
  melDateOf,
} from "@/lib/melbourne-time";
import { SlotPicker } from "@/components/booking/slot-picker";
import { Button } from "@/components/ui/button";
import {
  Field,
  FormAlert,
  HoneypotField,
  SelectShell,
  fieldAria,
  fieldErrorId,
  inputStyles,
  selectStyles,
  textareaStyles,
} from "@/components/forms/field";
import { cn } from "@/lib/utils";

type SubmitState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | {
      status: "success";
      calendarUrl: string;
      slot: Slot | null;
      /** false ⇢ the booking saved but the confirmation email didn't send. */
      emailSent: boolean;
    };

/**
 * Demo-mode Google Calendar link, built client-side so the static
 * (GitHub Pages) preview offers the complete experience without an API.
 * Wall-clock stamps + ctz pin the event to Melbourne time.
 */
function demoCalendarUrl(slot: Slot, values: BookingInput): string {
  const text = encodeURIComponent(
    `LuxeVisuals photo shoot — ${values.propertyAddress}`
  );
  const details = encodeURIComponent(
    "Professional real estate photography with LuxeVisuals."
  );
  const location = encodeURIComponent(values.propertyAddress);
  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${text}` +
    `&dates=${gcalLocalStamp(slot.start)}/${gcalLocalStamp(slot.end)}` +
    `&ctz=${MELBOURNE_TZ}` +
    `&location=${location}` +
    `&details=${details}`
  );
}

/** Numbered group heading inside the booking card. */
function GroupHeading({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ivory text-xs font-bold text-accent-text">
        {step}
      </span>
      <h2 className="text-lg font-bold text-ink">{title}</h2>
    </div>
  );
}

export function BookingForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  /** Full Slot object for display — the form itself only stores slotStart. */
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  /** Bumped after a 409/stale-slot 422 so the picker reloads availability. */
  const [refreshToken, setRefreshToken] = useState(0);
  const reducedMotion = useReducedMotion();

  /* The success panel replaces the form wholesale — hand focus to its
     heading so keyboard/AT users aren't dropped at the top of the page. */
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (state.status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [state.status]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      propertyAddress: "",
      agentName: "",
      agency: "",
      email: "",
      phone: "",
      slotStart: "",
      propertyType: "" as BookingInput["propertyType"],
      bedrooms: "" as BookingInput["bedrooms"],
      bathrooms: "" as BookingInput["bathrooms"],
      propertySize: "" as BookingInput["propertySize"],
      services: [],
      notes: "",
      website: "",
    },
  });

  async function onSubmit(values: BookingInput) {
    setState({ status: "idle" });

    // Static demo hosting (GitHub Pages) has no API — simulate the flow.
    // zod has already required a real slotStart, so a slot is selected.
    if (process.env.NEXT_PUBLIC_DEMO === "1") {
      await new Promise((r) => setTimeout(r, 700));
      setState({
        status: "success",
        calendarUrl: selectedSlot ? demoCalendarUrl(selectedSlot, values) : "",
        slot: selectedSlot,
        emailSent: true, // demo keeps the standard copy
      });
      return;
    }

    const fallbackMessage = `Something went wrong sending your booking — your details are still here. Please try again, or call us on ${site.phoneDisplay} and we'll organise it on the spot.`;
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as
        | {
            ok?: boolean;
            calendarUrl?: string;
            message?: string;
            code?: string;
            slot?: Slot;
            emailSent?: boolean;
            errors?: {
              formErrors?: string[];
              fieldErrors?: Record<string, string[] | undefined>;
            };
          }
        | null;

      // Someone else took the slot between selection and submit.
      if (res.status === 409) {
        setState({
          status: "error",
          message:
            "That time was just booked by someone else — please pick another slot.",
        });
        setSelectedSlot(null);
        setValue("slotStart", "");
        setRefreshToken((t) => t + 1);
        return;
      }

      // Server-side validation rejected the payload (e.g. the selected slot
      // went stale while the page sat open). Always show the server's own
      // message; when it points at the slot, recover exactly like the 409
      // branch so the dead slot can't be resubmitted.
      if (res.status === 422) {
        const formErrors = data?.errors?.formErrors;
        const fieldErrors = data?.errors?.fieldErrors;
        const hasFieldErrors =
          !!fieldErrors && Object.keys(fieldErrors).length > 0;
        const slotStale =
          data?.code === "slot_stale" ||
          !!fieldErrors?.slotStart ||
          (!!formErrors?.length && !hasFieldErrors);
        setState({
          status: "error",
          message: formErrors?.[0] ?? data?.message ?? fallbackMessage,
        });
        if (slotStale) {
          setSelectedSlot(null);
          setValue("slotStart", "");
          setRefreshToken((t) => t + 1);
        }
        return;
      }

      if (!res.ok || !data?.ok) {
        // e.g. 502 when email delivery failed — show the server's message
        // (call/email fallback) and keep the form data intact.
        setState({ status: "error", message: data?.message || fallbackMessage });
        return;
      }

      setState({
        status: "success",
        calendarUrl: data.calendarUrl ?? "",
        // Prefer the server's canonical slot; fall back to the local one.
        slot:
          data.slot && typeof data.slot.start === "string"
            ? data.slot
            : selectedSlot,
        // Only an explicit false downgrades the confirmation-email copy.
        emailSent: data.emailSent !== false,
      });
    } catch {
      setState({ status: "error", message: fallbackMessage });
    }
  }

  /**
   * zod blocks the submit, but slotStart lives in a hidden input that RHF
   * can't focus — so a missing slot would otherwise be a silent dead click.
   * Hand focus to the slot picker when it's the outstanding error.
   */
  function onInvalid(formErrors: FieldErrors<BookingInput>) {
    if (!formErrors.slotStart) return;
    // Run after RHF's own focus pass; only step in when focus didn't land
    // on a visible invalid control (i.e. the hidden input was first in line).
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (
        active instanceof HTMLElement &&
        active !== document.body &&
        active.matches("input:not([type=hidden]), select, textarea")
      ) {
        return;
      }
      const picker = document.getElementById("slot-picker");
      picker?.scrollIntoView({
        block: "center",
        behavior: reducedMotion ? "auto" : "smooth",
      });
      picker?.focus({ preventScroll: true });
    });
  }

  /* ---------- success panel ---------- */

  if (state.status === "success") {
    const slotDate = state.slot ? melDateOf(Date.parse(state.slot.start)) : null;
    return (
      <motion.div
        initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-line bg-surface p-8 text-center shadow-[var(--shadow-card)] sm:p-12"
      >
        <CheckCircle className="mx-auto size-14 text-accent" aria-hidden />
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="display mt-6 text-balance text-3xl text-ink sm:text-4xl"
        >
          Booking confirmed
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone">
          {state.slot && slotDate ? (
            <>
              Your shoot is locked in for{" "}
              <span className="font-semibold text-ink">
                {formatMelDateLong(slotDate)}, {state.slot.label}
              </span>{" "}
              (Melbourne time).{" "}
              {state.emailSent
                ? "A confirmation email with the details is on its way to your inbox."
                : `If a confirmation email doesn't arrive shortly, call us on ${site.phoneDisplay}.`}
            </>
          ) : state.emailSent ? (
            <>
              Your slot is reserved. A confirmation email with the details is
              on its way to your inbox.
            </>
          ) : (
            <>
              Your slot is locked in. If a confirmation email doesn&apos;t
              arrive shortly, call us on {site.phoneDisplay}.
            </>
          )}
        </p>
        {process.env.NEXT_PUBLIC_DEMO === "1" && (
          <p className="mx-auto mt-3 max-w-md text-xs text-stone">
            Demo preview — no booking was sent.
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {state.calendarUrl && (
            <Button
              href={state.calendarUrl}
              variant="outline"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarPlus className="size-4" aria-hidden />
              Add to Google Calendar
            </Button>
          )}
          <Link
            href="/"
            className="inline-flex min-h-11 items-center px-4 text-sm font-semibold text-stone transition-colors hover:text-ink"
          >
            Back home
          </Link>
        </div>
      </motion.div>
    );
  }

  /* ---------- form ---------- */

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      className="relative rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <div className="space-y-10">
        {/* 1 — Property */}
        <section>
          <GroupHeading step="1" title="Property" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Property address"
              htmlFor="propertyAddress"
              required
              error={errors.propertyAddress?.message}
              className="sm:col-span-2"
            >
              <input
                type="text"
                autoComplete="street-address"
                placeholder="12 Example Street, Suburb VIC 3000"
                className={inputStyles}
                {...fieldAria("propertyAddress", errors.propertyAddress?.message, true)}
                {...register("propertyAddress")}
              />
            </Field>

            <Field
              label="Property type"
              htmlFor="propertyType"
              required
              error={errors.propertyType?.message}
            >
              <SelectShell>
                <select
                  className={selectStyles}
                  {...fieldAria("propertyType", errors.propertyType?.message, true)}
                  {...register("propertyType")}
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  {bookingOptions.propertyTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </Field>

            <Field
              label="Property size"
              htmlFor="propertySize"
              required
              error={errors.propertySize?.message}
            >
              <SelectShell>
                <select
                  className={selectStyles}
                  {...fieldAria("propertySize", errors.propertySize?.message, true)}
                  {...register("propertySize")}
                >
                  <option value="" disabled>
                    Select size
                  </option>
                  {bookingOptions.propertySizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </Field>

            <Field
              label="Bedrooms"
              htmlFor="bedrooms"
              required
              error={errors.bedrooms?.message}
            >
              <SelectShell>
                <select
                  className={selectStyles}
                  {...fieldAria("bedrooms", errors.bedrooms?.message, true)}
                  {...register("bedrooms")}
                >
                  <option value="" disabled>
                    Select bedrooms
                  </option>
                  {bookingOptions.bedrooms.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </Field>

            <Field
              label="Bathrooms"
              htmlFor="bathrooms"
              required
              error={errors.bathrooms?.message}
            >
              <SelectShell>
                <select
                  className={selectStyles}
                  {...fieldAria("bathrooms", errors.bathrooms?.message, true)}
                  {...register("bathrooms")}
                >
                  <option value="" disabled>
                    Select bathrooms
                  </option>
                  {bookingOptions.bathrooms.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </Field>
          </div>
        </section>

        {/* 2 — Your details */}
        <section className="border-t border-line pt-8">
          <GroupHeading step="2" title="Your details" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Your name"
              htmlFor="agentName"
              required
              error={errors.agentName?.message}
            >
              <input
                type="text"
                autoComplete="name"
                placeholder="Full name"
                className={inputStyles}
                {...fieldAria("agentName", errors.agentName?.message, true)}
                {...register("agentName")}
              />
            </Field>

            <Field
              label="Agency"
              htmlFor="agency"
              hint="(optional)"
              error={errors.agency?.message}
            >
              <input
                type="text"
                autoComplete="organization"
                placeholder="Your agency"
                className={inputStyles}
                {...fieldAria("agency", errors.agency?.message)}
                {...register("agency")}
              />
            </Field>

            <Field
              label="Email"
              htmlFor="email"
              required
              error={errors.email?.message}
            >
              <input
                type="email"
                autoComplete="email"
                placeholder="you@agency.com.au"
                className={inputStyles}
                {...fieldAria("email", errors.email?.message, true)}
                {...register("email")}
              />
            </Field>

            <Field
              label="Phone"
              htmlFor="phone"
              required
              error={errors.phone?.message}
            >
              <input
                type="tel"
                autoComplete="tel"
                placeholder="04xx xxx xxx"
                className={inputStyles}
                {...fieldAria("phone", errors.phone?.message, true)}
                {...register("phone")}
              />
            </Field>
          </div>
        </section>

        {/* 3 — Schedule (live availability) */}
        <section className="border-t border-line pt-8">
          <GroupHeading step="3" title="Schedule" />
          {/* slotStart stays registered so zod validates the selection. */}
          <input type="hidden" {...register("slotStart")} />
          <SlotPicker
            value={selectedSlot}
            onSelect={(slot) => {
              setSelectedSlot(slot);
              setValue("slotStart", slot.start, { shouldValidate: true });
            }}
            refreshToken={refreshToken}
            error={errors.slotStart?.message}
          />
        </section>

        {/* 4 — Services */}
        <section className="border-t border-line pt-8">
          <fieldset
            aria-describedby={errors.services ? fieldErrorId("services") : undefined}
            aria-invalid={!!errors.services}
          >
            <legend className="w-full">
              <GroupHeading step="4" title="Services" />
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {bookingOptions.services.map((service) => (
                <label key={service} className="cursor-pointer">
                  <input
                    type="checkbox"
                    value={service}
                    className="peer sr-only"
                    {...register("services")}
                  />
                  <span
                    className={cn(
                      "inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-surface px-5 py-2.5",
                      "text-sm font-semibold text-ink transition-all duration-300 hover:border-accent/60",
                      "peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white",
                      "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent"
                    )}
                  >
                    {service}
                  </span>
                </label>
              ))}
            </div>
            {errors.services?.message && (
              <p
                id={fieldErrorId("services")}
                className="mt-3 text-sm text-red-600"
                role="alert"
              >
                {errors.services.message}
              </p>
            )}
          </fieldset>
        </section>

        {/* 5 — Anything else */}
        <section className="border-t border-line pt-8">
          <GroupHeading step="5" title="Anything else" />
          <Field
            label="Notes for the shoot"
            htmlFor="notes"
            hint="(optional)"
            error={errors.notes?.message}
          >
            <textarea
              rows={4}
              placeholder="Access details, must-have angles, tenant arrangements, campaign deadlines…"
              className={textareaStyles}
              {...fieldAria("notes", errors.notes?.message)}
              {...register("notes")}
            />
          </Field>
        </section>

        {/* Honeypot — invisible to humans */}
        <HoneypotField {...register("website")} />

        {state.status === "error" && <FormAlert>{state.message}</FormAlert>}

        <div>
          <Button
            variant="accent"
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden />
                Confirming your booking…
              </>
            ) : (
              "Confirm booking"
            )}
          </Button>
          <p className="mt-4 text-center text-sm text-stone">
            No payment taken now — your time is reserved the moment you
            confirm.
          </p>
        </div>
      </div>
    </form>
  );
}
