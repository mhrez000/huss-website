"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { site, testimonials } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rated ${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className={cn("size-4 fill-gold-soft text-gold-soft", className)}
          aria-hidden
        />
      ))}
    </div>
  );
}

/**
 * Agent testimonials — dark editorial band with a horizontal
 * snap-scroll carousel. Drag/swipe natively; arrow buttons on
 * pointer devices.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    updateArrows();
    el?.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : 444;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="relative grain bg-charcoal py-24 sm:py-32">
      <Container className="relative">
        {/* Header row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="Agent stories"
            heading="Trusted by the agents who sell Melbourne"
          />

          <Reveal delay={0.1} className="flex shrink-0 items-center gap-5">
            {/* Google rating badge */}
            <div className="flex items-center gap-3 rounded-full border border-line-dark bg-white/5 px-4 py-2">
              <span className="text-lg font-extrabold text-gold-soft" aria-hidden>
                G
              </span>
              <span className="text-sm font-bold text-cream">
                {site.googleRating.toFixed(1)}
              </span>
              <Stars className="size-3.5" />
              <span className="whitespace-nowrap text-sm text-cream/60">
                {site.googleReviewCount} reviews
              </span>
            </div>

            {/* Arrows — pointer devices only; swipe on touch */}
            <div className="hidden gap-3 [@media(pointer:fine)]:flex">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                aria-label="Previous testimonials"
                className="grid size-11 place-items-center rounded-full border border-line-dark text-cream transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                aria-label="Next testimonials"
                className="grid size-11 place-items-center rounded-full border border-line-dark text-cream transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Carousel track */}
        <Reveal delay={0.15}>
          <div
            ref={trackRef}
            role="region"
            aria-label="Agent testimonials"
            className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
          >
            {testimonials.map((t) => (
              <article
                key={t.name}
                data-card
                className="relative flex w-[85vw] shrink-0 snap-start flex-col rounded-3xl border border-line-dark bg-coal p-8 sm:w-[420px]"
              >
                <Quote
                  className="absolute right-8 top-8 size-14 rotate-180 text-cream/[0.05]"
                  aria-hidden
                />
                <Stars count={t.rating} />
                <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-cream/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-8 flex items-center gap-4">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={t.avatar}
                      alt={`Portrait of ${t.name}`}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-cream">{t.name}</p>
                    <p className="text-sm text-cream/50">
                      {t.role}, {t.agency}
                    </p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
