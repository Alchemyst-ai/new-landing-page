// /thesis: The Context Thesis. Editorial long-form built on the shared page
// templates: revealed hero, the four theses as ruled rows, the problem of
// semantic drift (sand chapter + scroll-driven drift diagram), two pull
// quotes and a dark closing chapter that flows into the footer.

import { BrandButton, Eyebrow, Section, SpecCard } from "@/components/brand";
import SectionHeader from "@/components/brand/SectionHeader";
import { DrawLine, FadeUp, FigureReveal, RevealText, Stagger } from "@/components/motion/primitives";
import { PageHero, PageShell } from "@/components/page";
import SemanticDriftFlow from "@/components/sections/SemanticDriftFlow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Context Thesis: Why We're Building the Institutional Context Backbone",
  description:
    "Alchemyst AI's thesis: intelligence without memory is performance not understanding, context is the compound interest of AI interactions, the model is not the bottleneck but the infrastructure is, and context should be a primitive, not an afterthought. Includes the problem of semantic drift and why enterprise AI fails when context rots.",
  alternates: {
    canonical: "https://getalchemystai.com/thesis",
  },
};

const PROBLEM_CARDS = [
  {
    title: "Semantic Consensus breaks silently",
    body: '"Revenue" means $500K to your CFO and $5M to your Sales team. Your AI agent doesn\'t know which one is right, and acts with false confidence on whichever it finds first.',
    tag: "Semantic Consensus",
  },
  {
    title: "Ontologies rot from day one",
    body: "Every knowledge graph starts accurate. The decay begins the moment you ship it. New pricing tiers, new segments, new teams: the schema never updates itself. Agents keep acting on a version of your business that no longer exists.",
    tag: "Context Rot",
  },
  {
    title: "Traceability is the missing primitive",
    body: "You can't audit what you can't trace. Without knowing exactly what context an agent had when it made a decision, debugging failures is guesswork. Auditability across agentic tasks requires a traceable context layer, not just logs.",
    tag: "Auditability",
  },
  {
    title: "Manual FDE teams don't scale",
    body: "Palantir solves this with entire teams of forward-deployed engineers embedded in every client. That works at $50M+ contracts. It doesn't work for the rest of the market. There has to be a better way.",
    tag: "Scalability",
  },
];

const THESES = [
  {
    num: "I",
    title: "Intelligence without memory is performance, not understanding.",
    body: "A model that can answer any question but remembers nothing is a search engine, not an agent. True intelligence requires the ability to learn from experience: to carry forward what was said, decided, and discovered. An agent that forgets the moment a session ends can never run your operations; it can only react to them, one disconnected prompt at a time.",
  },
  {
    num: "II",
    title: "Context is the compound interest of AI interactions.",
    body: "Every interaction is an investment. Without context, that investment expires at the end of the session. With context, each interaction builds on the last: the agent gets smarter, more personalized, and more valuable with every use. Over time, the context backbone becomes the single most valuable asset an enterprise owns about how its own AI operates.",
  },
  {
    num: "III",
    title: "The model is not the bottleneck. The infrastructure is.",
    body: "GPT-4, Gemini, Claude: they're all capable enough. The gap between a capable model and a truly intelligent product is the layer that gives it memory, continuity, and awareness of the world it operates in. That layer, the institutional context backbone, is where day-to-day enterprise operations are won or lost, not in the next decimal point of benchmark accuracy.",
  },
  {
    num: "IV",
    title: "Context should be a primitive, not an afterthought.",
    body: "Developers shouldn't have to build context management from scratch for every AI product. It should be as simple as calling an API: ingest, retrieve, and let intelligence compound. When context is a first-class primitive, every agent in an organization can draw on the same current, traceable, semantically consistent view of the business.",
  },
];

