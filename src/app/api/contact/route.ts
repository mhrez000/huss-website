import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/booking-schema";
import { sendContactEmails } from "@/lib/email";

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

  // Email failure must not fail the enquiry — sendContactEmails never throws.
  await sendContactEmails(parsed.data);

  return NextResponse.json({ ok: true });
}
