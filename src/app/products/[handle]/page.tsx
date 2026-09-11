import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getAllProducts, getProductByHandle } from "@/lib/shopify";
import Gallery from "@/components/shop/Gallery";
import ProductActions from "@/components/shop/ProductActions";
import ProductGrid from "@/components/shop/ProductGrid";
import AuthTicket from "@/components/shop/AuthTicket";
import SpecSheet from "@/components/shop/SpecSheet";
import GarmentLabel from "@/components/shop/GarmentLabel";
import GarmentAnatomy from "@/components/shop/GarmentAnatomy";
import Reveal from "@/components/Reveal";
import { IconCrest } from "@/components/icons";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "RAAH | BAL" };
  return {
    title: `${product.title} · RAAH | BAL`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all.filter((p) => p.handle !== product.handle).slice(0, 3);
  const [firstSentence, ...restOfDescription] = product.description.split(". ");

  return (
    <main data-nav-theme="light" className="bg-paper px-6 pb-24 pt-28 text-ink sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <nav className="mb-8 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
          <Link href="/shop" data-hover className="link-draw">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink/70">{product.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal variant="fade">
              <Gallery images={product.images} />
            </Reveal>

            {product.images.length > 1 && (
              <Reveal variant="up" delay={0.1} className="mt-4 hidden grid-cols-2 gap-4 sm:grid">
                {product.images.map((img) => (
                  <div key={img.url} className="relative aspect-[4/5] overflow-hidden bg-bone">
                    <Image src={img.url} alt={img.altText} fill sizes="22vw" className="object-cover" />
                  </div>
                ))}
              </Reveal>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start lg:pt-4">
            <GarmentLabel code={product.code} fabric={product.fabric} />

            {product.badge && (
              <span className="mb-4 mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-paper">
                <IconCrest className="h-3 w-3" />
                {product.badge}
              </span>
            )}
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-ember">{product.subtitle}</p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-[0.95] sm:text-5xl">{product.title}</h1>
            <p className="mt-4 font-mono text-lg">
              {formatPrice(product.price.amount, product.price.currencyCode)}
            </p>

            <blockquote className="mt-6 max-w-md border-l-2 border-ember pl-4">
              <p className="text-base leading-relaxed text-ink">{firstSentence}.</p>
              {restOfDescription.length > 0 && (
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{restOfDescription.join(". ")}</p>
              )}
            </blockquote>

            <div className="mt-10">
              <ProductActions product={product} />
            </div>

            <div className="mt-10">
              <SpecSheet
                rows={[
                  { label: "Material", value: product.fabric },
                  { label: "Fit", value: product.fit },
                  { label: "Colour", value: product.colorName, swatch: product.swatch },
                  { label: "Care", value: product.care },
                ]}
              />
            </div>

            <p className="mt-6 text-sm text-ink/60">
              Ships across India in 3–7 working days. Read the{" "}
              <Link href="/policies/shipping-policy" data-hover className="link-draw text-ink">
                shipping policy
              </Link>{" "}
              and{" "}
              <Link href="/policies/refund-policy" data-hover className="link-draw text-ink">
                returns policy
              </Link>
              .
            </p>

            <div className="mt-8">
              <AuthTicket code={`${(product.badge ?? "CORE RUN").toUpperCase()} · ${product.category.toUpperCase()}`} />
            </div>
          </div>
        </div>
      </div>

      {product.hotspots.length > 0 && (
        <div className="mx-auto mt-28 max-w-[1600px] border-t border-ink/10 pt-20">
          <Reveal variant="up">
            <GarmentAnatomy image={product.images[0]} hotspots={product.hotspots} />
          </Reveal>
        </div>
      )}

      {related.length > 0 && (
        <div className="mx-auto mt-28 max-w-[1600px]">
          <Reveal as="h2" variant="up" className="font-display text-2xl uppercase tracking-wide">
            Keep going
          </Reveal>
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </main>
  );
}
