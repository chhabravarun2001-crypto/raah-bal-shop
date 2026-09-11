import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Reveal from "@/components/Reveal";
import Starfield from "@/components/Starfield";
import Countdown from "@/components/Countdown";
import NotifyForm from "@/components/NotifyForm";

export const metadata: Metadata = {
  title: "Shop · RAAH | BAL",
  description: "The first RAAH | BAL drop. Launching 12 November 2026.",
};

const LAUNCH_DATE = "2026-11-12T00:00:00+05:30";

export default function ShopPage() {
  return (
    <main
      data-nav-theme="dark"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-28 text-center text-paper sm:px-10"
    >
      <Starfield density={0.00022} parallax={20} accentRatio={0.12} />

      <div className="relative mx-auto max-w-2xl">
        <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
          RAAH | BAL
        </Reveal>
        <Reveal
          as="h1"
          variant="up"
          delay={0.05}
          className="mt-4 font-display uppercase leading-[0.9] text-[13vw] sm:text-6xl lg:text-7xl"
        >
          The drop.
        </Reveal>
        <Reveal variant="up" delay={0.1} className="mx-auto mt-5 max-w-md text-paper/60">
          Six pieces. No shortcuts. Nothing here is for sale until it&apos;s earned.
        </Reveal>

        <Reveal variant="up" delay={0.15} className="mt-14">
          <Countdown target={LAUNCH_DATE} />
        </Reveal>

        <Reveal variant="up" delay={0.2} className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
          12 November 2026
        </Reveal>

        <Reveal variant="up" delay={0.25} className="mt-14 flex justify-center">
          <NotifyForm
            source="RAAH | BAL Shop page"
            buttonLabel="Notify me →"
            successLabel="You're on the list."
            placeholder="Your email"
            inputClassName="border-paper/30 text-paper placeholder:text-paper/40"
            buttonClassName="border border-paper text-paper"
            sweepStyle={{ "--sweep-color": "var(--color-paper)", "--sweep-text": "var(--color-ink)" } as CSSProperties}
          />
        </Reveal>
      </div>
    </main>
  );
}
