"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  accent: boolean;
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * A small galaxy/starfield — plain Canvas2D, not WebGL. After the Dither
 * background's shader pipeline proved unreliable in this environment
 * (compiled and ran with no errors, correct uniforms, yet produced no
 * visible output for reasons that resisted diagnosis), this follows the
 * same architecture as the site's other Canvas2D effects (ParticleText,
 * TextLoop) — those have rendered correctly every time this session.
 * Stars drift with parallax toward the cursor and twinkle independently.
 */
export default function Starfield({
  className,
  density = 0.00016,
  color = "#f5f5f2",
  accentColor = "#d0021b",
  accentRatio = 0.1,
  parallax = 18,
  twinkle = true,
  opacity = 1,
}: {
  className?: string;
  density?: number;
  color?: string;
  accentColor?: string;
  accentRatio?: number;
  parallax?: number;
  twinkle?: boolean;
  /** Overall brightness multiplier, applied on top of each star's own twinkle/depth alpha. */
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    const pointer = { x: 0, y: 0, active: false };
    let raf = 0;
    let destroyed = false;

    const buildStars = () => {
      const count = Math.max(50, Math.floor(width * height * density));
      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: 0.4 + Math.random() * 0.6,
        r: 1.4 + Math.random() * Math.random() * 4.5,
        twinkleSpeed: 0.4 + Math.random() * 1.2,
        twinkleOffset: Math.random() * Math.PI * 2,
        accent: Math.random() < accentRatio,
      }));
    };

    const resize = () => {
      width = Math.max(container.clientWidth, 1);
      height = Math.max(container.clientHeight, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        pointer.active = false;
        return;
      }
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
      pointer.active = true;
    };

    const baseRgb = hexToRgb(color);
    const accentRgb = hexToRgb(accentColor);

    const render = (now: number) => {
      if (destroyed) return;
      ctx.clearRect(0, 0, width, height);
      const t = now * 0.001;

      for (const star of stars) {
        const offsetX = pointer.active ? pointer.x * parallax * star.z : 0;
        const offsetY = pointer.active ? pointer.y * parallax * star.z : 0;
        const x = star.x * width + offsetX;
        const y = star.y * height + offsetY;
        const alpha = twinkle
          ? 0.2 + 0.35 * (0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset))
          : 0.45;
        const rgb = star.accent ? accentRgb : baseRgb;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${(alpha * (0.6 + star.z * 0.4) * opacity).toFixed(3)})`;
        ctx.shadowBlur = (star.accent ? 6 : 3) * star.z;
        ctx.shadowColor = star.accent ? accentColor : color;
        ctx.arc(x, y, star.r * star.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("pointermove", handlePointerMove);
    resize();
    raf = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [density, color, accentColor, accentRatio, parallax, twinkle, opacity]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className ?? ""}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
