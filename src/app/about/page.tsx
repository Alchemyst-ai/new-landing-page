import { Section } from "@/components/brand";
import { DarkAnchor } from "@/components/motion";
import { FadeUp } from "@/components/motion/primitives";
import { PageHero, PageShell, Prose } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

// /about is the single canonical About page (the former /about-us content is
// merged here, and /about-us permanently redirects to it via next.config.ts).

export const metadata: Metadata = {
  title: "About Alchemyst AI | Verifiable Context Layer for Agents",
  description:
    "About Alchemyst AI: XAlchemystai Technologies Pvt. Ltd. building the verifiable institutional context backbone for AI agents. Persistent memory, context arithmetic, and auditable traces.",
  alternates: { canonical: "https://getalchemystai.com/about" },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ name: "About Us" }]}
        currentPath="/about"
        eyebrow="About Alchemyst AI"
        title="The Best AI Memory Layer for Agents"
        lead={
          <>
            <strong className="text-[#4A3B33]">Alchemyst AI</strong> is a standalone AI memory and context layer for agents: it gives AI applications persistent memory, business data, and operational context so they stay accurate and production-ready. Unlike most memory layers, every piece of context Alchemyst retrieves is auditable and verifiable, and it drops into any stack through APIs, SDKs, MCPs, and a browser extension.
          </>
        }
        meta="Last updated: June 2026"
      />

      {/* Author credentials: dark anchor tile */}
      <Section tone="paper" pad="none" width="narrow" innerClassName="max-w-[848px] pb-16">
        <FadeUp standalone>
          <DarkAnchor
            as="aside"
            className="group flex flex-col gap-5 overflow-hidden rounded-[calc(var(--radius)+2px)] p-7 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
            aria-label="Authors"
          >
            <div aria-hidden className="plate-grid absolute inset-0 opacity-70" />
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#E4C090]/40 bg-[#B45309] text-xl font-bold text-white">
              AU
            </div>
            <div className="relative">
              <p className="text-base font-bold text-[#F5F5F4]">Written by Anuran and Uttaran</p>
              <p className="mt-1.5 text-[0.9375rem] leading-[1.65] text-[#A8A29E]">
                Founders of Alchemyst AI. We built the Context Layer after testing 50+ production agent deployments and seeing 95% of them fail due to context rot and semantic drift.
              </p>
            </div>
          </DarkAnchor>
        </FadeUp>
      </Section>

      <Prose>
        <h2>Why do AI agents need a context layer?</h2>
        <p>
          AI isn&apos;t the future anymore: it&apos;s already changing our present. But only 26% of generative AI efforts are actually usable in production. Any functional agent has three parts: the models, the workflows, and the context. Models are crushing SoTA records every day, and workflows are being solved by MCPs. The real problem lies in the context.
        </p>
        <p>
          As LLM context windows expand, data explodes at 100× the rate. Data is always going to exceed LLM context window sizes. Beyond roughly 10 sessions per user, businesses need to treat memory and user-specific context as mandatory requirements. Without it, agents suffer from semantic drift: your business moves on, but the agent&apos;s knowledge remains static.
        </p>

        <h2>How does Alchemyst AI work?</h2>
        <p>
          Alchemyst AI is developer infrastructure that gives every AI agent in your organization structured, auditable access to the same institutional knowledge. It acts as the &quot;Company Brain.&quot;
        </p>
        <ul>
          <li><strong>Deterministic Context:</strong> Unlike vector-search memory solutions, our context is scoped at write time, not inferred at retrieval.</li>
          <li><strong>Full Auditability:</strong> Every retrieval decision is traceable. You can verify exactly why an agent pulled a specific piece of context.</li>
          <li><strong>Zero Infrastructure:</strong>{" "}It&apos;s a single API. We deliver sub-300ms p95 retrieval latency and a 99.9% uptime SLA without you needing to manage a vector database.</li>
        </ul>

        <h2>What Alchemyst AI builds</h2>
        <p>
          Alchemyst AI is built by XAlchemystai Technologies Pvt. Ltd. to solve the hardest problem in production AI: traceable, verifiable context. We provide the institutional context backbone for enterprises: a single API that gives every AI agent persistent memory, business data, and operational context with full auditability.
        </p>
        <p>
          Our context layer combines an institutional knowledge graph with context arithmetic: dynamic set algebra over meaning computed at query time. Intersection narrows scope, union widens recall, subtraction removes superseded content, and ranking keeps only the right context in the window. Every retrieval returns in under 300ms at p95, reduces domain hallucinations by 99.7%, and emits a context trace you can debug in minutes, not days.
        </p>

        <h2>Why Alchemyst AI exists</h2>
        <p>
          Models commoditize fast. Durable advantage comes from operationalized business intelligence that stays yours across GPT, Claude, Gemini, and whatever comes next. Without a sovereign context layer, every model switch resets behavior, ontologies rot from day one, and semantic drift breaks consensus silently. Alchemyst AI decouples what your organization knows from whichever model reasons over it.
        </p>

        <h2>Who is this best for?</h2>
        <p>
          The Context Layer is built specifically for engineering teams deploying production AI agents at scale. It is not designed for single-agent hobby projects or simple chatbots; it is designed for multi-agent architectures where consistent, organization-wide knowledge is a hard requirement.
        </p>
        <blockquote>
          &ldquo;Everyone will upgrade, and the ones using Alchemyst AI will be at the forefront.&rdquo;
        </blockquote>

        <h2>Trust and contact</h2>
        <p>
          Read our <Link href="/privacy">Privacy Notice</Link>, or <Link href="/contact">contact us</Link> at founders@getalchemystai.com. Our registered address is 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, Kolkata, West Bengal, India 700048. Explore the <a href="/sitemap.xml">sitemap</a>, <a href="/llms.txt">llms.txt</a>, <Link href="/developers">developer portal</Link>, and <a href="/openapi.json">OpenAPI spec</a>.
        </p>
      </Prose>
    </PageShell>
  );
}
