// Navbar — sticky dark header built on official shadcn/ui components
// (Radix primitives): NavigationMenu for the desktop nav + Compare dropdown,
// and Sheet for the responsive mobile drawer.
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

// Primary navigation links rendered inline on desktop.
const NAV_LINKS = [
  { label: "Why Context", href: "/#why-context" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Thesis", href: "/thesis" },
];

// Competitor comparison pages surfaced under the "Compare" dropdown.
const COMPARE_LINKS = [
  {
    label: "vs Mem0",
    href: "/compare/alchemyst-ai-vs-mem0",
    blurb: "Context layer vs AI memory for agents",
  },
  {
    label: "vs Zep",
    href: "/compare/alchemyst-ai-vs-zep",
    blurb: "Context layer vs Zep's memory store",
  },
  {
    label: "vs Palantir",
    href: "/compare/alchemyst-ai-vs-palantir",
    blurb: "Dynamic context vs static ontology & FDEs",
  },
  {
    label: "vs Databricks",
    href: "/compare/alchemyst-ai-vs-databricks",
    blurb: "Semantic meaning vs data governance",
  },
  {
    label: "vs Snowflake Cortex",
    href: "/compare/alchemyst-ai-vs-snowflake-cortex",
    blurb: "Cross-system consensus vs warehouse-bound views",
  },
  {
    label: "vs Glean",
    href: "/compare/alchemyst-ai-vs-glean",
    blurb: "Deterministic agent context vs enterprise search",
  },
];

const SECONDARY_LINKS = [
  { label: "Blog", href: "/blog", external: false },
  { label: "Docs", href: "https://docs.getalchemystai.com", external: true },
];

// Shared classes so inline links match the shadcn trigger sizing/typography.
const linkClass =
  "inline-flex h-9 w-max items-center rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-white hover:bg-white/10 focus:bg-white/10 outline-none";

function ExternalIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="ml-1 opacity-70"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/[0.06] bg-[rgba(10,15,30,0.92)] backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand — actual Alchemyst logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline"
          aria-label="Alchemyst AI home"
        >
          <Image
            src="/logo.png"
            alt="Alchemyst AI"
            width={150}
            height={22}
            priority
            style={{ height: "22px", width: "auto" }}
          />
          <span className="nav-brand-tag border-l border-white/15 pl-2.5 font-[Sora] text-[0.625rem] font-bold uppercase tracking-[0.18em] text-[#0E9594]">
            Context Layer
          </span>
        </Link>

        {/* Desktop nav — shadcn NavigationMenu (Radix) */}
        <NavigationMenu
          viewport={false}
          className="nav-desktop-shadcn hidden md:flex"
        >
          <NavigationMenuList className="gap-1">
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild className={linkClass}>
                  <a href={link.href}>{link.label}</a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Compare dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-slate-300 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white">
                Compare
              </NavigationMenuTrigger>
              <NavigationMenuContent className="rounded-xl border border-white/10 bg-[rgba(17,22,38,0.98)] p-2 shadow-2xl backdrop-blur-xl">
                <ul className="grid w-[340px] gap-1">
                  {COMPARE_LINKS.map((c) => (
                    <li key={c.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={c.href}
                          className="flex flex-col gap-0.5 rounded-lg p-3 no-underline transition-colors hover:bg-[rgba(244,144,37,0.12)] focus:bg-[rgba(244,144,37,0.12)]"
                        >
                          <span className="text-sm font-semibold text-white">
                            Alchemyst {c.label}
                          </span>
                          <span className="text-xs leading-snug text-slate-400">
                            {c.blurb}
                          </span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {SECONDARY_LINKS.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild className={linkClass}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                    {link.external && <ExternalIcon />}
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="ghost"
            size="brand-sm"
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href="/platform/signin">Sign in</Link>
          </Button>
          <Button asChild variant="orange" size="brand-sm">
            <a href="/#get-access">Get API Access</a>
          </Button>
        </div>

        {/* Mobile menu — shadcn Sheet (Radix) */}
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

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col overflow-y-auto px-6 pb-8"
                style={{ maxHeight: "calc(100vh - 73px)" }}
              >
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      className="border-b border-white/5 py-3 text-base font-medium text-slate-300 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}

                <span className="px-0 pb-1.5 pt-4 font-[Sora] text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#0E9594]">
                  Compare
                </span>
                {COMPARE_LINKS.map((c) => (
                  <SheetClose asChild key={c.href}>
                    <Link
                      href={c.href}
                      className="border-b border-white/5 py-3 pl-3.5 text-[0.92rem] text-slate-400 no-underline transition-colors hover:text-white"
                    >
                      Alchemyst {c.label}
                    </Link>
                  </SheetClose>
                ))}

                {SECONDARY_LINKS.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <a
                      href={link.href}
                      className="border-b border-white/5 py-3 text-base font-medium text-slate-300 no-underline transition-colors hover:text-white"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                      {link.external ? " ↗" : ""}
                    </a>
                  </SheetClose>
                ))}

                <div className="mt-4 flex flex-col gap-2.5">
                  <SheetClose asChild>
                    <Button asChild variant="light" size="full">
                      <Link href="/platform/signin">Sign in</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild variant="orange" size="full">
                      <a href="/#get-access">Get API Access</a>
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
