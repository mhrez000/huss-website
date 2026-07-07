import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { areas, getArea } from "@/content/areas";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/schema";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return { title: "Area Not Found" };
  return {
    title: `Real Estate Photography ${area.name}`,
    description: area.blurb,
    openGraph: {
      title: `Real Estate Photography ${area.name}`,
      description: area.blurb,
      images: [area.gallery[0].src],
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const [lede, ...restIntro] = area.intro;
  const nearbyAreas = area.nearby
    .map((s) => getArea(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Areas", path: "/areas" },
            { name: area.name, path: `/areas/${area.slug}` },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(area.faqs))}
      />

      {/* Header */}
      <section className="bg-cream pt-28 pb-24 sm:pt-36 sm:pb-32">
        <Container>
          <Reveal className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone">
                <li>
                  <Link href="/" className="transition-colors hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li>
                  <Link href="/areas" className="transition-colors hover:text-ink">
                    Areas
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="font-medium text-ink">
                  {area.name}
                </li>
              </ol>
            </nav>

            <p className="eyebrow mb-4">
              {area.region} &middot; Melbourne
            </p>
            <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
              Real Estate Photography in {area.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">{lede}</p>
          </Reveal>

          {restIntro.length > 0 && (
            <Reveal className="mt-10 max-w-3xl space-y-6" delay={0.1}>
              {restIntro.map((para, i) => (
                <p key={i} className="leading-relaxed text-stone">
                  {para}
                </p>
              ))}
            </Reveal>
          )}
        </Container>
      </section>

      {/* Property styles */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Local expertise"
            heading={`What we shoot in ${area.name}`}
            intro={`Every suburb has its own architecture and its own buyers. These are the ${area.name} campaigns we photograph week in, week out.`}
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {area.propertyStyles.map((style) => (
              <RevealItem key={style.title}>
                <div className="h-full rounded-[var(--radius-card)] bg-surface p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                  <h3 className="text-lg font-bold text-ink">{style.title}</h3>
                  <p className="mt-3 leading-relaxed text-stone">{style.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Gallery + testimonial */}
      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="From our shoots"
            heading={`${area.name} through our lens`}
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {area.gallery.map((img) => (
              <RevealItem key={img.alt}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {area.testimonial && (
            <Reveal className="mt-16">
              <figure className="mx-auto max-w-3xl rounded-3xl bg-ivory p-8 sm:p-12">
                <blockquote className="text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                  &ldquo;{area.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-bold text-ink">{area.testimonial.name}</p>
                  <p className="mt-1 text-sm text-stone">
                    {area.testimonial.role} &middot; {area.testimonial.agency}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Local FAQs */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <SectionHeading
              eyebrow="Local questions"
              heading={`${area.name} FAQs`}
              intro="The questions agents and vendors ask us most about shooting in this pocket of Melbourne."
            />
            <Reveal delay={0.1}>
              <Accordion items={area.faqs} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Nearby areas */}
      {nearbyAreas.length > 0 && (
        <section className="border-t border-line bg-cream py-16 sm:py-20">
          <Container>
            <Reveal>
              <p className="eyebrow mb-6">Nearby areas</p>
              <div className="flex flex-wrap gap-3">
                {nearbyAreas.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/areas/${n.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    {n.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Final CTA */}
      <section className="relative grain bg-charcoal py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
              No travel fees &middot; 24-hour delivery
            </p>
            <h2 className="display text-balance text-4xl text-cream sm:text-5xl">
              Book a {area.name} shoot
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">
              Premium photography, drone, twilight and floor plans — booked
              online in under two minutes, delivered next morning.
            </p>
            <div className="mt-10">
              <Button href="/book" variant="accent" size="lg">
                Book Your {area.name} Shoot
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
