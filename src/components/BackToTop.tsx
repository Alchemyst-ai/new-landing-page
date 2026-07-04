"use client";

// BackToTop — a small caret next to the footer copyright that smooth-scrolls
// to the top on click (Supermemory's footer micro-interaction).

import { useReducedMotion } from "framer-motion";

export default function BackToTop() {
  const reduce = useReducedMotion();
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px 4px",
        color: "#475569",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11px",
        letterSpacing: "0.06em",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        transition: "color 160ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#F49025";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#475569";
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
      top
    </button>
  );
}
