// Navbar: floating, light-adaptive glass nav.
// - Probes the section directly behind it and flips to the warm-charcoal
//   treatment over [data-theme='dark'] chapters (dark chapter, footer).
// - Tucks away while scrolling down and returns on the slightest scroll up,
//   so long-form reading and pinned sequences get the full viewport.
// - Compare / Resources dropdowns animate, close on pointer leave, Escape and outside click.
// Order: Compare, Resources, Blog, Docs, Pricing, Labs, then the Sign In CTA.
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

type NavLink = { label: string; href: string; external?: boolean };
type NavMenu = {
  label: string;
  items: NavLink[];
  footer?: NavLink;
};
type NavItem = ({ kind: "link" } & NavLink) | ({ kind: "menu" } & NavMenu);

// Compare dropdown links (labels + order preserved).
const COMPARE_LINKS: NavLink[] = [
  { label: "Alchemyst AI vs Mem0", href: "/compare/alchemyst-ai-vs-mem0" },
  { label: "Alchemyst AI vs Glean", href: "/compare/alchemyst-ai-vs-glean" },
  { label: "Alchemyst AI vs Palantir", href: "/compare/alchemyst-ai-vs-palantir" },
  { label: "Claude Memory vs Alchemyst", href: "/compare/claude-memory-vs-alchemyst" },
  { label: "LangChain Memory vs Alchemyst", href: "/compare/langchain-memory-vs-alchemyst" },
];

// Resources dropdown links.
const RESOURCE_LINKS: NavLink[] = [
  { label: "Use Cases", href: "/use-cases" },
  { label: "Case Studies", href: "/case-study" },
  { label: "Security", href: "/security" },
  { label: "Creators Program", href: "/creators-program" },
];

// Primary navigation, in display order.
const NAV_ITEMS: NavItem[] = [
  {
    kind: "menu",
    label: "Compare",
    items: COMPARE_LINKS,
    footer: { label: "See all comparisons", href: "/compare" },
  },
  { kind: "menu", label: "Resources", items: RESOURCE_LINKS },
  { kind: "link", label: "Blog", href: "/blog" },
  { kind: "link", label: "Docs", href: "https://docs.getalchemystai.com", external: true },
  { kind: "link", label: "Pricing", href: "/pricing" },
  { kind: "link", label: "Labs", href: "https://getalchemystai.com/labs", external: true },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const reduce = useReducedMotionSafe();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [overDark, setOverDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
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

  // Close dropdowns on route change, Escape, and outside click.
  useEffect(() => setOpenMenu(null), [pathname]);
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest?.(`[data-nav-menu="${openMenu}"]`)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [openMenu]);

  const openMenuNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeMenuSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const isActive = (href: string) =>
    !href.startsWith("http") && (pathname === href || pathname.startsWith(`${href}/`));
  const isMenuActive = (menu: NavMenu) =>
    menu.items.some((l) => isActive(l.href)) || (!!menu.footer && isActive(menu.footer.href));
  const showNav = !hidden || !!openMenu || mobileOpen;

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
          {NAV_ITEMS.map((item) => {
            if (item.kind === "menu") {
              const open = openMenu === item.label;
              const active = isMenuActive(item);
              return (
                <div
                  key={item.label}
                  data-nav-menu={item.label}
                  className="relative"
                  onMouseEnter={() => openMenuNow(item.label)}
                  onMouseLeave={closeMenuSoon}
                >
                  <button
                    type="button"
                    className={`nav-link relative flex items-center gap-1 px-3 py-2 text-[0.875rem] ${active ? "!text-[color:var(--ink)]" : ""}`}
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => setOpenMenu((o) => (o === item.label ? null : item.label))}
                  >
                    {item.label}
                    <svg
                      className="size-3 transition-transform duration-300"
                      style={{ transform: open ? "rotate(180deg)" : undefined }}
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
                    {active && <ActiveMark />}
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.985 }}
                        transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                        style={{ transformOrigin: "top left" }}
                        className={`absolute top-full left-0 mt-3 ${item.footer ? "w-72" : "w-56"} rounded-[calc(var(--radius)+2px)] border p-1.5 backdrop-blur-xl shadow-[var(--shadow-soft-lg)] ${
                          overDark ? "bg-[#1C1917]/95 border-white/[0.08]" : "bg-[#FDFBF7]/95 border-[#E4D9BC]"
                        }`}
                      >
                        {item.items.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="nav-menu-item flex items-center justify-between px-3 py-2.5 text-[0.875rem] rounded-[var(--radius)]"
                          >
                            {link.label}
                            {isActive(link.href) && <span className="h-1.5 w-1.5 bg-[color:var(--amber)]" aria-hidden />}
                          </Link>
                        ))}
                        {item.footer && (
                          <>
                            <div className={`my-1 h-px ${overDark ? "bg-white/[0.06]" : "bg-[#E4D9BC]/70"}`} />
                            <Link
                              href={item.footer.href}
                              className="nav-menu-item-accent flex items-center justify-between px-3 py-2.5 text-[0.875rem] font-bold rounded-[var(--radius)]"
                            >
                              {item.footer.label}
                              <span aria-hidden>→</span>
                            </Link>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-current={active ? "page" : undefined}
                className={`nav-link group relative px-3 py-2 text-[0.875rem] ${active ? "!text-[color:var(--ink)]" : ""}`}
              >
                {item.label}
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
                {NAV_ITEMS.map((item) =>
                  item.kind === "menu" ? (
                    <div key={item.label} className="border-b border-white/[0.06] py-3">
                      <span className="block py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#78716C]">
                        {item.label}
                      </span>
                      {item.items.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={`block py-2 pl-3 text-sm transition-colors hover:text-white ${
                              isActive(link.href) ? "text-[#E4C090]" : "text-[#A8A29E]"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                      {item.footer && (
                        <SheetClose asChild>
                          <Link href={item.footer.href} className="block py-2 pl-3 text-sm font-bold text-[#E4C090] hover:text-[#F2DABA]">
                            {item.footer.label}
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  ) : (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className={`flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[0.9375rem] transition-colors hover:text-white ${
                          isActive(item.href) ? "text-[#E4C090]" : "text-[#D6D3D1]"
                        }`}
                      >
                        {item.label}
                        <span aria-hidden className="text-[#57534E]">→</span>
                      </Link>
                    </SheetClose>
                  ),
                )}

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
