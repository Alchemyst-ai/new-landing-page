'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// import type { Metadata } from "next"

// /* ===================== SEO ===================== */

// export const metadata: Metadata = {
//   title: "AI Voice Agent Use Cases | Alchemyst AI",
//   description:
//     "Explore real-world AI voice agent use cases for sales, support, reminders, and lead qualification.",
//   keywords: [
//     "AI Voice Agent",
//     "AI Calling Agent",
//     "Outbound AI Calls",
//     "Inbound AI Support",
//     "Plivo AI",
//     "Twilio AI",
//     "Voice AI Platform"
//   ],
//   openGraph: {
//     title: "AI Voice Agent Use Cases",
//     description:
//       "Deploy human-like AI voice agents to automate calls at scale.",
//     type: "website"
//   }
// }

/* ===================== DATA ===================== */

const USE_CASES = [
  {
    title: "Outbound Sales Calls",
    desc: "Qualify leads, pitch offers, handle objections and book meetings automatically.",
    hasDemo: true,
    demoLink: ""
  },
  {
    title: "Inbound Call Handling",
    desc: "Never miss a call. Instantly answer FAQs, route calls and book appointments.",
    hasDemo: true,
    demoLink: ""
  },
  {
    title: "Payment & Dues Reminders",
    desc: "Automated reminder calls with polite escalation and dynamic scripts.",
    hasDemo: true,
    demoLink: ""
  },
  {
    title: "Customer Support",
    desc: "Resolve common issues with sentiment-aware, multilingual AI voice agents.",
    hasDemo: false,
    demoLink: ""
  },
  {
    title: "Lead Qualification",
    desc: "Ask smart questions, score leads in real-time and sync with CRM.",
    hasDemo: false,
    demoLink: ""
  },
  {
    title: "Survey & Feedback Calls",
    desc: "Collect structured feedback via natural conversations instead of IVRs.",
    hasDemo: false,
    demoLink: ""
  }
]

const INDUSTRIES = [
  "Real Estate",
  "Automotive",
  "E-commerce",
  "Healthcare",
  "Banking & Finance",
  "EdTech",
  "Logistics",
  "Travel & Hospitality"
]

const INTEGRATIONS = [
  "Twilio",
  "Plivo",
  "ElevenLabs",
  "OpenAI",
  "HubSpot",
  "Salesforce"
]

/* ===================== PAGE ===================== */

