"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [topOffset, setTopOffset] = useState<number | null>(null);

  useEffect(() => {
    const measureHeader = () => {
      const header = document.getElementById("site-header");
      const height = header?.getBoundingClientRect().height ?? 0;
      setTopOffset(height);
    };

    measureHeader();
    window.addEventListener("resize", measureHeader);
    window.addEventListener("orientationchange", measureHeader);
    return () => {
      window.removeEventListener("resize", measureHeader);
      window.removeEventListener("orientationchange", measureHeader);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("blog");
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;

      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.scrollHeight;
        const scrollable = Math.max(1, sectionHeight - viewportHeight);
        const raw = (scrollY - sectionTop) / scrollable;
        const clamped = Math.max(0, Math.min(1, raw));
        setProgress(clamped);
      } else {
        const doc = document.documentElement;
        const total = Math.max(1, doc.scrollHeight - viewportHeight);
        const clamped = Math.max(0, Math.min(1, scrollY / total));
        setProgress(clamped);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (topOffset === null) return null;

  return (
    <div
      style={{ top: topOffset ?? 0 }}
      className="fixed left-0 right-0 z-40 h-1 bg-transparent"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
} 