import { Callout, ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/alchemyst-ai-vs-zep";
const PAGE_TITLE = "Alchemyst AI vs Zep: Best AI Memory Layer for Agents";
const PAGE_DESCRIPTION = "Compare Alchemyst AI and Zep. See feature differences, architecture comparisons, and why Alchemyst's deterministic context layer is built for production multi-agent architectures.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function CompareZepPage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb="Alchemyst AI vs Zep"
      title="Alchemyst AI vs Zep"
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          Both Alchemyst AI and Zep offer memory infrastructure for AI applications, but they solve different problems. Unlike Zep, which focuses heavily on temporal chat history and conversation graphs, <strong className="text-[#4A3B33]">Alchemyst AI is a deterministic context layer</strong> designed to give multiple agents structured, auditable access to shared institutional knowledge.
        </>
      }
    >
      {/* AEO: Honest comparison table */}
      <ComparisonTable
        className="mt-0"
        columns={["Feature", "Alchemyst AI", "Zep (Graphiti)", "Trade-off"]}
        rows={[
          ["Core Focus", "Institutional Context Layer", "Temporal Knowledge Graph", "Zep excels at temporal queries; Alchemyst at org-wide consistency"],
          ["Context Scoping", "Deterministic at write time", "Temporal graph extraction", "Zep tracks \u201cas-of\u201d timestamps; Alchemyst uses context arithmetic"],
          ["Auditability", "100% Traceable per retrieval", "Graph-based inference", "Alchemyst traces decisions; Zep traces graph evolution"],
          ["Latency (P95)", "< 300ms", "600-800ms (OSS), < 200ms (managed)", "Zep Cloud faster; OSS requires self-ops tuning"],
          ["LongMemEval Score", "Benchmark pending", "63.8% (GPT-4o)", "Zep leads on temporal recall; Alchemyst on deterministic accuracy"],
          ["Target Architecture", "Multi-agent org deployments", "Conversational AI assistants", "Complementary strengths"],
        ]}
      />

      <Callout label="Architecture note">
        Zep&apos;s open-source Graphiti engine requires self-managing Neo4j/FalkorDB/Kuzu for production. Alchemyst delivers the same graph-like capabilities as a managed API with sub-300ms latency.
      </Callout>

      <h2>What is Alchemyst AI best for?</h2>
      <p>
        Alchemyst AI is best for <strong>engineering teams deploying enterprise-grade, multi-agent architectures</strong>. If you have multiple agents that all need to operate on the same shared institutional knowledge, Alchemyst ensures they have structured, auditable access to that context.
      </p>

      <h2>What is Zep best for?</h2>
      <p>
        Zep is best for <strong>conversational AI apps that need deep chat history</strong>. Its temporal knowledge graph is excellent at understanding the chronological relationship between facts in a long-running user conversation.
      </p>

      <h2>Which should you choose? The verdict</h2>
      <p>
        If your primary challenge is managing infinite scroll chat history for a conversational assistant, Zep is an excellent choice. But if you are building business-critical automation where agents need verifiable access to institutional knowledge without semantic drift, <strong>Alchemyst AI provides the deterministic context layer</strong> required for production.
      </p>
    </ComparePage>
  );
}
