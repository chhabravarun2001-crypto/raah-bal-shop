import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Section = { heading: string; body: ReactNode };

export default function PolicyPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <main className="min-h-screen bg-paper px-6 pb-24 pt-28 text-ink sm:px-10 sm:pt-36">
      <div className="mx-auto max-w-2xl">
        <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
          {eyebrow}
        </Reveal>
        <Reveal
          as="h1"
          variant="up"
          delay={0.05}
          className="mt-3 font-display text-4xl uppercase leading-[0.95] sm:text-5xl"
        >
          {title}
        </Reveal>
        <Reveal variant="up" delay={0.1} className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink/40">
          Last updated {updated}
        </Reveal>

        <div className="mt-14 flex flex-col gap-10">
          {sections.map((s, i) => (
            <Reveal key={s.heading} variant="up" delay={Math.min(i * 0.03, 0.2)}>
              <h2 className="font-display text-lg uppercase tracking-wide">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/65">{s.body}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
