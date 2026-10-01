/**
 * staticContent.ts
 *
 * Single source of truth for all static landing-page content that is
 * surfaced in both /llms.txt (index) and /llms-full.txt (full dump).
 *
 * Keep this in sync with the actual page sections.
 */

import { CASE_STUDIES, CASE_STUDIES_PATH, caseStudyPath } from "@/lib/caseStudies";
import { JOBS, USE_CASES } from "@/lib/useCases";

export const SITE_TITLE = "AI Context Layer for Business Knowledge | Alchemyst AI";
export const SITE_DESCRIPTION =
  "Give AI agents company knowledge and persistent memory with Alchemyst AI. A shared, traceable context layer for developers and enterprises.";
export const BASE_URL = "https://getalchemystai.com";

// ── Static sections for llms.txt index ──────────────────────────────────────

export interface LlmsTxtItem {
  title: string;
  url: string;
  description: string;
}

export interface LlmsTxtSection {
  title: string;
  items: LlmsTxtItem[];
}

export const STATIC_SECTIONS: LlmsTxtSection[] = [
  {
    title: "Landing Page",
    items: [
      {
        title: SITE_TITLE,
        url: BASE_URL,
        description:
          "An AI context layer for developers and enterprises connecting agents to company knowledge and persistent memory. " +
          "The page covers model sovereignty, context arithmetic, semantic consensus, context traces, measured results, and API access.",
      },
    ],
  },
  {
    title: "Why Context",
    items: [
      {
        title: "The model is replaceable. Your institutional context isn't.",
        url: `${BASE_URL}#why-context`,
        description:
          "Models are commoditizing fast. Durable advantage comes from a context layer that " +
          "operationalizes your business intelligence and stays yours no matter which model you run it on.",
      },
      {
        title: "The Technical Case - model-agnostic continuity and context sovereignty",
        url: `${BASE_URL}#why-context`,
        description:
          "You will switch models - GPT, Gemini, Claude, the next frontier model, often several at once. " +
          "Alchemyst decouples what your organization knows from whichever model reasons over it, so " +
          "institutional context stays continuous across every swap. The context is sovereign - it plugs " +
          "into any AI model or agent on demand, according to the business requirement at hand.",
      },
      {
        title: "The Business Case - operationalized intelligence at scale",
        url: `${BASE_URL}#why-context`,
        description:
          "Not a smarter chatbot - agents that actually run day-to-day operations and knowledge work " +
          "across sales, support, ops, and research at scale, acting on the same current, traceable, " +
          "consensus version of the business, without embedding a forward-deployed team in every workflow.",
      },
    ],
  },
  {
    title: "How Alchemyst Fixes It",
    items: [
      {
        title: "Context Arithmetic - the core primitive",
        url: `${BASE_URL}#how-it-works`,
        description:
          "The foundational primitive: dynamic set algebra over meaning, computed at query time. " +
          "Intersection narrows scope, union widens recall, subtraction removes superseded or out-of-scope " +
          "content, and ranking weights what remains - so only the right context survives into the window.",
      },
      {
        title: "Institutional knowledge graph + derived memory",
        url: `${BASE_URL}#how-it-works`,
        description:
          "What you store is an institutional knowledge graph of your organization's context. Memory is not " +
          "three hard-coded layers - by applying context arithmetic over the graph you can derive the " +
          "behaviors expected from memory (recall what happened, resolve what it means, inform how to act). " +
          "The memory types are outcomes of the primitive, not separate modules.",
      },
      {
        title: "Context Traces for full auditability",
        url: `${BASE_URL}#how-it-works`,
        description:
          "Every agent decision is traceable back to the exact context it had. " +
          "Debug in minutes, not days. Pairs with OpenAI Euphony for visual debugging.",
      },
      {
        title: "Semantic consensus enforcement",
        url: `${BASE_URL}#how-it-works`,
        description:
          "Define canonical term definitions at the org level. Alchemyst resolves ambiguity " +
          "before it reaches the model - not after the agent has already acted on the wrong one.",
      },
    ],
  },
  {
    title: "Results",
    items: [
      {
        title: "Customer metrics",
        url: `${BASE_URL}#how-it-works`,
        description:
          "< 300ms context retrieval latency (p95). 99.7% reduction in hallucinations on domain-specific tasks. " +
          "20× faster agent debugging. 1 API replaces 4 infra pieces.",
      },
    ],
  },
  {
    title: "The Context Thesis",
    items: [
      {
        title: "Why we're building the institutional context backbone for AI",
        url: `${BASE_URL}/thesis`,
        description:
          "Dedicated thesis page. Four theses: intelligence without memory is performance not " +
          "understanding; context is the compound interest of AI interactions; the model is not the " +
          "bottleneck - the infrastructure is; context should be a primitive, not an afterthought. " +
          "Also covers the problem of semantic drift - semantic consensus breaking silently, ontologies " +
          "rotting from day one, the missing auditability primitive, and why manual forward-deployed " +
          "engineering teams don't scale.",
      },
    ],
  },
  {
    title: "Security & Compliance",
    items: [
      {
        title: "Alchemyst AI Security & Compliance",
        url: `${BASE_URL}/security`,
        description:
          "Security controls for the context layer: encryption in transit and at rest, scoped and isolated context, " +
          "Context Traces for auditability, RBAC with SSO and SAML on Enterprise, dedicated infrastructure with VPC peering, " +
          "export and deletion. Standards status: SOC 2 in progress; GDPR, DPDP Act and CCPA aligned; ISO/IEC 27001 and " +
          "HIPAA on the roadmap; card payments via Razorpay (PCI-DSS). Security reports: founders@getalchemystai.com.",
      },
    ],
  },
  {
    title: "Use Cases",
    items: [
      {
        title: "Alchemyst AI Use Cases",
        url: `${BASE_URL}/use-cases`,
        description:
          "What teams build on the context layer, grouped by the job each application leans on most: " +
          JOBS.map((j) => `${j.name} (${j.summary.replace(/\.$/, "")})`).join("; ") +
          ".",
      },
      ...USE_CASES.map((uc) => ({
        title: `${uc.name}: ${uc.tagline}`,
        url: `${BASE_URL}/use-cases/${uc.slug}`,
        description: uc.description,
      })),
    ],
  },
  {
    title: "Case Studies",
    items: [
      {
        title: "Alchemyst AI Case Studies",
        url: `${BASE_URL}${CASE_STUDIES_PATH}`,
        description:
          "How the context and memory layer runs underneath voice and text agents in production, by industry: " +
          CASE_STUDIES.map((cs) => cs.industry).join("; ") +
          ".",
      },
      ...CASE_STUDIES.map((cs) => ({
        title: cs.h1,
        url: `${BASE_URL}${caseStudyPath(cs.slug)}`,
        description: cs.metaDescription,
      })),
    ],
  },
  {
    title: "Developer Resources",
    items: [
      {
        title: "How to Add Persistent Memory to AI Agents",
        url: `${BASE_URL}/blog/how-to-add-persistent-memory-to-ai-agents`,
        description: "AI agent memory, generic answers, enterprise grounding, RAG vs fine-tuning, and vector databases vs knowledge bases.",
      },
      {
        title: "Add Business Knowledge to Your AI Agent",
        url: `${BASE_URL}/developers`,
        description:
          "Connect company documents through context ingestion, scoped retrieval, and grounded generation. SDK installation, semantic search, and managed RAG responsibilities.",
      },
      {
        title: "Alchemyst AI OpenAPI Spec",
        url: `${BASE_URL}/openapi.json`,
        description:
          "Alchemyst AI OpenAPI 3.1 spec with operationIds getApiStatus, listArticles, getArticleBySlug, createLead. Typed params and problem+json errors for LLM function calling.",
      },
      {
        title: "Alchemyst AI MCP Server",
        url: `${BASE_URL}/mcp`,
        description:
          "Alchemyst AI Streamable HTTP MCP server with tools alchemyst_search_docs, alchemyst_list_articles, alchemyst_get_openapi. Manifests at /server.json and /.well-known/mcp.json.",
      },
      {
        title: "Alchemyst AI CLI and SDKs",
        url: `${BASE_URL}/cli`,
        description:
          "Official Alchemyst AI CLI entry points: npm install @alchemystai/sdk (https://www.npmjs.com/package/@alchemystai/sdk) and pip install alchemystai (https://pypi.org/project/alchemystai/). Build a context-aware CLI agent in 10 minutes.",
      },
      {
        title: "Documentation",
        url: "https://docs.getalchemystai.com",
        description: "Full Alchemyst AI API reference, SDKs, and integration guides for the Context Layer.",
      },
      {
        title: "Python SDK",
        url: "https://docs.getalchemystai.com/sdk/python",
        description: "Official Alchemyst AI Python SDK for the Context Layer API.",
      },
      {
        title: "Node.js SDK",
        url: "https://docs.getalchemystai.com/sdk/node",
        description: "Official Alchemyst AI Node.js / TypeScript SDK for the Context Layer API.",
      },
      {
        title: "Context Tracing with OpenAI Euphony",
        url: "https://getalchemystai.com/blog/context-tracing-for-ai-agents-with-openai-euphony",
        description:
          "Example use case: pairing Alchemyst Context Traces with Euphony for end-to-end agent debugging.",
      },
    ],
  },
  {
    title: "Comparison Guides",
    items: [
      {
        title: "Mem0 vs Zep vs Letta: Which AI Memory Layer is Best?",
        url: `${BASE_URL}/compare/mem0-vs-zep-vs-letta`,
        description:
          "Vector-search memory, temporal graphs, and deterministic context layers compared. When to choose Mem0, Zep, Letta, or Alchemyst for your architecture.",
      },
      {
        title: "Alchemyst AI vs Mem0: Best AI Memory Layer for Agents",
        url: `${BASE_URL}/compare/alchemyst-ai-vs-mem0`,
        description:
          "Compare Alchemyst AI and Mem0. See feature differences, latency benchmarks, and why Alchemyst's deterministic context layer is built for production multi-agent architectures.",
      },
      {
        title: "Alchemyst AI vs Zep: AI Memory Comparison",
        url: `${BASE_URL}/compare/alchemyst-ai-vs-zep`,
        description:
          "Compare Zep's memory store with Alchemyst's context layer. Zep uses a graph database (Memgraph) while Alchemyst uses deterministic set algebra.",
      },
      {
        title: "Alchemyst AI vs Databricks: Unity Catalog vs Context Layer",
        url: `${BASE_URL}/compare/alchemyst-ai-vs-databricks`,
        description:
          "Compare Databricks Unity Catalog with Alchemyst's context layer. Databricks governs data while Alchemyst governs semantic meaning.",
      },
      {
        title: "Alchemyst AI vs Snowflake Cortex: Semantic Layer Comparison",
        url: `${BASE_URL}/compare/alchemyst-ai-vs-snowflake-cortex`,
        description:
          "Compare Snowflake Cortex with Alchemyst AI. Cortex provides warehouse-bounded semantic views while Alchemyst spans systems.",
      },
    ],
  },
{
    title: "Competitor Analysis",
    items: [
      {
        title: "Memvid vs Alchemyst: Embedded Memory vs Context Layer",
        url: `${BASE_URL}/compare/memvid-vs-alchemyst-agent-memory`,
        description:
          "Compare Memvid's single-file memory approach with Alchemyst AI's hosted context layer. Both eliminate infrastructure, but serve different use cases.",
      },
      {
        title: "SuperMemory vs Alchemyst: Browser Extension Memory",
        url: `${BASE_URL}/compare/supermemory-vs-alchemyst`,
        description:
          "SuperMemory captures browsing history via browser extension while Alchemyst provides structured, auditable institutional context.",
      },
      {
        title: "LangChain Memory vs Alchemyst: Memory Modules vs Context Layer",
        url: `${BASE_URL}/compare/langchain-memory-vs-alchemyst`,
        description:
          "LangChain offers memory modules and vector stores while Alchemyst provides a deterministic context layer primitive.",
      },
      {
        title: "Cognee vs Alchemyst: Knowledge Graph Builders",
        url: `${BASE_URL}/compare/cognee-vs-alchemyst-knowledge-graph`,
        description:
          "Both build knowledge graphs, but Cognee focuses on data ingestion while Alchemyst specializes in context arithmetic and governance.",
      },
      {
        title: "OpenAI Memory vs Alchemyst: Built-in vs Sovereign Context",
        url: `${BASE_URL}/compare/openai-memory-vs-deterministic-context`,
        description:
          "OpenAI's Memory is model-bound while Alchemyst provides model-agnostic, sovereign context infrastructure for enterprises.",
      },
      {
        title: "Claude Memory vs Alchemyst: Implicit vs Explicit Context",
        url: `${BASE_URL}/compare/claude-memory-vs-alchemyst`,
        description:
          "Claude's implicit memory vs Alchemyst's explicit, scoped, auditable context operations.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        title: "Pricing - Alchemyst AI Context Layer",
        url: `${BASE_URL}/pricing`,
        description:
          "Usage-based pricing with Free tier (5M tokens) and paid tiers (Starter, Accelerate, Supercharge). Enterprise plans custom-built for scale. Pricing calculator shows transparent costs per-million-tokens.",
      },
    ],
  },
  {
    title: "Creators Program",
    items: [
      {
        title: "Creators Program - AI Context Layer Partnership",
        url: `${BASE_URL}/creators-program`,
        description:
          "Join the Alchemyst AI Creators Program. Get $1,000 credits (250+ million tokens) for building context-aware AI agents. Partnership program for content creators, developers, and builders.",
      },
    ],
  },
];

