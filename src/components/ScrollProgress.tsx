"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** 2px reading-progress hairline pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#B45309] via-[#A16207] to-[#E4C090] z-[9999]"
    />
  );
}
