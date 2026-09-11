import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";
import Magnetic from "@/components/Magnetic";
import AnimatedOrbs from "@/components/AnimatedOrbs";
import BrandTextLoop from "@/components/BrandTextLoop";
import NotifyForm from "@/components/NotifyForm";
import Starfield from "@/components/Starfield";
import BrandThreadsLoader from "@/components/BrandThreadsLoader";
import BrandParticleText from "@/components/BrandParticleText";
import Parallax from "@/components/Parallax";
import HoldToEarn from "@/components/HoldToEarn";
import DottedGrid from "@/components/DottedGrid";

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
      {/* ============================================================
          COLD OPEN — a question, not a headline. Quiet on purpose.
      ============================================================ */}
      <section data-nav-theme="dark" className="relative isolate flex min-h-screen items-center overflow-hidden bg-ink px-6 text-paper sm:px-10">
        <Starfield className="-z-30" density={0.00014} parallax={24} accentRatio={0.12} />
        <DottedGrid dot="var(--color-paper)" className="-z-20 opacity-[0.15]" />
        <AnimatedOrbs
          className="-z-10"
          orbs={[
            { color: "var(--color-ember)", size: 480, top: "10%", left: "50%", opacity: 0.12, drift: 90, duration: 16 },
            { color: "var(--color-steel)", size: 380, bottom: "-5%", right: "5%", opacity: 0.08, drift: 70, duration: 22 },
          ]}
        />

        <div className="mx-auto flex w-full flex-col items-center">
          <Reveal variant="fade" duration={1.2} className="h-56 w-full max-w-6xl sm:h-72 lg:h-96">
            <BrandParticleText
              text="RAAH | BAL"
              particleSize={4}
              fontSize="clamp(6rem, 16vw, 14rem)"
              color="#f5f5f2"
              highlightColor="#d0021b"
            />
          </Reveal>

          <div className="mx-auto max-w-3xl text-center">
            <Reveal variant="fade" delay={0.3} className="font-mono text-[10px] uppercase tracking-[0.35em] text-paper/40">
              A story, not a slogan
            </Reveal>
            <h1 className="mt-8 font-serif text-3xl italic leading-[1.25] text-paper/95 sm:text-5xl">
              <ScrambleText text="Nobody claps for the 5 AM." duration={1.4} />
            </h1>
            <Reveal variant="fade" delay={1.6} className="mx-auto mt-10 max-w-md text-sm text-paper/50">
              No one photographs the attempt that failed. No one counts the rep that almost broke
              you. That&apos;s where this actually starts.
            </Reveal>
          </div>
        </div>

        <Reveal
          variant="fade"
          delay={2}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30"
        >
          <span className="animate-pulse">Keep reading ↓</span>
        </Reveal>
      </section>

      {/* ============================================================
          CHAPTER ONE — the unseen hours, built one line at a time.
      ============================================================ */}
      <section data-nav-theme="light" className="overflow-hidden bg-paper py-24 text-ink sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
          <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
            CHAPTER ONE
          </Reveal>
          <div className="mt-6 flex flex-col gap-3">
            <Reveal variant="up" delay={0.05} className="font-serif text-xl italic text-ink/50 sm:text-2xl">
              It never happens on camera.
            </Reveal>
            <Reveal variant="up" delay={0.15} className="font-serif text-xl italic text-ink/50 sm:text-2xl">
              It happens before anyone&apos;s awake to see it.
            </Reveal>
            <Reveal variant="up" delay={0.25} className="font-serif text-xl italic text-ink/50 sm:text-2xl">
              Again. And again. Until it isn&apos;t a choice anymore.
            </Reveal>
            <Reveal
              as="p"
              variant="up"
              delay={0.35}
              className="mt-3 font-display text-2xl uppercase leading-[1.1] text-ink sm:text-3xl"
            >
              That&apos;s the part nobody sells you. It&apos;s the only part that matters.
            </Reveal>
          </div>
        </div>

        <Reveal variant="fade" delay={0.4} className="mt-14 h-48 w-screen sm:h-64">
          <BrandThreadsLoader className="h-full w-full" />
        </Reveal>
      </section>

      {/* ============================================================
          CHAPTER TWO — the philosophy lands. The signature line,
          earned by everything above it instead of leading with it.
      ============================================================ */}
      <section data-nav-theme="dark" className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-ink px-6 py-24 text-center sm:px-10">
        <Parallax className="absolute inset-0 -z-10 opacity-60" strength={45}>
          <Image src="/images/editorial/profile-dark-2.jpg" alt="" fill className="mono-img object-cover" sizes="100vw" />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/50 to-ink" aria-hidden />
        <AnimatedOrbs
          className="-z-10"
          orbs={[{ color: "var(--color-ember)", size: 520, top: "30%", left: "50%", opacity: 0.16, drift: 100, duration: 18 }]}
        />

        <div className="relative mx-auto max-w-4xl">
          <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
            CHAPTER TWO
          </Reveal>
          <h2 className="mt-6 font-display uppercase leading-[0.9] text-[14vw] sm:text-7xl lg:text-8xl">
            <span className="block text-paper/30">
              <ScrambleText text="STRENGTH ISN'T" />
            </span>
            <span className="block text-paper/30">
              <ScrambleText text="DECLARED." delay={0.2} />
            </span>
            <span className="mt-2 block text-ember">
              <ScrambleText text="IT'S WORN." delay={0.4} />
            </span>
          </h2>
        </div>
      </section>

      {/* ============================================================
          CHAPTER THREE — the name behind it, and what earning it
          actually looks like, rendered as a real thing you can turn.
      ============================================================ */}
      <section data-nav-theme="dark" className="relative isolate overflow-hidden bg-ink px-6 py-24 text-paper sm:px-10 sm:py-32">
        <Starfield className="-z-10" density={0.0007} parallax={22} accentRatio={0.15} opacity={0.3} />
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div className="text-center lg:text-left">
            <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
              CHAPTER THREE
            </Reveal>
            <Reveal
              as="h3"
              variant="up"
              delay={0.05}
              className="mt-4 font-display uppercase leading-[0.95] text-4xl sm:text-6xl"
            >
              This is
              <br />
              <span className="text-ember">RAAH | BAL.</span>
            </Reveal>
            <Reveal variant="up" delay={0.1} className="mx-auto mt-6 max-w-md text-paper/60 lg:mx-0">
              BAL means strength. Built the same way as everything above it: stage by stage,
              nothing given, no shortcuts through any of it. This is what earning it actually
              looks like.
            </Reveal>
            <Reveal variant="up" delay={0.15} className="mt-8 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
              <Magnetic strength={0.15}>
                <Link
                  href="/matter-12"
                  data-hover
                  className="btn-stamp bg-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink"
                  style={{ "--stamp-color": "var(--color-ember)" } as CSSProperties}
                >
                  Discover Matter 12 →
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href="#story"
                  data-hover
                  className="link-draw inline-flex w-fit items-center gap-2 px-1 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
                >
                  Read the full story ↓
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal variant="fade" delay={0.2} className="relative mx-auto hidden aspect-[4/5] w-full max-w-md lg:block">
            <p className="pointer-events-none absolute bottom-6 right-8 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40">
              Move closer
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Manifesto loop — a breath between chapters ---------- */}
      <div className="border-y border-ink/10 bg-paper py-8">
        <BrandTextLoop text={MANIFESTO.join(" ° ")} />
      </div>

      {/* ============================================================
          CHAPTER FOUR — the ongoing chapter, still being written.
      ============================================================ */}
      <section className="bg-paper px-6 py-24 text-center text-ink sm:px-10 sm:py-32">
        <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
          CHAPTER FOUR
        </Reveal>
        <Reveal as="h3" variant="up" delay={0.05} className="mx-auto mt-4 max-w-2xl font-serif text-2xl italic leading-[1.3] sm:text-4xl">
          Twelve stages. One revealed. The rest still being earned, right now, while you read
          this.
        </Reveal>
        <Reveal variant="up" delay={0.1} className="mt-10">
          <Magnetic>
            <Link
              href="/matter-12"
              data-hover
              className="link-draw inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-ink"
            >
              Watch it unfold →
            </Link>
          </Magnetic>
        </Reveal>
      </section>

      {/* ============================================================
          Prove it — the reader's own turn to earn something.
      ============================================================ */}
      <section className="relative isolate overflow-hidden border-t border-ink/10 bg-paper px-6 py-24 text-center text-ink sm:px-10 sm:py-32">
        <DottedGrid className="-z-20 opacity-[0.09]" />
        <AnimatedOrbs
          className="-z-10"
          orbs={[{ color: "var(--color-ember)", size: 400, top: "20%", left: "50%", opacity: 0.08, drift: 70, duration: 17 }]}
        />
        <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.3em] text-ember">
          ONE MORE THING °
        </Reveal>
        <Reveal as="h3" variant="up" delay={0.05} className="mx-auto mt-4 max-w-lg font-display text-2xl uppercase leading-[1.1] sm:text-4xl">
          You read this far. Everything here is earned. Even this.
        </Reveal>
        <Reveal variant="scale" delay={0.15} className="mt-12 flex justify-center">
          <HoldToEarn />
        </Reveal>
      </section>

      {/* ============================================================
          Go deeper — the story, not just the sale.
      ============================================================ */}
      <section id="story" data-nav-theme="light" className="relative isolate overflow-hidden border-t border-ink/10 bg-ink px-6 py-24 text-paper sm:px-10 sm:py-32">
        <Parallax className="absolute inset-0 -z-10 opacity-40" strength={30}>
          <Image
            src="/images/editorial/man-walking-minimal.jpg"
            alt="A figure walking alone through a stark, minimal corridor toward the light"
            fill
            className="mono-img object-cover"
            sizes="100vw"
          />
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-ink/70" aria-hidden />
        <AnimatedOrbs
          className="-z-10"
          orbs={[{ color: "var(--color-ember)", size: 460, top: "10%", right: "10%", opacity: 0.14, drift: 80, duration: 19 }]}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal variant="fade" className="font-mono text-[11px] tracking-[0.25em] text-ember">
            OUR IDEA °
          </Reveal>
          <Reveal as="h3" variant="up" delay={0.05} className="mt-4 font-display text-3xl uppercase leading-[1.05] sm:text-5xl">
            There&apos;s more to this than a homepage.
          </Reveal>
          <Reveal variant="up" delay={0.1} className="mx-auto mt-6 max-w-lg font-serif italic text-paper/70">
            RAAH | BAL began with one simple belief: clothes should still mean something once the
            trend has passed. The full story (why BAL, why the climb, why twelve) lives on one
            page.
          </Reveal>
          <Reveal variant="up" delay={0.15} className="mt-10">
            <Magnetic>
              <Link
                href="/about"
                data-hover
                className="btn-stamp inline-flex items-center gap-2 bg-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink"
                style={{ "--stamp-color": "var(--color-ember)" } as CSSProperties}
              >
                Read the full story →
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ---------- Newsletter ---------- */}
      <section id="enter" data-nav-theme="light" className="relative isolate overflow-hidden border-t border-ink/10 bg-paper px-6 py-24 text-ink sm:px-10 sm:py-32">
        <DottedGrid className="-z-20 opacity-[0.3]" />
        <AnimatedOrbs
          className="-z-10"
          orbs={[
            { color: "var(--color-ember)", size: 460, top: "-10%", left: "10%", opacity: 0.1, drift: 90, duration: 16 },
            { color: "var(--color-steel)", size: 340, bottom: "-10%", right: "0%", opacity: 0.08, drift: 60, duration: 21 },
          ]}
        />
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
