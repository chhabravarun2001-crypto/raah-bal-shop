"use client";

import dynamic from "next/dynamic";

const CourageSummit = dynamic(() => import("./CourageSummit"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

export default function CourageSummitLoader({ className }: { className?: string }) {
  return <CourageSummit className={className} />;
}
