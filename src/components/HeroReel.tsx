"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { IconPause, IconPlay } from "./icons";

export type ReelSlide = {
  src: string;
  alt: string;
  href: string;
  label: string;
};

const SLIDE_DURATION = 4200;

/**
 * A video-player-styled reel of the drop instead of one static photo — the
 * hero panel that would otherwise just sit there. Auto-advances like a
 * story, with a real scrubber and play/pause, built from the site's own
 * product photography (no borrowed footage).
 */
export default function HeroReel({ slides }: { slides: ReelSlide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Reflects a media-query check, not state derivable at render time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, playing, reduced, slides.length]);

  const active = slides[index];

  return (
    <div
      className="group relative h-full w-full select-none overflow-hidden"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.href}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority={i === 0}
            className="duotone-img object-cover"
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-ink to-transparent lg:block" />

      <Link
        href={active.href}
        data-cursor-label="View"
        aria-label={`Shop the ${active.label}`}
        className="absolute inset-0"
      />

      {/* Scrubber */}
      <div className="pointer-events-none absolute left-5 right-5 top-5 flex gap-1.5 sm:left-8 sm:right-8">
        {slides.map((slide, i) => (
          <button
            key={slide.href}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIndex(i);
            }}
            data-hover
            aria-label={`Show ${slide.label}`}
            className="pointer-events-auto h-[3px] flex-1 overflow-hidden rounded-full bg-paper/25"
          >
            <span
              className="block h-full origin-left bg-paper"
              style={
                i < index || reduced
                  ? { transform: "scaleX(1)" }
                  : i === index
                    ? ({
                        transform: "scaleX(0)",
                        animation: playing ? `reel-fill ${SLIDE_DURATION}ms linear forwards` : "none",
                      } as CSSProperties)
                    : { transform: "scaleX(0)" }
              }
            />
          </button>
        ))}
      </div>

      {/* Play / pause */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setPlaying((p) => !p);
        }}
        data-hover
        aria-label={playing ? "Pause the reel" : "Play the reel"}
        className="absolute bottom-5 left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 bg-ink/40 text-paper backdrop-blur transition-colors hover:border-paper sm:bottom-8 sm:left-8"
      >
        {playing ? <IconPause className="h-4 w-4" /> : <IconPlay className="h-4 w-4" />}
      </button>

      <div className="pointer-events-none absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70 sm:bottom-8 sm:right-8">
        {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} — {active.label}
      </div>
    </div>
  );
}
