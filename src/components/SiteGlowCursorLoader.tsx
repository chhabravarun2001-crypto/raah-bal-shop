"use client";

import dynamic from "next/dynamic";

const SiteGlowCursor = dynamic(() => import("./SiteGlowCursor"), { ssr: false });

export default function SiteGlowCursorLoader() {
  return <SiteGlowCursor />;
}
