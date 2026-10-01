// Home page - SSG by default (Next.js App Router Server Component)

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AlchemystFixesSection from "@/components/sections/AlchemystFixesSection";
import CTASection from "@/components/sections/CTASection";
import HeroSection from "@/components/sections/HeroSection";
import LogoBar from "@/components/sections/LogoBar";
import ProofMetrics from "@/components/sections/ProofMetrics";
import WhyContextSection from "@/components/sections/WhyContextSection";
import ContextQuestions from "@/components/sections/ContextQuestions";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/staticContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "https://getalchemystai.com" },
  openGraph: { title: SITE_TITLE, description: SITE_DESCRIPTION, url: "https://getalchemystai.com", type: "website" },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Server-rendered agent-readable summary, independent of JavaScript.
            Keep after Hero so its H1 precedes this H2/H3 outline in raw HTML.
            Preserve product context and SDK, CLI, MCP, and API discovery details. */}
        <section aria-label="Alchemyst AI overview" className="sr-only">
          <h2>Alchemyst AI: an AI context layer for business knowledge and agent memory</h2>
          <p>
            Alchemyst AI gives developers and enterprises a shared knowledge layer
            for AI agents through a single API. It combines persistent AI agent
            memory with semantic retrieval over company knowledge, helping
            applications give an LLM relevant internal documents and business
            context. The context layer keeps stored knowledge separate from the
            model, so applications can reuse it across models, sessions, and
            workflows. Grounding answers in enterprise data can reduce unsupported
            claims; correctness still depends on source quality, retrieval,
            application permissions, and the model&apos;s response.
          </p>
          <h3>Context arithmetic: the core primitive</h3>
          <p>
            Context arithmetic applies set operations over meaning at query time.
            Intersection narrows scope by team, region, or version. Union combines
            sources. Subtraction excludes superseded or out-of-scope content.
            Ranking selects the context that enters the model window. These
            operations over an institutional knowledge graph support memory
            behaviors: recalling what happened, resolving what it means, and
            informing the next action.
          </p>
          <h3>Context Traces, business definitions, and integrations</h3>
          <p>
            Context Traces expose retrieval sources, scores, and rules so teams
            can inspect which information reached an agent. Canonical business
            definitions help resolve terms such as revenue, pricing, and policy
            across teams. The context-tracing walkthrough describes pairing
            Alchemyst with OpenAI Euphony for visual debugging at
            https://getalchemystai.com/blog/context-tracing-for-ai-agents-with-openai-euphony.
            Integration resources cover Python, TypeScript, LangChain, LlamaIndex,
            n8n, MCP clients such as Claude Desktop, Cursor, and VS Code, and the
            Alchemyst Chrome extension. See https://getalchemystai.com/docs for
            current integration instructions.
          </p>
          <h3>Use cases, pricing, and trust</h3>
          <p>
            Use cases include customer support, employee support over internal
            policies, EdTech tutoring, finance, healthcare continuity, and voice
            agents. Explore https://getalchemystai.com/use-cases. Current plans,
            free-tier allowances, and enterprise options are listed at
            https://getalchemystai.com/pricing. Alchemyst AI is built by
            XAlchemystai Technologies Pvt. Ltd., India. Contact
            founders@getalchemystai.com. Company information, security controls,
            and privacy details are available at https://getalchemystai.com/about,
            https://getalchemystai.com/security, and
            https://getalchemystai.com/privacy.
          </p>
          <h3>CLI, SDKs, and MCP discovery</h3>
          <p>
            Install the SDK with npm install @alchemystai/sdk
            (https://www.npmjs.com/package/@alchemystai/sdk) or pip install
            alchemystai (https://pypi.org/project/alchemystai/). The CLI agent
            walkthrough is at https://getalchemystai.com/cli. The developer guide
            at https://getalchemystai.com/developers explains how to add business
            knowledge to an AI agent. Product API documentation is at
            https://getalchemystai.com/docs. The website&apos;s Streamable HTTP MCP
            endpoint at https://getalchemystai.com/mcp exposes documentation,
            article, and API-discovery tools; its server card is at
            https://getalchemystai.com/mcp/server-card. The website&apos;s public
            API specification is at https://getalchemystai.com/openapi.json.
          </p>
          <h3>Machine-readable content and navigation</h3>
          <p>
            Discover site URLs at https://getalchemystai.com/sitemap.xml,
            the content index at https://getalchemystai.com/llms.txt, and the
            expanded content export at https://getalchemystai.com/llms-full.txt.
            The persistent-memory guide at
            https://getalchemystai.com/blog/how-to-add-persistent-memory-to-ai-agents
            covers generic answers, document retrieval, RAG versus fine-tuning,
            and grounding LLM responses in company knowledge.
          </p>
        </section>
        <LogoBar />
        <WhyContextSection />
        <AlchemystFixesSection />
        {/* Dark closing chapter: proof, then the CTA, flowing into the footer. */}
        <ContextQuestions />
        <ProofMetrics />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
