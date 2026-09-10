"use client";

import Image from "next/image";
import { useState } from "react";
import type { GarmentHotspot, ProductImage } from "@/lib/shopify";

/**
 * A numbered-hotspot explorer over the product photo — no macro photography
 * exists yet, so "zooming into a detail" is simulated by scaling the same
 * image toward that hotspot's coordinates. Swap in real macro shots later
 * without touching this component.
 */
export default function GarmentAnatomy({
  image,
  hotspots,
}: {
  image: ProductImage;
  hotspots: GarmentHotspot[];
}) {
  const [active, setActive] = useState(0);
  const spot = hotspots[active];
  if (!spot) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
      <div className="relative aspect-[4/5] overflow-hidden bg-bone">
        <Image
          src={image.url}
          alt={image.altText}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-all duration-700 ease-out"
          style={{ transform: "scale(1.6)", transformOrigin: `${spot.x}% ${spot.y}%` }}
        />

        <div className="absolute inset-0">
          {hotspots.map((h, i) => (
            <button
              key={h.number}
              type="button"
              onClick={() => setActive(i)}
              data-hover
              aria-label={`View detail ${h.number}: ${h.label}`}
              aria-pressed={i === active}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[10px] transition-colors ${
                  i === active
                    ? "border-ember bg-ember text-paper"
                    : "border-ink/30 bg-paper/85 text-ink backdrop-blur hover:border-ink"
                }`}
              >
                {h.number}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">Garment Anatomy</p>
        <h3 className="mt-3 font-display text-2xl uppercase leading-[1.05] sm:text-3xl">
          Every part, built on purpose.
        </h3>

        <div className="mt-8 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
          {hotspots.map((h, i) => (
            <button
              key={h.number}
              type="button"
              onClick={() => setActive(i)}
              data-hover
              aria-expanded={i === active}
              className="flex items-start gap-4 py-4 text-left"
            >
              <span className={`font-mono text-xs ${i === active ? "text-ember" : "text-ink/35"}`}>{h.number}</span>
              <span className="flex-1">
                <span className={`block font-display text-lg uppercase leading-none ${i === active ? "text-ink" : "text-ink/50"}`}>
                  {h.label}
                </span>
                {i === active && (
                  <span className="mt-2 block max-w-sm text-sm leading-relaxed text-ink/65">{h.description}</span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
