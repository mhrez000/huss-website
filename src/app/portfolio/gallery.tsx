"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import {
  portfolioCategories,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/content/site";
import { cn } from "@/lib/utils";

type Filter = "All" | PortfolioCategory;

const ASPECT: Record<PortfolioItem["aspect"], string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const tileRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const openedFromId = useRef<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const filters = useMemo<Filter[]>(() => ["All", ...portfolioCategories], []);

  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [filter, items]
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>();
    map.set("All", items.length);
    for (const c of portfolioCategories) {
      map.set(c, items.filter((i) => i.category === c).length);
    }
    return map;
  }, [items]);

  const isOpen = active !== null;
  const current = active !== null ? filtered[active] : null;

  const openLightbox = (index: number) => {
    const item = filtered[index];
    if (!item) return;
    openedFromId.current = item.id;
    setActive(index);
  };

  const closeLightbox = useCallback(() => {
    setActive(null);
    const id = openedFromId.current;
    if (id) {
      // Return focus to the tile that launched the lightbox.
      requestAnimationFrame(() => tileRefs.current.get(id)?.focus());
    }
  }, []);

  const next = useCallback(() => {
    setActive((a) => (a === null ? a : (a + 1) % filtered.length));
  }, [filtered.length]);

  const prev = useCallback(() => {
    setActive((a) => (a === null ? a : (a - 1 + filtered.length) % filtered.length));
  }, [filtered.length]);

  // Keyboard controls while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLightbox, next, prev]);

  // Lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Move focus into the dialog on open.
  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  return (
    <div>
      {/* Filter pills */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter portfolio by category"
      >
        {filters.map((f) => {
          const isActive = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-all duration-300",
                isActive
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-transparent text-stone hover:border-ink hover:text-ink"
              )}
            >
              {f}
              <span
                className={cn(
                  "text-xs tabular-nums",
                  isActive ? "text-cream/60" : "text-stone/60"
                )}
              >
                {counts.get(f) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      <motion.div layout className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence initial={false}>
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 break-inside-avoid"
            >
              <button
                type="button"
                ref={(el) => {
                  if (el) tileRefs.current.set(item.id, el);
                  else tileRefs.current.delete(item.id);
                }}
                onClick={() => openLightbox(index)}
                aria-label={`${item.alt} — view full screen`}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-2xl",
                  ASPECT[item.aspect]
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <span className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <span className="text-left">
                      <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-soft">
                        {item.category}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-cream">
                        {item.location}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-cream backdrop-blur-sm"
                    >
                      <Maximize2 className="size-4" />
                    </span>
                  </span>
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {active !== null && current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current.alt} — image ${active + 1} of ${filtered.length}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-charcoal/95 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Top bar: counter + close */}
            <div className="flex items-center justify-between px-5 pt-5 sm:px-8">
              <p className="text-sm font-medium tabular-nums text-cream/70">
                {active + 1} / {filtered.length}
              </p>
              <button
                type="button"
                ref={closeBtnRef}
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                aria-label="Close gallery"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-cream transition-colors duration-300 hover:bg-white/20"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Image + caption */}
            <motion.figure
              key={current.id}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-4 pb-6 sm:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex-1">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="pt-5 text-center">
                <p className="text-sm font-medium text-cream">{current.alt}</p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
                  {current.location} · {current.category}
                </p>
              </figcaption>
            </motion.figure>

            {/* Prev / next */}
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream transition-colors duration-300 hover:bg-white/20 sm:left-6 sm:size-12"
                >
                  <ChevronLeft className="size-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream transition-colors duration-300 hover:bg-white/20 sm:right-6 sm:size-12"
                >
                  <ChevronRight className="size-6" aria-hidden />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
