import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { posts, getPost } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { articleSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(articleSchema(post))}
      />

      {/* ---------- article header ---------- */}
      <section className="bg-cream pt-28 sm:pt-36 pb-12 sm:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone">
                  <li>
                    <Link href="/" className="transition-colors hover:text-ink">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </li>
                  <li>
                    <Link href="/blog" className="transition-colors hover:text-ink">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </li>
                  <li aria-current="page" className="truncate text-ink/70">
                    {post.title}
                  </li>
                </ol>
              </nav>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="display mt-6 text-balance text-4xl sm:text-5xl lg:text-[3.4rem] text-ink">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-stone">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden className="text-line">
                  •
                </span>
                <span>{post.readTime}</span>
              </div>

              <p className="mt-8 text-xl leading-relaxed text-stone">{post.excerpt}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- cover image ---------- */}
      <section className="bg-cream pb-16 sm:pb-20">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                sizes="(max-width: 1280px) 100vw, 1152px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------- article body ---------- */}
      <section className="bg-cream pb-24 sm:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <article>
              {post.sections.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="mt-12 mb-4 text-2xl font-bold text-ink">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="mb-5 text-[1.06rem] leading-[1.8] text-ink/85"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mb-8 mt-2 space-y-3">
                      {section.list.map((item, k) => (
                        <li key={k} className="flex items-start gap-3">
                          <Check
                            className="mt-1 h-5 w-5 shrink-0 text-gold"
                            aria-hidden
                          />
                          <span className="text-[1.06rem] leading-[1.7] text-ink/85">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>

            {/* ---------- end-of-article CTA ---------- */}
            <Reveal className="mt-16">
              <div className="relative grain overflow-hidden rounded-3xl bg-charcoal p-8 sm:p-12">
                <div className="relative">
                  <p className="eyebrow mb-3 !text-gold-soft">Next step</p>
                  <h2 className="display text-balance text-3xl sm:text-4xl text-cream">
                    Put this into practice on your next listing
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-cream/70">
                    Photography, drone, twilight, floor plans and video —
                    delivered within 24 hours, booked online in under two
                    minutes.
                  </p>
                  <div className="mt-8">
                    <Button href="/book" variant="gold" size="lg">
                      Book a Shoot
                      <ArrowUpRight className="h-5 w-5" aria-hidden />
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- keep reading ---------- */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Keep reading</p>
              <h2 className="display text-balance text-3xl sm:text-4xl text-ink">
                More insights for agents
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-ink"
            >
              All articles
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.08} className="h-full">
                <Link
                  href={`/blog/${other.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={other.cover}
                      alt={other.coverAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone">
                      <time dateTime={other.date}>{formatDate(other.date)}</time>
                      <span aria-hidden className="text-line">
                        •
                      </span>
                      <span>{other.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-ink">
                      {other.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-gold">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
