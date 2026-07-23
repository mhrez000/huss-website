# LuxeVisuals — Residential Real Estate Photography

Premium, conversion-focused website for LuxeVisuals, a residential real estate
photography business in Melbourne, Australia. Design language is aligned to
the Apple Store: white/#f5f5f7 sections, #1d1d1f text, Apple-blue (#0071e3)
CTAs, orange (#b64400) eyebrow labels, Inter/SF Pro typography, flat cards.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content (the "CMS")

All copy, pricing, images, FAQs and testimonials live in three files —
no code changes needed to update the site:

| File | Controls |
| --- | --- |
| `src/content/site.ts` | Business details, nav, hero, services, portfolio, pricing packages & extras, testimonials, FAQs, stats, booking form options |
| `src/content/blog.ts` | Blog posts (structured sections, no MDX needed) |
| `src/content/areas.ts` | Suburb pages (unique SEO copy, local FAQs, galleries) |

Images are curated Unsplash placeholders defined in the `IMG` pool in
`src/content/site.ts` — swap them for real LuxeVisuals photography by
replacing the URLs (drop files in `/public` and use `/filename.jpg`).

The before/after sliders currently derive the "before" state from the same
image via CSS degradation as a placeholder — replace with real before/after
pairs when available.

## Booking system (live availability)

Users pick from the photographer's genuinely free time slots; a chosen
slot is reserved atomically so double-booking is impossible.

- **Rules** live in `bookingConfig` in `src/content/site.ts`: bookable
  start times per weekday, twilight sessions (seasonal dusk table),
  minimum notice (12h), booking horizon (60 days), and `blockedDates`
  for holidays/leave — all edited like any other content.
- **Engine**: `src/lib/availability.ts` (pure, Melbourne-timezone/DST
  aware — helpers in `src/lib/melbourne-time.ts`).
- **API**: `GET /api/availability?from&to` returns free slots;
  `POST /api/book` re-validates the slot and inserts it — a lost race
  returns 409 and the UI refreshes availability.
- **Storage** (`src/lib/bookings-store.ts`), selected by env:
  - `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set → Supabase
    Postgres. Run `supabase/bookings.sql` once in the SQL editor; the
    `bookings_no_overlap` gist EXCLUSION constraint on
    `tstzrange(slot_start, slot_end)` guarantees no double-booking
    (slots overlap by design, so a unique index on `slot_start` alone
    would not be enough). Cancelling: set a row's `status` to
    `cancelled` (frees the slot).
  - Otherwise → local `.data/bookings.json` (dev only; serverless
    filesystems are ephemeral).
- **Google Calendar sync** (optional): set `GOOGLE_SERVICE_ACCOUNT_JSON`
  and `GOOGLE_CALENDAR_ID` together and the diary becomes two-way —
  confirmed bookings land in the photographer's Google Calendar, and
  his own calendar events block bookable slots on the site. With either
  var missing the integration is a strict no-op and the site behaves
  exactly as before. Owner walkthrough:
  [GOOGLE-CALENDAR-SETUP.md](./GOOGLE-CALENDAR-SETUP.md).
- **Static demo** (GitHub Pages, `NEXT_PUBLIC_DEMO=1`): no API exists,
  so the picker computes a deterministic pseudo-random diary client-side
  and submissions simulate success with a "demo preview" note.

## Booking & contact emails

- With `RESEND_API_KEY` set (see `.env.example`), bookings send an admin
  notification plus a customer confirmation with the exact reserved slot,
  an `.ics` invite and a Google Calendar link.
- Without it, submissions are logged to the server console and the form
  still confirms — safe for local development. Email failure never loses
  a booking: the slot is persisted before any email is attempted.

## SEO

- Per-page metadata + Open Graph on every route
- JSON-LD: LocalBusiness, Service, FAQ, Breadcrumb, Article schemas (`src/lib/schema.ts`)
- `src/app/sitemap.ts` + `src/app/robots.ts`
- Suburb landing pages under `/areas/*` for local search

## Deploying

Standard Next.js — deploys to Vercel with zero config. Set the env vars
from `.env.example` in the Vercel dashboard: Resend for email delivery,
Supabase for persistent live availability (required in production —
without it each serverless instance forgets bookings).
