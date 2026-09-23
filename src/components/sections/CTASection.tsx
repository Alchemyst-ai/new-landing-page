"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.23, 1, 0.32, 1] as const;

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const reduce = useReducedMotion();

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
      className="relative w-full bg-[#F8F4EE] overflow-hidden border-t border-[#E4D9BC]"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start"
        >
          {/* ── Left: Copy ── */}
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase font-semibold text-[#A16207] bg-[#A16207]/8 px-4 py-1 border border-[#A16207]/20 mb-8 rounded-md">
              Get Started
            </span>

            <h2
              id="cta-heading"
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.025em] text-[#4A3B33] leading-[1.15] mb-6"
            >
              Give your AI agents the{" "}
              <span className="italic text-[#B45309]">
                memory they deserve.
              </span>
            </h2>

            <p className="text-[1.0625rem] text-[#57534E] leading-[1.7] mb-10 max-w-[28rem]">
              Join developers building the next generation of AI products
              with persistent, auditable context. Free tier available — no
              credit card required.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.1em] uppercase text-[#A8A29E] font-medium">
              {[
                "Free tier",
                "REST + Python & Node SDKs",
                "99.9% uptime SLA",
                "SOC 2 in progress",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A16207]" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="bg-white border border-[#E4D9BC] p-8 lg:p-10 rounded-lg shadow-[var(--shadow-soft)]">
            {!submitted ? (
              <>
                <h3 className="text-lg font-bold text-[#4A3B33] mb-2">
                  Request API Access
                </h3>
                <p className="text-sm text-[#78716C] mb-8">
                  Enter your email and we&apos;ll set up your workspace.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white border border-[#E4D9BC] text-[#4A3B33] placeholder-[#A8A29E] text-sm px-4 py-3 rounded-md outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] transition-colors"
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#B45309] hover:bg-[#A16207] text-white px-7 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-[var(--shadow-soft)] hover:translate-y-[-1px] hover:shadow-[var(--shadow-soft-lg)]"
                  >
                    {loading ? "Requesting..." : "Get API Access"}
                  </Button>
                </form>
                <div className="mt-6 pt-6 border-t border-[#E4D9BC] flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://docs.getalchemystai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#57534E] hover:text-[#4A3B33] transition-colors"
                  >
                    Read the Docs →
                  </a>
                  <a
                    href="/thesis"
                    className="text-sm font-semibold text-[#57534E] hover:text-[#4A3B33] transition-colors"
                  >
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
              >
                <div className="w-10 h-10 bg-[#F1E9DA] border border-[#E4C090] rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-[#B45309]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-base font-semibold text-[#4A3B33] mb-1">
                  You&apos;re on the list.
                </p>
                <p className="text-sm text-[#78716C]">
                  We&apos;ll be in touch shortly.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
