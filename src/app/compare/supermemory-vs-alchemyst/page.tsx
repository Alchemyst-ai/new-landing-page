import { ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/supermemory-vs-alchemyst";
const PAGE_TITLE = "SuperMemory vs Alchemyst: Memory + RAG vs Deterministic Context";
const PAGE_DESCRIPTION = "Compare SuperMemory's memory+rag approach with Alchemyst AI's deterministic context layer. Both combine memory with retrieval, but with different architectures.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function SuperMemoryVsAlchemystPage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb={PAGE_TITLE}
      title={PAGE_TITLE}
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          SuperMemory combines memory graph + user profiles + knowledge base + session context + compliance in a single API. Alchemyst AI provides a deterministic context layer with context arithmetic. Both target developers, but with different priorities.
        </>
      }
    >
      <h2>What is SuperMemory&apos;s five-layer approach?</h2>
      <p>SuperMemory provides a unified context stack:</p>
      <ol>
        <li><strong>Memory Graph</strong>: stores facts extracted from conversations with temporal validity.</li>
        <li><strong>User Profiles</strong>: maintains stable facts + recent activity for personalization.</li>
        <li><strong>Knowledge Base</strong>: RAG over documents and external data.</li>
        <li><strong>Session Context</strong>: conversation continuity within sessions.</li>
        <li><strong>Enterprise Compliance</strong>: SOC 2, HIPAA, GDPR controls.</li>
      </ol>
      <p>
        This works well for coding agents and personal assistants where the agent needs both memory and document retrieval.
      </p>

      <h2>What is Alchemyst AI&apos;s deterministic approach?</h2>
      <p>Alchemyst AI focuses exclusively on institutional context with three primitives:</p>
      <ul>
        <li><strong>Context Arithmetic</strong>: set operations over meaning at query time.</li>
        <li><strong>Semantic Consensus</strong>: resolve contested definitions before retrieval.</li>
        <li><strong>Context Traces</strong>: every retrieval is fully auditable.</li>
      </ul>

      <h2>Key differences</h2>
      <ComparisonTable
        columns={["Aspect", "Alchemyst AI", "SuperMemory"]}
        rows={[
          ["Primary focus", "Institutional context", "Memory + RAG combined"],
          ["Memory model", "Deterministic (scoped writes)", "Graph + RAG hybrid"],
          ["Audit trail", "✅ Retrieval-level traces", "⚠️ Limited"],
          ["Document handling", "Via MCP connectors", "✅ Native knowledge base"],
          ["Latency", "P95 <300ms", "Reported 85.4% on LongMemEval"],
        ]}
      />

      <h2>When to choose which?</h2>
      <p>
        <strong>Choose SuperMemory if:</strong>
      </p>
      <ul>
        <li>You are building a coding agent or personal assistant.</li>
        <li>You need both user preferences AND document retrieval in one API.</li>
        <li>You want connectors to Google Drive, Slack, Notion, GitHub.</li>
      </ul>

      <p>
        <strong>Choose Alchemyst AI if:</strong>
      </p>
      <ul>
        <li>You are building multi-agent systems with shared institutional knowledge.</li>
        <li>You need audit trails for every context retrieval.</li>
        <li>You want to enforce semantic consensus across teams (&quot;revenue&quot; means one thing).</li>
      </ul>

      <h2>The trade-offs</h2>
      <p>
        SuperMemory covers more ground in a single service: memory, user profiles, knowledge base, and compliance. This reduces integration complexity but can mean you are paying for capabilities you may not need.
      </p>
      <p>
        Alchemyst does one thing (context) but does it with surgical precision: deterministic, traceable, and consensual. For enterprises where wrong answers cost millions, this precision matters more than breadth.
      </p>
    </ComparePage>
  );
}
