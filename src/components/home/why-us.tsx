import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { whyUs } from "@/content/site";

/**
 * "Why LuxeVisuals" — ten quiet, confident reasons in minimal icon tiles.
 * 2 rows of 5 on desktop, 2-up on small screens.
 */
export function WhyUs() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={whyUs.eyebrow}
          heading={whyUs.heading}
          intro="Fast, consistent and easy to book — the things that matter when a campaign is moving."
        />

        <RevealGroup
          className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5"
          stagger={0.05}
        >
          {whyUs.items.map((item) => (
            <RevealItem key={item.title} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                <div className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={item.icon} className="size-5" />
                </div>
                <h3 className="mt-5 font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">
                  {item.text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
