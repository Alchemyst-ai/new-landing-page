"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { BrandButton, SpecStrip } from "@/components/brand";
import { FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import ContextStack from "./ContextStack";
import ContextGraphField from "./ContextGraphField";
import { useReducedMotionSafe } from "./iso/kit";

const ease = [0.23, 1, 0.32, 1] as const;

/** Investor mark rendered in brand ink: a mask layer repaints the logo's
 *  shape so native brand colours never leak into the site palette. */
function TintedLogo({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <span className="relative inline-flex">
      <Image src={src} alt={alt} width={width} height={height} priority className={className} />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#4A3B33]"
        style={{
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </span>
  );
}

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
      <ContextGraphField
        density={10}
        maxClusters={150}
        intensity={0.3}
        mask="radial-gradient(ellipse 85% 78% at 50% 46%, #000 38%, transparent 86%)"
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          {/* Left: copy */}
          <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }} className="lg:col-span-6 flex flex-col">
            <Stagger onMount stagger={0.08}>
              <FadeUp distance={12} className="mb-9">
                <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#78716C]">
                  Backed by
                  <TintedLogo src="/Antler.svg" alt="Antler" width={1952} height={470} className="h-4 w-auto" />
                  <span aria-hidden className="h-3.5 w-px bg-[#D6CFC4]" />
                  <TintedLogo src="/9uinicorn.png" alt="9Unicorns" width={1000} height={342} className="h-6 w-auto" />
                  <span aria-hidden className="h-3.5 w-px bg-[#D6CFC4]" />
                  <TintedLogo src="/ipv-logo.png" alt="Inflection Point Ventures" width={838} height={240} className="h-6 w-auto" />
                </span>
              </FadeUp>
            </Stagger>

            <RevealText
              as="h1"
              id="hero-heading"
              onMount
              delay={0.1}
              stagger={0.05}
              className="text-[clamp(2.25rem,4.3vw,3.5rem)] font-medium tracking-[-0.03em] text-[#4A3B33] leading-[1.12] mb-7 max-w-[34rem] text-balance"
            >
              The backbone your team&apos;s {" "}
              <span className="text-[#B45309] italic font-normal">AI&nbsp;agents</span>{" "}
              work on.
            </RevealText>

            <Stagger onMount delay={0.45} stagger={0.1}>
              <FadeUp>
                <p className="text-[1.0625rem] font-light text-[#57534E] leading-[1.75] mb-10 max-w-[29rem]">
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
                <ContextStack />
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
