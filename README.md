# HussMedia — Residential Real Estate Photography

Premium, conversion-focused website for HussMedia, a residential real estate
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
`src/content/site.ts` — swap them for real HussMedia photography by
replacing the URLs (drop files in `/public` and use `/filename.jpg`).

The before/after sliders currently derive the "before" state from the same
image via CSS degradation as a placeholder — replace with real before/after
pairs when available.

## Booking & contact forms

API routes: `src/app/api/book/route.ts` and `src/app/api/contact/route.ts`.

- With `RESEND_API_KEY` set (see `.env.example`), submissions send an
  admin notification and a customer confirmation email (with calendar invite).
- Without it, submissions are logged to the server console and the form
  still confirms — safe for local development.

## SEO

- Per-page metadata + Open Graph on every route
- JSON-LD: LocalBusiness, Service, FAQ, Breadcrumb, Article schemas (`src/lib/schema.ts`)
- `src/app/sitemap.ts` + `src/app/robots.ts`
- Suburb landing pages under `/areas/*` for local search

## Deploying

Standard Next.js — deploys to Vercel with zero config. Set the env vars
from `.env.example` in the Vercel dashboard for live email delivery.
