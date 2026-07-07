"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Clock, Pause, Play, Star } from "lucide-react";
import { hero, heroMedia, site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const parent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoPaused, setVideoPaused] = useState(false);
  const reduce = useReducedMotion();

  // Subtle parallax: the video drifts slower than the scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setVideoPaused(false);
    } else {
      video.pause();
      setVideoPaused(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center overflow-hidden bg-charcoal"
    >
      {/* Background — static poster under reduced motion (WCAG 2.2.2),
          otherwise autoplaying video with parallax drift */}
      {reduce ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={heroMedia.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/25" />
        </div>
      ) : (
        <motion.div
          style={{ y: videoY }}
          className="absolute inset-0 will-change-transform"
          aria-hidden
        >
          <video
            ref={videoRef}
            src={heroMedia.video}
            poster={heroMedia.poster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/25" />
        </motion.div>
      )}

      {/* Top-edge scrim so nav links stay legible over bright video frames */}
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-charcoal/60 to-transparent"
        aria-hidden
      />

      {/* Content */}
      <Container className="relative z-10 py-32 sm:py-36">
        <motion.div
          variants={parent}
          initial={reduce ? "visible" : "hidden"}
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft"
          >
            Melbourne real estate photography
          </motion.p>

          <motion.h1
            variants={item}
            className="display mt-6 text-balance text-5xl text-white sm:text-6xl lg:text-7xl"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button href={hero.primaryCta.href} variant="accent" size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline-light" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          {/* Trust chips */}
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm">
              <Star className="size-3.5 fill-accent-soft text-accent-soft" aria-hidden />
              {site.googleRating.toFixed(1)} Google &mdash; {site.googleReviewCount} reviews
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-sm">
              <Clock className="size-3.5 text-accent-soft" aria-hidden />
              24hr delivery
            </span>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <span className="block h-12 w-px overflow-hidden bg-white/15">
          <motion.span
            className="block h-full w-full bg-accent-soft"
            animate={reduce ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>

      {/* Pause/play control for the background video (WCAG 2.2.2) */}
      {!reduce && (
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={videoPaused ? "Play background video" : "Pause background video"}
          className="absolute bottom-7 right-5 z-20 grid size-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-8"
        >
          {videoPaused ? (
            <Play className="size-4" aria-hidden />
          ) : (
            <Pause className="size-4" aria-hidden />
          )}
        </button>
      )}
    </section>
  );
}
