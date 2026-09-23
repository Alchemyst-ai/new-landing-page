import { ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/team-context-vs-siloed-memory";
const PAGE_TITLE = "Team Context vs Siloed Memory: Why Your AI Knowledge Shouldn't Fragment";
const PAGE_DESCRIPTION = "Vendor-native memory fragments across tools. Portable context layers give teams unified, auditable knowledge that survives vendor switches.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function TeamContextVsSiloedPage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb={PAGE_TITLE}
      title={PAGE_TITLE}
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          Five AI tools. Five memory silos. Your team re-explains context in each tool instead of building on shared knowledge.
        </>
      }
    >
      <h2>The fragmentation reality</h2>
      <p>In 2026, every major AI assistant has its own memory:</p>
      <ul>
        <li><strong>ChatGPT Dreaming:</strong>{" "}Synthesized state on OpenAI&apos;s servers, no export</li>
        <li><strong>Claude Auto Memory:</strong> Per-repository files, limited to 25KB/session</li>
        <li><strong>Microsoft Copilot:</strong> Tenant-scoped, Microsoft-365 integrated</li>
        <li><strong>Grok Skills:</strong> Account-bound preferences, minimal sharing</li>
        <li><strong>Cursor Rules:</strong> Project-local, not cross-tool</li>
      </ul>

      <h2>What enterprise teams actually need</h2>
      <p>
        Your customer database schema discovered during a ChatGPT session should inform the next Cursor code change. Your deployment preference learned in Claude should carry to tomorrow&apos;s Copilot email draft.
      </p>
      <p>Without a portable context layer, you get:</p>
      <ul>
        <li>Repetition: &quot;Remind me what we decided about the auth flow?&quot;</li>
        <li>Inconsistency: Different tools give conflicting preferences</li>
        <li>Knowledge loss: Vendor switch = context wipe</li>
        <li>Compliance gaps: No audit trail across tools</li>
      </ul>

      <h2>Portable context layer benefits</h2>
      <ComparisonTable
        columns={["Capability", "Alchemyst AI", "Native Memory"]}
        rows={[
          ["Cross-tool context", "✅ Unified memory", "❌ Siloed per tool"],
          ["Team sharing", "✅ Shared context layer", "⚠️ Manual sync"],
          ["Export & backup", "✅ Structured export", "❌ Vendor-controlled"],
          ["Vendor switch cost", "✅ Zero knowledge loss", "❌ Complete loss"],
        ]}
      />

      <h2>The protocol layer emerging</h2>
      <p>
        Just as email protocols (SMTP) and contact protocols (vCard) enabled interoperability, Portable Agent Memory (PAM) and similar standards aim to decouple context from vendors. The question isn&apos;t whether memory is useful: it&apos;s whether your accumulated knowledge should be held hostage to platform loyalty.
      </p>
    </ComparePage>
  );
}
