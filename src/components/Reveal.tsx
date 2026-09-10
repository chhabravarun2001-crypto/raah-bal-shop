"use client";

import { useRef, useEffect, ReactNode, ElementType } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  variant?: "up" | "scale" | "fade";
  delay?: number;
  duration?: number;
  start?: string;
};

export default function Reveal({
  children,
  as: Tag = "div",
  className,
  id,
  variant = "up",
  delay = 0,
  duration = 1,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, clearProps: "transform" });
      return;
    }

    const from: gsap.TweenVars =
      variant === "up"
        ? { opacity: 0, y: 36 }
        : variant === "scale"
          ? { opacity: 0, scale: 0.94 }
          : { opacity: 0 };

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: "power3.out",
        onComplete: () => gsap.set(el, { clearProps: "transform" }),
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [variant, delay, duration, start]);

  const Component = Tag as ElementType;

  return (
    <Component ref={ref} id={id} className={className}>
      {children}
    </Component>
  );
}
