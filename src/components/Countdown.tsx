"use client";

import { useEffect, useState } from "react";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const day = 1000 * 60 * 60 * 24;
  return {
    days: Math.floor(diff / day),
    hours: Math.floor((diff % day) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    done: diff <= 0,
  };
}

/** A live countdown to a fixed date, ticking once a second. */
export default function Countdown({ target, className }: { target: string; className?: string }) {
  const targetMs = new Date(target).getTime();
  const [remaining, setRemaining] = useState(() => getRemaining(targetMs));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className={`grid grid-cols-4 gap-3 sm:gap-6 ${className ?? ""}`} suppressHydrationWarning>
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <span className="block font-display text-4xl tabular-nums text-paper sm:text-6xl lg:text-7xl">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.25em] text-paper/40 sm:text-[10px]">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
