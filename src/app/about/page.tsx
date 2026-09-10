import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MaskReveal from "@/components/MaskReveal";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "About — RAAH | BAL",
  description: "The story behind RAAH | BAL, a contemporary streetwear label built for the miles nobody's watching.",
};

export default function AboutPage() {
  return (
    <main data-nav-theme="light" className="min-h-screen bg-paper px-6 pb-24 pt-28 text-ink sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
          THE STORY
        </Reveal>
        <MaskReveal
          className="mt-4 font-display uppercase leading-[0.9] text-[13vw] sm:text-6xl lg:text-7xl"
          lines={["BUILT LIKE", "A STORY."]}
        />

        <Reveal variant="up" delay={0.1} className="mt-10 max-w-xl text-base text-ink/70 sm:text-lg">
          Between tradition and tomorrow. RAAH | BAL is a contemporary streetwear label that
          refuses to stand still. We find our language in the movement of people, cultures, ideas
          and streets: smart, unexpected and unapologetically expressive, where silhouettes shift,
          stitches speak, patterns interrupt and embroidery becomes the hero.
        </Reveal>

        <Reveal variant="up" delay={0.15} className="mt-10 max-w-xl text-base text-ink/70">
          RAAH | BAL began with one simple belief: clothes should still mean something once the
          trend has passed. BAL means strength — not the kind that shows up for the photo, but the
          kind that shows up every day nobody&apos;s watching. Every piece is built for the miles
          before the summit, not the flag at the top of it.
        </Reveal>

        <Reveal variant="up" delay={0.2} className="mt-12">
          <Magnetic>
            <Link
              href="/shop"
              data-hover
              className="btn-stamp inline-flex items-center gap-2 bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper"
              style={{ "--stamp-color": "var(--color-ember)" } as CSSProperties}
            >
              Shop the drop →
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </main>
  );
}
