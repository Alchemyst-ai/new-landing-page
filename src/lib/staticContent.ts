/**
 * staticContent.ts
 *
 * Single source of truth for all static landing-page content that is
 * surfaced in both /llms.txt (index) and /llms-full.txt (full dump).
 *
 * Keep this in sync with the actual page sections.
 */

export const SITE_TITLE = "Alchemyst AI - The Institutional Context Backbone";
export const SITE_DESCRIPTION =
  "Enable AI agents to run your day-to-day operations at enterprise scale. " +
  "The institutional context backbone for your enterprise - persistent, traceable context, " +
  "semantic retrieval, and context arithmetic over your institutional knowledge graph. One API. Zero infrastructure.";
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
        title: "Alchemyst AI - The Institutional Context Backbone",
        url: BASE_URL,
        description:
          "Main landing page. Hero: 'Stop re-explaining your business to your AI agents every time.' " +
          "Subtitle: 'Enable AI agents to run your day-to-day operations at enterprise scale - the institutional context backbone for your enterprise.' " +
          "Covers semantic drift, context arithmetic (the core primitive), institutional knowledge graphs, and context traces.",
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
    title: "Developer Resources",
    items: [
      {
        title: "Documentation",
        url: "https://docs.getalchemystai.com",
        description: "Full API reference, SDKs, and integration guides for the Alchemyst Context Layer.",
      },
      {
        title: "Python SDK",
        url: "https://docs.getalchemystai.com/sdk/python",
        description: "Official Python SDK for the Alchemyst Context Layer API.",
      },
      {
        title: "Node.js SDK",
        url: "https://docs.getalchemystai.com/sdk/node",
        description: "Official Node.js / TypeScript SDK for the Alchemyst Context Layer API.",
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
        title: "Alchemyst AI vs Palantir: Context Layer vs Ontology Management",
        url: `${BASE_URL}/compare/alchemyst-ai-vs-palantir`,
        description:
          "Compare Alchemyst AI with Palantir Foundry and AIP. Both provide enterprise-grade features, but Alchemyst is a context layer while Palantir is a data platform.",
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
      {
        title: "Alchemyst AI vs Glean: Enterprise Search vs Context Infrastructure",
        url: `${BASE_URL}/compare/alchemyst-ai-vs-glean`,
        description:
          "Compare Glean's enterprise search with Alchemyst AI's context layer. Glean is a search box for humans; Alchemyst is infrastructure for agents.",
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
        title: "Letta vs Alchemyst: Agent Memory Architectures",
        url: `${BASE_URL}/compare/letta-vs-alchemyst-llm-memory`,
        description:
          "Letta provides agents with memory and reasoning capabilities while Alchemyst focuses on institutional context infrastructure.",
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
];

// ── Full markdown dump for /llms-full.txt ────────────────────────────────────

export const FULL_STATIC_CONTENT = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

---

## Hero

**Title:** Stop re-explaining your business to your AI agents every time.

**Subtitle:** Enable AI agents to run your day-to-day operations at enterprise scale - the institutional context backbone for your enterprise.

**Standalone definition:** Alchemyst AI is the institutional context backbone that lets AI agents run an enterprise's day-to-day operations at scale. Through a single API and its context arithmetic primitive, it gives every agent persistent, traceable context and semantic retrieval over your institutional knowledge graph - keeping institutional knowledge current, traceable, and consistent.

**Key metrics:** < 300ms retrieval latency · 99.9% uptime SLA · context arithmetic over an institutional knowledge graph · 1 API, zero infra

---

## Why Context

**The model is replaceable. Your institutional context isn't.**

Models are commoditizing fast. Durable advantage comes from a context layer that operationalizes your business intelligence - and stays yours no matter which model you run it on. There are two reasons this matters: a technical one and a business one.

### The Technical Case - model-agnostic continuity and context sovereignty

You will switch models - GPT today, Gemini or Claude tomorrow, the next frontier model after that, often several at once routed by cost or capability. Normally every switch resets the agent's memory and behavior. Alchemyst decouples *what your organization knows* from *whichever model is reasoning over it*, so your institutional context stays continuous across every upgrade, swap, or multi-model setup. Models must stay switchable, but business continuity and context sovereignty are preserved - the context is yours, and it plugs into any AI model or agent on demand, according to the business requirement at hand.

*Model-agnostic · context sovereignty · zero migration cost · multi-model routing · sub-300ms retrieval.*

### The Business Case - operationalized intelligence at scale

This isn't about a smarter chatbot. It's about operationalizing your business intelligence - turning what your organization knows into agents that can actually run day-to-day operations and knowledge work across sales, support, ops, and research, at scale. The context layer is what makes that dependable: every agent acts on the same current, traceable, consensus version of the business, so you can trust it to operate, not just assist - without embedding a forward-deployed team in every workflow.

*Run ops, not just answers · one source of truth · every decision auditable · scales without FDE teams.*

> "Models will keep changing. Your institutional context is the asset that compounds - so it should belong to you, not to whichever model you happen to run today."

The full problem framing behind this - semantic drift, semantic consensus, and context rot - lives on the Context Thesis page: https://getalchemystai.com/thesis

---

## What Alchemyst Does

A context layer that keeps your AI **current, traceable,** and semantically consistent. One API call. Context arithmetic over your institutional knowledge graph. Every decision traceable back to its source.

### 01 - Context Arithmetic - the core primitive

Context arithmetic is the foundational primitive: dynamic set algebra over meaning, computed at query time. Instead of naïve top-K similarity, Alchemyst **intersects** to narrow scope, **unions** to widen recall, **subtracts** superseded or out-of-scope content, and **ranks** what remains - so only the right context survives into the window.

\`\`\`js
// Set algebra over meaning, at query time
const window = alchemyst.context.search({
  query: userMessage,
  groupName: ["sales", "emea"],   // ∩ narrow scope
  metadata: { version: "v2" },     // ∩ filter
});
// − superseded / deduped  → rank → top-K
\`\`\`

### 02 - Institutional knowledge graph + derived memory

What you store is an institutional knowledge graph of your organization's context, fully traceable. Memory is **not** three hard-coded layers (episodic / semantic / procedural). By applying context arithmetic over the graph you can **derive** the behaviors expected from memory - recall what happened, resolve what it means, and inform how to act. The memory types are outcomes of the primitive, not separate modules.

\`\`\`js
// One graph + arithmetic → derived "memories"
const whatHappened = ctx.search({ groupName: [session_id] });
const whatItMeans  = ctx.search({ query: term }).subtract(deprecated);
// "how to act" falls out of ranked, in-scope context
\`\`\`

### 03 - Context Traces for full auditability

Every agent decision is traceable back to the exact context it had. Debug in minutes, not days.

\`\`\`js
const trace = await alchemyst.trace.get(session_id, turn_id);
// Returns: sources[], scores[], rules_applied[]
\`\`\`

### 04 - Semantic consensus enforcement

Define canonical term definitions at the org level. Alchemyst resolves ambiguity before it reaches the model.

\`\`\`js
await alchemyst.ontology.define({
  term: "revenue",
  canonical: "ARR as reported to board",
  aliases: ["sales", "bookings", "ARR"],
  owner: "finance"
});
\`\`\`

### Results

| Metric | Value |
|--------|-------|
| Context retrieval latency (p95) | < 300ms |
| Reduction in hallucinations | 99.7% |
| Faster agent debugging | 20× |
| Infra pieces replaced | 4 → 1 API |

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
- **Tractability is the missing primitive.** You can't audit what you can't trace. Without knowing exactly what context an agent had when it made a decision, debugging failures is guesswork. Auditability across agentic tasks requires a traceable context layer - not just logs.
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
 
Free tier available. No credit card required. REST API + Python & Node SDKs. 99.9% uptime SLA. SOC 2 in progress.
 
- Documentation: https://docs.getalchemystai.com
- Website: https://getalchemystai.com
- Contact: hello@getalchemystai.com
 
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
 `;
