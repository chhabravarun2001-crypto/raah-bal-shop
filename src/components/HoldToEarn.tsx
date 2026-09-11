"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const HOLD_MS = 1800;
const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * "Earned, not given" made literal — the reveal only happens if you actually
 * hold, for the full duration, no shortcuts. Let go early and it resets.
 */
export default function HoldToEarn() {
  const [state, setState] = useState<"idle" | "holding" | "earned">("idle");
  const ringRef = useRef<SVGCircleElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  function start() {
    if (state === "earned") return;
    setState("holding");

    if (prefersReducedMotion()) {
      setState("earned");
      return;
    }

    const ring = ringRef.current;
    if (!ring) return;

    tweenRef.current?.kill();
    tweenRef.current = gsap.fromTo(
      ring,
      { strokeDashoffset: CIRCUMFERENCE },
      {
        strokeDashoffset: 0,
        duration: HOLD_MS / 1000,
        ease: "none",
        onComplete: () => setState("earned"),
      }
    );
  }

  function cancel() {
    if (state !== "holding") return;
    setState("idle");
    tweenRef.current?.kill();
    if (ringRef.current) {
      gsap.to(ringRef.current, { strokeDashoffset: CIRCUMFERENCE, duration: 0.4, ease: "power2.out" });
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <button
        type="button"
        data-hover
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        disabled={state === "earned"}
        aria-label={state === "earned" ? "Earned" : "Press and hold to earn it"}
        className="group relative flex h-32 w-32 items-center justify-center rounded-full outline-none"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="2" />
          <circle
            ref={ringRef}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="var(--color-ember)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={state === "earned" ? 0 : CIRCUMFERENCE}
          />
        </svg>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
            state === "earned" ? "text-ember" : "text-ink/60 group-hover:text-ink"
          }`}
        >
          {state === "earned" ? "Earned" : state === "holding" ? "Hold…" : "Hold to earn it"}
        </span>
      </button>

      <p className="min-h-[1.5em] font-display text-lg uppercase text-ink sm:text-xl">
        {state === "earned" ? "Strength, earned." : "No shortcuts through this one either."}
      </p>
    </div>
  );
}
