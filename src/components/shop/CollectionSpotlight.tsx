"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Product } from "@/lib/shopify";
import { formatPrice } from "@/lib/shopify";
import { useCart } from "@/lib/cart/CartContext";
import Magnetic from "@/components/Magnetic";
import { IconCrest } from "@/components/icons";

/**
 * A large, gradient-backed showcase for a single piece — warmer and more
 * editorial than the browsing grid, one hero moment per product instead of
 * a wall of thumbnails. Used on collection pages, which hold few enough
 * products that each one can get real presence.
 */
export default function CollectionSpotlight({ product, index }: { product: Product; index: number }) {
  const { addLine, openCart } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const reversed = index % 2 === 1;
  const image = product.images[0];

  function handleAdd() {
    const variant = product.variants.find((v) => v.size === size);
    if (!variant) {
      setError(true);
      return;
    }
    setError(false);
    addLine({
      variantId: variant.id,
      productHandle: product.handle,
      title: product.title,
      size: variant.size,
      price: variant.price,
      image,
    });
    openCart();
  }

  return (
    <div
      className={`relative flex flex-col items-center gap-10 overflow-hidden rounded-[2rem] p-8 sm:gap-16 sm:p-14 ${
        reversed ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
      style={{
        background:
          "radial-gradient(130% 130% at 22% 18%, var(--color-gold) 0%, var(--color-ember) 55%, color-mix(in srgb, var(--color-ember) 55%, black) 100%)",
      }}
    >
      <div className="flex-1">
        {product.code.obj && (
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/50">
            {product.code.obj} · {product.code.drop} · {product.code.season}
          </p>
        )}
        {product.badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-paper">
            <IconCrest className="h-3 w-3" />
            {product.badge}
          </span>
        )}
        <h3 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-paper sm:text-5xl">
          {product.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/80">{product.description}</p>

        <div className="mt-8 flex items-center gap-5">
          <span className="font-mono text-lg text-paper">
            {formatPrice(product.price.amount, product.price.currencyCode)}
          </span>
          <Link
            href={`/products/${product.handle}`}
            data-hover
            className="link-draw font-mono text-xs uppercase tracking-[0.15em] text-paper/80 hover:text-paper"
          >
            Full details →
          </Link>
        </div>

        <div className="mt-6">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70">Choose your size</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={!v.availableForSale}
                onClick={() => {
                  setSize(v.size);
                  setError(false);
                }}
                data-hover
                aria-pressed={size === v.size}
                className={`h-10 w-10 rounded-full border font-mono text-xs transition-colors ${
                  size === v.size ? "border-paper bg-paper text-ink" : "border-paper/50 text-paper hover:border-paper"
                } ${!v.availableForSale ? "cursor-not-allowed opacity-30 line-through" : ""}`}
              >
                {v.size}
              </button>
            ))}
          </div>
          {error && <p className="mt-2 font-mono text-[11px] text-ink">Pick a size first.</p>}
        </div>

        <Magnetic className="mt-8 block w-fit" strength={0.1}>
          <button
            type="button"
            onClick={handleAdd}
            data-hover
            style={{ "--stamp-color": "var(--color-ink)" } as CSSProperties}
            className="btn-stamp rounded-full bg-ink px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-paper"
          >
            Get the look →
          </button>
        </Magnetic>
      </div>

      <Link href={`/products/${product.handle}`} data-cursor-label="View" className="w-full max-w-sm shrink-0">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]">
          {image && (
            <Image
              src={image.url}
              alt={image.altText}
              fill
              sizes="(min-width: 640px) 40vw, 90vw"
              className="object-cover"
            />
          )}
        </div>
      </Link>
    </div>
  );
}
