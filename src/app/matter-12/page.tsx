import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import Marquee from "@/components/Marquee";
import GradientOrbs from "@/components/GradientOrbs";
import Matter12Grid from "@/components/Matter12Grid";
import NotifyForm from "@/components/NotifyForm";

export const metadata: Metadata = {
  title: "Matter 12 — RAAH | BAL",
  description:
    "Twelve recurring systems. Twelve human interpretations. Twelve pieces. The number is the framework — the human is the subject.",
};

const TICKER = ["12 SYSTEMS", "12 MEANINGS", "12 PIECES", "NOTHING REVEALED YET"];

export default function Matter12Page() {
  return (
    <main data-nav-theme="light" className="bg-paper text-ink">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden px-6 pb-14 pt-28 sm:px-10 sm:pt-40">
        <GradientOrbs
          className="-z-10"
          orbs={[
            { color: "var(--color-ember)", size: 520, top: "-15%", right: "-15%", opacity: 0.14 },
            { color: "var(--color-steel)", size: 360, bottom: "-10%", left: "-8%", opacity: 0.08 },
          ]}
        />
        <div className="mx-auto max-w-5xl">
          <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
            THE NUMBER IS THE FRAMEWORK. THE HUMAN IS THE SUBJECT.
          </Reveal>
          <h1 className="mt-6 font-display uppercase leading-[0.82] text-[20vw] sm:text-[13vw] lg:text-[10vw]">
            <ScrambleText text="MATTER" />
            <br />
            <ScrambleText text="12" delay={0.15} className="text-ember" />
          </h1>
        </div>
      </section>

      <Marquee
        items={TICKER}
        className="border-y border-ink/10 py-4 font-display text-xl uppercase tracking-tight text-ink/20 sm:text-3xl"
      />

      {/* ---------- Interactive: the 12 references ---------- */}
      <section className="border-b border-ink/10 px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal variant="up" className="font-mono text-[11px] tracking-[0.3em] text-ember">
            WHY 12?
          </Reveal>
          <Reveal
            as="h2"
            variant="up"
            delay={0.05}
            className="mt-3 max-w-2xl font-display uppercase leading-[0.9] text-4xl sm:text-5xl"
          >
            It&apos;s already everywhere. Touch one.
          </Reveal>
          <Reveal variant="up" delay={0.1} className="mt-10">
            <Matter12Grid />
          </Reveal>
        </div>
      </section>

      {/* ---------- Positioning ---------- */}
      <section className="border-b border-ink/10 px-6 py-24 text-center sm:px-10 sm:py-32">
        <Reveal variant="up" className="font-display uppercase leading-[0.95] text-2xl text-ink/30 sm:text-4xl">
          Not streetwear. Not conceptual fashion. Not graphic clothing.
        </Reveal>
        <Reveal
          variant="up"
          delay={0.1}
          className="mt-4 font-display uppercase leading-[0.95] text-4xl text-ember sm:text-6xl"
        >
          A wearable study of human existence.
        </Reveal>
      </section>

      {/* ---------- Closing / notify ---------- */}
      <section id="matter-12-notify" className="px-6 py-24 text-center sm:px-10 sm:py-32">
        <div className="mx-auto max-w-xl">
          <Reveal as="h2" variant="up" className="font-display uppercase leading-[0.9] text-[13vw] sm:text-6xl">
            Stage one of twelve.
          </Reveal>
          <Reveal variant="up" delay={0.1} className="mx-auto mt-4 max-w-sm text-sm text-ink/60">
            Nothing else is shown until it&apos;s earned.
          </Reveal>

          <Reveal variant="up" delay={0.15} className="mt-12 flex justify-center">
            <NotifyForm
              source="RAAH | BAL Matter 12 page"
              buttonLabel="Get stage two →"
              successLabel="You're on the list."
              placeholder="Your email"
              inputClassName="border-ink/30 text-ink placeholder:text-ink/40"
              buttonClassName="border border-ink text-ink"
              sweepStyle={{ "--sweep-color": "var(--color-ink)", "--sweep-text": "var(--color-paper)" } as CSSProperties}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
