// Home page - SSG by default (Next.js App Router Server Component)

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AlchemystFixesSection from "@/components/sections/AlchemystFixesSection";
import CTASection from "@/components/sections/CTASection";
import HeroSection from "@/components/sections/HeroSection";
import LogoBar from "@/components/sections/LogoBar";
import WhyContextSection from "@/components/sections/WhyContextSection";
import { SITE_TITLE } from "@/lib/staticContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description:
    "Enable AI agents to run your day-to-day operations at enterprise scale. The institutional context backbone that keeps every agent's knowledge current, traceable, and consistent through a single API.",
};


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Server-rendered agent-readable summary — visually hidden, no UI change.
            Placed AFTER Hero so first heading in raw HTML remains the Hero H1.
            Provides sequential H2/H3 hierarchy + CLI/MCP/OpenAPI discoverability
            for AI crawlers without JavaScript. */}
        <section aria-label="Alchemyst AI overview" className="sr-only">
          <h2>Alchemyst AI — the institutional context backbone for AI agents</h2>
          <p>
            Alchemyst AI is the verifiable institutional context backbone that lets
            AI agents run day-to-day operations at enterprise scale. Through a single
            API and its context arithmetic primitive, it gives every agent persistent,
            traceable context and semantic retrieval over your institutional knowledge
            graph — keeping knowledge current, traceable, and consistent. Sub-300ms
            retrieval latency at p95, 99.7% reduction in domain hallucinations, 20x
            faster debugging, 99.9% uptime SLA, one API with zero infrastructure.
          </p>
          <h3>Context arithmetic — the core primitive</h3>
          <p>
            Dynamic set algebra over meaning computed at query time. Intersection
            narrows scope by team, region, or version. Union widens recall across
            sources. Subtraction removes superseded or out-of-scope content. Ranking
            keeps only the right context in the window. Memory is derived, not
            hard-coded: recall what happened, resolve what it means, inform how to
            act — all from one institutional knowledge graph.
          </p>
          <h3>Context traces and semantic consensus</h3>
          <p>
            Every agent decision is traceable to the exact context it had, with
            sources, scores, and rules applied. Define canonical term definitions at
            the org level so revenue, pricing, and policy resolve before they reach
            the model. Pairs with OpenAI Euphony for visual debugging. Works with
            Python, TypeScript, LangChain, LlamaIndex, n8n, MCP servers in Claude
            Desktop, Cursor, and VS Code, plus a Chrome extension.
          </p>
          <h3>Use cases, pricing, and trust</h3>
          <p>
            Production use cases include customer support with memory-powered
            personalization, EdTech tutoring, finance fraud detection, healthcare
            continuity, and voice agents. Free tier includes 5M tokens, with Starter,
            Accelerate, Supercharge, and Enterprise tiers. Company: XAlchemyst
            Technologies Pvt. Ltd., Kolkata, India. Contact
            founders@getalchemystai.com. See About, Contact, Privacy, sitemap,
            llms.txt, docs, and the OpenAPI spec at /openapi.json.
          </p>
          <h3>CLI, SDKs, and MCP for Alchemyst AI agents</h3>
          <p>
            Official Alchemyst AI CLI entry points: npm install @alchemystai/sdk
            (https://www.npmjs.com/package/@alchemystai/sdk) and pip install
            alchemystai (https://pypi.org/project/alchemystai/). Build the
            context-aware CLI agent in 10 minutes at
            https://getalchemystai.com/cli and the CLI Agent docs. MCP Streamable
            HTTP at https://getalchemystai.com/mcp. OpenAPI at
            https://getalchemystai.com/openapi.json. Developer portal at
            https://getalchemystai.com/developers with API keys, quickstart, and
            sandbox.
          </p>
        </section>
        <LogoBar />
        <WhyContextSection />
        <AlchemystFixesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
