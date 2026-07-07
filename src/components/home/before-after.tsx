"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { beforeAfter } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export function BeforeAfter() {
  const [activeId, setActiveId] = useState(beforeAfter.items[0].id);
  const [pos, setPos] = useState(50);
  const [focused, setFocused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduce = useReducedMotion();

  const active =
    beforeAfter.items.find((item) => item.id === activeId) ??
    beforeAfter.items[0];

  const updateFromClientX = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={beforeAfter.eyebrow}
          heading={beforeAfter.heading}
          intro={beforeAfter.intro}
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Tabs + active copy — left on desktop, below slider on mobile */}
          <Reveal className="order-2 lg:order-1 lg:col-span-4">
            <div
              role="group"
              aria-label="Editing examples"
              className="flex flex-wrap gap-2.5"
            >
              {beforeAfter.items.map((item) => {
                const selected = item.id === active.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveId(item.id)}
                    className={cn(
                      "h-11 rounded-full px-5 text-sm font-semibold transition-all duration-300",
                      selected
                        ? "bg-ink text-cream shadow-[var(--shadow-card)]"
                        : "border border-line bg-surface text-stone hover:border-ink/30 hover:text-ink"
                    )}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 min-h-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="text-2xl font-semibold text-ink">
                    {active.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-stone">
                    {active.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-8 text-xs text-stone">
              Illustrative editing simulation — real before/after pairs coming
              soon.
            </p>
          </Reveal>

          {/* Comparison slider */}
          <Reveal className="order-1 lg:order-2 lg:col-span-8" delay={0.08}>
            <div
              ref={trackRef}
              className="group relative aspect-[16/10] cursor-ew-resize touch-pan-y overflow-hidden rounded-3xl shadow-[var(--shadow-card)] select-none"
              onPointerDown={(e) => {
                if (e.button !== 0 || !e.isPrimary) return;
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                updateFromClientX(e.clientX);
              }}
              onPointerMove={(e) => {
                if (dragging.current) updateFromClientX(e.clientX);
              }}
              onPointerUp={() => {
                dragging.current = false;
              }}
              onPointerCancel={() => {
                dragging.current = false;
              }}
              onLostPointerCapture={() => {
                dragging.current = false;
              }}
            >
              {/* Image stack — crossfades between edit examples */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.45 }}
                >
                  {/* After — the finished HussMedia edit */}
                  <Image
                    src={active.image}
                    alt={`${active.title} — professionally edited property photo`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    draggable={false}
                  />
                  {/* Before — same frame, degraded via CSS, clipped to slider */}
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                    aria-hidden
                  >
                    <Image
                      src={active.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover [filter:saturate(.5)_brightness(.88)_contrast(.9)]"
                      draggable={false}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Before / After chips */}
              <span
                className={cn(
                  "pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-charcoal/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cream backdrop-blur-sm transition-opacity duration-300",
                  pos < 14 && "opacity-0"
                )}
                aria-hidden
              >
                Before
              </span>
              <span
                className={cn(
                  "pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-charcoal/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-cream backdrop-blur-sm transition-opacity duration-300",
                  pos > 86 && "opacity-0"
                )}
                aria-hidden
              >
                After
              </span>

              {/* Divider + drag handle */}
              <div
                className="pointer-events-none absolute inset-y-0 z-10"
                style={{ left: `${pos}%` }}
                aria-hidden
              >
                <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_16px_rgba(0,0,0,0.35)]" />
                <div
                  className={cn(
                    "absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-white shadow-lg ring-4 ring-white/40 transition-[transform,box-shadow] duration-200",
                    focused && "scale-110 ring-white/70"
                  )}
                >
                  <GripVertical className="size-5" aria-hidden />
                </div>
              </div>

              {/* Invisible range input — keyboard & screen-reader control.
                  pointer-events-none so pointer dragging stays with the
                  container; keyboard focus + arrow keys still work. */}
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(pos)}
                aria-label="Comparison slider"
                onChange={(e) => setPos(Number(e.target.value))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-0"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
