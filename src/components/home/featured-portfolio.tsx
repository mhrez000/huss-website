import Image from "next/image";
import { portfolio, type PortfolioItem } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Curated selection for the homepage — a deliberate mix of
 * categories and aspect ratios so the masonry feels editorial,
 * not uniform. Order matters: CSS columns fill top-to-bottom.
 */
const FEATURED_IDS = ["p1", "p4", "p3", "p9", "p5", "p6", "p11", "p13"];

const ASPECT: Record<PortfolioItem["aspect"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

const featured = FEATURED_IDS.map((id) =>
  portfolio.find((item) => item.id === id)
).filter((item): item is PortfolioItem => item !== undefined);

export function FeaturedPortfolio() {
  return (
    <section className="relative grain bg-charcoal py-24 sm:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Featured work"
          heading="Homes we've helped sell"
          intro="A small selection from recent Melbourne campaigns — twilight heroes, aerial context and interiors that turn scrolling buyers into booked inspections."
        />

        <RevealGroup
          className="mt-14 columns-2 gap-4 [&>*]:mb-4 lg:mt-16 lg:columns-3"
          stagger={0.06}
        >
          {featured.map((item) => (
            <RevealItem key={item.id} className="break-inside-avoid">
              <figure
                className={cn(
                  "group relative overflow-hidden rounded-2xl",
                  ASPECT[item.aspect]
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                {/* Hover overlay — category + location */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-cream">
                    {item.category}
                  </p>
                  <p className="mt-0.5 text-xs tracking-wide text-cream/70">
                    {item.location}
                  </p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 text-center">
          <Button href="/portfolio" variant="light" size="lg">
            View full portfolio
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
