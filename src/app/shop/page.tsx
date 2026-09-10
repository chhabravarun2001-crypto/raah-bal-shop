import type { Metadata } from "next";
import { getAllProducts } from "@/lib/shopify";
import ShopClient from "@/components/shop/ShopClient";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Shop — RAAH | BAL",
  description: "The first RAAH | BAL drop. Built like a story, worn like proof.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main data-nav-theme="light" className="bg-paper px-6 pb-24 pt-28 text-ink sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
          RAAH | BAL
        </Reveal>
        <Reveal
          as="h1"
          variant="up"
          delay={0.05}
          className="mt-3 font-display uppercase leading-[0.9] text-[13vw] sm:text-6xl lg:text-7xl"
        >
          Shop the drop
        </Reveal>
        <Reveal variant="up" delay={0.1} className="mt-5 max-w-lg text-ink/60">
          Four pieces. No shortcuts. Everything here was earned before it was sold.
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-[1600px]">
        <ShopClient products={products} />
      </div>
    </main>
  );
}
