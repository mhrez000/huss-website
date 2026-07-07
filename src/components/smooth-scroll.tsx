"use client";

import { ReactLenis } from "lenis/react";

/** Site-wide buttery smooth scrolling (respects reduced motion via CSS). */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
