"use client";

import type { ComponentType } from "react";
import GlowCursorRaw from "./vendor/GlowCursor";

// The vendored component has no declared prop types (kept as-authored);
// widen it here rather than fight TS's inference of its JS default params.
const GlowCursor = GlowCursorRaw as unknown as ComponentType<Record<string, unknown>>;

/**
 * A brand-tinted cursor trail, fixed over the whole viewport — never blocks
 * clicks (pointer-events:none), disabled on touch devices where there's no
 * cursor to trail.
 */
export default function SiteGlowCursor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[65] hidden sm:block" aria-hidden>
      <GlowCursor
        color="#d0021b"
        secondaryColor="#8a8a86"
        trailLength={36}
        trailWidth={5}
        trailTaper={0.85}
        followSpeed={0.22}
        glowIntensity={1.4}
        glowSpread={0.9}
        hotspot={0.4}
        brightness={1.1}
        opacity={0.85}
        pulseSpeed={0.8}
        idleFade
        idleTimeout={600}
        fadeDuration={700}
        blendMode="screen"
      />
    </div>
  );
}
