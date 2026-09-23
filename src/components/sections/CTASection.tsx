"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Arrow, Eyebrow, Ticks } from "@/components/brand";
import { FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import { useReducedMotionSafe } from "./iso/kit";

const ease = [0.23, 1, 0.32, 1] as const;

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const reduce = useReducedMotionSafe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section
      id="get-access"
      data-theme="dark"
      className="relative w-full overflow-hidden bg-[#1C1917] text-[#F5F5F4]"
      aria-labelledby="cta-heading"
    >
      <div aria-hidden className="plate-grid absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8 pt-16 md:pt-20 pb-24 md:pb-32">
        <div className="h-px w-full bg-white/[0.08] mb-16 md:mb-20" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <FadeUp standalone className="mb-7">
              <Eyebrow>Get Started</Eyebrow>
            </FadeUp>

            <RevealText
              as="h2"
              id="cta-heading"
              className="text-[clamp(2rem,4.2vw,3.25rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[#F5F5F4] mb-7 text-balance"
            >
              Give your AI agents the{" "}
              <span className="italic text-[#E4C090]">memory they deserve.</span>
            </RevealText>

            <FadeUp standalone delay={0.15}>
              <p className="text-[1.0625rem] text-[#A8A29E] leading-[1.75] mb-10 max-w-[30rem]">
                Join developers building the next generation of AI products
                with persistent, auditable context. Free tier available. No
                credit card required.
              </p>
            </FadeUp>

            <Stagger as="ul" delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 max-w-[30rem]">
              {["Free tier", "REST + Python & Node SDKs", "99.9% uptime SLA", "SOC 2 in progress"].map((item) => (
                <FadeUp
                  as="li"
                  key={item}
                  distance={10}
                  className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] uppercase text-[#D6D3D1]"
                >
                  <span aria-hidden className="h-[6px] w-[6px] bg-[#E4C090]" />
                  {item}
                </FadeUp>
              ))}
            </Stagger>
          </div>

          {/* Right: form card */}
          <FadeUp standalone delay={0.1} className="lg:col-span-5">
            <div className="group relative rounded-[var(--radius)] border border-white/[0.09] bg-[#232020]/90 p-8 lg:p-10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
              <Ticks />
              {!submitted ? (
                <>
                  <h3 className="text-lg font-bold text-[#F5F5F4] mb-2">Request API Access</h3>
                  <p className="text-sm text-[#A8A29E] mb-8">
                    Enter your email and we&apos;ll set up your workspace.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label htmlFor="cta-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full rounded-[var(--radius)] border border-white/[0.1] bg-[#1C1917] px-4 py-3.5 text-sm text-[#F5F5F4] placeholder-[#78716C] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#E4C090]/70 focus:shadow-[0_0_0_3px_rgba(228,192,144,0.12)]"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[#B45309] px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-[var(--shadow-soft)] transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#A16207] disabled:opacity-70"
                    >
                      {loading ? "Requesting..." : "Get API Access"}
                      {!loading && <Arrow />}
                    </button>
                  </form>
                  <div className="mt-7 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:gap-6">
                    <a
                      href="https://docs.getalchemystai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-brand text-sm font-bold w-fit"
                    >
                      Read the Docs →
                    </a>
                    <a href="/thesis" className="link-brand text-sm font-bold w-fit">
                      Read the Thesis →
                    </a>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-col items-center text-center py-8"
                  role="status"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#E4C090]/40 bg-[#E4C090]/10">
                    <svg className="h-5 w-5 text-[#E4C090]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-base font-bold text-[#F5F5F4] mb-1">You&apos;re on the list.</p>
                  <p className="text-sm text-[#A8A29E]">We&apos;ll be in touch shortly.</p>
                </motion.div>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
