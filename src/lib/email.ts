import { Resend } from "resend";
import { site } from "@/content/site";
import type { BookingInput, ContactInput } from "@/lib/booking-schema";

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

const FROM = () => process.env.EMAIL_FROM || "HussMedia <onboarding@resend.dev>";
const ADMIN_TO = () => process.env.BOOKING_NOTIFY_EMAIL || site.email;

/* ---------- calendar helpers ---------- */

/** Start hour (24h, Melbourne local) for the fixed daytime slots. */
const SLOT_START_HOUR: Record<string, number> = {
  "Morning (8am – 11am)": 8,
  "Midday (11am – 2pm)": 11,
  "Afternoon (2pm – 5pm)": 14,
};

const TWILIGHT_SLOT = "Twilight (dusk)";

/**
 * Approximate Melbourne dusk, in minutes from midnight, by month (1–12).
 * Twilight shoots start 30 minutes before dusk and run 90 minutes; the
 * exact time is confirmed with the agent closer to the date.
 */
const MELBOURNE_DUSK_MINUTES: Record<number, number> = {
  1: 20 * 60 + 30, // Jan 8:30pm
  2: 20 * 60, //      Feb 8:00pm
  3: 19 * 60 + 15, // Mar 7:15pm
  4: 17 * 60 + 45, // Apr 5:45pm
  5: 17 * 60 + 15, // May 5:15pm
  6: 17 * 60, //      Jun 5:00pm
  7: 17 * 60 + 15, // Jul 5:15pm
  8: 17 * 60 + 45, // Aug 5:45pm
  9: 18 * 60 + 15, // Sep 6:15pm
  10: 19 * 60 + 45, // Oct 7:45pm
  11: 20 * 60 + 15, // Nov 8:15pm
  12: 20 * 60 + 30, // Dec 8:30pm
};

/** Floating local date-times (YYYYMMDDTHHMMSS) for the shoot window. */
function eventTimes(dateIso: string, timeSlot: string) {
  const day = dateIso.replace(/-/g, "");
  const at = (minutes: number) =>
    `${day}T${String(Math.floor(minutes / 60)).padStart(2, "0")}${String(
      minutes % 60
    ).padStart(2, "0")}00`;

  if (timeSlot === TWILIGHT_SLOT) {
    const month = Number(dateIso.slice(5, 7));
    const dusk = MELBOURNE_DUSK_MINUTES[month] ?? 18 * 60;
    const start = dusk - 30;
    return { start: at(start), end: at(start + 90), isTwilight: true };
  }

  const startHour = SLOT_START_HOUR[timeSlot] ?? 9;
  return { start: at(startHour * 60), end: at((startHour + 2) * 60), isTwilight: false };
}

/** Extra description line for twilight bookings — dusk shifts with the season. */
const TWILIGHT_NOTE =
  "Twilight shoot — exact time confirmed closer to the date.";

/** "2026-07-10" -> "Friday, 10 July 2026" (Melbourne). */
function prettyDate(dateIso: string) {
  return new Date(`${dateIso}T00:00:00Z`).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  });
}

