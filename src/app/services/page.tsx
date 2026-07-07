import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/content/site";
import { aud, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential HDR photography, drone, twilight, floor plans, video, reels, virtual staging and decluttering — every asset a Melbourne listing needs.",
  openGraph: {
    title: "Services",
    description:
      "Residential HDR photography, drone, twilight, floor plans, video, reels, virtual staging and decluttering — every asset a Melbourne listing needs.",
    images: [services[0].heroImage],
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* ---------- header ---------- */}
      <section className="bg-cream pt-28 pb-16 sm:pt-36 sm:pb-24">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Services</p>
            <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
              One shoot. Every asset your campaign needs.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Photography, drone, twilight, floor plans, video, reels and
              staging — planned in one visit, edited by hand, and delivered
              within 24 hours.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------- alternating editorial service list ---------- */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <div className="space-y-24 sm:space-y-32">
            {services.map((service, i) => {
              const flipped = i % 2 === 1;
              return (
                <Reveal key={service.slug}>
                  <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* image */}
                    <Link
                      href={`/services/${service.slug}`}
                      aria-label={`Explore ${service.title}`}
                      className={cn(
                        "group relative block aspect-[4/3] overflow-hidden rounded-3xl",
                        flipped && "lg:order-2"
                      )}
                    >
                      <Image
                        src={service.heroImage}
                        alt={service.heroAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* text */}
                    <div className={cn(flipped && "lg:order-1")}>
                      <p className="eyebrow mb-4">{service.eyebrow}</p>
                      <h2 className="display text-balance text-3xl text-ink sm:text-4xl">
                        {service.title}
                      </h2>
                      <p className="mt-5 text-lg leading-relaxed text-stone">
                        {service.blurb}
                      </p>
                      <ul className="mt-7 space-y-3">
                        {service.benefits.slice(0, 3).map((benefit) => (
                          <li
                            key={benefit.title}
                            className="flex items-center gap-3 text-sm font-medium text-ink"
                          >
                            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/10">
                              <Check className="size-3.5 text-accent" aria-hidden />
                            </span>
                            {benefit.title}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-7 text-sm text-stone">
                        <span className="text-base font-semibold text-ink">
                          From {aud(service.priceFrom)}
                        </span>{" "}
                        &middot; {service.priceNote}
                      </p>
                      <Button
                        href={`/services/${service.slug}`}
                        variant="outline"
                        className="mt-8"
                      >
                        Explore {service.navLabel}
                        <ArrowRight className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="relative grain bg-charcoal py-24 sm:py-32">
        <Container className="relative text-center">
          <Reveal>
            <p className="eyebrow mb-4 !text-accent-soft">Ready when you are</p>
            <h2 className="display mx-auto max-w-2xl text-balance text-4xl text-cream sm:text-5xl">
              Not sure which combination your listing needs?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              Book online and tell us about the property — we&apos;ll recommend
              the right services and confirm your time within business hours.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/book" variant="accent" size="lg">
                Book a Shoot
              </Button>
              <Button href="/pricing" variant="outline-light" size="lg">
                View Pricing
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
