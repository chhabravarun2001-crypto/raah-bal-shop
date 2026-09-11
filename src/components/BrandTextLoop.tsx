"use client";

import type { ComponentType } from "react";
import TextLoopRaw from "./vendor/TextLoop";

// The vendored component has no declared prop types (kept as-authored);
// widen it here rather than fight TS's inference of its JS default params.
const TextLoop = TextLoopRaw as unknown as ComponentType<Record<string, unknown>>;

/**
 * The manifesto ticker, now riding a wave instead of a flat marquee line.
 */
export default function BrandTextLoop({ text, className }: { text: string; className?: string }) {
  return (
    <TextLoop
      className={className}
      text={text}
      shape="wave"
      speed={45}
      direction="forward"
      separator="°"
      curviness={22}
      fontSize={32}
      fontWeight={700}
      letterSpacing={2}
      uppercase
      color="color-mix(in srgb, var(--color-ink) 20%, transparent)"
      ribbon={false}
      pauseOnHover={false}
    />
  );
}
