import type { CSSProperties } from "react";

type DottedGridProps = {
  className?: string;
  dot?: string;
  size?: number;
};

/**
 * A faint dot-grid texture, paired with AnimatedOrbs' colour blur on top —
 * gives flat sections real depth instead of a single solid tone. Drifts
 * slowly on its own so it never reads as a static, printed pattern.
 */
export default function DottedGrid({ className, dot = "var(--color-ink)", size = 26 }: DottedGridProps) {
  return (
    <div
      className={`dot-drift pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={
        {
          backgroundImage: `radial-gradient(circle, ${dot} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 90%)",
          "--dot-size": `${size}px`,
        } as CSSProperties
      }
      aria-hidden
    />
  );
}
