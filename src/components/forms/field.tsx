"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ===========================================================
   Shared form primitives — label/error wrapper + the input,
   select and textarea class recipes used by every form.
   =========================================================== */

export const inputStyles = cn(
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-ink",
  "placeholder:text-stone outline-none transition-all duration-300",
  "focus:border-accent focus:ring-2 focus:ring-accent/20"
);

export const selectStyles = cn(inputStyles, "cursor-pointer appearance-none pr-11");

export const textareaStyles = cn(
  inputStyles,
  "h-auto min-h-32 resize-y py-3 leading-relaxed"
);

/** id of the error message rendered by <Field> for the control with this id. */
export function fieldErrorId(id: string) {
  return `${id}-error`;
}

/**
 * Accessibility props linking a control to its <Field> error message.
 * Spread onto the control alongside react-hook-form's register():
 *   <input {...fieldAria("email", errors.email?.message, true)} {...register("email")} />
 */
export function fieldAria(id: string, error?: string, required?: boolean) {
  return {
    id,
    "aria-describedby": error ? fieldErrorId(id) : undefined,
    "aria-invalid": !!error,
    "aria-required": required,
  };
}

/** Label + control + inline error. Pass the control as children. */
export function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden>
            *
          </span>
        )}
        {hint && <span className="ml-2 font-normal text-stone">{hint}</span>}
      </label>
      {children}
      {error && (
        <p
          id={htmlFor ? fieldErrorId(htmlFor) : undefined}
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/** Wrap a <select> to get a consistent chevron affordance. */
export function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-stone"
        aria-hidden
      />
    </div>
  );
}

/** Inline API / network error alert. */
export function FormAlert({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700"
    >
      {children}
    </div>
  );
}

/** Visually hidden honeypot field — humans never see it, bots fill it. */
export function HoneypotField(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
    >
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
