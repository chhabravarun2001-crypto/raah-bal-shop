"use client";

import { useRef, ReactNode, CSSProperties } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  max?: number;
  lift?: boolean;
  frame?: boolean;
};

export default function TiltCard({
  children,
  className,
  style,
  max = 8,
  lift = true,
  frame = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: px * max,
      rotateX: -py * max,
      y: lift ? -4 : 0,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    el.style.setProperty("--spot-x", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--spot-y", `${(py + 0.5) * 100}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateY: 0, rotateX: 0, y: 0, duration: 0.6, ease: "power3.out" });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${frame ? "card-frame" : ""} will-change-transform ${className ?? ""}`}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}
