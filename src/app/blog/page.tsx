import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { posts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Marketing intelligence for real estate agents — photography, portals, vendor psychology and campaign strategy from HussMedia in Melbourne.",
  openGraph: {
    title: "Blog",
    description:
      "Marketing intelligence for real estate agents — photography, portals, vendor psychology and campaign strategy from HussMedia in Melbourne.",
    images: [posts[0]?.cover ?? "/hero-poster.jpg"],
  },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ---------- header ---------- */}
      <section className="bg-cream pt-28 sm:pt-36 pb-16 sm:pb-20">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">Insights</p>
            <h1 className="display text-balance text-4xl sm:text-5xl lg:text-6xl text-ink">
              Marketing intelligence for agents
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              Practical, no-fluff articles on photography, portals, vendor
              psychology and campaign strategy — written for the way Australian
              agents actually sell.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------- featured post ---------- */}
      {featured && (
        <section className="bg-cream pb-20 sm:pb-24">
          <Container>
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={featured.cover}
                    alt={featured.coverAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone">
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                    <span aria-hidden className="text-line">
                      •
                    </span>
                    <span>{featured.readTime}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="display mt-5 text-balance text-2xl sm:text-3xl lg:text-[2.2rem] text-ink">
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-stone">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ---------- post grid ---------- */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <Reveal>
            <p className="eyebrow mb-10">All articles</p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((post) => (
              <RevealItem key={post.slug} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden className="text-line">
                        •
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="mt-3 text-lg font-bold leading-snug text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-gold">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="relative grain bg-charcoal py-24 sm:py-32">
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 !text-gold-soft">Put it into practice</p>
            <h2 className="display text-balance text-4xl sm:text-5xl text-cream">
              Great marketing starts with great media
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">
              Every strategy on this blog works better with photography buyers
              can&apos;t scroll past. Book your next shoot in under two minutes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/book" variant="gold" size="lg">
                Book a Shoot
                <ArrowUpRight className="h-5 w-5" aria-hidden />
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
