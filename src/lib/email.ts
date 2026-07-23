import { Resend } from "resend";
import { site } from "@/content/site";
import type { SlotKind } from "@/lib/availability";
import type { BookingInput, ContactInput } from "@/lib/booking-schema";
import {
  MELBOURNE_TZ,
  formatMelDate,
  formatMelDateLong,
  formatMelRange,
  gcalLocalStamp,
  melDateOf,
} from "@/lib/melbourne-time";

/* ===========================================================
   Email helpers — Resend when RESEND_API_KEY is set, console
   fallback otherwise. These helpers never throw; they return a
   SendResult describing one of three outcomes:
   - { sent: true }                  — admin notification delivered
     (optionally with a `warning` if the customer copy failed)
   - { sent: false, skipped: true }  — no RESEND_API_KEY (dev mode,
     payload logged to the console instead)
   - { sent: false, error }          — configured but delivery failed
   =========================================================== */

export type SendResult =
  | { sent: true; skipped?: never; error?: never; warning?: string }
  | { sent: false; skipped: true; error?: never; warning?: never }
  | { sent: false; skipped?: never; error: string; warning?: never };

/**
 * The exact reserved slot, as validated by the availability engine and
 * persisted by the booking store. UTC ISO instants — no guessing, no
 * dusk tables here; twilight timing already lives in the slot itself.
 */
export type BookedSlot = { start: string; end: string; kind: SlotKind };

const FROM = () => process.env.EMAIL_FROM || "LuxeVisuals <onboarding@resend.dev>";
const ADMIN_TO = () => process.env.BOOKING_NOTIFY_EMAIL || site.email;

/** Twilight slots track dusk, which shifts daily — flag the reconfirmation. */
const TWILIGHT_NOTE =
  "Twilight shoot — the exact dusk timing is reconfirmed the day before.";

/* ---------- slot presentation ---------- */

/** "Tuesday 14 July 2026" — the slot's Melbourne calendar date. */
function slotDateLong(slot: BookedSlot): string {
  return formatMelDateLong(melDateOf(new Date(slot.start)));
}

/** "9:30am – 11:30am (Melbourne time)" */
function slotTimeRange(slot: BookedSlot): string {
  return `${formatMelRange(slot.start, slot.end)} (Melbourne time)`;
}

/** "Tue 14 July, 9:30am – 11:30am" — compact form for subject lines. */
function slotShort(slot: BookedSlot): string {
  return `${formatMelDate(melDateOf(new Date(slot.start)))}, ${formatMelRange(
    slot.start,
    slot.end
  )}`;
}

/* ---------- calendar helpers ---------- */

/** Shared event description for the Google link and the .ics invite. */
function eventDescription(booking: BookingInput, slot: BookedSlot): string {
  return [
    `Real estate photography shoot with ${site.name}.`,
    `Services: ${booking.services.join(", ")}`,
    `Agent: ${booking.agentName}${booking.agency ? ` (${booking.agency})` : ""}`,
    ...(slot.kind === "twilight" ? [TWILIGHT_NOTE] : []),
    `Questions? ${site.phoneDisplay} — ${site.email}`,
  ].join("\n");
}

/**
 * "Add to Google Calendar" link for the reserved slot. Google expects
 * local wall-clock stamps paired with ctz — gcalLocalStamp renders the
 * UTC instants in Melbourne time. Used by both the API route's JSON
 * response and the confirmation email, so the two can never drift.
 */
