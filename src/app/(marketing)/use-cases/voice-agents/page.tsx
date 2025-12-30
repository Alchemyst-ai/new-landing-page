'use client';

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
    desc: "Qualify leads, pitch offers, handle objections and book meetings automatically."
  },
  {
    title: "Inbound Call Handling",
    desc: "Never miss a call. Instantly answer FAQs, route calls and book appointments."
  },
  {
    title: "Payment & Dues Reminders",
    desc: "Automated reminder calls with polite escalation and dynamic scripts."
  },
  {
    title: "Customer Support",
    desc: "Resolve common issues with sentiment-aware, multilingual AI voice agents."
  },
  {
    title: "Lead Qualification",
    desc: "Ask smart questions, score leads in real-time and sync with CRM."
  },
  {
    title: "Survey & Feedback Calls",
    desc: "Collect structured feedback via natural conversations instead of IVRs."
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

export default function VoiceAgentsPage() {
  return (
    <main className="bg-inherit text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent blur-3xl" />

        {/* Voice Wave Animation */}
        {/* <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 opacity-30">
          {[...Array(7)].map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-indigo-400 to-purple-400 animate-wave"
              style={{
                height: `${20 + i * 10}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div> */}

        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/10 px-4 py-1 text-sm text-white/70">
            🎙️ AI Voice Agents
          </span>

          <h1 className="text-5xl md:text-6xl font-bold">
            Automate Calls with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Human-Like Voice AI
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
            Deploy AI voice agents that talk naturally, understand intent and
            take action — 24/7, at scale.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-lg bg-white text-black px-6 py-3 font-medium hover:bg-white/90">
              Book Live Demo
            </button>
            <button className="rounded-lg border border-white/15 px-6 py-3 text-white/80 hover:bg-white/5">
              Hear Voice Sample
            </button>
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
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur hover:border-indigo-400/40 transition"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-white/70">{item.desc}</p>
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
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl text-2xl">
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
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center">
            Built for Every Industry
          </h2>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
            {INDUSTRIES.map((industry) => (
              <div
                key={industry}
                className="rounded-xl border border-white/10 bg-black/40 p-5 text-center text-white/80 hover:bg-white/5 transition"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

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
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-12 text-center">
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