// ── Full markdown dump for /llms-full.txt ────────────────────────────────────

export const FULL_STATIC_CONTENT = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

---

## The AI context layer for your business

Give AI agents access to your company knowledge and persistent memory through a single API. Alchemyst AI connects the context developers need with the shared, traceable knowledge enterprises rely on, across models and workflows.

## What is an AI context layer?

An AI context layer stores and retrieves the information an AI application needs for a task: company documents, business definitions, and saved interactions. Alchemyst AI provides this knowledge layer for AI agents through an API, so teams can reuse business context across models and inspect the sources used in retrieval.

## Why context?

An AI context layer retrieves relevant business knowledge before an agent answers or acts. It connects your internal documents and saved interactions to the model, so your application can ground responses in company data rather than rely on general training knowledge alone.

Keep AI agent memory outside the model so saved context can be retrieved across sessions and model changes. Alchemyst separates your company knowledge from the LLM that uses it, giving developers a reusable integration and enterprises continuity across teams and workflows.

An agent can give generic answers when the relevant company data is missing from its context. Connect policies, product knowledge, and operational records to a shared knowledge layer for AI agents, then retrieve the evidence each sales, support, or operations workflow needs.

## How does knowledge retrieval for AI agents work?

Alchemyst AI is an AI context management platform for storing and retrieving business knowledge. Use context arithmetic to select relevant information from your institutional knowledge graph, then inspect the sources behind retrieval without operating your own vector database or graph store.

