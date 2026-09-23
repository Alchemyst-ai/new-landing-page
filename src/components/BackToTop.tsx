"use client";

// BackToTop: an icon-only square button in the footer bar that glides back
// to the top (through Lenis when active, native otherwise).

import { useReducedMotionSafe } from "@/components/sections/iso/kit";

export default function BackToTop() {
  const reduce = useReducedMotionSafe();
  const onClick = () => {
    if (window.__lenis && !reduce) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className="group inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-white/[0.08] text-[#A8A29E] transition-colors duration-200 hover:border-[#E4C090]/50 hover:text-[#E4C090]"
    >
      <svg
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
