"use client";

import dynamic from "next/dynamic";

const CourageAscent = dynamic(() => import("./CourageAscent"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

export default function CourageAscentLoader({ className }: { className?: string }) {
  return <CourageAscent className={className} />;
}
