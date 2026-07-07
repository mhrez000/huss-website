import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream pt-24">
      <Container className="py-24 text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="display mx-auto max-w-2xl text-balance text-5xl sm:text-6xl">
          This page has been archived
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-stone">
          The page you&apos;re looking for doesn&apos;t exist — but your next
          listing still deserves great photography.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
          <Button href="/book" variant="accent" size="lg">
            Book a Shoot
          </Button>
        </div>
      </Container>
    </section>
  );
}
