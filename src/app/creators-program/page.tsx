import ArticleSchema from "@/components/ArticleSchema";
import { BrandButton, Eyebrow, Section, SpecCard } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { FadeUp, RevealText, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import type { Metadata } from "next";

const BENEFITS = [
  {
    title: "$1,000 in Credits",
    body: "250+ million tokens on our Context Layer platform for building production AI agents.",
  },
  {
    title: "Hands-on Experience",
    body: "Build context-aware AI agents and become a verified context layer expert.",
  },
  {
    title: "Team Access",
    body: "Direct line with founders. Top creators eligible for interviews for open positions.",
  },
];

const FAQS = [
  {
    q: "Who is it for?",
    a: "Anyone who wants to build AI agents but feels stuck because their AI agent does not remember them or what they talked about. Perfect for content creators, developers, and students.",
  },
  {
    q: "What do I get?",
    a: "$1,000 worth of credits (250+ million tokens), hands-on experience with context in AI agents, and direct access to our team. Top creators get interview opportunities.",
  },
  {
    q: "What do I have to do?",
    a: "Build content (written, video, or short-form) around Alchemyst AI. Showcase use cases, tutorials, or ROI stories.",
  },
];

const PAGE_PATH = "/creators-program";

export const metadata: Metadata = {
  title: "Creators Program: AI Context Layer Partnership",
  description:
    "Join the Alchemyst AI Creators Program. Get $1,000 credits (250+ million tokens) for building context-aware AI agents. Partnership program for content creators, developers, and builders.",
  keywords: [
    "Alchemyst AI Creators Program",
    "AI context layer partnership",
    "content creation program",
    "AI agent memory partnership",
    "developer credits",
    "AI builder program",
  ],
  alternates: {
    canonical: "https://getalchemystai.com/creators-program",
  },
};

export default function CreatorsProgramPage() {
  const FaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is the Alchemyst AI Creators Program for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Anyone who wants to build AI agents but feels stuck because their AI agent does not remember them or what they talked about. This includes content creators, developers, students, and builders who want to showcase context with AI agents and earn rewards through our partnership program.",
        },
      },
      {
        "@type": "Question",
        name: "What do I get from the Creators Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You get $1,000 worth of credits on the Alchemyst Context platform (250+ million tokens), hands-on experience implementing context in AI agents, and a direct line with the Alchemyst team. Top creators are eligible for interviews for open positions on our team.",
        },
      },
      {
        "@type": "Question",
        name: "What do I have to do to join the Creators Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Build content (written, video, or short-form) around Alchemyst AI: what it is, how to use it, or how fast it enables people to derive a return on investment.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get Alchemyst AI credits for the Creators Program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sign up at platform.getalchemystai.com, go to the API Keys section, create a new API key, and use the contextual-agent-generator skill to make your AI agent context-aware. The credits are automatically available on your account.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Alchemyst AI Context Layer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alchemyst AI is a model-agnostic context and memory layer that keeps your institutional knowledge persistent across sessions. It provides sub-300ms p95 retrieval latency, full auditability, and semantic consensus enforcement for enterprise-ready AI agents.",
        },
      },
    ],
  };

  const OrganizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Alchemyst AI",
    url: "https://getalchemystai.com",
    logo: "https://getalchemystai.com/logo.png",
    sameAs: [
      "https://twitter.com/getalchemystai",
      "https://youtube.com/@alchemystai",
    ],
    offers: {
      "@type": "Offer",
      category: "AI Developer Program",
      description: "Creators Program with $1,000 in credits for building context-aware AI agents",
    },
  };

  return (
    <PageShell>
      <ArticleSchema
        headline="Alchemyst AI Creators Program: Context Layer Partnership"
        description="Join the Alchemyst AI Creators Program. Get $1,000 credits (250+ million tokens) for building context-aware AI agents. Partnership program for content creators and developers."
        url={PAGE_PATH}
        datePublished="2026-06-01"
        dateModified="2026-06-01"
        authorName="Alchemyst AI"
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FaqJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(OrganizationJsonLd).replace(/</g, "\\u003c") }}
      />

      <PageHero
        width="medium"
        crumbs={[{ name: "Creators Program" }]}
        currentPath={PAGE_PATH}
        eyebrow="AI Context Layer Partnership"
        title="Alchemyst AI Creators Program"
        lead="Partnership program for content creators, developers, and builders. Get $1,000 in credits to build context-aware AI agents and showcase them to our community."
        meta="Last updated: June 2026"
      />

      {/* Benefits */}
      <Section tone="paper" pad="none" innerClassName="max-w-[1000px] pb-20 md:pb-28">
        <SectionHeader align="left" title="What You Get" className="!mb-10" />
        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <FadeUp key={benefit.title} className="flex">
              <SpecCard className="w-full overflow-hidden p-7">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-[#B45309]" />
                <h3 className="mb-3 text-[1.1875rem] font-bold tracking-[-0.015em] text-[#B45309]">{benefit.title}</h3>
                <p className="text-[0.9375rem] leading-[1.7] text-[#57534E]">{benefit.body}</p>
              </SpecCard>
            </FadeUp>
          ))}
        </Stagger>
      </Section>

      {/* FAQ */}
      <Section tone="sand" bordered innerClassName="max-w-[1000px]">
        <SectionHeader align="left" title="Frequently Asked Questions" className="!mb-10" />
        <Stagger className="flex flex-col gap-3">
          {FAQS.map((faq) => (
            <FadeUp key={faq.q}>
              <details className="faq group rounded-[var(--radius)] border border-[#E4D9BC] bg-white shadow-[var(--shadow-soft)] transition-colors open:border-[#E4C090]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[1.0625rem] font-bold text-[#4A3B33]">
                  {faq.q}
                  <span aria-hidden className="relative h-3 w-3 shrink-0 text-[#B45309]">
                    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <div className="border-t border-[#F1E9DA] px-6 pb-6 pt-4">
                  <p className="text-[0.9375rem] leading-[1.75] text-[#57534E]">{faq.a}</p>
                </div>
              </details>
            </FadeUp>
          ))}
        </Stagger>
      </Section>

      {/* Closing dark chapter */}
      <Section tone="dark" grid innerClassName="max-w-[1000px]">
        <div className="text-center">
          <FadeUp standalone className="mb-7 flex justify-center">
            <Eyebrow>AI Context Layer Partnership</Eyebrow>
          </FadeUp>
          <RevealText
            as="h2"
            className="mx-auto mb-5 max-w-[20ch] text-[clamp(1.875rem,3.8vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#F5F5F4] text-balance"
          >
            Ready to join the Creators Program?
          </RevealText>
          <FadeUp standalone delay={0.15}>
            <p className="mx-auto mb-9 max-w-[480px] text-[1.0625rem] leading-[1.7] text-[#A8A29E]">
              Get $1,000 in credits and start building context-aware AI agents today.
            </p>
          </FadeUp>
          <FadeUp standalone delay={0.2} className="flex flex-wrap items-center justify-center gap-3">
            <BrandButton href="mailto:founders@getalchemystai.com" arrow>
              Contact Us
            </BrandButton>
            <BrandButton href="/" variant="outline-dark">
              Back to home
            </BrandButton>
          </FadeUp>
        </div>
      </Section>
    </PageShell>
  );
}
