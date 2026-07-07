import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/content/site";

/**
 * Homepage FAQ — heading and contact prompt on the left,
 * accordion of the eight most-asked questions on the right.
 */
export function HomeFaq() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Questions"
              heading="Everything agents ask us"
              intro="Straight answers on timing, weather, delivery and payment — so you can plan a campaign with total confidence."
            />
            <Reveal delay={0.15}>
              <div className="mt-10">
                <p className="font-semibold text-ink">More questions?</p>
                <p className="mt-1 text-sm leading-relaxed text-stone">
                  Ask us anything — we usually reply within the hour.
                </p>
                <Button href="/contact" variant="outline" className="mt-5">
                  Get in touch
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
