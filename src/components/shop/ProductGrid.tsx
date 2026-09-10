import type { Product } from "@/lib/shopify";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  theme = "light",
}: {
  products: Product[];
  theme?: "light" | "dark";
}) {
  if (!products.length) {
    return (
      <p
        className={`py-24 text-center font-mono text-xs uppercase tracking-[0.2em] ${
          theme === "dark" ? "text-paper/40" : "text-ink/40"
        }`}
      >
        No pieces match those filters — yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} theme={theme} />
      ))}
    </div>
  );
}
