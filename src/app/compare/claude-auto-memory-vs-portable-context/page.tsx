import { ComparePage, ComparisonTable } from "@/components/compare";
import type { Metadata } from "next";

const PAGE_PATH = "/compare/claude-auto-memory-vs-portable-context";
const PAGE_TITLE = "Claude Auto Memory vs Portable Context: Fragmentation vs Unity";
const PAGE_DESCRIPTION = "Claude Code Auto Memory stores per-repository files. Portable context layers unify memory across tools, projects, and models.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
};

export default function ClaudeAutoMemoryVsPortablePage() {
  return (
    <ComparePage
      path={PAGE_PATH}
      crumb={PAGE_TITLE}
      title={PAGE_TITLE}
      headline={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      lead={
        <>
          Claude Code&apos;s Auto Memory saves insights per-repository. This works for single-agent workflows but creates knowledge silos when your team uses multiple AI tools.
        </>
      }
    >
      <h2>Claude Auto Memory&apos;s architecture</h2>
      <p>
        Auto Memory stores notes at <code>~/.claude/projects/&#123;project-id&#125;/memory/</code> as markdown files keyed by repository. The MEMORY.md index loads the first 200 lines (25KB) into each session.
      </p>
      <p>
        This design has trade-offs: insights discovered in Project A never surface in Project B unless you manually share them. Agent-written memory creates inconsistencies across team members.
      </p>

      <h2>The cross-tool fragmentation problem</h2>
      <p>Your context fragments across tools:</p>
      <ul>
        <li>Claude Code: ~/.claude/projects/&#123;id&#125;/memory/</li>
        <li>Cursor: ~/.cursor/context.json</li>
        <li>ChatGPT: Cloud-stored, ChatGPT-only</li>
        <li>Gemini: Project memory, model-locked</li>
      </ul>
      <p>
        When your team switches between tools hourly, this creates context collapse. The debugging insight from yesterday&apos;s Claude session? Gone in Cursor.
      </p>

      <h2>Portable context solves this</h2>
      <ul>
        <li><strong>Unified memory:</strong> One store powers Claude Code, Cursor, ChatGPT, and any MCP-compatible tool.</li>
        <li><strong>User-scoped context:</strong> Your preferences follow you across projects, not trapped in repository silos.</li>
        <li><strong>Team knowledge:</strong> Share institutional memory without manual CLAUDE.md sync.</li>
        <li><strong>Model flexibility:</strong>{" "}Context isn&apos;t tied to Claude: it works with any LLM.</li>
      </ul>

      <h2>Comparison matrix</h2>
      <ComparisonTable
        columns={["Feature", "Alchemyst AI", "Claude Auto Memory"]}
        rows={[
          ["Cross-tool sharing", "✅ Native", "❌ Manual sync"],
          ["User-scoped context", "✅ Multi-scope", "⚠️ Repository-only"],
          ["Storage limit", "✅ Unlimited", "⚠️ 25KB threshold"],
          ["Conflict resolution", "✅ Semantic consensus", "❌ Agent-written"],
        ]}
      />
    </ComparePage>
  );
}
