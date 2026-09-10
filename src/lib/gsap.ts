"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Web fonts (display: swap) and late-loading images can reflow the page
  // after ScrollTrigger has already measured trigger positions, leaving
  // below-the-fold reveals stuck at their pre-animation state because their
  // trigger point was already scrolled past. Re-measure once fonts and the
  // full page (images included) have actually settled.
  const refresh = () => ScrollTrigger.refresh();

  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => {});
  }

  if (document.readyState === "complete") {
    refresh();
  } else {
    window.addEventListener("load", refresh, { once: true });
  }
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
