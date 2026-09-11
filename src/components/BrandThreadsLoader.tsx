"use client";

import dynamic from "next/dynamic";

const BrandThreads = dynamic(() => import("./BrandThreads"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

export default function BrandThreadsLoader({ className }: { className?: string }) {
  return <BrandThreads className={className} />;
}
