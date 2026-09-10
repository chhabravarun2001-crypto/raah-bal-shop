import type { CSSProperties } from "react";
import Link from "next/link";
import Logo from "./Logo";
import NotifyForm from "./NotifyForm";
import Magnetic from "./Magnetic";
import GradientOrbs from "./GradientOrbs";
import Reveal from "./Reveal";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All pieces", href: "/shop" },
      { label: "Matter 12", href: "/matter-12" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "The Story", href: "/about" },
      { label: "Account", href: "/account" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy-policy" },
      { label: "Terms of Service", href: "/policies/terms-of-service" },
      { label: "Shipping Policy", href: "/policies/shipping-policy" },
      { label: "Returns & Refunds", href: "/policies/refund-policy" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "https://instagram.com", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      data-nav-theme="light"
      className="relative overflow-hidden bg-paper px-6 pt-24 text-ink sm:px-10"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, var(--color-ember), var(--color-gold))" }}
      />

      <GradientOrbs
        className="-z-10"
        orbs={[
          { color: "var(--color-ember)", size: 480, top: "-15%", left: "10%", opacity: 0.1 },
          { color: "var(--color-steel)", size: 400, bottom: "-10%", right: "5%", opacity: 0.08 },
        ]}
      />

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-16 border-b border-ink/10 pb-16 lg:flex-row lg:justify-between">
        <Reveal variant="up" className="max-w-sm">
          <Logo variant="ink" className="text-xl" />
          <p className="mt-4 font-mono text-[11px] tracking-[0.25em] text-ink/50">STRENGTH, EARNED.</p>

          <p className="mt-10 mb-3 text-sm text-ink/60">First access to every drop.</p>
          <NotifyForm
            source="RAAH | BAL footer newsletter"
            buttonLabel="Join →"
            successLabel="You're on the list."
            placeholder="Your email"
            inputClassName="border-ink/30 text-ink placeholder:text-ink/40"
            buttonClassName="border border-ink text-ink"
            sweepStyle={{ "--sweep-color": "var(--color-ink)", "--sweep-text": "var(--color-paper)" } as CSSProperties}
          />
        </Reveal>

        <Reveal variant="up" delay={0.1} className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="mb-4 font-mono text-[11px] tracking-[0.2em] text-ink/40">{col.title}</h5>
              <ul className="flex flex-col gap-2.5 text-sm text-ink/70">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      data-hover
                      className="link-draw transition-colors hover:text-ink"
                      {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal variant="scale" duration={1.2} className="relative flex justify-center py-14 sm:py-20">
        <span className="font-display text-[16vw] uppercase leading-none text-ink/90 sm:text-8xl">BAL</span>
      </Reveal>

      <div className="relative mx-auto flex max-w-[1600px] flex-col items-center gap-4 border-t border-ink/10 py-8 text-center font-mono text-[10px] tracking-[0.2em] text-ink/40 sm:flex-row sm:justify-between">
        <span>RAAH | BAL</span>
        <span>© 2026 RAAH | BAL. All rights reserved.</span>
        <Magnetic strength={0.5}>
          <Link href="/" data-hover className="hover:text-ink">
            Back to top ↑
          </Link>
        </Magnetic>
      </div>
    </footer>
  );
}
