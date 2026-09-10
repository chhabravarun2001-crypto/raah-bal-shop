"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+";

/**
 * The headline assembles itself out of noise instead of sliding into place —
 * "earned, not given" applied to the reveal itself, not just the copy.
 */
export default function ScrambleText({
  text,
  className,
  delay = 0,
  duration = 1.1,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }

    el.textContent = text;
    const chars = text.split("");
    const progress = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress,
        { value: 0 },
        {
          value: 1,
          duration,
          delay,
          ease: "power1.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            const revealed = Math.floor(progress.value * chars.length);
            el.textContent = chars
              .map((ch, i) => {
                if (ch === " " || i < revealed) return ch;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join("");
          },
          onComplete: () => {
            el.textContent = text;
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, delay, duration]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
