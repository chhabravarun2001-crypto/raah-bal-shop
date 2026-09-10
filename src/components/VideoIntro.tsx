"use client";

import { useEffect, useRef, useState } from "react";
import { IconSoundOff, IconSoundOn } from "./icons";
import { markVideoIntroDone } from "@/lib/introGate";

const STORAGE_KEY = "raah-bal-entered";

/**
 * The site opens on this clip, then goes straight into the homepage — no
 * click required. Browsers only allow that without a user gesture if the
 * video is muted, so it autoplays muted with an opt-in sound toggle, and
 * always falls through to the site on its own once it ends.
 */
export default function VideoIntro() {
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      already = false;
    }
    // Reflects a one-time session check, not state derivable at render time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(!already);
    setChecked(true);

    if (!already) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore — worst case the intro plays again next load
      }
    } else {
      markVideoIntroDone();
    }
  }, []);

  function finish() {
    setVisible(false);
    markVideoIntroDone();
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  if (!checked || !visible) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
        className="h-full w-full object-contain"
      />

      <button
        type="button"
        onClick={toggleSound}
        data-hover
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-8 left-8 flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 bg-black/40 text-paper backdrop-blur transition-colors hover:border-paper"
      >
        {muted ? <IconSoundOff className="h-4 w-4" /> : <IconSoundOn className="h-4 w-4" />}
      </button>

      <button
        type="button"
        onClick={finish}
        data-hover
        className="link-draw absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60 hover:text-paper"
      >
        Skip →
      </button>
    </div>
  );
}
