// Navbar — light-adaptive glassmorphism nav with centered layout.
// Tracks whether the section directly behind it is dark (data-theme="dark" or
// body[data-page-theme="dark"]) and flips its own tokens so contrast stays
// correct as the user scrolls through light and dark chapters. All link
// labels, order, the Compare dropdown, the mobile Sheet, and the Sign In CTA
// are preserved verbatim for SEO/AEO.
"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // `overDark` is true when the section behind the nav is a dark anchor.
  const [overDark, setOverDark] = useState(false);
  // `scrolled` is true once the user has scrolled past ~12px (adds a stronger
  // hairline + shadow so the nav reads as elevated rather than floating).
  const [scrolled, setScrolled] = useState(false);

  // Primary navigation links (labels + order preserved verbatim).
  const NAV_LINKS = [
    { label: "Case Studies", href: "/case-study" },
    { label: "Security", href: "/security" },
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "https://docs.getalchemystai.com", external: true },
    { label: "Pricing", href: "/pricing" },
    { label: "Creators Program", href: "/creators-program" },
  ];

  // Compare dropdown links (labels + order preserved verbatim).
  const COMPARE_LINKS = [
    { label: "Alchemyst AI vs Mem0", href: "/compare/alchemyst-ai-vs-mem0" },
    { label: "Alchemyst AI vs Glean", href: "/compare/alchemyst-ai-vs-glean" },
    { label: "Alchemyst AI vs Palantir", href: "/compare/alchemyst-ai-vs-palantir" },
    { label: "Claude Memory vs Alchemyst", href: "/compare/claude-memory-vs-alchemyst" },
    { label: "LangChain Memory vs Alchemyst", href: "/compare/langchain-memory-vs-alchemyst" },
  ];

  // Track scroll position for the elevated-hairline treatment.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observe which section is directly behind the nav (a thin sentinel strip
  // at the nav's vertical center). If that section carries data-theme="dark"
  // or the page body is marked dark, flip the nav into its dark treatment.
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fast path: if the whole page is a deliberate dark-anchor page
    // (thesis / blog post / compare detail), start dark and stay dark.
    const pageDark =
      document.body.getAttribute("data-page-theme") === "dark";
    if (pageDark) {
      setOverDark(true);
      return;
    }

    const NAV_CENTER_Y = 56; // approx nav vertical center in px from top

    const probe = () => {
      // Find the topmost element at the nav's center that is a [data-theme]
      // anchor or a <section> carrying the dark hero background.
      const els = document.elementsFromPoint(window.innerWidth / 2, NAV_CENTER_Y);
      for (const el of els) {
        if (el.closest("[data-theme='dark']")) {
          setOverDark(true);
          return;
        }
      }
      setOverDark(false);
    };

    probe();
    // Re-probe on scroll (throttled to rAF) and on resize.
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        probe();
      });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
      <nav
        data-theme={overDark ? "dark" : undefined}
        className={[
          "backdrop-blur-xl rounded-none flex justify-between items-center w-[70%] px-6 py-2",
          "border-b transition-colors duration-200",
          overDark
            ? "bg-slate-900/60 border-slate-700/50"
            : "bg-white/30 border-black/10",
          scrolled ? "shadow-[0_8px_32px_-12px_rgba(15,23,42,0.1)]" : "",
        ].join(" ")}
      >
        {/* Alchemyst Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logoDark.png"
            alt="Alchemyst AI"
            width={160}
            height={160}
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Centered Navigation Sections */}
        <div className="hidden md:flex items-center space-x-6 relative">
          {/* Compare dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("compare")}
          >
            <button
              className="relative transition-colors duration-200 text-sm group flex items-center whitespace-nowrap"
              style={{
                color: overDark ? "#cbd5e1" : "#475569",
              }}
              aria-haspopup="true"
              aria-expanded={activeMenu === "compare"}
              onClick={() => setActiveMenu(activeMenu === "compare" ? null : "compare")}
              onMouseEnter={(e) => {
                (e.currentTarget.style.color = overDark ? "#ffffff" : "#0F172A");
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.color = overDark ? "#cbd5e1" : "#475569");
              }}
            >
              <span className="relative pb-1 flex items-center">
                Compare
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ background: overDark ? "#ffffff" : "#0F172A" }}
                />
              </span>
              <svg
                className="ml-1 size-3 transition-transform duration-200 flex-shrink-0"
                style={{ transform: activeMenu === "compare" ? "rotate(180deg)" : undefined }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {activeMenu === "compare" && (
              <div
                className="absolute top-full left-0 mt-2 w-64 rounded-none shadow-lg p-2 backdrop-blur-md border"
                style={{
                  zIndex: 50,
                  background: overDark ? "rgba(15,23,42,0.95)" : "rgba(255,255,255,0.98)",
                  borderColor: overDark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)",
                }}
                onMouseEnter={() => setActiveMenu("compare")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {COMPARE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-sm rounded-none transition-colors"
                    style={{
                      color: overDark ? "#cbd5e1" : "#475569",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = overDark ? "#ffffff" : "#0F172A";
                      e.currentTarget.style.background = overDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = overDark ? "#cbd5e1" : "#475569";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/compare"
                  className="block px-3 py-2 text-sm rounded-none transition-colors border-t mt-1 pt-2"
                  style={{
                    color: "#F49025",
                    borderColor: overDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FDB560";
                    e.currentTarget.style.background = overDark ? "rgba(255,255,255,0.05)" : "rgba(244,144,37,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#F49025";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  See all comparisons
                </Link>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="relative transition-colors duration-200 text-sm group"
              style={{
                color: overDark ? "#cbd5e1" : "#475569",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = overDark ? "#ffffff" : "#0F172A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = overDark ? "#cbd5e1" : "#475569";
              }}
            >
              <span className="relative pb-1">
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ background: overDark ? "#ffffff" : "#0F172A" }}
                />
              </span>
            </Link>
          ))}
        </div>

        {/* Sign In button */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/platform/signin"
            className="px-4 py-2 text-sm font-semibold text-white rounded-none transition-colors duration-200"
            style={{ background: "#0F172A" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1E293B";
              e.currentTarget.style.boxShadow = "4px 4px 0px #128F8B";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0F172A";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex items-center justify-center p-1"
                style={{ color: overDark ? "#ffffff" : "#0F172A" }}
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l bg-[rgba(10,15,30,0.99)] p-0 text-slate-200 backdrop-blur-xl"
              style={{ borderColor: "rgba(255,255,255,0.10)" }}
            >
              <SheetHeader className="border-b px-6 py-4" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                <SheetTitle className="text-left">
                  <Image
                    src="/logo.png"
                    alt="Alchemyst AI"
                    width={140}
                    height={20}
                    style={{ height: "20px", width: "auto" }}
                  />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col overflow-y-auto px-6 pb-8">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="border-b py-3 text-base font-medium text-slate-300 no-underline transition-colors hover:text-white"
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}

                {/* Compare section in mobile */}
                <div className="border-b py-2" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span className="text-xs font-semibold text-white/60 px-2 py-1 block">Compare</span>
                  {COMPARE_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="py-2 pl-4 text-sm text-slate-300 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/compare" className="py-2 pl-4 text-sm text-amber-400 hover:text-amber-300">
                      See all comparisons
                    </Link>
                  </SheetClose>
                </div>

                <div className="mt-4 flex flex-col gap-2.5">
                  <SheetClose asChild>
                    <Link
                      href="/platform/signin"
                      className="block py-3 px-4 text-white rounded-none transition-colors duration-200 text-lg font-medium text-center"
                      style={{ background: "#F49025" }}
                    >
                      Sign In
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
