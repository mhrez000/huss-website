import { stats, trustedBy } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * Trusted-by marquee + stats band. Pure CSS marquee (.animate-marquee),
 * so the whole section stays a Server Component — Counter and Reveal
 * are already small client islands.
 */
export function TrustedBy() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <p className="text-center text-sm font-medium tracking-wide text-stone">
          Trusted by Melbourne&apos;s leading agencies
        </p>
      </Container>

      {/* Seamless wordmark marquee — duplicated list, pauses on hover or keyboard focus */}
      <div
        role="marquee"
        tabIndex={0}
        aria-label="Agencies that trust HussMedia"
        className="group relative mt-8 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent sm:w-32"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent sm:w-32"
          aria-hidden
        />
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {[...trustedBy, ...trustedBy].map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={i >= trustedBy.length || undefined}
              className="whitespace-nowrap px-7 text-base font-semibold tracking-wide text-stone/70 sm:px-10 sm:text-lg"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Stats band */}
      <Container>
        <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t hairline pt-12 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="text-center">
              <p className="display text-3xl text-ink sm:text-4xl">
                <Counter value={stat.value} decimals={stat.decimals ?? 0} />
                <span className="text-gold">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-sm text-stone">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