Intersection narrows scope, union combines sources, subtraction excludes content, and ranking selects context. Memory behaviors are derived from the stored context. Canonical business definitions help teams use consistent terms.

## Why did my AI agent give a wrong answer?

When an AI agent gives wrong answers about internal data, inspect what it retrieved before changing the prompt. Alchemyst Context Traces expose the sources, scores, and rules used to assemble context. Developers can investigate retrieval failures, while enterprise teams can review which business information supported an answer.

## Can grounding stop hallucinations?

Grounding gives the model relevant evidence, which can reduce unsupported answers about your business. It does not guarantee correctness. Keep documents current, check retrieval quality, require source references, and make the agent say when evidence is missing. Review high-impact answers and test both retrieval and generation before expanding a workflow.

[Add business knowledge to your AI agent](https://getalchemystai.com/developers)
[AI agent memory and grounded answers](https://getalchemystai.com/blog/how-to-add-persistent-memory-to-ai-agents)

---

## The Context Thesis

> This thesis now lives on its own page: https://getalchemystai.com/thesis

### I - Intelligence without memory is performance, not understanding.

A model that can answer any question but remembers nothing is a search engine, not an agent. An agent that forgets the moment a session ends can never run your operations; it can only react to them, one disconnected prompt at a time.

### II - Context is the compound interest of AI interactions.

Without context, every interaction investment expires at session end. With context, each interaction builds on the last - and over time the context backbone becomes the single most valuable asset an enterprise owns about how its own AI operates.

### III - The model is not the bottleneck. The infrastructure is.

The gap between a capable model and a truly intelligent product is the layer that gives it memory, continuity, and awareness. That layer - the institutional context backbone - is where day-to-day enterprise operations are won or lost, not in the next decimal point of benchmark accuracy.

### IV - Context should be a primitive, not an afterthought.

Developers shouldn't have to build context management from scratch for every AI product. When context is a first-class primitive, every agent in an organization can draw on the same current, traceable, semantically consistent view of the business.

> "The model is the engine. **Context is the fuel.** Without it, you're not going anywhere."
> - Alchemyst AI, Context Thesis

### The problem we exist to solve - Semantic Drift

Enterprise AI doesn't fail because the model is bad. It fails because the **context rots.** GPT-4, Gemini, Claude - they're all capable enough. The gap between a capable model and a truly intelligent product is the layer that keeps its knowledge current, traceable, and semantically consistent across your entire organization.

- **Semantic Consensus breaks silently.** "Revenue" means $500K to your CFO and $5M to your Sales team. Your AI agent doesn't know which one is right - and acts with false confidence on whichever it finds first.
- **Ontologies rot from day one.** Every knowledge graph starts accurate. The decay begins the moment you ship it. New pricing tiers, new segments, new teams - the schema never updates itself. Agents keep acting on a version of your business that no longer exists.
- **Traceability is the missing primitive.** You can't audit what you can't trace. Without knowing exactly what context an agent had when it made a decision, debugging failures is guesswork. Auditability across agentic tasks requires a traceable context layer - not just logs.
- **Manual FDE teams don't scale.** Palantir solves this with entire teams of forward-deployed engineers embedded in every client. That works at $50M+ contracts. It doesn't work for the rest of the market.

> "If structured data drift almost killed Zillow - imagine what **semantic drift** can do to your AI-driven organization."
> - Anuran Roy, Semantic Consensus and Semantic Drift

---

## Comparison Guides

### Alchemyst AI vs Mem0: AI Memory Layer Comparison

Both Alchemyst AI and Mem0 provide memory layers for AI applications, but they take fundamentally different architectural approaches. Unlike Mem0, which relies heavily on vector-search inference at retrieval time, **Alchemyst AI is a deterministic context layer** scoped at write time, designed specifically for auditability in production multi-agent deployments.

| Feature | Alchemyst AI | Mem0 | Trade-off |
|---------|-------------|------|-----------|
| Architecture | Deterministic Context Layer | Vector-Search + Optional Graph (Pro) | Alchemyst trades semantic flexibility for deterministic accuracy |
| Context Scoping | Scoped at write time | Inferred at retrieval | Mem0 is more flexible but prone to semantic drift |
| Auditability | 100% Traceable & Verifiable | Limited (Pro: ~$249/mo) | Mem0 self-host is OSS; auditability requires paid Pro tier |
| LongMemEval Score | Benchmark pending | 49.0% | Zep scores 63.8% on this benchmark |
| Target Use Case | Production multi-agent orgs | Single-agent / personalized apps | Different architectures, not interchangeable |
| Pricing | Free tier + transparent | Free / $19-$249/mo | Mem0 Pro unlocks graph features at higher cost |

**Verdict:** Choose Mem0 for consumer apps and personalized agents. Choose Alchemyst for enterprise-grade multi-agent systems requiring auditability.

### Alchemyst AI vs Zep: AI Memory Comparison

Zep uses a graph database (Memgraph) for agent memory while Alchemyst uses deterministic set algebra. Both are designed for production use but differ in architecture:

| Feature | Alchemyst AI | Zep | Trade-off |
|---------|-------------|-----|-----------|
| Architecture | Deterministic Context Layer | Graph Database (Memgraph) | Zep provides temporal reasoning out-of-box |
| Source Code | Closed source | Open Source (MIT) | Zep easier for on-prem/self-host |
| Context Scoping | Scoped at write time | Inferred at retrieval | Alchemyst more predictable for enterprise |
| LongMemEval Accuracy | 63.2% | 49.0% | Alchemyst shows lower hallucination rate |
| Target Use Case | Production multi-agent orgs | Single-agent / personalized apps | Different target markets |
| Pricing | Free tier + transparent | Free OSS / Paid support | Both accessible for experimentation |

### Alchemyst AI vs Palantir: Context Layer vs Ontology Management

Alchemyst AI is a context layer delivered as an API versus Palantir's FDE-maintained static ontology. Institutional memory without a forward-deployed army:

| Feature | Alchemyst AI | Palantir | Trade-off |
|---------|-------------|----------|-----------|
| Architecture | Context Layer API | Data Foundry Platform | Palantir provides full data platform |
| Ontology Maintenance | Self-updating | FDE-dependent | Palantir requires expert teams |
| Audit Trail | Built-in | Via logging | Both provide traceability |
| Deployment | Self-service | Contract required | Palantir higher barrier to entry |
| Pricing | Transparent tiers | $50M+ contracts | Different scale targets |

**Verdict:** Alchemyst provides a context layer as infrastructure. Palantir provides a full data platform for enterprise clients.

### Competitor Deep-Dives

**Memvid vs Alchemyst:** Memvid packages embeddings into a single portable mv2 file (15KB for 10K facts) for edge/offline deployments. Alchemyst provides hosted context layer with deterministic retrieval and audit trails.

**SuperMemory vs Alchemyst:** SuperMemory captures browsing history via browser extension. Alchemyst provides structured institutional context with explicit scoping and traceable retrieval.

**Letta vs Alchemyst:** Letta provides agents with built-in memory and reasoning. Alchemyst focuses on institutional context infrastructure that any agent can query.

**LangChain Memory vs Alchemyst:** LangChain offers memory modules and vector stores. Alchemyst provides a unified context layer primitive replacing multiple components.

**Cognee vs Alchemyst:** Both build knowledge graphs, but Cognee focuses on data ingestion while Alchemyst specializes in context arithmetic and governance.

**OpenAI Memory vs Alchemyst:** OpenAI's Memory is model-bound. Alchemyst provides model-agnostic, sovereign context infrastructure for enterprises.

**Claude Memory vs Alchemyst:** Claude's memory is implicit in conversations. Alchemyst provides explicit, scoped, auditable context operations.

---

## Get API Access

Join developers building AI products with persistent, auditable context. The page lists a free tier, REST API, Python and Node SDKs, a 99.9% uptime SLA, and SOC 2 in progress.

- Documentation: https://docs.getalchemystai.com
- Website: https://getalchemystai.com
- Contact: founders@getalchemystai.com

---

## Pricing

**Simple, transparent pricing for the institutional context backbone.**

Usage-based pricing with transparent costs per million tokens and per MB processed.

| Tier | Description |
|------|-------------|
| Free | 5M tokens free with business email signup |
| Starter | Pay-as-you-go with sub-300ms retrieval |
| Accelerate | Higher limits for scaling teams |
| Supercharge | Enterprise-scale with custom bandwidth |
| Enterprise | Custom-built pricing with dedicated support |

Pricing calculator on https://getalchemystai.com/pricing shows exact costs based on expected usage.

 ---

 ## Creators Program

 **AI Context Layer Partnership Program.**

 Join our Creators Program to build content around Alchemyst AI and get rewarded:

 - **$1,000 in credits:** 250+ million tokens on the Alchemyst Context platform
 - **Hands-on experience:** Build context-aware AI agents and become a verified context layer expert
 - **Team access:** Direct line with founders. Top creators eligible for interviews for open positions

 **Who?** Anyone building AI agents who wants to add persistent context and memory.

 **What?** Credits, experience with context implementation, and a direct line to our team.

 **How?** Build written, video, or short-form content around Alchemyst AI.

 Learn more: https://getalchemystai.com/creators-program
  `
