"use client";

import type { ComponentType } from "react";
import ParticleTextRaw from "./vendor/ParticleText";

// The vendored component has no declared prop types (kept as-authored);
// widen it here rather than fight TS's inference of its JS default params.
const ParticleText = ParticleTextRaw as unknown as ComponentType<Record<string, unknown>>;

/**
 * The React Bits ParticleText, tuned for the paper background — ink base,
 * ember highlight, so it reads clearly instead of relying on the library's
 * light-on-dark default.
 */
export default function BrandParticleText({
  text,
  className,
  fontSize,
  particleSize = 2,
  color = "#0a0a0a",
  highlightColor = "#d0021b",
}: {
  text: string;
  className?: string;
  fontSize?: string | number;
  particleSize?: number;
  /** Base particle colour — pick one that reads against the section's own background. */
  color?: string;
  highlightColor?: string;
}) {
  return (
    <ParticleText
      className={`font-display ${className ?? ""}`.trim()}
      text={text}
      particleSize={particleSize}
      density={2}
      color={color}
      highlightColor={highlightColor}
      scatter={70}
      gatherDuration={1400}
      stagger={320}
      pointerRepel={26}
      repelRadius={90}
      idleDrift={0.5}
      trigger="mount"
      fontSize={fontSize ?? "clamp(1.5rem, 5vw, 3rem)"}
      fontWeight={700}
      fontFamily="inherit"
      glow
    />
  );
}
