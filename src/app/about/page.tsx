import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import MaskReveal from "@/components/MaskReveal";
import Magnetic from "@/components/Magnetic";
import AnimatedOrbs from "@/components/AnimatedOrbs";
import TiltCard from "@/components/TiltCard";
import CountUp from "@/components/CountUp";
import DottedGrid from "@/components/DottedGrid";
import Starfield from "@/components/Starfield";

export const metadata: Metadata = {
  title: "About · RAAH | BAL",
  description: "The story behind RAAH | BAL, a contemporary streetwear label built for the miles nobody's watching.",
};

export default function AboutPage() {
  return (
    <main data-nav-theme="light" className="min-h-screen bg-paper text-ink">
      <div className="relative isolate overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pt-36">
        <DottedGrid className="-z-20 opacity-[0.35]" />
        <AnimatedOrbs
          className="-z-10"
          orbs={[{ color: "var(--color-ember)", size: 460, top: "-10%", right: "-15%", opacity: 0.12, drift: 70, duration: 20 }]}
        />
        <div className="relative mx-auto max-w-3xl">
          <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
            THE STORY
          </Reveal>
          <MaskReveal
            className="mt-4 font-display uppercase leading-[0.9] text-[13vw] sm:text-6xl lg:text-7xl"
            lines={["BUILT LIKE", "A STORY."]}
          />
          <Reveal variant="up" delay={0.3} className="mt-6 max-w-md font-serif text-lg italic text-ink/60">
            Three chapters. Why the name, why the climb, why twelve. Read all of it, or none of
            it. Nothing here is filler.
          </Reveal>
        </div>
      </div>

      {/* ============================================================
          CHAPTER ONE — why the name.
      ============================================================ */}
      <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
        <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
          CHAPTER ONE: WHY THE NAME
        </Reveal>
        <Reveal as="p" variant="up" delay={0.05} className="mt-6 font-serif text-2xl italic leading-[1.4] text-ink/80 sm:text-3xl">
          &ldquo;BAL&rdquo; means strength. Not the kind that shows up for the photo. The kind
          that shows up every single day nobody&apos;s watching.
        </Reveal>
        <Reveal variant="up" delay={0.1} className="mt-8 max-w-xl text-base text-ink/65">
          Between tradition and tomorrow, RAAH | BAL is a contemporary streetwear label that
          refuses to stand still. We find our language in the movement of people, cultures, ideas
          and streets: smart, unexpected and unapologetically expressive, where silhouettes
          shift, stitches speak, patterns interrupt and embroidery becomes the hero.
        </Reveal>
        <Reveal variant="up" delay={0.15} className="mt-6 max-w-xl text-base text-ink/65">
          It began with one simple belief: clothes should still mean something once the trend has
          passed. That belief needed a name that couldn&apos;t be faked. So we picked the one
          part of strength nobody can fast-track.
        </Reveal>
      </div>

      {/* ---------- Stats, earned not stated ---------- */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 border-y border-ink/10 px-6 py-14 sm:grid-cols-4 sm:px-10">
        {[
          { to: 6, label: "Pieces, no reprints" },
          { to: 12, label: "Stages to earn" },
          { to: 0, label: "Shortcuts taken" },
          { to: 100, suffix: "%", label: "Built, not bought" },
        ].map((stat) => (
          <Reveal key={stat.label} variant="up" className="text-center sm:text-left">
            <CountUp to={stat.to} suffix={stat.suffix} className="font-display text-4xl text-ember sm:text-5xl" />
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/50">{stat.label}</p>
          </Reveal>
        ))}
      </div>

      {/* ============================================================
          CHAPTER TWO — why the climb.
      ============================================================ */}
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.75fr] lg:items-start lg:gap-20">
          <div>
            <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
              CHAPTER TWO: WHY THE CLIMB
            </Reveal>
            <Reveal as="p" variant="up" delay={0.05} className="mt-6 max-w-xl font-serif text-2xl italic leading-[1.4] text-ink/80">
              Every piece here is built for the miles before the summit, not the flag at the top
              of it.
            </Reveal>
            <Reveal variant="up" delay={0.1} className="mt-8 max-w-xl text-base text-ink/65">
              A summit photo takes one second. It doesn&apos;t show the months before it: the
              cold starts, the false summits, the gear packed and repacked at 4 AM. We&apos;re not
              interested in selling the one second. We&apos;re interested in the part that made it
              possible.
            </Reveal>
            <Reveal variant="up" delay={0.15} className="mt-6 max-w-xl text-base text-ink/65">
              That&apos;s the whole design brief, honestly. Every seam, every fit, every fabric
              choice gets tested against one question: does this hold up on the miles nobody
              films? If it doesn&apos;t, it doesn&apos;t ship.
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

          <Reveal variant="scale" delay={0.1} className="relative aspect-[4/5] overflow-hidden">
            <TiltCard className="duotone-wrap h-full w-full">
              <Image
                src="/images/editorial/climbers-dramatic.jpg"
                alt="Three silhouetted climbers preparing rope and gear at sunset"
                fill
                className="mono-img object-cover"
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
            </TiltCard>
          </Reveal>
        </div>
      </div>

      {/* ============================================================
          CHAPTER THREE — why twelve. The story keeps going elsewhere.
      ============================================================ */}
      <div data-nav-theme="dark" className="relative isolate overflow-hidden border-t border-ink/10 bg-ink px-6 py-20 text-paper sm:px-10 sm:py-28">
        <Starfield density={0.00035} parallax={18} accentRatio={0.12} opacity={0.6} />
        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
            CHAPTER THREE: WHY TWELVE
          </Reveal>
          <Reveal as="p" variant="up" delay={0.05} className="mt-6 font-serif text-2xl italic leading-[1.4] text-paper/85 sm:text-3xl">
            Every clock keeps twelve hours. Every stage humanity has ever built has found its
            order in twelve. We&apos;re building the same way.
          </Reveal>
          <Reveal variant="up" delay={0.1} className="mt-8">
            <Magnetic>
              <Link
                href="/matter-12"
                data-hover
                className="link-draw inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-paper/80 hover:text-paper"
              >
                Continue to Matter 12 →
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
