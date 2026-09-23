"use client";

// SmoothScroll: site-wide inertial scrolling via Lenis. Mounted once in the
// root layout. Lenis drives the native scroll position, so framer-motion's
// useScroll / whileInView keep working unchanged. Disabled entirely for users
// who prefer reduced motion, and on touch devices (native momentum is kept).

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Smooth in-page anchor links, landing below the floating navbar.
      anchors: { offset: -96 },
      autoRaf: true,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) lenis.destroy();
    };
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = undefined;
    };
  }, []);

  // Route changes: jump to the top instantly so Lenis's internal target
  // matches the scroll reset that Next.js performs.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const hash = window.location.hash;
    if (hash) {
      // Cross-page anchor (e.g. /#get-access): let the DOM settle, then glide.
      const id = window.setTimeout(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) lenis.scrollTo(el, { offset: -96, immediate: true });
      }, 60);
      return () => window.clearTimeout(id);
    }
    lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
