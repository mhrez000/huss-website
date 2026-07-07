import { whyMatters } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/** Three large stat cards explaining why photography wins campaigns. */
export function WhyMatters() {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={whyMatters.eyebrow}
          heading={whyMatters.heading}
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {whyMatters.cards.map((card) => (
            <RevealItem key={card.title} className="h-full">
              <article className="h-full rounded-3xl bg-surface p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] lg:p-10">
                <p className="display text-5xl text-gold sm:text-6xl">{card.stat}</p>
                <h3 className="mt-6 text-xl font-bold text-ink">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{card.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
