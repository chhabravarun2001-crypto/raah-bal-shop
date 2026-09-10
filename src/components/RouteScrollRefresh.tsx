"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Nav, Footer, and the rest of the root layout never unmount across
 * client-side navigation — only `children` does — so their ScrollTrigger
 * reveals keep whatever pixel positions were measured on first load. Once a
 * different page's content shifts something like the footer up or down, the
 * old trigger point may never be crossed again, leaving that reveal stuck at
 * its pre-animation state. Re-measure every time the route changes instead.
 */
export default function RouteScrollRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
