import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * Standard section header: gold eyebrow + large display heading + optional intro.
 * `tone="dark"` for use on charcoal sections.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2
        className={cn(
          "display text-balance text-4xl sm:text-5xl lg:text-[3.4rem]",
          tone === "dark" ? "text-cream" : "text-ink"
        )}
      >
        {heading}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed",
            tone === "dark" ? "text-cream/70" : "text-stone"
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
