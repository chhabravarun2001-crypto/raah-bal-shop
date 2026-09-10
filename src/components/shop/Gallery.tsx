"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/shopify";

export default function Gallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <div className="flex shrink-0 gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onClick={() => setActive(i)}
            data-hover
            aria-label={`Show image ${i + 1}`}
            className={`relative h-20 w-16 shrink-0 overflow-hidden bg-bone transition-opacity ${
              active === i ? "opacity-100 ring-1 ring-ink" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img.url}
              alt={img.altText}
              fill
              sizes="64px"
              className={`object-cover ${active === i ? "" : "grayscale contrast-125"}`}
            />
          </button>
        ))}
      </div>

      <div className="card-frame relative aspect-[4/5] flex-1 overflow-hidden bg-bone">
        {current && (
          <Image
            key={current.url}
            src={current.url}
            alt={current.altText}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            priority
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
