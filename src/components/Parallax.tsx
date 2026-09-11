"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scrubs a slow vertical drift on its children as the section scrolls past —
 * makes full-bleed photography feel alive instead of static once revealed.
 */
export default function Parallax({
  children,
  strength = 60,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { yPercent: -strength / 10 },
        {
          yPercent: strength / 10,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [strength]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <div ref={layerRef} className="absolute inset-[-6%]">
        {children}
      </div>
    </div>
  );
}
