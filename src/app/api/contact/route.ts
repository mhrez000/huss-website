import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/booking-schema";
import { sendContactEmails } from "@/lib/email";
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
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: z.flattenError(parsed.error) },
      { status: 422 }
    );
  }

  // Durable server-side record of every valid enquiry — logged BEFORE
  // attempting email, so a delivery failure never loses the message.
  console.log(
    JSON.stringify({
      event: "contact_enquiry",
      receivedAt: new Date().toISOString(),
      ...parsed.data,
    })
  );

  // sendContactEmails never throws; it reports success/skip/failure.
  const result = await sendContactEmails(parsed.data);

  // skipped = no RESEND_API_KEY (local dev) — the enquiry is logged above.
  if (result.sent || result.skipped) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    {
      ok: false,
      message: `We couldn't send your message just now — please call ${site.phoneDisplay} or email ${site.email}.`,
    },
    { status: 502 }
  );
}
