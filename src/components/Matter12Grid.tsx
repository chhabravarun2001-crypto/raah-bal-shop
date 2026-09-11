"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

// The twelve reference systems the collection researches — touch one to see
// what it stands for. Stage one (Clock) stays lit even at rest, matching the
// "one stage revealed" device used across the site. Arranged as an orbit
// rather than a grid: twelve systems slowly revolving around a single core,
// the way the number itself actually shows up everywhere — a clock face, a
// zodiac wheel, the houses of a chart.
const STAGES = [
  { word: "Clock", meta: "Time · impermanence" },
  { word: "Months", meta: "Change · renewal" },
  { word: "Zodiac", meta: "Identity · archetype" },
  { word: "Ribs", meta: "Protection · structure" },
  { word: "Semitones", meta: "Rhythm · tension" },
  { word: "Nerves", meta: "Perception · sensation" },
  { word: "Colour", meta: "Mood · expression" },
  { word: "Stages", meta: "Growth · becoming" },
  { word: "Cycles", meta: "Memory · evolution" },
  { word: "Labours", meta: "Struggle · resilience" },
  { word: "Houses", meta: "Self to world" },
  { word: "Matter", meta: "Existence · form" },
];

const ORBIT_RADIUS_PCT = 38;
const ORBIT_PERIOD_MS = 90000;

const baseAngle = (i: number) => (i / STAGES.length) * Math.PI * 2 - Math.PI / 2;
const positionAt = (angle: number) => ({
  left: 50 + ORBIT_RADIUS_PCT * Math.cos(angle),
  top: 50 + ORBIT_RADIUS_PCT * Math.sin(angle),
});

export default function Matter12Grid() {
  const [active, setActive] = useState<number | null>(null);
  const [tooltipBelow, setTooltipBelow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf = 0;
    let destroyed = false;
    const start = performance.now();

    const render = (now: number) => {
      if (destroyed) return;
      const rotation = ((now - start) / ORBIT_PERIOD_MS) * Math.PI * 2;

      STAGES.forEach((_, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;
        const { left, top } = positionAt(baseAngle(i) + rotation);
        el.style.left = `${left}%`;
        el.style.top = `${top}%`;
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleOpen = (i: number) => {
    setActive(i);
    const el = nodeRefs.current[i];
    const container = containerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeY = (elRect.top + elRect.height / 2 - containerRect.top) / containerRect.height;
      setTooltipBelow(relativeY < 0.42);
    }
  };

  const handleClose = (i: number) => setActive((a) => (a === i ? null : a));

  return (
    <div ref={containerRef} className="relative mx-auto aspect-square w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-ember/90 sm:h-20 sm:w-20"
        style={{ boxShadow: "0 0 70px 22px color-mix(in srgb, var(--color-ember) 45%, transparent)" }}
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xs uppercase tracking-[0.2em] text-paper sm:text-sm">
        12
      </span>

      {STAGES.map((s, i) => {
        const { left, top } = positionAt(baseAngle(i));
        const isOpen = active === i;
        const isFirst = i === 0;

        return (
          <button
            key={s.word}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            type="button"
            data-hover
            onMouseEnter={() => handleOpen(i)}
            onMouseLeave={() => handleClose(i)}
            onFocus={() => handleOpen(i)}
            onBlur={() => handleClose(i)}
            onClick={() => (isOpen ? handleClose(i) : handleOpen(i))}
            style={{ left: `${left}%`, top: `${top}%` }}
            className={`group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-ink font-display text-[11px] font-semibold transition-colors duration-300 sm:h-16 sm:w-16 sm:text-base ${
              isOpen
                ? "z-20 scale-110 border-ember bg-ember text-paper"
                : isFirst
                  ? "border-ember text-ember"
                  : "border-paper/30 text-paper/85 hover:border-paper/60 hover:text-paper"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
            <span
              className={`pointer-events-none absolute left-1/2 z-30 w-32 -translate-x-1/2 rounded border border-paper/10 bg-ink/95 px-3 py-2 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-paper shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300 ${
                tooltipBelow ? "top-full mt-3" : "bottom-full mb-3"
              } ${
                isOpen
                  ? "translate-y-0 opacity-100"
                  : tooltipBelow
                    ? "-translate-y-1 opacity-0"
                    : "translate-y-1 opacity-0"
              }`}
            >
              <span className="block tracking-[0.15em] text-ember">{s.word}</span>
              <span className="mt-1 block normal-case tracking-normal text-paper/60">{s.meta}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
