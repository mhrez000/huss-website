import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { services, getService, type Service } from "@/content/site";
import { aud, cn } from "@/lib/utils";
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  jsonLd,
} from "@/lib/schema";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.blurb,
    openGraph: {
      title: service.title,
      description: service.blurb,
      images: [service.heroImage],
    },
  };
}

/** Masonry aspect rhythm for the gallery. */
const GALLERY_ASPECTS = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square"];

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((s): s is Service => Boolean(s))
    .slice(0, 3);

  const schema = serviceSchema(service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(service.faqs))}
      />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(schema)}
        />
      )}

      {/* ---------- breadcrumb + header ---------- */}
      <section className="bg-cream pt-28 pb-20 sm:pt-36 sm:pb-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-stone">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-ink"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-ink">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="eyebrow mb-4">{service.eyebrow}</p>
              <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-[3.4rem]">
                {service.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-stone">
                {service.blurb}
              </p>

              {/* price card */}
              <div className="mt-8 max-w-md rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
                <p className="text-sm text-stone">From</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="display text-4xl text-ink">
                    {aud(service.priceFrom)}
                  </span>
                  <span className="text-sm text-stone">{service.priceNote}</span>
                </p>
                <Button
                  href="/book"
                  variant="gold"
                  className="mt-5 w-full sm:w-auto"
                >
                  Book this service
                </Button>
                <p className="mt-3 text-xs text-stone">
                  Confirmed within business hours
                </p>
              </div>
            </Reveal>

            <Reveal
              delay={0.12}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl"
            >
              <Image
                src={service.heroImage}
                alt={service.heroAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- description ---------- */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-6">The approach</p>
            <div className="space-y-6">
              {service.description.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-lg leading-relaxed text-ink/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- benefits ---------- */}
      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="The benefits"
            heading="Why it works"
            intro="Six reasons agents keep this service on every campaign checklist."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit) => (
              <RevealItem key={benefit.title} className="h-full">
                <div className="h-full rounded-[var(--radius-card)] bg-surface p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                  <span className="grid size-10 place-items-center rounded-full bg-gold/10">
                    <Check className="size-5 text-gold" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">
                    {benefit.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- gallery ---------- */}
      <section className="relative grain bg-charcoal py-24 sm:py-32">
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Portfolio"
            heading="Recent examples"
          />
          <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {service.gallery.map((image, i) => (
              <Reveal
                key={image.src}
                delay={i * 0.05}
                className="mb-5 break-inside-avoid"
              >
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-2xl",
                    GALLERY_ASPECTS[i % GALLERY_ASPECTS.length]
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- FAQs ---------- */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <SectionHeading
              eyebrow="FAQs"
              heading="Questions, answered"
              intro="The details agents ask about most — timing, delivery and how we work on site."
            />
            <Reveal delay={0.1}>
              <Accordion items={service.faqs} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- related services ---------- */}
      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Pairs well with"
            heading="Complete the campaign"
            intro="Most agents combine two or three services in a single visit — one shoot, one delivery, one invoice."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <RevealItem key={item.slug} className="h-full">
                <Link
                  href={`/services/${item.slug}`}
                  className="group block h-full overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.heroImage}
                      alt={item.heroAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">
                      {item.blurb}
                    </p>
                    <p className="mt-4 flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-ink">
                        From {aud(item.priceFrom)}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-gold">
                        View service
                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- final CTA ---------- */}
      <section className="relative grain bg-charcoal py-24 sm:py-32">
        <Container className="relative text-center">
          <Reveal>
            <p className="eyebrow mb-4 !text-gold-soft">Next step</p>
            <h2 className="display mx-auto max-w-2xl text-balance text-4xl text-cream sm:text-5xl">
              Add {service.title.toLowerCase()} to your next campaign
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              From {aud(service.priceFrom)} — book online in under two minutes
              and we&apos;ll confirm your shoot within business hours.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/book" variant="gold" size="lg">
                Book this service
              </Button>
              <Button href="/services" variant="outline-light" size="lg">
                Explore All Services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
