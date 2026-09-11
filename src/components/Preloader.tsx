"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Bold, punch-cut manifesto lines — the same kinetic-typography energy as a
// slammed title card, built from the brand's own words instead of borrowed
// footage.
const LINES = [
  "NO SHORTCUTS.",
  "EARNED, NOT GIVEN.",
  "BUILT IN THE UNSEEN HOURS.",
  "THE CLIMB IS THE POINT.",
  "UNBROKEN.",
];

const LINE_HOLD = 0.42; // seconds each line stays fully visible
const LOGO_HOLD = 900; // ms the wordmark holds before the preloader dismisses

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    if (reduced) {
      // Reflects a media-query check, not state derivable at render time.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHidden(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let tl: gsap.core.Timeline | undefined;

    function begin() {
      const el = document.getElementById("preloader");
      tl = gsap.timeline();

      lineRefs.current.forEach((line) => {
        if (!line || !tl) return;
        tl.fromTo(
          line,
          { opacity: 0, scale: 1.35 },
          { opacity: 1, scale: 1, duration: 0.16, ease: "power3.out" }
        )
          .to(line, { opacity: 1, scale: 1, duration: LINE_HOLD })
          .to(line, { opacity: 0, scale: 0.85, duration: 0.12, ease: "power2.in" });
      });

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0, scale: 1.25 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.2)" }
        );
      }

      const totalMs = tl.duration() * 1000 + LOGO_HOLD;

      timer = setTimeout(() => {
        if (!el) {
          setHidden(true);
          return;
        }
        gsap.to(el, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => setHidden(true),
        });
      }, totalMs);
    }

    begin();

    return () => {
      if (timer) clearTimeout(timer);
      tl?.kill();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      id="preloader"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-paper"
    >
      <div className="relative flex w-full items-center justify-center px-6 text-center">
        {LINES.map((line, i) => (
          <div
            key={line}
            ref={(node) => {
              lineRefs.current[i] = node;
            }}
            className="absolute font-display uppercase leading-[0.9] text-ember opacity-0 text-[11vw] sm:text-6xl"
          >
            {line}
          </div>
        ))}

        <div ref={logoRef} className="absolute opacity-0">
          <span className="block font-mono text-[11px] tracking-[0.35em] text-ink/50">RAAH |</span>
          <span className="font-display text-5xl uppercase leading-none text-ember sm:text-6xl">BAL</span>
        </div>
      </div>
    </div>
  );
}
