"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import ContextGraphLive from "./ContextGraphLive";
import HeroNetwork from "./HeroNetwork";

const ease = [0.23, 1, 0.32, 1] as const;

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#FAFAFA]"
      aria-labelledby="hero-heading"
    >
      {/* ── Animated network constellation ── */}
      <HeroNetwork />

      {/* ── Content ── */}
      <div className="container relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-8 py-32 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase font-semibold text-[#475569] bg-white px-4 py-2 border border-[#E5E7EB]">
                <span className="w-1.5 h-1.5 bg-[#128F8B]" />
                Context Engine
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease }}
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-[-0.035em] text-[#0F172A] leading-[1.1] mb-6"
            >
              The institutional memory your{" "}
              <span className="text-[#128F8B]">AI&nbsp;agents</span>{" "}
              need to operate.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
              className="text-lg text-[#475569] leading-[1.7] mb-10 max-w-[30rem]"
            >
              Alchemyst AI is the context backbone that keeps every
              agent&apos;s knowledge current, traceable and semantically
              consistent across your entire organisation through a
              single API.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button
                asChild
                className="bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-none px-7 py-3 text-sm font-semibold tracking-wide transition-all shadow-[4px_4px_0px_#0F172A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#0F172A]"
              >
                <Link href="/platform/signin" target="_blank" rel="noopener">
                  Get API Access
                  <svg
                    className="ml-2"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white border border-[#E5E7EB] text-[#475569] hover:text-[#0F172A] rounded-none px-7 py-3 text-sm font-semibold tracking-wide transition-all shadow-[4px_4px_0px_#E2E8F0] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#CBD5E1]"
              >
                <a
                  href="https://docs.getalchemystai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the Docs
                </a>
              </Button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.1em] uppercase text-[#94A3B8] font-medium"
            >
              {[
                { value: "< 300ms", label: "p95 latency" },
                { value: "100%", label: "auditable" },
                { value: "1 API", label: "zero infra" },
              ].map((m) => (
                <span key={m.label} className="flex items-center gap-1.5">
                  <span className="text-[#0F172A] text-xs font-bold tracking-tight">
                    {m.value}
                  </span>
                  <span>{m.label}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative"
          >
            <ContextGraphLive />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