export function SineWave() {
  const bars = 30; // More bars make the wave look smoother

  return (
    <div className="relative flex items-center justify-center h-50 py-2 bg-transparent px-10">
      {/* Inline Animation */}
      <style>{`
        @keyframes wave-grow {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(0.7); opacity: 1; }
        }
        .animate-math-wave {
          animation: wave-grow 2s ease-in-out infinite;
        }
      `}</style>

      {/* The Mathematical X-Axis (Baseline) */}
      {/* <div className="absolute w-full h-[1px] bg-white/20 z-0" /> */}

      <div className="flex items-center gap-1 h-full z-10">
        {[...Array(bars)].map((_, i) => {
          // Range: pi/2 to 5pi/2
          const angle = (i / (bars - 1)) * (2 * Math.PI);
          const val = Math.sin(angle);
          const height = Math.abs(val) * 90; // Max height of 90px

          return (
            <div key={i} className="flex flex-col w-2 h-full">
              {/* Top Half (Positive Zone) */}
              <div className="flex-1 flex items-end justify-center">
                {val > 0 && (
                  <div
                    className="w-full rounded-t-full bg-gradient-to-t from-[#f49025] to-[#fefefe] animate-math-wave origin-bottom"
                    style={{
                      height: `${height}px`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                )}
              </div>

              {/* Bottom Half (Negative Zone) */}
              <div className="flex-1 flex items-start justify-center">
                {val < 0 && (
                  <div
                    className="w-full rounded-b-full bg-gradient-to-b from-[#f49025] to-[#fefefe] animate-math-wave origin-top"
                    style={{
                      height: `${height}px`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function VoiceAgentsPage() {
  return (
    <main className="min-h-screen w-full bg-[#151515] relative">
  {/* Orange Radial Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(249,115,22,0.4), transparent)`,
    }}
  />
      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-32 px-6">
        <div className="absolute inset-0 blur-3xl" />
        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/10 px-4 py-1 text-sm text-white/70">
            🎙️ AI Voice Agents
          </span>

          <h1 className="text-5xl md:text-6xl font-bold">
            Automate Calls with{" "}
            <span className="bg-gradient-to-r from-[#f59025] via-[#f59025]/80 to-[#fefefe]/60 bg-clip-text text-transparent">
              Human-Like Voice AI
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
            Deploy AI voice agents that talk naturally, understand intent and
            take action — 24/7, at scale.
          </p>
{/* Voice Wave Animation
        <SineWave /> */}
          <div className="mt-10 flex justify-center gap-4">
            <Button className="rounded-lg px-6 py-3 font-medium hover:bg-white/90">
              Book Live Demo
            </Button>
            <Button variant="outline" className="rounded-lg border border-white/15 px-6 py-3">
              Hear Voice Sample
            </Button>
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center">
            Voice Agent Use Cases
          </h2>

          <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">
            Replace manual calling teams with AI agents that scale instantly and
            never get tired.
          </p>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {USE_CASES.map((item) => (
              <div
              key={item.title}
              className="rounded-2xl border border-white/10 p-6 backdrop-blur hover:border-indigo-400/40 transition flex flex-col"
              >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-white/70 flex-1">{item.desc}</p>
              {item.hasDemo && (
                <Dialog>
                <DialogTrigger asChild>
                  <Button
                  variant="outline"
                  className="mt-4 w-full border-white/20 text-white hover:bg-white/10"
                  >
                  Show Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#151515]/90 border-white/10 text-white">
                  <DialogTitle>{item.title} Demo</DialogTitle>
                  <div className="mt-4">
                  {(item.demoLink && item.demoLink.length > 0) ? <audio controls src={item.demoLink} /> : <p className="text-white/70">
                    Demo content for {item.title} will be displayed here.
                  </p>}
                  </div>
                </DialogContent>
                </Dialog>
              )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VOICE DEMO ================= */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Hear the AI Voice in Action</h2>

          <p className="mt-4 text-white/70">
            Natural, real-time conversations powered by advanced speech models.
          </p>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-10">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#151515]/30 via-[#f49025]/20 flex items-center justify-center shadow-xl text-2xl">
                🎧
              </div>

              <p className="text-white/70 max-w-md">
                “Hello! This is an AI voice agent calling to assist you with your
                enquiry…”
              </p>

              <button className="rounded-lg bg-white text-black px-6 py-3 font-medium">
                ▶ Play Sample
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      {/* <section className="py-24 px-6 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center">
            Built for Every Industry
          </h2>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry}
                className="rounded-xl border border-white/10 bg-[#151515]/40 p-5 text-center text-white/80 hover:bg-white/5 transition"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= INTEGRATIONS ================= */}
      {/* <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60 mb-8">
            Seamlessly integrates with your existing stack
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {INTEGRATIONS.map((name) => (
              <div
                key={name}
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-white/80"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= CTA ================= */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515]/30 via-[#f49025]/20 p-12 text-center">
          <h2 className="text-4xl font-bold">
            Deploy Your Voice Agent in Days
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Integrate with Plivo, Twilio, CRMs and internal tools effortlessly.
          </p>

        <button
        className="mt-8 rounded-lg bg-white px-8 py-4 text-black font-medium hover:bg-white/90 cursor-pointer"
        onClick={() => {
            window.open("https://voice.getalchemystai.com", "_blank", "noopener,noreferrer")
        }}
        >
        Get Started
        </button>
        </div>
      </section>

      {/* ================= ANIMATION STYLES ================= */}
      <style jsx global>{`
        @keyframes wave {
          0%,
          100% {
            transform: scaleY(0.4);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .animate-wave {
          animation: wave 1.2s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
