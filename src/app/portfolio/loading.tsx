import { Container } from "@/components/ui/container";

/** Skeleton aspect rhythm mirroring the masonry tiles. */
const TILES = [
  "aspect-[16/10]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-square",
  "aspect-[16/10]",
  "aspect-[3/4]",
  "aspect-square",
];

export default function PortfolioLoading() {
  return (
    <div className="animate-pulse" aria-hidden>
      {/* Header skeleton */}
      <section className="bg-cream pt-28 pb-10 sm:pt-36">
        <Container>
          <div className="h-3 w-24 rounded-full bg-ivory" />
          <div className="mt-5 h-12 w-full max-w-xl rounded-2xl bg-ivory sm:h-14" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full max-w-2xl rounded-full bg-ivory" />
            <div className="h-4 w-3/4 max-w-lg rounded-full bg-ivory" />
          </div>
          <div className="mt-8 h-4 w-full max-w-md rounded-full bg-ivory" />
        </Container>
      </section>

      {/* Filter pills + masonry skeleton */}
      <section className="bg-cream pb-24 sm:pb-32">
        <Container>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-11 w-28 rounded-full bg-ivory" />
            ))}
          </div>
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {TILES.map((aspect, i) => (
              <div
                key={i}
                className={`mb-4 break-inside-avoid rounded-2xl bg-ivory ${aspect}`}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
