import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify";
import { formatPrice } from "@/lib/shopify";
import TiltCard from "@/components/TiltCard";
import { IconCrest } from "@/components/icons";

export default function ProductCard({
  product,
  index = 0,
  theme = "light",
}: {
  product: Product;
  index?: number;
  theme?: "light" | "dark";
}) {
  const [front, back] = product.images;
  const isDark = theme === "dark";

  return (
    <Link href={`/products/${product.handle}`} data-cursor-label="View" className="group block">
      <TiltCard max={5} className={`relative aspect-[4/5] overflow-hidden ${isDark ? "bg-paper/10" : "bg-bone"}`}>
        <div className="duotone-wrap absolute inset-0">
          {front && (
            <Image
              src={front.url}
              alt={front.altText}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
              className="duotone-img object-cover transition-opacity duration-500 ease-out"
              priority={index < 2}
            />
          )}
          {back && (
            <Image
              src={back.url}
              alt={back.altText}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
              className="duotone-img object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            />
          )}
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-paper backdrop-blur">
            <IconCrest className="h-3 w-3" />
            {product.badge}
          </span>
        )}
      </TiltCard>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className={`font-display text-sm uppercase tracking-wide sm:text-base ${isDark ? "text-paper" : "text-ink"}`}>
            {product.title}
          </h3>
          <p
            className={`mt-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
              isDark ? "text-paper/45" : "text-ink/45"
            }`}
          >
            {product.subtitle}
          </p>
        </div>
        <p className={`shrink-0 font-mono text-sm ${isDark ? "text-paper/80" : "text-ink/80"}`}>
          {formatPrice(product.price.amount, product.price.currencyCode)}
        </p>
      </div>
    </Link>
  );
}
