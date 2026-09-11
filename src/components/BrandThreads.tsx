"use client";

import Threads from "./vendor/Threads";

/**
 * The React Bits Threads shader, tinted ember — flowing lines standing in
 * for the climb, alive instead of a single static drawn line.
 */
export default function BrandThreads({ className }: { className?: string }) {
  return (
    <Threads
      className={className}
      color={[0.816, 0.008, 0.106]}
      amplitude={1.4}
      distance={0.25}
      enableMouseInteraction
    />
  );
}