export default function ThesisPage() {
  return (
    <PageShell>
      <PageHero
        width="wide"
        crumbs={[{ name: "Thesis" }]}
        currentPath="/thesis"
        eyebrow="The Context Thesis"
        title={
          <>
            Why we&apos;re building the{" "}
            <span className="italic text-[#B45309]">institutional context backbone</span> for AI.
          </>
        }
        lead={
          <>
            Enterprise AI doesn&apos;t fail because the model is bad. It fails because the context
            rots. GPT-4, Gemini, and Claude are all capable enough. The gap between a capable model
            and an agent that can actually run your day-to-day operations is the layer that keeps its
            knowledge current, traceable, and semantically consistent across your entire
            organization. That layer is the thesis below.
          </>
        }
        meta="Last updated: June 2026"
        titleClassName="max-w-[22ch]"
      />

      {/* ── Four theses as ruled editorial rows ─────────────── */}
      <Section tone="paper" pad="none" innerClassName="pb-24 md:pb-32">
        <ol>
          {THESES.map((t, i) => (
            <li key={t.num}>
              {i > 0 && <DrawLine />}
              <Stagger className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 md:py-14">
                <FadeUp className="md:col-span-2">
                  <span className="block font-bold italic leading-none tracking-[-0.03em] text-[#E4C090] text-[3rem] md:text-[4rem]">
                    {t.num}
                  </span>
                </FadeUp>
                <FadeUp className="md:col-span-4">
                  <h2 className="text-[1.375rem] md:text-[1.5rem] font-bold leading-[1.3] tracking-[-0.02em] text-[#4A3B33] text-balance">
                    {t.title}
                  </h2>
                </FadeUp>
                <FadeUp className="md:col-span-6">
                  <p className="text-[1rem] leading-[1.8] text-[#57534E]">{t.body}</p>
                </FadeUp>
              </Stagger>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── The problem: semantic drift ──────────────────────── */}
      <Section tone="sand" bordered>
        <SectionHeader
          eyebrow="The problem we exist to solve"
          eyebrowTone="red"
          title={
            <>
              Enterprise AI doesn&apos;t fail because the model is bad. It fails because the{" "}
              <span className="italic text-[#991B1B]">context rots.</span>
            </>
          }
          lead="GPT-4, Gemini, Claude: they're all capable enough. The gap between a capable model and a truly intelligent product is the layer that keeps its knowledge current, traceable, and semantically consistent across your entire organization."
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20 md:mb-28">
          {PROBLEM_CARDS.map((card) => (
            <FadeUp key={card.title} className="flex">
              <SpecCard className="w-full p-8 lg:p-10">
                <span className="mb-6 inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#991B1B]/20 bg-[#991B1B]/[0.06] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#991B1B]">
                  <span aria-hidden className="h-[5px] w-[5px] bg-[#991B1B]" />
                  {card.tag}
                </span>
                <h3 className="mb-3 text-[1.25rem] font-bold leading-snug tracking-[-0.015em] text-[#4A3B33]">
                  {card.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.75] text-[#57534E]">{card.body}</p>
              </SpecCard>
            </FadeUp>
          ))}
        </Stagger>

        {/* Drift propagation diagram: scroll-narrated */}
        <FigureReveal>
            <SemanticDriftFlow />
        </FigureReveal>
      </Section>

      {/* ── Pull quotes ──────────────────────────────────────── */}
      <Section tone="paper" bordered>
        <div className="mx-auto max-w-[920px] text-center">
          <RevealText
            as="blockquote"
            stagger={0.025}
            className="text-[clamp(1.375rem,2.6vw,2rem)] font-bold italic leading-[1.35] tracking-[-0.02em] text-[#4A3B33] text-balance"
          >
            If structured data drift almost killed Zillow, imagine what{" "}
            <span className="text-[#991B1B]">semantic drift</span> can do to your AI-driven
            organization.
          </RevealText>
          <FadeUp standalone delay={0.3}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
              Anuran Roy, Semantic Consensus and Semantic Drift
            </p>
          </FadeUp>

          <DrawLine className="my-16 md:my-24 mx-auto max-w-[120px]" />

          <RevealText
            as="blockquote"
            stagger={0.03}
            className="text-[clamp(1.625rem,3.4vw,2.625rem)] font-bold italic leading-[1.25] tracking-[-0.03em] text-[#4A3B33] text-balance"
          >
            The model is the engine. <span className="text-[#B45309]">Context is the fuel.</span>{" "}
            Without it, you&apos;re not going anywhere.
          </RevealText>
          <FadeUp standalone delay={0.3}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[#78716C]">
              Alchemyst AI, Context Thesis
            </p>
          </FadeUp>
        </div>
      </Section>

      {/* ── Closing dark chapter ─────────────────────────────── */}
      <Section tone="dark" grid>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <FadeUp standalone className="mb-7">
              <Eyebrow>The Context Thesis</Eyebrow>
            </FadeUp>
            <RevealText
              as="h2"
              className="text-[clamp(1.875rem,3.8vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-[#F5F5F4] text-balance mb-6"
            >
              The institutional context backbone for your enterprise.
            </RevealText>
            <FadeUp standalone delay={0.15}>
              <p className="max-w-[36rem] text-[1.0625rem] leading-[1.75] text-[#A8A29E]">
                Enable AI agents to run your day-to-day operations at enterprise scale, on a context
                layer that stays current, traceable, and semantically consistent.
              </p>
            </FadeUp>
          </div>
          <FadeUp standalone delay={0.2} className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
            <BrandButton href="/#get-access" arrow>
              Get API Access
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
