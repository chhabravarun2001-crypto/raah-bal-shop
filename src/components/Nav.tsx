"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useCart } from "@/lib/cart/CartContext";
import { IconBag, IconUser } from "./icons";

const LINKS = [
  { href: "/matter-12", label: "Matter 12" },
  { href: "/about", label: "About" },
];

const MENU_LINKS = [
  { href: "/", label: "HOME", tagline: "RAAH | BAL" },
  { href: "/matter-12", label: "MATTER 12", tagline: "Twelve stages" },
  { href: "/about", label: "ABOUT", tagline: "The story" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [sectionTheme, setSectionTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const lastY = useRef(0);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
    if (!sections.length) {
      // Defensive fallback for a page that declares no theme sections at
      // all — reflects a DOM query result, not state derivable at render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSectionTheme("light");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const t = entry.target.getAttribute("data-nav-theme");
            if (t === "light" || t === "dark") setSectionTheme(t);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      if (y < 80) {
        setHidden(false);
      } else if (y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isDark = sectionTheme === "dark";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isDark ? "text-paper" : "text-ink"
        } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className={`transition-all duration-500 ${scrolled ? "mx-3 mt-3 sm:mx-5 sm:mt-4" : "mx-0 mt-0"}`}>
          <div
            className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8 transition-all duration-500 ${
              scrolled
                ? `rounded-full border py-3 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.16)] ${
                    isDark ? "border-paper/15 bg-ink/35" : "border-ink/10 bg-paper/60"
                  }`
                : "py-5 sm:py-6"
            }`}
          >
            <Link href="/" aria-label="RAAH | BAL home" data-hover>
              <Logo variant={isDark ? "paper" : "ink"} className="text-lg sm:text-xl" />
            </Link>

            <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.2em] uppercase">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} data-hover className="link-draw opacity-80 transition-opacity hover:opacity-100">
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.2em] uppercase sm:gap-5">
              <Link href="/account" aria-label="Account" data-hover className="p-1">
                <IconUser className="h-[18px] w-[18px]" />
              </Link>
              <button onClick={openCart} aria-label="Open cart" data-hover className="relative p-1">
                <IconBag className="h-[18px] w-[18px]" />
                {count > 0 && (
                  <span
                    className={`absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full font-mono text-[9px] normal-case ${
                      isDark ? "bg-paper text-ink" : "bg-ink text-paper"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
              <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="flex flex-col gap-[5px] p-1">
                <span className={`block h-[1.5px] w-6 ${isDark ? "bg-paper" : "bg-ink"}`} />
                <span className={`block h-[1.5px] w-4 self-end ${isDark ? "bg-paper" : "bg-ink"}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] overflow-hidden bg-ink text-paper transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-[background] duration-700 ease-out"
          style={{
            background:
              hoveredMenuIndex != null
                ? `radial-gradient(640px circle at 18% ${14 + hoveredMenuIndex * 19}%, color-mix(in srgb, var(--color-ember) 22%, transparent), transparent 70%)`
                : "transparent",
          }}
        />

        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col px-6 sm:px-10">
          <div className="flex items-center justify-between py-5 sm:py-6">
            <Logo variant="paper" className="text-lg sm:text-xl" />
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="relative h-8 w-8">
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-paper" />
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-paper" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-1" onMouseLeave={() => setHoveredMenuIndex(null)}>
            {MENU_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => setHoveredMenuIndex(i)}
                data-hover
                style={{ transitionDelay: menuOpen ? `${140 + i * 60}ms` : "0ms" }}
                className={`group relative flex w-full items-baseline gap-4 py-2 transition-all duration-500 ease-out sm:py-3 ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <span className="w-6 shrink-0 font-mono text-xs text-paper/40 transition-colors duration-300 group-hover:text-ember">
                  0{i + 1}
                </span>
                <span className="relative inline-block">
                  <span className="font-display inline-block text-[11vw] leading-[0.95] uppercase transition-all duration-300 ease-out group-hover:translate-x-3 group-hover:text-ember sm:text-6xl">
                    {l.label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                </span>
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-paper/0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-paper/60 group-hover:opacity-100 sm:inline-block sm:-translate-x-2">
                  {l.tagline}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className={`flex items-center justify-between border-t border-paper/10 py-6 font-mono text-[10px] tracking-[0.2em] text-paper/40 transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "440ms" : "0ms" }}
          >
            <Link href="/account" onClick={() => setMenuOpen(false)} data-hover className="hover:text-paper">
              Account
            </Link>
            <span>STRENGTH, EARNED.</span>
          </div>
        </div>
      </div>
    </>
  );
}
