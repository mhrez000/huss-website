"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/booking-schema";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import {
  Field,
  FormAlert,
  HoneypotField,
  fieldAria,
  inputStyles,
  textareaStyles,
} from "@/components/forms/field";

type SubmitState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success" };

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactInput) {
    setState({ status: "idle" });
    const fallbackMessage = `Something went wrong sending your message — your details are still here. Please try again, or call us on ${site.phoneDisplay}.`;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;
      if (!res.ok || !data?.ok) {
        // e.g. 502 when email delivery failed — show the server's message
        // (call/email fallback) and keep the form data intact.
        setState({ status: "error", message: data?.message || fallbackMessage });
        return;
      }
      setState({ status: "success" });
    } catch {
      setState({ status: "error", message: fallbackMessage });
    }
  }

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-full flex-col items-center justify-center rounded-3xl border border-line bg-surface p-8 text-center shadow-[var(--shadow-card)] sm:p-12"
      >
        <CheckCircle className="size-12 text-gold" aria-hidden />
        <h2 className="display mt-5 text-balance text-2xl text-ink sm:text-3xl">
          Message received
        </h2>
        <p className="mt-3 max-w-sm leading-relaxed text-stone">
          Thanks for reaching out — a confirmation is on its way to your inbox
          and a real person will reply within business hours, usually within
          the hour.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <h2 className="text-lg font-bold text-ink">Send an enquiry</h2>
      <p className="mt-1 text-sm text-stone">
        We reply within business hours — usually within the hour.
      </p>

      <div className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" htmlFor="contact-name" required error={errors.name?.message}>
            <input
              type="text"
              autoComplete="name"
              placeholder="Full name"
              className={inputStyles}
              {...fieldAria("contact-name", errors.name?.message, true)}
              {...register("name")}
            />
          </Field>

          <Field label="Phone" htmlFor="contact-phone" hint="(optional)" error={errors.phone?.message}>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="04xx xxx xxx"
              className={inputStyles}
              {...fieldAria("contact-phone", errors.phone?.message)}
              {...register("phone")}
            />
          </Field>
        </div>

        <Field label="Email" htmlFor="contact-email" required error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@agency.com.au"
            className={inputStyles}
            {...fieldAria("contact-email", errors.email?.message, true)}
            {...register("email")}
          />
        </Field>

        <Field label="Message" htmlFor="contact-message" required error={errors.message?.message}>
          <textarea
            rows={5}
            placeholder="Tell us about the property or campaign — address, timing, what you need…"
            className={textareaStyles}
            {...fieldAria("contact-message", errors.message?.message, true)}
            {...register("message")}
          />
        </Field>

        {/* Honeypot — invisible to humans */}
        <HoneypotField {...register("website")} />

        {state.status === "error" && <FormAlert>{state.message}</FormAlert>}

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
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
