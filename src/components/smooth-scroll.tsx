"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Site-wide buttery smooth scrolling.
 * Disabled entirely when the user prefers reduced motion — we render
 * children without Lenis so native (instant) scrolling is used.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
