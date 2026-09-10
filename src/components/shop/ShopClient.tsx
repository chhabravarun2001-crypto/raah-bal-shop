"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/shopify";
import ProductGrid from "./ProductGrid";

type SortKey = "featured" | "price-asc" | "price-desc";
const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function ShopClient({ products }: { products: Product[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = products;
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (size) list = list.filter((p) => p.variants.some((v) => v.size === size && v.availableForSale));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price.amount - b.price.amount);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price.amount - a.price.amount);
    return list;
  }, [products, category, size, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-ink/10 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              data-hover
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                category === c ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/60 hover:border-ink/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-1.5">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                data-hover
                aria-pressed={size === s}
                onClick={() => setSize(size === s ? null : s)}
                className={`h-8 w-8 rounded-full border font-mono text-[10px] transition-colors ${
                  size === s ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/60 hover:border-ink/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            data-hover
            aria-label="Sort products"
            className="border-b border-ink/20 bg-transparent py-2 font-mono text-[10px] uppercase tracking-[0.15em] outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="pt-12">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
