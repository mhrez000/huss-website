"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

/**
 * Accessible FAQ accordion. `tone="dark"` for charcoal sections.
 */
export function Accordion({
  items,
  tone = "light",
  className,
}: {
  items: AccordionItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const dark = tone === "dark";

  return (
    <div className={cn("divide-y", dark ? "divide-line-dark" : "divide-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              className={cn(
                "flex w-full items-center justify-between gap-6 py-6 text-left",
                "min-h-14 cursor-pointer"
              )}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-panel-${i}`}
            >
              <span
                className={cn(
                  "text-lg font-semibold",
                  dark ? "text-cream" : "text-ink"
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full border transition-transform duration-300",
                  isOpen && "rotate-45",
                  dark ? "border-line-dark text-accent-soft" : "border-line text-accent"
                )}
                aria-hidden
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-panel-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={cn(
                      "max-w-2xl pb-6 leading-relaxed",
                      dark ? "text-cream/70" : "text-stone"
                    )}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