/** "Add to Google Calendar" link for a booking (Australia/Melbourne). */
export function buildGoogleCalendarUrl(booking: BookingInput): string {
  const { start, end, isTwilight } = eventTimes(booking.preferredDate, booking.preferredTime);
  const details = [
    `Real estate photography shoot with ${site.name}.`,
    `Services: ${booking.services.join(", ")}`,
    `Agent: ${booking.agentName}${booking.agency ? ` (${booking.agency})` : ""}`,
    ...(isTwilight ? [TWILIGHT_NOTE] : []),
    `Questions? ${site.phoneDisplay} — ${site.email}`,
  ].join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${site.name} photography — ${booking.propertyAddress}`,
    dates: `${start}/${end}`,
    details,
    location: booking.propertyAddress,
    ctz: "Australia/Melbourne",
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

/** Hand-built .ics invite for the booking (2h window, Melbourne). */
export function buildBookingIcs(booking: BookingInput): string {
  const { start, end, isTwilight } = eventTimes(booking.preferredDate, booking.preferredTime);
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const uid = `booking-${Date.now()}-${Math.random().toString(36).slice(2, 10)}@hussmedia.com`;
  const description = [
    `Real estate photography shoot with ${site.name}.`,
    `Services: ${booking.services.join(", ")}`,
    `Agent: ${booking.agentName}${booking.agency ? ` (${booking.agency})` : ""}`,
    ...(isTwilight ? [TWILIGHT_NOTE] : []),
    `Questions? ${site.phoneDisplay} — ${site.email}`,
  ].join("\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HussMedia//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Australia/Melbourne:${start}`,
    `DTEND;TZID=Australia/Melbourne:${end}`,
    `SUMMARY:${icsEscape(`${site.name} photography — ${booking.propertyAddress}`)}`,
    `LOCATION:${icsEscape(booking.propertyAddress)}`,
    `DESCRIPTION:${icsEscape(description)}`,
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

function bookingCustomerHtml(booking: BookingInput, calendarUrl: string) {
  const rows = [
    summaryRow("Property", booking.propertyAddress),
    summaryRow("Type", `${booking.propertyType} · ${booking.bedrooms} bed · ${booking.bathrooms} bath`),
    summaryRow("Size", booking.propertySize),
    summaryRow("Date", prettyDate(booking.preferredDate)),
    summaryRow("Time", booking.preferredTime),
    summaryRow("Services", booking.services.join(", ")),
    booking.notes ? summaryRow("Notes", booking.notes) : "",
  ].join("");

  const steps = [
    ["We confirm your time", "You'll hear from us within business hours to lock in the shoot and coordinate access."],
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
                <p style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.02em;color:${COLOR.cream};">Huss<span style="color:${COLOR.accentSoft};">Media</span></p>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;padding:36px;border:1px solid ${COLOR.line};border-top:0;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${COLOR.accent};">Booking request received</p>
                <h1 style="margin:14px 0 0;font-size:26px;line-height:1.15;letter-spacing:-0.02em;color:${COLOR.ink};">Thanks ${escapeHtml(booking.agentName)} — your shoot is nearly locked in.</h1>
                <p style="margin:14px 0 0;font-size:14px;line-height:1.7;color:${COLOR.stone};">We've received your booking request and we'll confirm your time within business hours. Here's a summary of what you've booked:</p>

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

function bookingSummaryText(booking: BookingInput) {
  return [
    "NEW BOOKING REQUEST",
    "",
    "Property",
    `  Address:  ${booking.propertyAddress}`,
    `  Type:     ${booking.propertyType}`,
    `  Beds:     ${booking.bedrooms}  |  Baths: ${booking.bathrooms}`,
    `  Size:     ${booking.propertySize}`,
    "",
    "Schedule",
    `  Date:     ${prettyDate(booking.preferredDate)} (${booking.preferredDate})`,
    `  Time:     ${booking.preferredTime}`,
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
 * Booking emails: plain summary to the studio FIRST (the business-critical
 * record), then a branded confirmation (with calendar link + .ics) to the
 * customer. Never throws.
 */
export async function sendBookingEmails(booking: BookingInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      [
        "[email] RESEND_API_KEY not set — booking emails NOT sent.",
        "────────────────────────────────────────────",
        bookingSummaryText(booking),
        "────────────────────────────────────────────",
      ].join("\n")
    );
    return { sent: false, skipped: true };
  }

  const resend = new Resend(apiKey);
  const calendarUrl = buildGoogleCalendarUrl(booking);
  const ics = buildBookingIcs(booking);

  // Admin notification FIRST — this is the studio's record of the booking.
  const admin = await attemptSend(
    resend,
    {
      from: FROM(),
      to: ADMIN_TO(),
      replyTo: booking.email,
      subject: `New booking: ${booking.propertyAddress} — ${booking.preferredDate}, ${booking.preferredTime}`,
      text: bookingSummaryText(booking),
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
      subject: `Booking request received — ${booking.propertyAddress}`,
      html: bookingCustomerHtml(booking, calendarUrl),
      attachments: [
        {
          filename: "hussmedia-shoot.ics",
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
                <p style="margin:0;font-size:18px;font-weight:800;letter-spacing:-0.02em;color:${COLOR.ink};">Huss<span style="color:${COLOR.accent};">Media</span></p>
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
