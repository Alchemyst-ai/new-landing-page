import { ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/letta-vs-alchemyst-llm-memory";
const PAGE_TITLE = "Letta (MemGPT) vs Alchemyst: OS-Style Memory vs Context Layer";
const PAGE_DESCRIPTION = "Letta (formerly MemGPT) uses OS-inspired tiered memory. Alchemyst uses context arithmetic. Compare architectures for long-running agents.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function LettaVsAlchemystPage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb={PAGE_TITLE}
      title={PAGE_TITLE}
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          Letta (formerly MemGPT) implements OS-style tiered memory: core (RAM), archival (disk), and recall (history). Alchemyst AI provides context arithmetic over an institutional knowledge graph. Both solve memory for long-running agents, but with fundamentally different architectures.
        </>
      }
    >
      <h2>What is Letta&apos;s OS-inspired memory model?</h2>
      <p>Letta treats the LLM like an operating system managing its own memory:</p>
      <ul>
        <li><strong>Core memory (RAM):</strong> Always in-context, always visible to agent.</li>
        <li><strong>Archival memory (disk):</strong> External vector store, agent decides when to retrieve.</li>
        <li><strong>Recall memory:</strong> Conversation history, searchable on demand.</li>
      </ul>
      <p>
        The agent actively manages its own memory through function calls: <code>archival_memory_search</code>, <code>core_memory_append</code>, etc. This is excellent for agents that run for weeks or months without human intervention.
      </p>

      <h2>What is Alchemyst&apos;s context arithmetic?</h2>
      <p>Alchemyst AI provides a single API for institutional context:</p>
      <ul>
        <li><strong>Context arithmetic:</strong> Set operations (intersect, union, subtract) over meaning at query time.</li>
        <li><strong>Semantic consensus:</strong> Prevent ambiguity before it reaches the model.</li>
        <li><strong>Context traces:</strong> Every retrieval is fully auditable.</li>
      </ul>

      <h2>When to choose which architecture?</h2>
      <ComparisonTable
        columns={["Use Case", "Alchemyst AI", "Letta"]}
        rows={[
          ["Multi-agent coordination", "✅ Shared context layer", "⚠️ Separate memory per agent"],
          ["Long-running research", "✅ Good", "✅ Excellent"],
          ["Semantic consensus", "✅ Built-in ontology", "⚠️ Agent-managed"],
          ["Model choice", "✅ Any via API/MCP", "✅ Any via endpoints"],
          ["Audit requirements", "✅ Retrieval traces", "⚠️ Function call logs"],
        ]}
      />

      <h2>Architectural trade-offs</h2>
      <p>
        Letta places memory management inside the agent&apos;s reasoning loop. The agent decides what to remember, what to archive, and what to recall. This gives agents autonomy but means they must be taught good memory hygiene.
      </p>
      <p>
        Alchemyst places memory management outside the agent. Context is scoped at write time through explicit APIs. This removes burden from agents but requires deliberate context structuring.
      </p>

      <h2>The hybrid approach</h2>
      <p>
        Many teams use Letta for long-running research agents (coding, documentation, analysis) and Alchemyst for production workflows requiring semantic consensus and audit trails. Both are open-source, self-hostable, and model-agnostic.
      </p>
      <p>
        The key is matching architecture to use case: Letta when agents should manage their own memory, Alchemyst when institutional reliability matters more than agent autonomy.
      </p>
    </ComparePage>
  );
}
