import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Mail,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { site, packages, IMG } from "@/content/site";
import { aud } from "@/lib/utils";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BookingForm } from "@/components/forms/booking-form";

export const metadata: Metadata = {
  title: "Book a Shoot",
  description:
    "Book professional real estate photography in Melbourne in under two minutes. 24-hour delivery, weather-safe rescheduling and instant confirmation.",
  openGraph: {
    title: "Book a Shoot",
    description:
      "Book professional real estate photography in Melbourne in under two minutes. 24-hour delivery, weather-safe rescheduling and instant confirmation.",
    images: [IMG.luxuryExteriorDusk],
  },
};

const nextSteps = [
  {
    title: "Instant confirmation",
    text: "Your request lands in our diary straight away and a summary email arrives in your inbox.",
  },
  {
    title: "We lock in the details",
    text: "We confirm your time within business hours and coordinate access with vendors or tenants.",
  },
  {
    title: "Shot, edited, delivered",
    text: "Your hand-finished gallery arrives within 24 hours of the shoot — ready for the portals.",
  },
];

const trustChips = [
  { icon: Star, label: `${site.googleRating.toFixed(1)}★ Google (${site.googleReviewCount} reviews)` },
  { icon: ShieldCheck, label: "CASA licensed" },
  { icon: BadgeCheck, label: "Fully insured" },
];

export default function BookPage() {
  return (
    <section className="bg-cream pb-24 pt-28 sm:pb-32 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Book a Shoot", path: "/book" },
          ])
        )}
      />
      <Container>
        {/* Header */}
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Book online</p>
          <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
            Book your shoot in under two minutes
          </h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg text-stone">
            <span>24-hour delivery</span>
            <span className="text-gold" aria-hidden>
              •
            </span>
            <span>Weather-safe rescheduling</span>
            <span className="text-gold" aria-hidden>
              •
            </span>
            <span>Instant confirmation</span>
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-3 lg:gap-12">
          {/* Form */}
          <Reveal className="lg:col-span-2" delay={0.1}>
            <BookingForm />
          </Reveal>

          {/* Sticky aside */}
          <div className="lg:col-span-1">
            <RevealGroup className="space-y-6 lg:sticky lg:top-28">
              {/* What happens next */}
              <RevealItem>
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                  <p className="eyebrow mb-5">What happens next</p>
                  <ol className="space-y-5">
                    {nextSteps.map((step, i) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ivory text-xs font-bold text-gold">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{step.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-stone">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </RevealItem>

              {/* Contact card */}
              <RevealItem>
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                  <p className="eyebrow mb-4">Prefer to talk?</p>
                  <div className="space-y-3">
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="flex min-h-11 items-center gap-3 font-semibold text-ink transition-colors hover:text-gold"
                    >
                      <Phone className="size-4 text-gold" aria-hidden />
                      {site.phoneDisplay}
                    </a>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex min-h-11 items-center gap-3 font-semibold text-ink transition-colors hover:text-gold"
                    >
                      <Mail className="size-4 text-gold" aria-hidden />
                      {site.email}
                    </a>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-stone">
                    Real replies from a real person — usually within the hour.
                  </p>
                </div>
              </RevealItem>

              {/* Packages mini-summary */}
              <RevealItem>
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                  <p className="eyebrow mb-5">Packages</p>
                  <ul className="divide-y divide-line">
                    {packages.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <span className="text-sm font-medium text-ink">
                          {p.name}
                        </span>
                        <span className="shrink-0 text-sm font-bold text-ink">
                          {aud(p.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/pricing"
                    className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-ink"
                  >
                    Compare packages
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </RevealItem>

              {/* Trust chips */}
              <RevealItem>
                <div className="flex flex-wrap gap-2">
                  {trustChips.map(({ icon: ChipIcon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-xs font-semibold text-ink"
                    >
                      <ChipIcon className="size-3.5 text-gold" aria-hidden />
                      {label}
                    </span>
                  ))}
                </div>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
