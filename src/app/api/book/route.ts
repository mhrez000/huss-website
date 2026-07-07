import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingSchema } from "@/lib/booking-schema";
import { buildGoogleCalendarUrl, sendBookingEmails } from "@/lib/email";
import { site } from "@/content/site";

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

  // Durable server-side record of every valid booking request — logged
  // BEFORE attempting email, so a delivery failure never loses the booking.
  console.log(
    JSON.stringify({
      event: "booking_request",
      receivedAt: new Date().toISOString(),
      ...parsed.data,
    })
  );

  const calendarUrl = buildGoogleCalendarUrl(parsed.data);

  // sendBookingEmails never throws; it reports success/skip/failure.
  const result = await sendBookingEmails(parsed.data);

  // skipped = no RESEND_API_KEY (local dev) — the booking is logged above.
  if (result.sent || result.skipped) {
    return NextResponse.json({ ok: true, calendarUrl });
  }

  return NextResponse.json(
    {
      ok: false,
      message: `We couldn't process your booking just now — please call ${site.phoneDisplay} or email ${site.email}.`,
    },
    { status: 502 }
  );
}
