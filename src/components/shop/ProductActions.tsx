"use client";

import { useState, type CSSProperties } from "react";
import Magnetic from "@/components/Magnetic";
import { useCart } from "@/lib/cart/CartContext";
import { formatPrice, type Product } from "@/lib/shopify";

export default function ProductActions({ product }: { product: Product }) {
  const { addLine, openCart } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedVariant = product.variants.find((v) => v.size === size);

  function handleAdd() {
    if (!selectedVariant) {
      setError("Pick a size first.");
      return;
    }
    setError(null);
    addLine({
      variantId: selectedVariant.id,
      productHandle: product.handle,
      title: product.title,
      size: selectedVariant.size,
      price: selectedVariant.price,
      image: product.images[0],
    });
    openCart();
  }

  return (
    <div>
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">Size</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/35">
            {selectedVariant
              ? selectedVariant.quantityAvailable <= 4
                ? `Only ${selectedVariant.quantityAvailable} left`
                : "In stock"
              : "Select a size"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                setSize(v.size);
                setError(null);
              }}
              disabled={!v.availableForSale}
              data-hover
              aria-pressed={size === v.size}
              className={`h-11 min-w-11 border px-3 font-mono text-xs uppercase transition-colors ${
                size === v.size ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/70 hover:border-ink/40"
              } ${!v.availableForSale ? "cursor-not-allowed opacity-30 line-through" : ""}`}
            >
              {v.size}
            </button>
          ))}
        </div>
        {error && <p className="mt-3 font-mono text-[11px] text-ember">{error}</p>}
      </div>

      <Magnetic className="block w-full" strength={0.1}>
        <button
          type="button"
          onClick={handleAdd}
          data-hover
          style={{ "--stamp-color": "var(--color-ember)" } as CSSProperties}
          className="btn-stamp w-full bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper"
        >
          Add to bag · {formatPrice(product.price.amount, product.price.currencyCode)}
        </button>
      </Magnetic>
    </div>
  );
}
