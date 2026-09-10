"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type MaskRevealProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  start?: string;
};

export default function MaskReveal({
  lines,
  className,
  lineClassName,
  stagger = 0.08,
  delay = 0,
  start = "top 88%",
}: MaskRevealProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const inners = wrap.querySelectorAll<HTMLElement>("[data-mask-inner]");

    if (prefersReducedMotion()) {
      gsap.set(inners, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.1,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wrap,
            start,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, [stagger, delay, start]);

  return (
    <div ref={wrapRef} className={className}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span data-mask-inner className={`inline-block will-change-transform ${lineClassName ?? ""}`}>
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}
