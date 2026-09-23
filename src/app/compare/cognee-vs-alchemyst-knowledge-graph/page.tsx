import { ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/cognee-vs-alchemyst-knowledge-graph";
const PAGE_TITLE = "Cognee vs Alchemyst: Open-Source Graph vs Deterministic Context";
const PAGE_DESCRIPTION = "Cognee builds knowledge graphs from documents. Alchemyst provides deterministic context arithmetic. Compare graph-based memory architectures.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function CogneeVsAlchemystPage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb={PAGE_TITLE}
      title={PAGE_TITLE}
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          Cognee builds knowledge graphs from unstructured data using remember/recall/improve/forget operations. Alchemyst AI provides deterministic context arithmetic over institutional knowledge. Both use graph structures, but with different priorities.
        </>
      }
    >
      <h2>What is Cognee&apos;s graph memory pipeline?</h2>
      <p>Cognee implements a four-stage memory lifecycle:</p>
      <ol>
        <li><strong>Remember:</strong> Ingest documents, conversations, and external data into a knowledge graph.</li>
        <li><strong>Recall:</strong> Query the graph with hybrid search (vector + graph traversal).</li>
        <li><strong>Improve:</strong> Refine relationships and update the graph structure.</li>
        <li><strong>Forget:</strong> Remove outdated or irrelevant information.</li>
      </ol>
      <p>
        Cognee excels at building a knowledge graph before any queries happen, combining graph traversal with vector similarity for better recall.
      </p>

      <h2>What is Alchemyst&apos;s graph approach?</h2>
      <p>
        Alchemyst AI uses context arithmetic, a dynamic set algebra over meaning computed at query time:
      </p>
      <ul>
        <li><strong>Context arithmetic:</strong> Intersect, union, subtract operations on semantic groups.</li>
        <li><strong>Layered references:</strong> Raw data → Inferences → Derived meanings.</li>
        <li><strong>Semantic consensus:</strong> Resolve contested definitions before retrieval.</li>
      </ul>
      <p>
        The graph emerges from how context is actually used, not pre-built from documents. This adapts to changing business meanings automatically.
      </p>

      <h2>Key differences</h2>
      <ComparisonTable
        columns={["Aspect", "Alchemyst AI", "Cognee"]}
        rows={[
          ["Graph build timing", "Dynamic (query-time)", "Batch (pre-query)"],
          ["Semantic consensus", "✅ Built-in ontology", "⚠️ Manual curation"],
          ["Deployment", "API / MCP (zero-infra)", "Self-host required"],
          ["Connectors", "30+ via MCP", "30+ native connectors"],
          ["Audit trail", "✅ Everything traced", "⚠️ Graph update logs"],
        ]}
      />

      <h2>When to choose which?</h2>
      <p>
        <strong>Choose Cognee if:</strong>
      </p>
      <ul>
        <li>You want to build a knowledge graph from documents before queries.</li>
        <li>You prefer open-source self-hosted infrastructure.</li>
        <li>Graph complexity over audit simplicity is acceptable.</li>
      </ul>

      <p>
        <strong>Choose Alchemyst if:</strong>
      </p>
      <ul>
        <li>You need audit trails for every context decision.</li>
        <li>Your business definitions change over time (semantic drift).</li>
        <li>You want to avoid managing graph database infrastructure.</li>
      </ul>

      <h2>The architectural trade-off</h2>
      <p>
        Cognee builds a graph first, then queries it. This is predictable but brittle: ontology changes require rebuilding. It&apos;s excellent for static knowledge bases.
      </p>
      <p>
        Alchemyst queries contextually, with the graph emerging from usage patterns. This adapts to semantic drift but requires understanding of context arithmetic patterns. It&apos;s excellent for evolving business context.
      </p>
    </ComparePage>
  );
}
