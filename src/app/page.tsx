import type { CSSProperties } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import Magnetic from "@/components/Magnetic";
import GradientOrbs from "@/components/GradientOrbs";
import Marquee from "@/components/Marquee";
import ClimbScroll from "@/components/ClimbScroll";
import NotifyForm from "@/components/NotifyForm";

const MANIFESTO = [
  "NO SHORTCUTS.",
  "EARNED, NOT GIVEN.",
  "BUILT IN THE UNSEEN HOURS.",
  "THE CLIMB IS THE POINT.",
  "UNBROKEN.",
];

export default function Home() {

  return (
    <main>
      {/* ---------- Hero (full-bleed word-stack, photo breaking across the type) ---------- */}
      <section data-nav-theme="light" className="relative overflow-hidden bg-paper text-ink">
        <div className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 sm:pt-36 lg:pb-24">
          <GradientOrbs
            className="-z-10"
            orbs={[
              { color: "var(--color-ember)", size: 520, top: "-12%", right: "-30%", opacity: 0.12 },
              { color: "var(--color-steel)", size: 360, bottom: "-10%", left: "-6%", opacity: 0.08 },
            ]}
          />

          <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] sm:text-[11px]">
            <Reveal variant="fade" className="text-ember">
              RAAH | BAL
            </Reveal>
            <Reveal variant="fade" delay={0.05} className="text-ink/40">
              Season 01 — Drop 01
            </Reveal>
          </div>

          <div className="relative mt-8 lg:mt-10">
            <div className="font-display uppercase leading-[0.82] tracking-tight text-[17vw] sm:text-[13vw] lg:text-[8.5vw]">
              <ScrambleText text="STRENGTH" />
            </div>
            <div className="font-display uppercase leading-[0.82] tracking-tight text-[17vw] sm:text-[13vw] lg:text-[8.5vw]">
              <ScrambleText text="ISN'T" delay={0.1} className="text-outline" />
            </div>
            <div className="font-display uppercase leading-[0.82] tracking-tight text-[17vw] sm:text-[13vw] lg:text-[8.5vw]">
              <ScrambleText text="DECLARED." delay={0.2} />
            </div>
            <div className="font-display uppercase leading-[0.82] tracking-tight text-[17vw] sm:text-[13vw] lg:text-[8.5vw]">
              <ScrambleText text="IT'S" delay={0.3} className="text-outline" />
            </div>
            <div className="font-display uppercase leading-[0.82] tracking-tight text-[17vw] text-ember sm:text-[13vw] lg:text-[8.5vw]">
              <ScrambleText text="WORN." delay={0.4} />
            </div>
          </div>

          <div className="relative mt-10 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-end lg:justify-between">
            <Reveal variant="up" delay={0.55} className="max-w-sm text-sm text-ink/60 sm:text-base">
              A contemporary streetwear label built for the miles nobody&apos;s watching. Matter 12
              is coming — twelve stages, one at a time. This is the first.
            </Reveal>

            <Reveal variant="up" delay={0.6} className="flex flex-wrap items-center gap-10">
              <Magnetic strength={0.15}>
                <Link
                  href="/matter-12"
                  data-hover
                  className="btn-stamp bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-paper"
                  style={{ "--stamp-color": "var(--color-ember)" } as CSSProperties}
                >
                  Discover Matter 12 →
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href="#story"
                  data-hover
                  className="link-draw inline-flex w-fit items-center gap-2 px-1 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-ink"
                >
                  Our story ↓
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>

        {/* ---------- Edge metadata ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 sm:px-10">
          <span>Drop 01</span>
          <span>India — 2026</span>
          <span>Contemporary Streetwear</span>
          <span className="animate-pulse">Scroll to explore ↓</span>
        </div>

        {/* ---------- Manifesto marquee ---------- */}
        <div className="border-y border-ink/10 py-6">
          <Marquee items={MANIFESTO} className="font-display text-2xl uppercase tracking-tight text-ink/15 sm:text-4xl" />
        </div>

        {/* ---------- Brand statement ---------- */}
        <div className="flex min-h-[70vh] flex-col items-center justify-center border-b border-ink/10 px-6 py-24 text-center sm:px-10">
          <Reveal
            as="h2"
            variant="up"
            className="font-display uppercase leading-[0.85] tracking-tight text-[15vw] sm:text-[9vw] lg:text-[7vw]"
          >
            Not made
          </Reveal>
          <Reveal
            as="h2"
            variant="up"
            delay={0.08}
            className="text-outline font-display uppercase leading-[0.85] tracking-tight text-[15vw] sm:text-[9vw] lg:text-[7vw]"
          >
            to fit in.
          </Reveal>
          <Reveal
            as="h2"
            variant="up"
            delay={0.16}
            className="mt-4 font-display uppercase leading-[0.85] tracking-tight text-[15vw] text-ember sm:text-[9vw] lg:text-[7vw]"
          >
            Made to move
          </Reveal>
          <Reveal
            as="h2"
            variant="up"
            delay={0.24}
            className="font-display uppercase leading-[0.85] tracking-tight text-[15vw] sm:text-[9vw] lg:text-[7vw]"
          >
            through it.
          </Reveal>
        </div>

        {/* ---------- The Climb ---------- */}
        <div className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
              THE CLIMB
            </Reveal>
            <Reveal as="h2" variant="up" delay={0.05} className="mt-4 font-display text-3xl uppercase leading-[1.05] sm:text-5xl">
              Strength isn&apos;t a headline. It&apos;s a habit.
            </Reveal>

            <div className="mt-12 flex w-full justify-center">
              <ClimbScroll />
            </div>

            <Reveal variant="up" delay={0.2} className="mt-6 max-w-lg text-ink/60">
              BAL means strength. Not the kind that shows up for the photo — the kind that shows
              up every day nobody&apos;s watching. Every piece here is built for the miles before
              the summit, not the flag at the top of it.
            </Reveal>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/35">
              Keep scrolling — the climb draws itself.
            </p>
          </div>
        </div>

      </section>

      {/* ---------- Story ---------- */}
      <section id="story" data-nav-theme="light" className="bg-paper px-6 py-24 text-ink sm:px-10 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <Reveal variant="up" className="font-mono text-[11px] tracking-[0.25em] text-ember">
            OUR IDEA °
          </Reveal>
          <Reveal as="h3" variant="up" delay={0.05} className="mt-4 font-display text-3xl uppercase leading-[1.05] sm:text-5xl">
            Built to connect people, not just close sales.
          </Reveal>
          <Reveal variant="up" delay={0.1} className="mt-6 max-w-lg text-ink/65">
            RAAH | BAL began with one simple belief: clothes should still mean something once the
            trend has passed. That is as much as we will say for now. The rest lives in the pieces
            themselves.
          </Reveal>
          <Reveal variant="up" delay={0.15} className="mt-10">
            <Magnetic>
              <Link
                href="/about"
                data-hover
                className="link-draw inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-ink"
              >
                Read the full story →
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ---------- Newsletter ---------- */}
      <section id="enter" data-nav-theme="light" className="border-t border-ink/10 bg-paper px-6 py-24 text-ink sm:px-10 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal
            as="h2"
            variant="up"
            className="font-display uppercase leading-[0.9] text-[16vw] sm:text-7xl lg:text-8xl"
          >
            Enter the
            <br />
            <span className="text-ember">RAAH</span> world
          </Reveal>
          <Reveal variant="up" delay={0.1} className="mt-8 flex justify-center">
            <NotifyForm
              source="RAAH | BAL homepage newsletter"
              buttonLabel="Enter →"
              successLabel="You're in."
              placeholder="Your email"
              className="sm:flex-row"
              inputClassName="border-ink/30 text-ink placeholder:text-ink/40 text-center sm:text-left"
              buttonClassName="border border-ink text-ink"
              sweepStyle={{ "--sweep-color": "var(--color-ink)", "--sweep-text": "var(--color-paper)" } as CSSProperties}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
