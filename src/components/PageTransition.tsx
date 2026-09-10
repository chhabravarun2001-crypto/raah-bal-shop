"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Logo from "./Logo";

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    const el = overlayRef.current;
    const mark = markRef.current;
    if (!el) return;

    if (isFirst.current) {
      isFirst.current = false;
      gsap.set(el, { scaleY: 0 });
      return;
    }

    if (prefersReducedMotion()) return;

    gsap.set(el, { scaleY: 1, transformOrigin: "bottom" });

    const tl = gsap.timeline();
    if (mark) {
      gsap.set(mark, { opacity: 1 });
      tl.to(mark, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.15);
    }
    tl.to(
      el,
      {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.05,
      },
      0.05
    );
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
      style={{ background: "linear-gradient(120deg, var(--color-ember), var(--color-gold))" }}
      aria-hidden
    >
      <div ref={markRef} className="opacity-0">
        <Logo variant="paper" className="text-2xl" />
      </div>
    </div>
  );
}
