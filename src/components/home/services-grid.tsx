import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/content/site";
import { aud, cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

function ServiceCard({ service, feature }: { service: Service; feature: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className={cn("relative", feature ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={service.heroImage}
          alt={service.heroAlt}
          fill
          sizes={
            feature
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Legibility gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent"
          aria-hidden
        />

        {/* Card content */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
          <div className="min-w-0">
            <h3
              className={cn(
                "font-bold text-white",
                feature ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              )}
            >
              {service.title}
            </h3>
            <p className="mt-1.5 line-clamp-1 text-sm text-white/70">{service.blurb}</p>
            <p className="mt-3 text-sm font-semibold text-gold-soft">
              From {aud(service.priceFrom)}
            </p>
          </div>
          <span className="mb-1 grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-gold group-hover:bg-gold">
            <ArrowUpRight
              className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Editorial grid of all eight services: two feature cards, six standard. */
export function ServicesGrid() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          heading="Everything a listing needs to launch"
          intro="Photography, aerials, twilight, plans, film and social — one shoot, one invoice, one consistent look across the whole campaign."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
          {services.map((service, i) => (
            <RevealItem
              key={service.slug}
              className={cn(i < 2 ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-2")}
            >
              <ServiceCard service={service} feature={i < 2} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 text-center">
          <Button href="/services" variant="outline" size="lg">
            Explore all services
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
