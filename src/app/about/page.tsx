import type { Metadata } from "next";
import Image from "next/image";
import { Check, Focus, Handshake, Zap } from "lucide-react";
import { IMG, stats } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Huss — the photographer behind 2,500+ Melbourne listings. Eight years of real estate photography built on light, speed and consistency.",
  openGraph: {
    title: "About",
    description:
      "Meet Huss — the photographer behind 2,500+ Melbourne listings. Eight years of real estate photography built on light, speed and consistency.",
    images: [IMG.interiorLux2],
  },
};

const approach = [
  {
    icon: Focus,
    title: "Precision",
    text: "Straight verticals, balanced light, honest angles. Every frame is composed deliberately and finished by hand — nothing leaves the studio on autopilot.",
  },
  {
    icon: Zap,
    title: "Speed",
    text: "Campaigns move fast, so LuxeVisuals moves faster: confirmed bookings, on-time arrivals and galleries delivered the next morning — 98% of the time by 9am.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    text: "Agents get one contact who knows their brand, their suburbs and their vendors — and who answers the phone when it matters.",
  },
];

const equipment = [
  {
    name: "Full-frame camera bodies",
    text: "Dual professional bodies on every shoot, with backups always in the car.",
  },
  {
    name: "Tilt-shift & wide primes",
    text: "Architecture-grade glass for straight verticals and true-to-life proportions.",
  },
  {
    name: "CASA-licensed drones",
    text: "Aerial platforms flown under full CASA compliance, insurance and airspace approval.",
  },
  {
    name: "Cinema gimbals",
    text: "Stabilised rigs behind every gliding, cinematic walkthrough.",
  },
  {
    name: "Professional lighting",
    text: "Portable flash and continuous light for dark rooms and tricky interiors.",
  },
  {
    name: "Colour-calibrated editing suite",
    text: "Every image finished in-house on calibrated displays — never outsourced.",
  },
];

const behindTheScenes = [
  {
    src: IMG.houseModern2,
    alt: "Modern Melbourne home exterior photographed on location",
  },
  {
    src: IMG.kitchenBright,
    alt: "Bright kitchen interior captured during a daytime shoot",
  },
  {
    src: IMG.twilightHouse,
    alt: "House photographed at dusk during a twilight session",
  },
];

const switchReasons = [
  {
    title: "Consistency across every listing",
    text: "The same premium finish on a two-bedroom unit as on a waterfront estate — vendors notice, and so do their neighbours.",
  },
  {
    title: "Next-morning delivery",
    text: "Galleries land in the inbox before the first coffee, so campaigns launch on schedule every single time.",
  },
  {
    title: "One contact who answers",
    text: "No job boards, no dispatch queue. Message Huss, get an answer — usually within the hour.",
  },
  {
    title: "Editing done in-house",
    text: "Nothing is batch-processed or sent offshore overnight. Every sky, lawn and window is finished by the same eye that composed it.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------- Header + story ---------- */}
      <section className="bg-cream pt-28 pb-24 sm:pt-36 sm:pb-32">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4">About LuxeVisuals</p>
            <h1 className="display text-balance text-4xl text-ink sm:text-5xl lg:text-6xl">
              The photographer Melbourne agents keep on speed dial
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone">
              LuxeVisuals is the studio behind more than 2,500 Melbourne listings —
              founded and run by Huss, a photographer who believes every home
              deserves a magazine cover and every agent deserves a photographer
              they never have to chase.
            </p>
          </Reveal>

          <div className="mt-16 grid items-center gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src={IMG.interiorLux2}
                  alt="Warm, luxurious interior photographed by Huss for a Melbourne listing"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h2 className="display text-3xl text-ink sm:text-4xl">Meet Huss</h2>
              <div className="mt-6 space-y-5 leading-relaxed text-stone">
                <p>
                  Huss picked up his first camera more than eight years ago and
                  never put it down. What began as a favour for one agent —
                  &quot;can you make this townhouse look as good as it feels?&quot;
                  — became LuxeVisuals: a studio that has now photographed over
                  2,500 properties across Melbourne.
                </p>
                <p>
                  Ask him why real estate and not weddings, and the answer is
                  always the same: this is the harder craft. A wedding forgives
                  a soft frame; a listing doesn&apos;t. Every home has to be read
                  in minutes — the light mapped, the angles chosen, the story
                  told in twenty images that all land the first time.
                </p>
                <p>
                  That discipline built the three things the studio runs on:
                  light, speed and consistency. Shoots planned around the sun,
                  galleries delivered the next morning, and a finish so
                  consistent that an agent&apos;s tenth listing looks as
                  considered as their first.
                </p>
                <p>
                  Today LuxeVisuals works with more than 350 agents across the
                  city — but it still operates the way it started: one
                  photographer who answers his own phone, turns up on time and
                  treats every campaign like his own.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Stats strip ---------- */}
      <section className="relative grain bg-charcoal py-20 sm:py-24">
        <Container className="relative">
          <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {stats.slice(0, 4).map((s) => (
              <RevealItem key={s.label} className="text-center">
                <p className="display text-4xl text-cream sm:text-5xl">
                  <Counter value={s.value} decimals={s.decimals ?? 0} />
                  <span className="text-accent-soft">{s.suffix}</span>
                </p>
                <p className="mt-3 text-sm text-cream/60">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- Mission & approach ---------- */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Mission & approach"
            heading="Make every listing impossible to scroll past"
            intro="Three principles shape every shoot, every edit and every delivery."
          />
          <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
            {approach.map((a) => (
              <RevealItem key={a.title} className="flex">
                <div className="flex w-full flex-col rounded-3xl bg-surface p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                  <span className="grid size-12 place-items-center rounded-full bg-ivory text-accent">
                    <a.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-ink">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{a.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- Equipment ---------- */}
      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <SectionHeading
              eyebrow="The kit"
              heading="Serious tools, used quietly"
              intro="Gear never leads the conversation — but the right equipment is why the work looks the way it does."
            />
            <RevealGroup className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {equipment.map((e) => (
                <RevealItem key={e.name} className="border-t border-line pt-5">
                  <p className="font-semibold text-ink">{e.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone">{e.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ---------- Behind the scenes ---------- */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Behind the scenes"
            heading="Where the week goes"
            intro="A few frames from recent shoots across Melbourne — dawn exteriors, midday interiors and the twilight window that ends most days."
          />
          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-3">
            {behindTheScenes.map((img) => (
              <RevealItem key={img.src}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------- Why agents switch ---------- */}
      <section className="bg-cream py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              eyebrow="Why agents switch"
              heading="The difference agents feel in the first week"
              intro="Switching photographers is a leap of faith. These are the four things new agents mention most once they land."
            />
            <RevealGroup className="space-y-8 lg:self-center">
              {switchReasons.map((r) => (
                <RevealItem key={r.title} className="flex items-start gap-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-ivory">
                    <Check className="size-4 text-accent" aria-hidden />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-ink">{r.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone">{r.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="relative grain bg-charcoal py-24 sm:py-32">
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-4 !text-accent-soft">Work with Huss</p>
            <h2 className="display text-balance text-4xl text-cream sm:text-5xl">
              Your next campaign deserves this level of care
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              Book online in under two minutes, or reach out with a brief —
              either way, the reply comes from the photographer himself.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/book" variant="accent" size="lg">
                Book a Shoot
              </Button>
              <Button href="/contact" variant="outline-light" size="lg">
                Get in Touch
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
