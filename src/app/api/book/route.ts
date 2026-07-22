import { NextResponse } from "next/server";
import { z } from "zod";
import { matchBookableSlot } from "@/lib/availability";
import { bookingSchema } from "@/lib/booking-schema";
import { getBookingStore } from "@/lib/bookings-store";
import type { CreateResult, NewBooking } from "@/lib/bookings-store";
import { buildGoogleCalendarUrl, sendBookingEmails } from "@/lib/email";
import { site } from "@/content/site";

/* ===========================================================
   POST /api/book — reserve an exact slot.
   -----------------------------------------------------------
   1. Honeypot          -> fake success (bots move on)
   2. Schema validation -> 422 flattened zod errors
   3. Slot re-match     -> 422 (rules/notice/horizon enforced
      server-side; the client's slot list may be stale)
   4. Durable log line  -> BEFORE any side effect
   5. Atomic insert     -> 409 slot_taken | 502 store outage
   6. Emails            -> best-effort; the booking is already
      persisted, so email failure never fails the response
   =========================================================== */

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { formErrors: ["Invalid request body"], fieldErrors: {} } },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend everything worked so bots move on. But a
  // false positive (e.g. an aggressive autofill) would otherwise vanish
  // without trace, so log a structured, sanitized line first: a human can
  // recover a genuine booking from the logs.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).trim() !== ""
  ) {
    const raw = body as Record<string, unknown>;
    const str = (v: unknown): string | undefined =>
      typeof v === "string" ? v.slice(0, 300) : undefined;
    console.log(
      JSON.stringify({
        event: "honeypot_tripped",
        receivedAt: new Date().toISOString(),
        slotStart: str(raw.slotStart),
        propertyAddress: str(raw.propertyAddress),
        agentName: str(raw.agentName),
        agency: str(raw.agency),
        email: str(raw.email),
        phone: str(raw.phone),
        propertyType: str(raw.propertyType),
        bedrooms: str(raw.bedrooms),
        bathrooms: str(raw.bathrooms),
        propertySize: str(raw.propertySize),
        services: Array.isArray(raw.services)
          ? raw.services
              .filter((s): s is string => typeof s === "string")
              .map((s) => s.slice(0, 100))
              .slice(0, 20)
          : undefined,
        notes: str(raw.notes),
        website: str(raw.website),
      })
    );
    return NextResponse.json({ ok: true, calendarUrl: "" });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: z.flattenError(parsed.error) },
      { status: 422 }
    );
  }
  const data = parsed.data;

  // The requested start must exactly match a slot the engine would offer
  // right now (rules, notice, horizon). Busy state is NOT checked here —
  // the store enforces that atomically on insert.
  const slot = matchBookableSlot(data.slotStart, new Date());
  if (!slot) {
    return NextResponse.json(
      {
        ok: false,
        code: "slot_stale",
        errors: {
          formErrors: [
            "That time can no longer be booked — please refresh and choose another slot.",
          ],
          fieldErrors: {},
        },
      },
      { status: 422 }
    );
  }

  // Canonical slot instants from the engine, never the client's string.
  const booking: NewBooking = {
    slotStart: slot.start,
    slotEnd: slot.end,
    propertyAddress: data.propertyAddress,
    agentName: data.agentName,
    agency: data.agency,
    email: data.email,
    phone: data.phone,
    propertyType: data.propertyType,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    propertySize: data.propertySize,
    services: data.services,
    notes: data.notes,
  };

  // Durable server-side trail of every valid booking request — logged
  // BEFORE any side effect, so no downstream failure can lose the record.
  console.log(
    JSON.stringify({
      event: "booking_request",
      receivedAt: new Date().toISOString(),
      slotKind: slot.kind,
      ...booking,
    })
  );

  const store = getBookingStore();
  let created: CreateResult;
  try {
    created = await store.createBooking(booking);
  } catch (error) {
    // Store drivers report failures as results; a throw here is transport-
    // level (network etc.) and gets the same outage treatment.
    created = {
      ok: false,
      reason: "error",
      message: error instanceof Error ? error.message : "booking store threw",
    };
  }

  if (!created.ok) {
    if (created.reason === "conflict") {
      return NextResponse.json(
        {
          ok: false,
          code: "slot_taken",
          message:
            "That time was just booked by someone else — please choose another slot.",
        },
        { status: 409 }
      );
    }
    console.error("[book] booking store failed:", created.message);
    return NextResponse.json(
      {
        ok: false,
        message: `We couldn't confirm your booking just now — please call ${site.phoneDisplay} and we'll lock it in.`,
      },
      { status: 502 }
    );
  }

  const calendarUrl = buildGoogleCalendarUrl(data, slot);

  // The booking is already persisted — email failure must NOT fail the
  // response. sendBookingEmails never throws; log the outcome and move on.
  const emails = await sendBookingEmails(data, slot);
  if (!emails.sent && !emails.skipped) {
    console.error(
      `[book] booking ${created.id} persisted but emails failed:`,
      emails.error
    );
  }

  // emailSent: true ONLY when the send actually succeeded; false when it
  // was skipped (no RESEND_API_KEY) OR failed. The UI reads this field.
  return NextResponse.json({
    ok: true,
    calendarUrl,
    emailSent: emails.sent === true,
    slot: { start: slot.start, end: slot.end, kind: slot.kind, label: slot.label },
  });
}
