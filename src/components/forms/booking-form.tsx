"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, CalendarPlus } from "lucide-react";
import {
  bookingSchema,
  melbourneToday,
  type BookingInput,
} from "@/lib/booking-schema";
import { bookingOptions, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  Field,
  FormAlert,
  HoneypotField,
  SelectShell,
  inputStyles,
  selectStyles,
  textareaStyles,
} from "@/components/forms/field";
import { cn } from "@/lib/utils";

type SubmitState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; calendarUrl: string };

/** Numbered group heading inside the booking card. */
function GroupHeading({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ivory text-xs font-bold text-gold">
        {step}
      </span>
      <h2 className="text-lg font-bold text-ink">{title}</h2>
    </div>
  );
}

export function BookingForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const today = melbourneToday();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      propertyAddress: "",
      agentName: "",
      agency: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "" as BookingInput["preferredTime"],
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
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; calendarUrl?: string }
        | null;
      if (!res.ok || !data?.ok) throw new Error("Request failed");
      setState({ status: "success", calendarUrl: data.calendarUrl ?? "" });
    } catch {
      setState({
        status: "error",
        message: `Something went wrong sending your booking — your details are still here. Please try again, or call us on ${site.phoneDisplay} and we'll organise it on the spot.`,
      });
    }
  }

  /* ---------- success panel ---------- */

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-line bg-surface p-8 text-center shadow-[var(--shadow-card)] sm:p-12"
      >
        <CheckCircle className="mx-auto size-14 text-gold" aria-hidden />
        <h2 className="display mt-6 text-balance text-3xl text-ink sm:text-4xl">
          Booking request received
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone">
          A confirmation email with your booking summary is on its way to your
          inbox. We&apos;ll confirm your shoot time within business hours —
          usually within the hour.
        </p>
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
      onSubmit={handleSubmit(onSubmit)}
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
                id="propertyAddress"
                type="text"
                autoComplete="street-address"
                placeholder="12 Example Street, Suburb VIC 3000"
                className={inputStyles}
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
                  id="propertyType"
                  className={selectStyles}
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
                  id="propertySize"
                  className={selectStyles}
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
                  id="bedrooms"
                  className={selectStyles}
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
                  id="bathrooms"
                  className={selectStyles}
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
                id="agentName"
                type="text"
                autoComplete="name"
                placeholder="Full name"
                className={inputStyles}
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
                id="agency"
                type="text"
                autoComplete="organization"
                placeholder="Your agency"
                className={inputStyles}
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
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@agency.com.au"
                className={inputStyles}
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
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="04xx xxx xxx"
                className={inputStyles}
                {...register("phone")}
              />
            </Field>
          </div>
        </section>

        {/* 3 — Schedule */}
        <section className="border-t border-line pt-8">
          <GroupHeading step="3" title="Schedule" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Preferred date"
              htmlFor="preferredDate"
              required
              error={errors.preferredDate?.message}
            >
              <input
                id="preferredDate"
                type="date"
                min={today}
                className={inputStyles}
                {...register("preferredDate")}
              />
            </Field>

            <Field
              label="Preferred time"
              htmlFor="preferredTime"
              required
              error={errors.preferredTime?.message}
            >
              <SelectShell>
                <select
                  id="preferredTime"
                  className={selectStyles}
                  {...register("preferredTime")}
                >
                  <option value="" disabled>
                    Select a time slot
                  </option>
                  {bookingOptions.timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </SelectShell>
            </Field>
          </div>
        </section>

        {/* 4 — Services */}
        <section className="border-t border-line pt-8">
          <fieldset>
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
                      "text-sm font-semibold text-ink transition-all duration-300 hover:border-gold/60",
                      "peer-checked:border-gold peer-checked:bg-gold peer-checked:text-white",
                      "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold"
                    )}
                  >
                    {service}
                  </span>
                </label>
              ))}
            </div>
            {errors.services?.message && (
              <p className="mt-3 text-sm text-red-600" role="alert">
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
              id="notes"
              rows={4}
              placeholder="Access details, must-have angles, tenant arrangements, campaign deadlines…"
              className={textareaStyles}
              {...register("notes")}
            />
          </Field>
        </section>

        {/* Honeypot — invisible to humans */}
        <HoneypotField {...register("website")} />

        {state.status === "error" && <FormAlert>{state.message}</FormAlert>}

        <div>
          <Button
            variant="gold"
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden />
                Sending your request…
              </>
            ) : (
              "Confirm booking request"
            )}
          </Button>
          <p className="mt-4 text-center text-sm text-stone">
            No payment taken now — we confirm availability within business
            hours.
          </p>
        </div>
      </div>
    </form>
  );
}
