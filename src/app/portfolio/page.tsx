import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { hero, IMG, portfolio, portfolioCategories, stats } from "@/content/site";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { PortfolioGallery } from "./gallery";

const description =
  "Browse recent real estate photography across Melbourne — luxury homes, family homes, apartments, drone and twilight imagery that helps listings sell faster.";

export const metadata: Metadata = {
  title: "Portfolio",
  description,
  openGraph: {
    title: "Portfolio",
    description,
    images: [IMG.luxuryExteriorDusk],
  },
};

/** Headline numbers pulled from the shared stats pool. */
const headerStats = [stats[0], stats[2], stats[4]];

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ])
        )}
      />

      {/* Page header */}
      <section className="bg-cream pt-28 pb-10 sm:pt-36">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Portfolio</p>
            <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
              Photography that sells the story
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Recent campaigns from across Melbourne — Toorak twilights,
              leafy family streets, inner-city apartments. Every frame is
              composed for buyers and hand-finished before delivery.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone">
              <span>
                <strong className="font-semibold text-ink">{portfolio.length}</strong>{" "}
                selected images ·{" "}
                <strong className="font-semibold text-ink">
                  {portfolioCategories.length}
                </strong>{" "}
                categories
              </span>
              {headerStats.map((s) => (
                <span key={s.label} className="flex items-center gap-x-4">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-gold/60" />
                  <span>
                    <strong className="font-semibold text-ink">
                      {s.value.toLocaleString("en-AU")}
                      {s.suffix}
                    </strong>{" "}
                    {s.label.toLowerCase()}
                  </span>
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Filterable masonry gallery + lightbox */}
      <section className="bg-cream pb-20 sm:pb-24">
        <Container>
          <PortfolioGallery items={portfolio} />
        </Container>
      </section>

      {/* Slim CTA band */}
      <section className="bg-cream pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="relative grain overflow-hidden rounded-3xl bg-charcoal px-8 py-14 sm:px-14">
              <div className="relative z-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                    Your listing, next
                  </p>
                  <h2 className="display text-balance text-3xl text-cream sm:text-4xl">
                    Like what you see?
                  </h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-cream/70">
                    Book online in under two minutes — photos delivered within
                    24 hours, ready for the portals.
                  </p>
                </div>
                <Button href={hero.primaryCta.href} variant="gold" size="lg">
                  {hero.primaryCta.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
