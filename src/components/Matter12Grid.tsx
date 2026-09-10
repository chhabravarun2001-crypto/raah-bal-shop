"use client";

import { useState } from "react";

// The twelve reference systems the collection researches — touch one to see
// what it stands for. Stage one (Clock) stays lit even at rest, matching the
// "one stage revealed" device used across the site.
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

export default function Matter12Grid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
      {STAGES.map((s, i) => {
        const isOpen = active === i;
        const isFirst = i === 0;
        return (
          <button
            key={s.word}
            type="button"
            data-hover
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive((a) => (a === i ? null : a))}
            onFocus={() => setActive(i)}
            onBlur={() => setActive((a) => (a === i ? null : a))}
            onClick={() => setActive((a) => (a === i ? null : i))}
            className={`group relative flex aspect-square flex-col items-center justify-center overflow-hidden border p-2 text-center transition-colors duration-300 ${
              isOpen ? "border-ember bg-ink" : isFirst ? "border-ember bg-transparent" : "border-ink/10 bg-transparent hover:border-ink/30"
            }`}
          >
            <span
              className={`font-display text-2xl transition-opacity duration-300 sm:text-3xl ${
                isOpen ? "opacity-0" : "opacity-100"
              } ${isFirst ? "text-ember" : "text-ink/25"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`absolute inset-0 flex flex-col items-center justify-center gap-1 px-2 text-center transition-all duration-300 ${
                isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ember">{s.word}</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-paper/70">{s.meta}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
