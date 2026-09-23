import { ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/alchemyst-vs-openai-dreaming";
const PAGE_TITLE = "Alchemyst AI vs OpenAI Dreaming: Auditable Memory vs Black Box";
const PAGE_DESCRIPTION = "OpenAI's Dreaming synthesizes memory in the background without auditability. Alchemyst AI provides deterministic, traceable context for enterprises.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function DreamingVsAlchemystPage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb={PAGE_TITLE}
      title={PAGE_TITLE}
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          OpenAI&apos;s Dreaming (June 2026) automatically curates memories in the background. But this black-box approach breaks down for enterprises that need to audit, verify, and control how context is used.
        </>
      }
    >
      <h2>What is OpenAI Dreaming?</h2>
      <p>
        Dreaming is a background process launched June 2026 that synthesizes memories from your entire chat history. It automatically updates facts like &quot;You went to Singapore in July&quot; becoming &quot;You went to Singapore in July 2026&quot; after your trip ends.
      </p>
      <p>
        The problem: you see a summary, not the actual stored memories. Selecting &quot;don&apos;t mention this again&quot; suppresses details without deleting underlying entries. Deleting a conversation doesn&apos;t remove derived memories.
      </p>

      <h2>The auditability gap</h2>
      <p>
        Dreaming creates a synthesized memory state that exports badly. What would you even export: the summary? Every month of dreaming makes ChatGPT more useful to you and your context less reconstructible elsewhere.
      </p>
      <p>
        For enterprises, this is a compliance nightmare. You cannot verify what the model &quot;knows&quot; about you, cannot systematically correct wrong inferences, and cannot demonstrate to auditors how context influenced decisions.
      </p>

      <h2>How Alchemyst AI differs</h2>
      <ul>
        <li><strong>Explicit scoping:</strong> Context is tagged at write time with <code>&#123;user_id, agent_id, session_id, org_id&#125;</code>, not inferred after the fact.</li>
        <li><strong>Full provenance:</strong> Every context entry traces to its source with timestamps, confidence scores, and supersession chains.</li>
        <li><strong>Exportable:</strong> Your context exports in structured formats. Move to any system without losing knowledge.</li>
        <li><strong>Deterministic retrieval:</strong> Same query always returns same results. No probabilistic black-box surprises.</li>
      </ul>

      <h2>When to choose which?</h2>
      <ComparisonTable
        columns={["Consideration", "Alchemyst AI", "OpenAI Dreaming"]}
        rows={[
          ["Audit trail", "✅ Full traceability", "❌ Summary only"],
          ["Cross-model", "✅ Any LLM", "❌ ChatGPT only"],
          ["Storage limit", "✅ Unlimited", "❌ ~1,500 words"],
          ["Enterprise controls", "✅ RBAC, export", "❌ Platform-managed"],
        ]}
      />
    </ComparePage>
  );
}
