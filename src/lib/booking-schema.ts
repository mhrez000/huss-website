import { z } from "zod";
import { bookingOptions } from "@/content/site";

/* ===========================================================
   Shared zod schemas — used by the client forms (react-hook-form)
   and the API routes, so validation is identical on both sides.
   =========================================================== */

/** AU-friendly phone: digits with optional +, spaces, () and dashes. */
const AU_PHONE_RE = /^\+?[0-9][0-9\s().-]{6,18}[0-9]$/;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Today's date (YYYY-MM-DD) in Melbourne — safe on server and client. */
export function melbourneToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** bookingOptions arrays are plain string[]; zod enums need a tuple. */
const asEnum = (values: string[], message: string) =>
  z.enum(values as [string, ...string[]], message);

/** Honeypot — real users never see or fill this field. */
const honeypot = z
  .string()
  .optional()
  .refine((v) => !v, "Submission rejected");

export const bookingSchema = z.object({
  propertyAddress: z
    .string("Please enter the property address")
    .min(6, "Please enter the full property address")
    .max(300, "Address is too long"),
  agentName: z
    .string("Please enter your name")
    .min(2, "Please enter your name")
    .max(120, "Name is too long"),
  agency: z.string().max(160, "Agency name is too long").optional(),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string("Please enter a phone number")
    .min(8, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(AU_PHONE_RE, "Please enter a valid Australian phone number"),
  preferredDate: z
    .string("Please choose a date")
    .regex(DATE_RE, "Please choose a date")
    .refine(
      (d) => d >= melbourneToday(),
      "Please choose today or a future date"
    ),
  preferredTime: asEnum(bookingOptions.timeSlots, "Please choose a time slot"),
  propertyType: asEnum(bookingOptions.propertyTypes, "Please select a property type"),
  bedrooms: asEnum(bookingOptions.bedrooms, "Please select bedrooms"),
  bathrooms: asEnum(bookingOptions.bathrooms, "Please select bathrooms"),
  propertySize: asEnum(bookingOptions.propertySizes, "Please select a property size"),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service"),
  notes: z.string().max(2000, "Notes are limited to 2,000 characters").optional(),
  website: honeypot,
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z
    .string("Please enter your name")
    .min(2, "Please enter your name")
    .max(120, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(AU_PHONE_RE, "Please enter a valid Australian phone number")
    .optional()
    .or(z.literal("")),
  message: z
    .string("Please write a short message")
    .min(10, "Please tell us a little more (at least 10 characters)")
    .max(4000, "Message is limited to 4,000 characters"),
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
