import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingSchema } from "@/lib/booking-schema";
import { buildGoogleCalendarUrl, sendBookingEmails } from "@/lib/email";

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

  // Honeypot tripped — pretend everything worked so bots move on.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).trim() !== ""
  ) {
    return NextResponse.json({ ok: true, calendarUrl: "" });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: z.flattenError(parsed.error) },
      { status: 422 }
    );
  }

  const calendarUrl = buildGoogleCalendarUrl(parsed.data);

  // Email failure must not fail the booking — sendBookingEmails never throws.
  await sendBookingEmails(parsed.data);

  return NextResponse.json({ ok: true, calendarUrl });
}
