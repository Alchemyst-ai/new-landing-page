"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#F49025] to-[#128F8B] z-[9999]"
    />
  );
}
