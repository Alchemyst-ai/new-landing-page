/**
 * staticContent.ts
 *
 * Single source of truth for all static landing-page content that is
 * surfaced in both /llms.txt (index) and /llms-full.txt (full dump).
 *
 * Keep this in sync with the actual page sections.
 */

export const SITE_TITLE = "Alchemyst AI — Context Layer";
export const SITE_DESCRIPTION =
  "Never let your AI Agents work on stale Knowledge again. " +
  "Persistent memory, semantic retrieval, and cross-session context for AI agents. " +
  "One API. Zero infrastructure.";
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
        title: "Alchemyst AI — Context Layer",
        url: BASE_URL,
        description:
          "Main landing page. Hero: 'Never let your AI Agents work on stale Knowledge again.' " +
          "Covers semantic drift, context arithmetic, three-layer memory architecture, and the context thesis.",
      },
    ],
  },
  {
    title: "The Problem — Semantic Drift",
    items: [
      {
        title: "Semantic Consensus breaks silently",
        url: `${BASE_URL}#why-context`,
        description:
          '"Revenue" means $500K to your CFO and $5M to your Sales team. ' +
          "Your AI agent acts with false confidence on whichever it finds first.",
      },
      {
        title: "Ontologies rot from day one",
        url: `${BASE_URL}#why-context`,
        description:
          "Every knowledge graph starts accurate. New pricing tiers, new segments, new teams — " +
          "the schema never updates itself. Agents keep acting on a stale version of your business.",
      },
      {
        title: "Tractability is the missing primitive",
        url: `${BASE_URL}#why-context`,
        description:
          "Without knowing exactly what context an agent had when it made a decision, " +
          "debugging failures is guesswork. Auditability requires a traceable context layer.",
      },
      {
        title: "Manual FDE teams don't scale",
        url: `${BASE_URL}#why-context`,
        description:
          "Palantir solves this with forward-deployed engineers at $50M+ contracts. " +
          "Alchemyst makes the same capability available via a single API.",
      },
    ],
  },
  {
    title: "How Alchemyst Fixes It",
    items: [
      {
        title: "Three-layer context architecture",
        url: `${BASE_URL}#how-it-works`,
        description:
          "Episodic memory (what happened), semantic memory (what it means), and procedural memory " +
          "(how to act) — all queryable through a single API.",
      },
      {
        title: "Context Arithmetic — not just RAG",
        url: `${BASE_URL}#how-it-works`,
        description:
          "Set operations on your data: union across sources, intersection across relevance criteria, " +
          "and explicit subtraction of stale or irrelevant context.",
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
          "before it reaches the model — not after the agent has already acted on the wrong one.",
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
          "< 50ms context retrieval latency (p99). 94% reduction in hallucinations on domain-specific tasks. " +
          "3× faster agent debugging. 1 API replaces 4 infra pieces.",
      },
    ],
  },
  {
    title: "The Context Thesis",
    items: [
      {
        title: "Why we're building the memory layer for AI",
        url: `${BASE_URL}#thesis`,
        description:
          "Four theses: intelligence without memory is performance not understanding; " +
          "context is compound interest; the model is not the bottleneck — the infrastructure is; " +
          "context should be a primitive, not an afterthought.",
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
];

// ── Full markdown dump for /llms-full.txt ────────────────────────────────────

export const FULL_STATIC_CONTENT = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

---

## Hero

**Title:** Never let your AI Agents work on stale Knowledge again.

**Subtitle:** Your AI agent has a knowledge problem — your business moves on but its knowledge base remains static. Alchemyst fixes that.

**Key metrics:** < 50ms retrieval latency · 99.9% uptime SLA · 3-layer context architecture · 1 API, zero infra

---

## The Silent Problem — Semantic Drift

Enterprise AI doesn't fail because the model is bad. It fails because the **context rots.**

GPT-4, Gemini, Claude — they're all capable enough. The gap between a capable model and a truly intelligent product is the layer that keeps its knowledge current, traceable, and semantically consistent across your entire organization.

### Problem 1: Semantic Consensus breaks silently

"Revenue" means $500K to your CFO and $5M to your Sales team. Your AI agent doesn't know which one is right — and acts with false confidence on whichever it finds first.

### Problem 2: Ontologies rot from day one

Every knowledge graph starts accurate. The decay begins the moment you ship it. New pricing tiers, new segments, new teams — the schema never updates itself. Agents keep acting on a version of your business that no longer exists.

### Problem 3: Tractability is the missing primitive

You can't audit what you can't trace. Without knowing exactly what context an agent had when it made a decision, debugging failures is guesswork. Auditability across agentic tasks requires a traceable context layer — not just logs.

### Problem 4: Manual FDE teams don't scale

Palantir solves this with entire teams of forward-deployed engineers embedded in every client. That works at $50M+ contracts. It doesn't work for the rest of the market.

> "If structured data drift almost killed Zillow — imagine what **semantic drift** can do to your AI-driven organization."
> — Anuran Roy, Semantic Consensus and Semantic Drift

---

## What Alchemyst Does

A context layer that keeps your AI **current, traceable,** and semantically consistent. One API call. Three memory layers. Full context arithmetic. Every decision traceable back to its source.

### 01 — Three-layer context architecture

Episodic memory (what happened), semantic memory (what it means), and procedural memory (how to act) — all queryable through a single API.

\`\`\`js
const ctx = await alchemyst.context.get({
  episodic: { session_id, last_n: 10 },
  semantic: { query: userMessage },
  procedural: { task: "outbound_call" }
});
\`\`\`

### 02 — Context Arithmetic — not just RAG

Set operations on your data: union across sources, intersection across relevance criteria, and explicit subtraction of stale or irrelevant context.

\`\`\`js
const window = ctx.union(history, crm)
  .intersect(relevantToQuery)
  .subtract(outdatedPricing);
\`\`\`

### 03 — Context Traces for full auditability

Every agent decision is traceable back to the exact context it had. Debug in minutes, not days.

\`\`\`js
const trace = await alchemyst.trace.get(session_id, turn_id);
// Returns: sources[], scores[], rules_applied[]
\`\`\`

### 04 — Semantic consensus enforcement

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
| Context retrieval latency (p99) | < 50ms |
| Reduction in hallucinations | 94% |
| Faster agent debugging | 3× |
| Infra pieces replaced | 4 → 1 API |

---

## The Context Thesis

### I — Intelligence without memory is performance, not understanding.

A model that can answer any question but remembers nothing is a search engine, not an agent.

### II — Context is the compound interest of AI interactions.

Without context, every interaction investment expires at session end. With context, each interaction builds on the last.

### III — The model is not the bottleneck. The infrastructure is.

The gap between a capable model and a truly intelligent product is the layer that gives it memory, continuity, and awareness.

### IV — Context should be a primitive, not an afterthought.

Developers shouldn't have to build context management from scratch for every AI product.

> "The model is the engine. **Context is the fuel.** Without it, you're not going anywhere."
> — Alchemyst AI, Context Thesis

---

## Get API Access

Free tier available. No credit card required. REST API + Python & Node SDKs. 99.9% uptime SLA. SOC 2 in progress.

- Documentation: https://docs.getalchemystai.com
- Website: https://getalchemystai.com
- Contact: hello@getalchemystai.com
`;
