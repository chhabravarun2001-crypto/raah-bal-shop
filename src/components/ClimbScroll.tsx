"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const PATH = "M20 150 L100 90 L160 120 L260 40 L340 20";
const END = { x: 340, y: 20 };

/**
 * The summit line draws itself as you scroll past it — the climb happens in
 * step with the reader's own effort, instead of playing once on view. Falls
 * back to the fully-drawn static state when motion is reduced.
 */
export default function ClimbScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const climberRef = useRef<SVGCircleElement>(null);
  const flagRef = useRef<SVGGElement>(null);
  const flagShown = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const climber = climberRef.current;
    const flag = flagRef.current;
    if (!section || !line || !climber || !flag) return;

    if (prefersReducedMotion()) {
      gsap.set(flag, { opacity: 1, scale: 1 });
      climber.setAttribute("cx", String(END.x));
      climber.setAttribute("cy", String(END.y));
      return;
    }

    const length = line.getTotalLength();
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(flag, { opacity: 0, scale: 0.4, transformOrigin: "0% 100%" });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 55%",
      scrub: 0.6,
      onUpdate: (self) => {
        const t = self.progress;
        line.style.strokeDashoffset = String(length * (1 - t));
        const point = line.getPointAtLength(length * t);
        climber.setAttribute("cx", String(point.x));
        climber.setAttribute("cy", String(point.y));

        if (t > 0.92 && !flagShown.current) {
          flagShown.current = true;
          gsap.to(flag, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.4)" });
        } else if (t <= 0.92 && flagShown.current) {
          flagShown.current = false;
          gsap.set(flag, { opacity: 0, scale: 0.4 });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={sectionRef} className="w-full max-w-xl">
      <svg viewBox="0 -20 400 180" className="w-full text-ink/20" aria-hidden>
        <path d={PATH} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 6" strokeLinecap="round" />
        <path ref={lineRef} d={PATH} fill="none" stroke="var(--color-ember)" strokeWidth="1.5" strokeLinecap="round" />
        <circle ref={climberRef} cx="20" cy="150" r="4" fill="var(--color-ember)" />
        <g ref={flagRef} transform={`translate(${END.x}, ${END.y})`}>
          <line x1="0" y1="0" x2="0" y2="-30" stroke="var(--color-ember)" strokeWidth="1.5" />
          <path d="M0,-30 L20,-23 L0,-16 Z" fill="var(--color-ember)" />
        </g>
      </svg>
    </div>
  );
}