export function buildGoogleCalendarUrl(
  booking: BookingInput,
  slot: BookedSlot
): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${site.name} photography — ${booking.propertyAddress}`,
    dates: `${gcalLocalStamp(slot.start)}/${gcalLocalStamp(slot.end)}`,
    details: eventDescription(booking, slot),
    location: booking.propertyAddress,
    ctz: MELBOURNE_TZ,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Escape text for ICS property values. */
function icsEscape(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** "2026-07-14T09:30:00.000Z" -> "20260714T093000Z" (UTC form, no TZID). */
function icsUtcStamp(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

/** Hand-built .ics invite for the reserved slot (exact UTC instants). */
export function buildBookingIcs(booking: BookingInput, slot: BookedSlot): string {
  const uid = `booking-${Date.now()}-${Math.random().toString(36).slice(2, 10)}@luxevisuals.com.au`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//LuxeVisuals//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${icsUtcStamp(new Date().toISOString())}`,
    `DTSTART:${icsUtcStamp(slot.start)}`,
    `DTEND:${icsUtcStamp(slot.end)}`,
    `SUMMARY:${icsEscape(`${site.name} photography — ${booking.propertyAddress}`)}`,
    `LOCATION:${icsEscape(booking.propertyAddress)}`,
    `DESCRIPTION:${icsEscape(eventDescription(booking, slot))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/* ---------- HTML helpers ---------- */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const COLOR = {
  cream: "#ffffff",
  ivory: "#f5f5f7",
  charcoal: "#1d1d1f",
  ink: "#1d1d1f",
  stone: "#6e6e73",
  accent: "#0071e3",
  accentSoft: "#2997ff",
  line: "#d2d2d7",
};

function summaryRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${COLOR.line};font-size:13px;color:${COLOR.stone};vertical-align:top;white-space:nowrap;padding-right:24px;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${COLOR.line};font-size:14px;color:${COLOR.ink};font-weight:600;">${escapeHtml(value)}</td>
    </tr>`;
}

