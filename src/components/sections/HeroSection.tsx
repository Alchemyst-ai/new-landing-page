"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BrandButton, Figure, SpecStrip } from "@/components/brand";
import { FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import ContextStack from "./ContextStack";
import HeroNetwork from "./HeroNetwork";
import { useReducedMotionSafe } from "./iso/kit";

const ease = [0.23, 1, 0.32, 1] as const;

export default function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Scroll-out depth: copy lifts away faster than the diagram.
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);
  const figY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full min-h-[100svh] flex items-center overflow-hidden bg-[#FDFBF7]"
      aria-labelledby="hero-heading"
    >
      <div aria-hidden className="plate-grid absolute inset-0 opacity-80" />
      <HeroNetwork />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left: copy */}
          <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }} className="lg:col-span-6 flex flex-col">
            <Stagger onMount stagger={0.08}>
              <FadeUp distance={12} className="mb-9">
                <span className="inline-flex items-center gap-2.5 rounded-[var(--radius)] border border-[#E4D9BC] bg-white/80 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#57534E] shadow-[var(--shadow-soft)] backdrop-blur-sm">
                  <span aria-hidden className="h-[7px] w-[7px] bg-[#B45309]" />
                  Context Engine
                </span>
              </FadeUp>
            </Stagger>

            <RevealText
              as="h1"
              id="hero-heading"
              onMount
              delay={0.1}
              stagger={0.05}
              className="text-[clamp(2.5rem,5.4vw,4.25rem)] font-bold tracking-[-0.04em] text-[#4A3B33] leading-[1.06] mb-8 text-balance"
            >
              The institutional memory your{" "}
              <span className="text-[#B45309] italic">AI&nbsp;agents</span>{" "}
              need to operate.
            </RevealText>

            <Stagger onMount delay={0.45} stagger={0.1}>
              <FadeUp>
                <p className="text-[1.125rem] text-[#57534E] leading-[1.75] mb-10 max-w-[31rem]">
                  Alchemyst AI is the context backbone that keeps every
                  agent&apos;s knowledge current, traceable and semantically
                  consistent across your entire organisation through a
                  single API.
                </p>
              </FadeUp>

              <FadeUp className="flex flex-wrap gap-3 mb-14">
                <BrandButton href="/platform/signin" target="_blank" rel="noopener" arrow>
                  Get API Access
                </BrandButton>
                <BrandButton href="https://docs.getalchemystai.com" variant="outline" external>
                  Read the Docs
                </BrandButton>
              </FadeUp>

              <FadeUp>
                <SpecStrip
                  className="w-fit"
                  items={[
                    { value: "< 300ms", label: "p95 latency" },
                    { value: "100%", label: "auditable" },
                    { value: "1 API", label: "zero infra" },
                  ]}
                />
              </FadeUp>
            </Stagger>
          </motion.div>

          {/* Right: diagram */}
          <motion.div
            style={reduce ? undefined : { y: figY }}
            className="lg:col-span-6 relative"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease }}
            >
              <Figure>
                <ContextStack />
              </Figure>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue: a hairline with a travelling amber segment. */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-[#E4D9BC] md:block"
      >
        {!reduce && (
          <motion.span
            className="absolute left-0 top-0 block h-5 w-px bg-[#B45309]"
            animate={{ y: [-20, 56] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.65, 0, 0.35, 1], repeatDelay: 0.4 }}
          />
        )}
      </motion.div>
    </section>
  );
}
