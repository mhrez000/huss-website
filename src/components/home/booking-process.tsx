"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { bookingProcess } from "@/content/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export function BookingProcess() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Line "draws" left-to-right as the timeline scrolls into view.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.9", "start 0.35"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={bookingProcess.eyebrow}
          heading={bookingProcess.heading}
          align="center"
        />

        <div ref={timelineRef} className="relative mt-16 lg:mt-20">
          {/* Connecting line — desktop only, drawn on scroll */}
          <div
            className="absolute inset-x-0 top-1.5 hidden h-px bg-line lg:block"
            aria-hidden
          />
          <motion.div
            style={reduce ? undefined : { scaleX }}
            className="absolute inset-x-0 top-1.5 hidden h-px origin-left bg-gold lg:block"
            aria-hidden
          />

          <RevealGroup
            className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8"
            stagger={0.12}
          >
            {bookingProcess.steps.map((step) => (
              <RevealItem key={step.num}>
                {/* Timeline node — sits on the connecting line */}
                <span
                  className="relative z-10 mb-8 hidden size-3 rounded-full border-2 border-gold bg-cream lg:block"
                  aria-hidden
                />
                <span
                  className="display block text-7xl font-extrabold text-line select-none"
                  aria-hidden
                >
                  {step.num}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-stone">{step.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-16 text-center lg:mt-20">
          <Button href="/book" variant="gold" size="lg">
            Book online now
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
