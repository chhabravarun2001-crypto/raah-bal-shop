// Lets the Preloader hold off starting its own animation until the
// VideoIntro is out of the way (finished, skipped, or never shown this
// session) — otherwise both play in parallel and the preloader's sequence
// runs hidden behind the video.
export const VIDEO_INTRO_DONE_EVENT = "raah-bal:video-intro-done";

declare global {
  interface Window {
    __raahBalVideoIntroDone?: boolean;
  }
}

export function isVideoIntroDone() {
  return typeof window !== "undefined" && window.__raahBalVideoIntroDone === true;
}

export function markVideoIntroDone() {
  if (typeof window === "undefined") return;
  window.__raahBalVideoIntroDone = true;
  window.dispatchEvent(new Event(VIDEO_INTRO_DONE_EVENT));
}
