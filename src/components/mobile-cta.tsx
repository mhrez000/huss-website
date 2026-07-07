"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

/**
 * Mobile sticky "Book Now" bar — appears after the user scrolls past
 * the hero. Hidden on the booking page itself.
 */
export function MobileCta() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/book") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? false : { y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="flex items-center gap-3 border-t hairline bg-cream/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
            <Button
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              variant="outline"
              size="md"
              aria-label={`Call ${site.name}`}
              className="shrink-0 !px-4"
            >
              <Phone className="size-5" aria-hidden />
            </Button>
            <Button href="/book" variant="gold" size="md" className="flex-1">
              Book a Shoot
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
