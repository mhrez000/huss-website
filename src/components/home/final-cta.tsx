import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { finalCta, site, IMG } from "@/content/site";

/**
 * Closing conversion band — full-bleed twilight image with a
 * charcoal overlay and a single, unmissable accent CTA.
 */
export function FinalCta() {
  return (
    <section className="relative grain overflow-hidden py-32 sm:py-40">
      <Image
        src={IMG.luxuryExteriorDusk}
        alt="Luxury Melbourne home glowing at twilight"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/75" aria-hidden />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-5 !text-accent-soft">Book in two minutes</p>
            <h2 className="display text-balance text-4xl text-cream sm:text-6xl">
              {finalCta.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
              {finalCta.text}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-col items-center gap-5">
              <Button href={finalCta.cta.href} variant="accent" size="lg">
                {finalCta.cta.label}
              </Button>
              <p className="text-sm text-cream/60">
                or call{" "}
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="font-semibold text-cream underline-offset-4 transition-colors hover:text-accent-soft hover:underline"
                >
                  {site.phoneDisplay}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
