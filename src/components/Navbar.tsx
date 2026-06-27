// Navbar - glassmorphism design with centered layout and backdrop blur
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
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Primary navigation links
  const NAV_LINKS = [
    { label: "Case Studies", href: "/case-study" },
    { label: "Security", href: "/security" },
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "https://docs.getalchemystai.com", external: true },
    { label: "Pricing", href: "/pricing" },
  ];

  // Compare dropdown links
  const COMPARE_LINKS = [
    { label: "Alchemyst AI vs Mem0", href: "/compare/alchemyst-ai-vs-mem0" },
    { label: "Alchemyst AI vs Glean", href: "/compare/alchemyst-ai-vs-glean" },
    { label: "Alchemyst AI vs Palantir", href: "/compare/alchemyst-ai-vs-palantir" },
    { label: "Claude Memory vs Alchemyst", href: "/compare/claude-memory-vs-alchemyst" },
    { label: "LangChain Memory vs Alchemyst", href: "/compare/langchain-memory-vs-alchemyst" },
  ];

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
      <nav className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl flex justify-between items-center w-[70%] px-6 py-2">
        {/* Alchemyst Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
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
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              className="relative text-slate-300 hover:text-white transition-colors duration-200 text-sm group flex items-center whitespace-nowrap"
              aria-haspopup="true"
              aria-expanded={activeMenu === "compare"}
              onClick={() => setActiveMenu(activeMenu === "compare" ? null : "compare")}
            >
              <span className="relative pb-1 flex items-center">
                Compare
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
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
                className="absolute top-full left-0 mt-2 w-64 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-lg p-2"
                style={{ zIndex: 50 }}
                onMouseEnter={() => setActiveMenu("compare")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {COMPARE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/compare"
                  className="block px-3 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-white/5 rounded-md transition-colors border-t border-slate-700/50 mt-1 pt-2"
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
              className="relative text-slate-300 hover:text-white transition-colors duration-200 text-sm group"
            >
              <span className="relative pb-1">
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          ))}
        </div>

        {/* Sign In button */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/platform/signin"
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
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
                className="inline-flex items-center justify-center p-1 text-white"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l border-white/10 bg-[rgba(10,15,30,0.99)] p-0 text-slate-200 backdrop-blur-xl"
            >
              <SheetHeader className="border-b border-white/10 px-6 py-4">
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
                      className="border-b border-white/5 py-3 text-base font-medium text-slate-300 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}

                {/* Compare section in mobile */}
                <div className="border-b border-white/5 py-2">
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
                      className="block py-3 px-4 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 text-lg font-medium text-center"
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