function bookingCustomerHtml(
  booking: BookingInput,
  slot: BookedSlot,
  calendarUrl: string
) {
  const rows = [
    summaryRow("Property", booking.propertyAddress),
    summaryRow("Type", `${booking.propertyType} · ${booking.bedrooms} bed · ${booking.bathrooms} bath`),
    summaryRow("Size", booking.propertySize),
    summaryRow("Date", slotDateLong(slot)),
    summaryRow("Time", slotTimeRange(slot)),
    slot.kind === "twilight" ? summaryRow("Session", TWILIGHT_NOTE) : "",
    summaryRow("Services", booking.services.join(", ")),
    booking.notes ? summaryRow("Notes", booking.notes) : "",
  ].join("");

  const steps = [
    ["Your time is locked in", "This slot is reserved for you in our diary. Need to change anything? Reply to this email or give us a call."],
    ["We photograph the property", "On time, every time — a calm, efficient shoot that works around vendors and tenants."],
    ["Images within 24 hours", "A ready-to-publish, hand-edited gallery lands in your inbox the next morning."],
  ]
    .map(
      ([title, text], i) => `
      <tr>
        <td style="vertical-align:top;padding:10px 16px 10px 0;">
          <div style="width:28px;height:28px;border-radius:50%;background:${COLOR.ivory};color:${COLOR.accent};font-size:12px;font-weight:700;text-align:center;line-height:28px;">${i + 1}</div>
        </td>
        <td style="padding:10px 0;">
          <p style="margin:0;font-size:14px;font-weight:700;color:${COLOR.ink};">${title}</p>
          <p style="margin:4px 0 0;font-size:13px;line-height:1.6;color:${COLOR.stone};">${text}</p>
        </td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:${COLOR.cream};font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="background:${COLOR.charcoal};border-radius:20px 20px 0 0;padding:28px 36px;">
                <p style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.02em;color:${COLOR.cream};">Luxe<span style="color:${COLOR.accentSoft};">Visuals</span></p>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;padding:36px;border:1px solid ${COLOR.line};border-top:0;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${COLOR.accent};">Booking confirmed</p>
                <h1 style="margin:14px 0 0;font-size:26px;line-height:1.15;letter-spacing:-0.02em;color:${COLOR.ink};">Thanks ${escapeHtml(booking.agentName)} — your shoot is locked in.</h1>
                <p style="margin:14px 0 0;font-size:14px;line-height:1.7;color:${COLOR.stone};">Your time is reserved: <strong style="color:${COLOR.ink};">${escapeHtml(slotDateLong(slot))}, ${escapeHtml(slotTimeRange(slot))}</strong>. Here's a summary of your booking:</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;">${rows}</table>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 0;">
                  <tr>
                    <td style="background:${COLOR.accent};border-radius:999px;">
                      <a href="${calendarUrl}" style="display:inline-block;padding:14px 30px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">Add to Google Calendar</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:10px 0 0;font-size:12px;color:${COLOR.stone};text-align:center;">A calendar invite (.ics) is also attached to this email.</p>

                <div style="margin-top:32px;padding-top:24px;border-top:1px solid ${COLOR.line};">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${COLOR.accent};">What happens next</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:${COLOR.ivory};border-radius:0 0 20px 20px;border:1px solid ${COLOR.line};border-top:0;padding:22px 36px;">
                <p style="margin:0;font-size:12px;line-height:1.7;color:${COLOR.stone};">
                  Need to change anything? Reply to this email or call <a href="tel:${site.phone.replace(/\s/g, "")}" style="color:${COLOR.accent};font-weight:700;text-decoration:none;">${site.phoneDisplay}</a>.<br />
                  ${site.name} — ${site.serviceRegion}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* ---------- plain-text summaries ---------- */

function bookingSummaryText(booking: BookingInput, slot: BookedSlot) {
  return [
    "NEW BOOKING — SLOT RESERVED",
    "",
    "Schedule",
    `  Date:     ${slotDateLong(slot)}`,
    `  Time:     ${slotTimeRange(slot)}`,
    `  Session:  ${slot.kind === "twilight" ? "twilight (exact dusk timing reconfirmed the day before)" : "standard"}`,
    `  UTC:      ${slot.start} -> ${slot.end}`,
    "",
    "Property",
    `  Address:  ${booking.propertyAddress}`,
    `  Type:     ${booking.propertyType}`,
    `  Beds:     ${booking.bedrooms}  |  Baths: ${booking.bathrooms}`,
    `  Size:     ${booking.propertySize}`,
    "",
    "Agent",
    `  Name:     ${booking.agentName}`,
    `  Agency:   ${booking.agency || "—"}`,
    `  Email:    ${booking.email}`,
    `  Phone:    ${booking.phone}`,
    "",
    "Services",
    `  ${booking.services.join(", ")}`,
    "",
    "Notes",
    `  ${booking.notes || "—"}`,
  ].join("\n");
}

function contactSummaryText(data: ContactInput) {
  return [
    "NEW WEBSITE ENQUIRY",
    "",
    `  Name:    ${data.name}`,
    `  Email:   ${data.email}`,
    `  Phone:   ${data.phone || "—"}`,
    "",
    "Message",
    `  ${data.message}`,
  ].join("\n");
}

/* ---------- senders ---------- */

type SendAttempt = { ok: true } | { ok: false; message: string };

/**
 * One Resend send. resend@6 resolves { data, error } and does NOT throw on
 * API failures, so the error object must be checked explicitly; the
 * try/catch is only a last-resort guard against unexpected transport throws.
 */
async function attemptSend(
  resend: Resend,
  payload: Parameters<Resend["emails"]["send"]>[0],
  label: string
): Promise<SendAttempt> {
  try {
    const { error } = await resend.emails.send(payload);
    if (error) {
      console.error(`[email] ${label} failed:`, error.message);
      return { ok: false, message: error.message };
    }
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error(`[email] ${label} failed:`, message);
    return { ok: false, message };
  }
}

/**
 * Booking emails for a RESERVED slot: plain summary to the studio FIRST
 * (the business-critical record), then a branded confirmation (with
 * calendar link + .ics) to the customer. Never throws.
 */
export async function sendBookingEmails(
  booking: BookingInput,
  slot: BookedSlot
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      [
        "[email] RESEND_API_KEY not set — booking emails NOT sent.",
        "────────────────────────────────────────────",
        bookingSummaryText(booking, slot),
        "────────────────────────────────────────────",
      ].join("\n")
    );
    return { sent: false, skipped: true };
  }

  const resend = new Resend(apiKey);
  const calendarUrl = buildGoogleCalendarUrl(booking, slot);
  const ics = buildBookingIcs(booking, slot);

  // Admin notification FIRST — this is the studio's record of the booking.
  const admin = await attemptSend(
    resend,
    {
      from: FROM(),
      to: ADMIN_TO(),
      replyTo: booking.email,
      subject: `New booking: ${booking.propertyAddress} — ${slotShort(slot)}${slot.kind === "twilight" ? " (twilight)" : ""}`,
      text: bookingSummaryText(booking, slot),
    },
    "booking admin notification"
  );
  if (!admin.ok) return { sent: false, error: admin.message };

  // Customer confirmation second — the booking is already recorded, so a
  // failure here degrades to a warning rather than failing the request.
  const customer = await attemptSend(
    resend,
    {
      from: FROM(),
      to: booking.email,
      subject: `Booking confirmed — ${slotShort(slot)}`,
      html: bookingCustomerHtml(booking, slot, calendarUrl),
      attachments: [
        {
          filename: "luxevisuals-shoot.ics",
          content: Buffer.from(ics).toString("base64"),
        },
      ],
    },
    "booking customer confirmation"
  );
  if (!customer.ok) {
    return { sent: true, warning: `Customer confirmation email failed: ${customer.message}` };
  }

  return { sent: true };
}

/**
 * Contact emails: admin notification FIRST (the business-critical record),
 * then a short acknowledgement to the sender. Never throws.
 */
export async function sendContactEmails(data: ContactInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      [
        "[email] RESEND_API_KEY not set — contact emails NOT sent.",
        "────────────────────────────────────────────",
        contactSummaryText(data),
        "────────────────────────────────────────────",
      ].join("\n")
    );
    return { sent: false, skipped: true };
  }

  const resend = new Resend(apiKey);

  // Admin notification FIRST — this is the studio's record of the enquiry.
  const admin = await attemptSend(
    resend,
    {
      from: FROM(),
      to: ADMIN_TO(),
      replyTo: data.email,
      subject: `New enquiry from ${data.name}`,
      text: contactSummaryText(data),
    },
    "contact admin notification"
  );
  if (!admin.ok) return { sent: false, error: admin.message };

  // Short acknowledgement to the sender — failure degrades to a warning.
  const ack = await attemptSend(
    resend,
    {
      from: FROM(),
      to: data.email,
      subject: `We've received your message — ${site.name}`,
      html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:${COLOR.cream};font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid ${COLOR.line};border-radius:20px;">
            <tr>
              <td style="padding:32px 36px;">
                <p style="margin:0;font-size:18px;font-weight:800;letter-spacing:-0.02em;color:${COLOR.ink};">Luxe<span style="color:${COLOR.accent};">Visuals</span></p>
                <p style="margin:18px 0 0;font-size:15px;line-height:1.7;color:${COLOR.ink};">Hi ${escapeHtml(data.name)},</p>
                <p style="margin:12px 0 0;font-size:14px;line-height:1.7;color:${COLOR.stone};">Thanks for getting in touch — your message has landed and a real person will reply within business hours, usually within the hour.</p>
                <p style="margin:12px 0 0;font-size:14px;line-height:1.7;color:${COLOR.stone};">If it's urgent, call us on <a href="tel:${site.phone.replace(/\s/g, "")}" style="color:${COLOR.accent};font-weight:700;text-decoration:none;">${site.phoneDisplay}</a>.</p>
                <p style="margin:18px 0 0;font-size:14px;color:${COLOR.ink};font-weight:600;">— The ${site.name} team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    },
    "contact acknowledgement"
  );
  if (!ack.ok) {
    return { sent: true, warning: `Acknowledgement email failed: ${ack.message}` };
  }

  return { sent: true };
}
