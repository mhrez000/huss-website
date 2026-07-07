import type { Metadata } from "next";
import { Check, Clock, MapPin, Receipt, ShieldCheck } from "lucide-react";
import { extras, faqs, finalCta, IMG, packages } from "@/content/site";
import { aud, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent real estate photography packages from $349 — HDR photos, drone, floor plans and full marketing campaigns for Melbourne agents. No quotes, no surprises.",
  openGraph: {
    title: "Pricing",
    description:
      "Transparent real estate photography packages from $349 — HDR photos, drone, floor plans and full marketing campaigns for Melbourne agents.",
    images: [IMG.luxuryExteriorDusk],
  },
};

const reassurance = [
  {
    icon: MapPin,
    title: "No travel fees, metro Melbourne",
    text: "Every suburb across metropolitan Melbourne is covered — no callout charges, no fuel surcharges, ever.",
  },
  {
    icon: ShieldCheck,
    title: "Reshoot guarantee",
    text: "If a shoot ever falls short of the HussMedia standard, it gets reshot at no cost. Simple as that.",
  },
  {
    icon: Receipt,
    title: "14-day agency invoicing",
    text: "Agencies settle on 14-day invoice terms; individual agents can pay by card at booking.",
  },
];

const pricingFaqQuestions = [
  "What payment methods do you accept?",
  "Do you travel outside Melbourne?",
  "What if it rains?",
];

const pricingFaqs = faqs.filter((f) => pricingFaqQuestions.includes(f.q));

export default function PricingPage() {
  return (
    <>
      {/* ---------- Header + packages ---------- */}
      <section className="bg-cream pt-28 pb-24 sm:pt-36 sm:pb-32">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Pricing</p>
            <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
              Simple pricing. Premium results.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              No quotes, no surprises, no hidden fees. Four honest packages
              that cover everything a campaign needs — photographed, hand-edited
              and delivered within 24 hours.
            </p>
          </Reveal>

          <RevealGroup className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
            {packages.map((p) => (
              <RevealItem key={p.id} className="flex">
                <div
                  className={cn(
                    "relative flex w-full flex-col rounded-3xl border bg-surface p-8",
                    "shadow-[var(--shadow-card)] transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
                    p.popular ? "border-gold ring-1 ring-gold" : "border-line"
                  )}
                >
                  {p.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                      Most popular
                    </span>
                  )}

                  <h2 className="text-xl font-bold text-ink">{p.name}</h2>
                  <p className="mt-1 text-sm text-stone">{p.tagline}</p>

                  <p className="display mt-6 text-5xl text-ink">{aud(p.price)}</p>
                  <p className="mt-1.5 text-xs text-stone">per property</p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {p.includes.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-3 py-1 text-xs font-medium text-ink">
                      <Clock className="size-3.5 text-gold" aria-hidden />
                      {p.turnaround}
                    </span>
                  </p>

                  <Button
                    href="/book"
                    variant={p.popular ? "gold" : "primary"}
                    className="mt-6 w-full"
                  >
                    {p.cta}
                  </Button>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* ---------- Optional extras ---------- */}
          <Reveal className="mt-20 sm:mt-24">
            <div className="rounded-3xl bg-ivory p-8 sm:p-12">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow mb-3">Add-ons</p>
                  <h2 className="display text-3xl text-ink sm:text-4xl">
                    Optional extras
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-stone">
                  Tailor any package with the upgrades that suit the property
                  and the campaign. Add them at booking or after the shoot.
                </p>
              </div>

              <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {extras.map((e) => (
                  <div
                    key={e.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line pb-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">{e.name}</p>
                      <p className="mt-0.5 text-xs text-stone">{e.unit}</p>
                    </div>
                    <p className="font-semibold text-gold">{aud(e.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ---------- Reassurance row ---------- */}
          <RevealGroup className="mt-16 grid gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8">
            {reassurance.map((r) => (
              <RevealItem key={r.title} className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ivory text-gold">
                  <r.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-ink">{r.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone">{r.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- FAQ teaser ---------- */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Good to know"
                heading="Questions about pricing?"
                intro="Straight answers to the things agents ask most. Can't find yours? A real person replies — usually within the hour."
              />
              <Reveal delay={0.15} className="mt-8">
                <Button href="/contact" variant="outline">
                  Ask a Question
                </Button>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Accordion items={pricingFaqs} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="relative grain bg-charcoal py-24 sm:py-32">
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 !text-gold-soft">Ready when you are</p>
            <h2 className="display text-balance text-4xl text-cream sm:text-5xl">
              {finalCta.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              {finalCta.text}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href={finalCta.cta.href} variant="gold" size="lg">
                {finalCta.cta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
