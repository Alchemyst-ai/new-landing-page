// Navbar: floating, light-adaptive glass nav.
// - Probes the section directly behind it and flips to the warm-charcoal
//   treatment over [data-theme='dark'] chapters (dark chapter, footer).
// - Tucks away while scrolling down and returns on the slightest scroll up,
//   so long-form reading and pinned sequences get the full viewport.
// - Compare dropdown animates, closes on pointer leave, Escape and outside click.
// Link labels, order, the Compare list and the Sign In CTA are preserved.
"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/components/sections/iso/kit";

const EASE = [0.23, 1, 0.32, 1] as const;

// Primary navigation links (labels + order preserved).
const NAV_LINKS = [
  { label: "Case Studies", href: "/case-study" },
  { label: "Security", href: "/security" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "https://docs.getalchemystai.com", external: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Creators Program", href: "/creators-program" },
];

// Compare dropdown links (labels + order preserved).
const COMPARE_LINKS = [
  { label: "Alchemyst AI vs Mem0", href: "/compare/alchemyst-ai-vs-mem0" },
  { label: "Alchemyst AI vs Glean", href: "/compare/alchemyst-ai-vs-glean" },
  { label: "Alchemyst AI vs Palantir", href: "/compare/alchemyst-ai-vs-palantir" },
  { label: "Claude Memory vs Alchemyst", href: "/compare/claude-memory-vs-alchemyst" },
  { label: "LangChain Memory vs Alchemyst", href: "/compare/langchain-memory-vs-alchemyst" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const reduce = useReducedMotionSafe();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const compareRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll state: elevation, hide-on-down / show-on-up, dark-section probe.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const NAV_CENTER_Y = 44;

    const probe = () => {
      const els = document.elementsFromPoint(window.innerWidth / 2, NAV_CENTER_Y);
      for (const el of els) {
        if (el.closest("nav[data-site-nav]")) continue;
        setOverDark(!!el.closest("[data-theme='dark']"));
        return;
      }
      setOverDark(false);
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      const delta = y - lastY;
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastY = y;
      probe();
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Close the dropdown on route change, Escape, and outside click.
  useEffect(() => setCompareOpen(false), [pathname]);
  useEffect(() => {
    if (!compareOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCompareOpen(false);
    const onDown = (e: PointerEvent) => {
      if (compareRef.current && !compareRef.current.contains(e.target as Node)) setCompareOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [compareOpen]);

  const openCompare = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCompareOpen(true);
  };
  const closeCompareSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setCompareOpen(false), 160);
  };

  const isActive = (href: string) =>
    !href.startsWith("http") && (pathname === href || pathname.startsWith(`${href}/`));
  const compareActive = pathname.startsWith("/compare");
  const showNav = !hidden || compareOpen || mobileOpen;

  return (
    <motion.div
      className="fixed top-3 md:top-4 left-0 right-0 z-50 px-3 md:px-6 flex justify-center pointer-events-none"
      initial={false}
      animate={{ y: showNav ? 0 : -96, opacity: showNav ? 1 : 0 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
    >
      <nav
        data-site-nav
        data-theme={overDark ? "dark" : undefined}
        aria-label="Primary"
        className={[
          "pointer-events-auto w-full max-w-[1200px] flex items-center justify-between gap-6",
          "rounded-[calc(var(--radius)+4px)] border pl-5 pr-2 py-2 backdrop-blur-xl backdrop-saturate-150",
          "transition-[background-color,border-color,box-shadow] duration-300",
          overDark
            ? "bg-[#1C1917]/75 border-white/[0.08]"
            : scrolled
              ? "bg-[#FDFBF7]/80 border-[#E4D9BC]"
              : "bg-[#FDFBF7]/55 border-[#E4D9BC]/70",
          scrolled
            ? overDark
              ? "shadow-[0_12px_32px_-16px_rgba(0,0,0,0.6)]"
              : "shadow-[0_12px_32px_-16px_rgba(74,59,51,0.28)]"
            : "",
        ].join(" ")}
      >
        {/* Logo: dark ink artwork on paper, white artwork over dark chapters. */}
        <Link href="/" className="relative flex items-center shrink-0 h-7" aria-label="Alchemyst AI home">
          <Image
            src="/logoDark.png"
            alt="Alchemyst AI"
            width={1388}
            height={193}
            className={`h-[22px] w-auto object-contain transition-opacity duration-300 ${overDark ? "opacity-0" : "opacity-100"}`}
            priority
          />
          <Image
            src="/logo.png"
            alt=""
            aria-hidden
            width={1388}
            height={200}
            className={`absolute left-0 top-1/2 -translate-y-1/2 h-[22px] w-auto object-contain transition-opacity duration-300 ${overDark ? "opacity-100" : "opacity-0"}`}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          <div
            ref={compareRef}
            className="relative"
            onMouseEnter={openCompare}
            onMouseLeave={closeCompareSoon}
          >
            <button
              type="button"
              className={`nav-link relative flex items-center gap-1 px-3 py-2 text-[0.875rem] ${compareActive ? "!text-[color:var(--ink)]" : ""}`}
              aria-haspopup="true"
              aria-expanded={compareOpen}
              onClick={() => setCompareOpen((o) => !o)}
            >
              Compare
              <svg
                className="size-3 transition-transform duration-300"
                style={{ transform: compareOpen ? "rotate(180deg)" : undefined }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {compareActive && <ActiveMark />}
            </button>
            <AnimatePresence>
              {compareOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.985 }}
                  transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                  style={{ transformOrigin: "top left" }}
                  className={`absolute top-full left-0 mt-3 w-72 rounded-[calc(var(--radius)+2px)] border p-1.5 backdrop-blur-xl shadow-[var(--shadow-soft-lg)] ${
                    overDark ? "bg-[#1C1917]/95 border-white/[0.08]" : "bg-[#FDFBF7]/95 border-[#E4D9BC]"
                  }`}
                >
                  {COMPARE_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="nav-menu-item flex items-center justify-between px-3 py-2.5 text-[0.875rem] rounded-[var(--radius)]"
                    >
                      {link.label}
                      {pathname === link.href && <span className="h-1.5 w-1.5 bg-[color:var(--amber)]" aria-hidden />}
                    </Link>
                  ))}
                  <div className={`my-1 h-px ${overDark ? "bg-white/[0.06]" : "bg-[#E4D9BC]/70"}`} />
                  <Link
                    href="/compare"
                    className="nav-menu-item-accent flex items-center justify-between px-3 py-2.5 text-[0.875rem] font-bold rounded-[var(--radius)]"
                  >
                    See all comparisons
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-current={active ? "page" : undefined}
                className={`nav-link group relative px-3 py-2 text-[0.875rem] ${active ? "!text-[color:var(--ink)]" : ""}`}
              >
                {link.label}
                {active ? (
                  <ActiveMark />
                ) : (
                  <span
                    aria-hidden
                    className="absolute left-3 right-3 bottom-1 h-px origin-left scale-x-0 bg-current opacity-60 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Sign In */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/platform/signin"
            className="group/btn inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-5 py-2.5 text-[0.8125rem] font-bold tracking-wide text-white shadow-[var(--shadow-soft)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-px hover:bg-[#A16207] hover:shadow-[var(--shadow-soft-lg)]"
          >
            Sign In
            <svg className="transition-transform duration-300 group-hover/btn:translate-x-[2px]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] transition-colors hover:bg-black/[0.04]"
                style={{ color: "var(--ink)" }}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              data-theme="dark"
              className="w-[320px] border-l border-white/[0.08] bg-[#1C1917] p-0 text-[#E7E5E4]"
            >
              <SheetHeader className="border-b border-white/[0.08] px-6 py-5">
                <SheetTitle className="text-left">
                  <Image src="/logo.png" alt="Alchemyst AI" width={1388} height={200} style={{ height: "20px", width: "auto" }} />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col overflow-y-auto px-6 pb-8" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={`flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[0.9375rem] transition-colors hover:text-white ${
                        isActive(link.href) ? "text-[#E4C090]" : "text-[#D6D3D1]"
                      }`}
                    >
                      {link.label}
                      <span aria-hidden className="text-[#57534E]">→</span>
                    </Link>
                  </SheetClose>
                ))}

                <div className="border-b border-white/[0.06] py-3">
                  <span className="block py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#78716C]">Compare</span>
                  {COMPARE_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link href={link.href} className="block py-2 pl-3 text-sm text-[#A8A29E] transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/compare" className="block py-2 pl-3 text-sm font-bold text-[#E4C090] hover:text-[#F2DABA]">
                      See all comparisons
                    </Link>
                  </SheetClose>
                </div>

                <SheetClose asChild>
                  <Link
                    href="/platform/signin"
                    className="mt-6 block rounded-[var(--radius)] bg-[#B45309] px-4 py-3.5 text-center text-[0.9375rem] font-bold text-white shadow-[var(--shadow-soft)] transition-colors hover:bg-[#A16207]"
                  >
                    Sign In
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.div>
  );
}

/** Active-page marker: the diagrams' 5px amber square, under the label. */
function ActiveMark() {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 -bottom-0.5 h-[4px] w-[4px] -translate-x-1/2 bg-[color:var(--amber)]"
    />
  );
}
