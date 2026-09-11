"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Orb = {
  color: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  opacity?: number;
  /** How far this orb drifts, in px. Varies per orb so they don't move in lockstep. */
  drift?: number;
  /** Seconds for one drift cycle. */
  duration?: number;
};

type AnimatedOrbsProps = {
  orbs: Orb[];
  className?: string;
  /** How strongly the whole field leans toward the cursor, in px. 0 disables. */
  parallax?: number;
};

/**
 * GradientOrbs, but alive — each blob drifts on its own slow independent
 * loop instead of sitting fixed in place, and the whole field leans gently
 * toward the cursor. The stillness was the problem, not a lack of content.
 */
export default function AnimatedOrbs({ orbs, className, parallax = 22 }: AnimatedOrbsProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const field = fieldRef.current;
    if (!field) return;

    const ctx = gsap.context(() => {
      orbRefs.current.forEach((el, i) => {
        if (!el) return;
        const orb = orbs[i];
        const drift = orb.drift ?? 60;
        const duration = orb.duration ?? 14 + i * 3;
        gsap.to(el, {
          x: `random(-${drift}, ${drift})`,
          y: `random(-${drift * 0.6}, ${drift * 0.6})`,
          scale: "random(0.92, 1.12)",
          duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.6,
        });
      });
    }, field);

    if (parallax > 0) {
      const section = field.closest("section, div[data-orb-host]") as HTMLElement | null;
      const host = section ?? field.parentElement;
      const quickX = gsap.quickTo(field, "x", { duration: 1, ease: "power2.out" });
      const quickY = gsap.quickTo(field, "y", { duration: 1, ease: "power2.out" });
      const onMove = (e: PointerEvent) => {
        const rect = (host ?? field).getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        quickX(px * parallax);
        quickY(py * parallax);
      };
      window.addEventListener("pointermove", onMove);
      return () => {
        window.removeEventListener("pointermove", onMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, [orbs, parallax]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      <div ref={fieldRef} className="absolute inset-0 will-change-transform">
        {orbs.map((orb, i) => (
          <div
            key={i}
            ref={(el) => {
              orbRefs.current[i] = el;
            }}
            className="absolute rounded-full blur-3xl will-change-transform"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              bottom: orb.bottom,
              left: orb.left,
              right: orb.right,
              background: orb.color,
              opacity: orb.opacity ?? 0.35,
            }}
          />
        ))}
      </div>
    </div>
  );
}
