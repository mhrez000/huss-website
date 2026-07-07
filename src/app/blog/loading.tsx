import { Container } from "@/components/ui/container";

/** Skeleton state for the blog index while content streams in. */
export default function BlogLoading() {
  return (
    <>
      {/* header skeleton */}
      <section className="bg-cream pt-28 sm:pt-36 pb-16 sm:pb-20">
        <Container>
          <div className="max-w-3xl animate-pulse">
            <div className="h-3 w-24 rounded-full bg-ivory" />
            <div className="mt-6 h-12 w-full max-w-xl rounded-2xl bg-ivory sm:h-14" />
            <div className="mt-4 h-12 w-3/4 rounded-2xl bg-ivory sm:h-14" />
            <div className="mt-8 h-4 w-full max-w-lg rounded-full bg-ivory" />
            <div className="mt-3 h-4 w-2/3 rounded-full bg-ivory" />
          </div>
        </Container>
      </section>

      {/* featured post skeleton */}
      <section className="bg-cream pb-20 sm:pb-24">
        <Container>
          <div className="grid animate-pulse grid-cols-1 overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] lg:grid-cols-2">
            <div className="aspect-[16/10] bg-ivory" />
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="h-3 w-40 rounded-full bg-ivory" />
              <div className="mt-5 flex gap-2">
                <div className="h-6 w-20 rounded-full bg-ivory" />
                <div className="h-6 w-24 rounded-full bg-ivory" />
              </div>
              <div className="mt-6 h-8 w-full rounded-xl bg-ivory" />
              <div className="mt-3 h-8 w-4/5 rounded-xl bg-ivory" />
              <div className="mt-6 h-4 w-full rounded-full bg-ivory" />
              <div className="mt-3 h-4 w-2/3 rounded-full bg-ivory" />
              <div className="mt-8 h-4 w-28 rounded-full bg-ivory" />
            </div>
          </div>
        </Container>
      </section>

      {/* grid skeleton */}
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <div className="h-3 w-28 animate-pulse rounded-full bg-cream" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)]"
              >
                <div className="aspect-[16/10] bg-ivory" />
                <div className="p-6 sm:p-7">
                  <div className="h-3 w-36 rounded-full bg-ivory" />
                  <div className="mt-4 h-5 w-full rounded-lg bg-ivory" />
                  <div className="mt-2 h-5 w-3/4 rounded-lg bg-ivory" />
                  <div className="mt-4 h-3.5 w-full rounded-full bg-ivory" />
                  <div className="mt-2 h-3.5 w-5/6 rounded-full bg-ivory" />
                  <div className="mt-6 h-4 w-28 rounded-full bg-ivory" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
