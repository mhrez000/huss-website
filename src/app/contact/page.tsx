import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, IMG } from "@/content/site";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to HussMedia about your next listing — phone, email or a quick enquiry form. Metro Melbourne coverage, no travel fees, replies within the hour.",
  openGraph: {
    title: "Contact",
    description:
      "Talk to HussMedia about your next listing — phone, email or a quick enquiry form. Metro Melbourne coverage, no travel fees, replies within the hour.",
    images: [IMG.modernExterior],
  },
};

export default function ContactPage() {
  return (
    <section className="bg-cream pb-24 pt-28 sm:pb-32 sm:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])
        )}
      />
      <Container>
        {/* Header */}
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
            Let&apos;s talk about your listings
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone">
            Questions about a campaign, a quote or a tricky property? Call,
            email or send an enquiry — a real person replies, usually within
            the hour.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-12">
          {/* Left — contact details */}
          <RevealGroup className="space-y-6">
            {/* Phone */}
            <RevealItem>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-5 rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ivory text-accent">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-stone">Call us</span>
                  <span className="block text-xl font-bold text-ink transition-colors group-hover:text-accent sm:text-2xl">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>
            </RevealItem>

            {/* Email */}
            <RevealItem>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-5 rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ivory text-accent">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-stone">Email us</span>
                  <span className="block text-xl font-bold text-ink transition-colors group-hover:text-accent sm:text-2xl">
                    {site.email}
                  </span>
                </span>
              </a>
            </RevealItem>

            {/* Hours */}
            <RevealItem>
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
                  <Clock className="size-4 text-accent" aria-hidden />
                  Business hours
                </p>
                <table className="w-full text-sm">
                  <tbody>
                    {site.hours.map((h) => (
                      <tr
                        key={h.days}
                        className="border-b border-line last:border-0"
                      >
                        <td className="py-2.5 pr-4 font-medium text-ink">
                          {h.days}
                        </td>
                        <td className="py-2.5 text-right text-stone">
                          {h.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 flex items-start gap-2 text-sm text-stone">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span>
                    Metro Melbourne — no travel fees.{" "}
                    <Link
                      href="/areas"
                      className="font-semibold text-accent transition-colors hover:text-ink"
                    >
                      See all areas we service
                    </Link>
                  </span>
                </p>
                <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-5">
                  {site.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-stone transition-colors hover:text-accent"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </RevealItem>

            {/* Prefer to just book? */}
            <RevealItem>
              <div className="relative overflow-hidden rounded-3xl bg-charcoal p-8 text-cream grain">
                <p className="eyebrow mb-3 !text-accent-soft">
                  Prefer to just book?
                </p>
                <h2 className="display text-balance text-2xl text-cream sm:text-3xl">
                  Skip the back-and-forth.
                </h2>
                <p className="mt-3 max-w-sm leading-relaxed text-cream/70">
                  Pick a package, choose a time and get instant confirmation —
                  the whole thing takes under two minutes.
                </p>
                <Button href="/book" variant="accent" size="md" className="mt-6">
                  Book a Shoot
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </div>
            </RevealItem>
          </RevealGroup>

          {/* Right — enquiry form */}
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="mt-12 sm:mt-16">
          <div className="overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-card)]">
            <iframe
              src="https://www.google.com/maps?q=Melbourne%20VIC&output=embed&z=10"
              title="HussMedia service area — Melbourne"
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
