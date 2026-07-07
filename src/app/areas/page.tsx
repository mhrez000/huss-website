import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { areas } from "@/content/areas";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Areas We Service",
  description:
    "Professional real estate photography across metro Melbourne — Toorak to Williamstown. No travel fees, 24-hour delivery, every suburb covered.",
  openGraph: {
    title: "Areas We Service",
    description:
      "Professional real estate photography across metro Melbourne — Toorak to Williamstown. No travel fees, 24-hour delivery, every suburb covered.",
    images: [areas[0]?.gallery[0]?.src ?? "/hero-poster.jpg"],
  },
};

export default function AreasPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-cream pt-28 sm:pt-36">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Service areas</p>
            <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
              Real estate photography across Melbourne
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              From Toorak&apos;s gated estates to Williamstown&apos;s heritage
              weatherboards, we photograph listings across the whole of metro
              Melbourne — with no travel fees and the same 24-hour delivery
              guarantee in every suburb.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Suburb grid */}
      <section className="bg-cream py-16 sm:py-24">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <RevealItem key={area.slug}>
                <Link
                  href={`/areas/${area.slug}`}
                  className="group block h-full rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-[var(--radius-card)]">
                    <Image
                      src={area.gallery[0].src}
                      alt={area.gallery[0].alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                      {area.region}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <h2 className="text-xl font-bold text-ink">{area.name}</h2>
                      <span
                        className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                        aria-hidden
                      >
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone">
                      {area.blurb}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12">
            <p className="text-center text-stone">
              Don&apos;t see your suburb? We cover all of metro Melbourne —{" "}
              <Link
                href="/contact"
                className="font-semibold text-accent underline-offset-4 hover:underline"
              >
                get in touch
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      {/* CTA band */}
      <section className="relative grain bg-charcoal py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
              Ready when you are
            </p>
            <h2 className="display text-balance text-4xl text-cream sm:text-5xl">
              Book a shoot anywhere in Melbourne
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">
              Same premium photography, same next-morning delivery — whichever
              suburb your next listing calls home.
            </p>
            <div className="mt-10">
              <Button href="/book" variant="accent" size="lg">
                Book a Shoot
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
