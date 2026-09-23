import { ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/langchain-memory-vs-alchemyst";
const PAGE_TITLE = "LangChain Memory vs Alchemyst: Framework Memory vs Context Layer";
const PAGE_DESCRIPTION = "LangChain deprecated BufferMemory in favor of LangGraph's memory patterns. Alchemyst provides a vendor-agnostic context layer. Compare memory architectures.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function LangChainMemoryVsAlchemystPage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb={PAGE_TITLE}
      title={PAGE_TITLE}
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          LangChain deprecated BufferMemory in 2026, pushing developers toward LangGraph&apos;s persistent store patterns. Alchemyst AI provides a vendor-agnostic context layer that works with any framework. Both solve memory, but at different layers of the stack.
        </>
      }
    >
      <h2>What changed in LangChain memory in 2026?</h2>
      <p>In 2026, LangChain deprecated several memory classes:</p>
      <ul>
        <li><strong>BufferMemory</strong>: storing raw conversation history.</li>
        <li><strong>ConversationBufferMemory</strong>: stateful chat history.</li>
        <li><strong>VectorStoreRetrieverMemory</strong>: vector-based retrieval.</li>
      </ul>
      <p>
        The official memory path now runs through <strong>LangGraph&apos;s checkpointer-based short_term + long_term patterns</strong>. This means new infrastructure requirements for teams already invested in LangChain.
      </p>

      <h2>What is LangMem&apos;s approach?</h2>
      <p>
        LangMem provides episodic, semantic, and procedural memory primitives built into LangGraph&apos;s persistent store. It requires no new infrastructure for teams already on LangGraph, but:
      </p>
      <ul>
        <li>Semantic memory is just vector retrieval, prone to drift.</li>
        <li>No built-in semantic consensus or ontology enforcement.</li>
        <li>Framework-locked: cannot be used outside LangGraph.</li>
      </ul>

      <h2>What is Alchemyst&apos;s approach?</h2>
      <p>Alchemyst AI provides a context layer separate from framework:</p>
      <ul>
        <li><strong>Framework agnostic:</strong> Works with LangGraph, CrewAI, Vercel AI, Mastra, OpenAI SDK.</li>
        <li><strong>Deterministic context:</strong> Scanned at write time, not inferred at retrieval.</li>
        <li><strong>Semantic consensus:</strong> Prevent ambiguous definitions before they reach agents.</li>
        <li><strong>Context traces:</strong> Audit every decision back to its source.</li>
      </ul>

      <h2>Migration implications</h2>
      <p>
        If you&apos;re on LangChain and need to upgrade your memory stack, you face a choice:
      </p>
      <ol>
        <li><strong>Stay in LangGraph:</strong> Use LangMem for lowest friction. Accept its limitations on semantic drift.</li>
        <li><strong>Add Alchemyst:</strong> Keep LangGraph for orchestration, use Alchemyst for reliable context. Adds a service but prevents hallucinations.</li>
      </ol>

      <h2>When to choose which?</h2>
      <ComparisonTable
        columns={["Consideration", "Alchemyst AI", "LangMem"]}
        rows={[
          ["Framework integration", "✅ Any framework", "✅ LangGraph native"],
          ["Semantic consensus", "✅ Built-in", "⚠️ Not designed for this"],
          ["New infrastructure", "✅ Zero-infra API", "✅ Uses existing store"],
          ["Audit trails", "✅ Retrieval-level", "⚠️ Checkpointer logs"],
        ]}
      />

      <h2>The pragmatic recommendation</h2>
      <p>
        If you are building agents on LangGraph and need to migrate off deprecated BufferMemory, start with LangMem. It solves the immediate problem with minimal friction.
      </p>
      <p>
        As your agents grow and semantic drift becomes a real issue, especially for customer-facing or compliance-sensitive applications, layer in Alchemyst AI for institutional-grade context management. The two can coexist: LangGraph orchestrates, Alchemyst provides reliable memory.
      </p>
    </ComparePage>
  );
}
