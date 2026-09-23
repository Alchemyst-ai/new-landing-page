import { ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/memvid-vs-alchemyst-agent-memory";
const PAGE_TITLE = "Memvid vs Alchemyst: Embedded Memory vs Context Layer";
const PAGE_DESCRIPTION = "Compare Memvid's embedded memory approach with Alchemyst AI's context layer. Both eliminate infrastructure, but serve different use cases.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function MemvidVsAlchemystPage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb={PAGE_TITLE}
      title={PAGE_TITLE}
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          Memvid packages embeddings, search structures, and metadata into a single portable file: no infrastructure required. Alchemyst AI provides a deterministic context layer as a service. Both eliminate operational overhead, but with different architectural philosophies.
        </>
      }
    >
      <h2>What is Memvid&apos;s single-file approach?</h2>
      <p>
        Memvid treats memory like video encoding, packaging data, embeddings, search index, and metadata into a single <code>.mv2</code> file. This file can be:
      </p>
      <ul>
        <li>Copied to any environment without databases or APIs.</li>
        <li>Updated incrementally like video frames.</li>
        <li><strong>15KB</strong> for 10,000 facts, extremely compact.</li>
      </ul>
      <p>
        This is excellent for edge deployments, offline applications, and single-user agents where portability trumps coordination.
      </p>

      <h2>What is Alchemyst AI&apos;s context layer?</h2>
      <p>
        Alchemyst AI provides a hosted context layer accessible via API, SDK, or MCP. Context is:
      </p>
      <ul>
        <li><strong>Deterministic:</strong> Context is scoped at write time, not inferred at retrieval.</li>
        <li><strong>Auditable:</strong> Every retrieval is traceable with scores and rules applied.</li>
        <li><strong>Multi-agent:</strong> Shared institutional context across your organization.</li>
      </ul>

      <h2>When to choose which?</h2>
      <ComparisonTable
        columns={["Use Case", "Alchemyst AI", "Memvid"]}
        rows={[
          ["Edge/offline deployment", "⚠️ Requires connectivity", "✅ Perfect fit"],
          ["Multi-agent coordination", "✅ Designed for this", "⚠️ File synchronization needed"],
          ["Audit requirements", "✅ Full traceability", "⚠️ File inspection only"],
          ["Sub-100ms latency", "✅ P95 <300ms", "✅ Local file access"],
        ]}
      />

      <h2>Architectural differences</h2>
      <p>
        <strong>Memvid</strong>{" "}optimizes for zero-infrastructure embedding storage. It&apos;s a smarter vector database in a file, excellent for personal assistants and offline use cases.
      </p>
      <p>
        <strong>Alchemyst AI</strong> optimizes for institutional context: that is, shared business knowledge that must stay consistent across multiple agents and teams. It handles semantic drift, provides ontology enforcement, and ensures your agents act on verified facts.
      </p>

      <h2>Conclusion</h2>
      <p>
        Choose Memvid when you need memory in a file: offline agents, edge deployments, or single-user applications. Choose Alchemyst when you need institutional context that scales across your organization with auditability and semantic consensus.
      </p>
    </ComparePage>
  );
}
