"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Magnetic from "./Magnetic";

const STORAGE_KEY = "raah-bal-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // One-time hydration read from localStorage (a browser-only API), not
    // derived state — the standard SSR-safe pattern for browser-persisted
    // preferences.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage failures — banner just reappears next visit
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[85] mx-auto flex max-w-xl flex-col gap-4 border border-ink/10 bg-paper p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-ink/70">
        We use essential cookies to run this site, and optional ones to understand how it&apos;s used. Read the{" "}
        <a href="/policies/privacy-policy" data-hover className="link-draw text-ink">
          privacy policy
        </a>
        .
      </p>
      <Magnetic className="shrink-0">
        <button
          type="button"
          onClick={dismiss}
          data-hover
          className="btn-sweep whitespace-nowrap border border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em]"
          style={{ "--sweep-color": "var(--color-ink)", "--sweep-text": "var(--color-paper)" } as CSSProperties}
        >
          Got it
        </button>
      </Magnetic>
    </div>
  );
}
