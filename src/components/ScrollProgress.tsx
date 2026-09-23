"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#B45309] to-[#E4C090] z-[9999]"
    />
  );
}
