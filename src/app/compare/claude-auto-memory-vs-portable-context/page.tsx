import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ArticleSchema from "@/components/ArticleSchema";
import type { Metadata } from "next";

const SANS = "'Sora', sans-serif";

const PAGE_PATH = "/compare/claude-auto-memory-vs-portable-context";
const PAGE_TITLE = "Claude Auto Memory vs Portable Context: Fragmentation vs Unity";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: "Claude Code Auto Memory stores per-repository files. Portable context layers unify memory across tools, projects, and models.",
};

export default function ClaudeAutoMemoryVsPortablePage() {
  return (
    <>
      <ArticleSchema
        headline={PAGE_TITLE}
        description="Claude Code Auto Memory stores per-repository files. Portable context layers unify memory across tools, projects, and models."
        url={PAGE_PATH}
      />
      <Navbar />
      <main style={{ background: "#151515", color: "#FAFAFA", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Breadcrumbs
            currentPath={PAGE_PATH}
            items={[
              { name: "Compare", path: "/compare" },
              { name: PAGE_TITLE },
            ]}
          />
          <h1 style={{ fontFamily: SANS, fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, color: "#FFFFFF", marginBottom: "24px" }}>
            {PAGE_TITLE}
          </h1>
          <div style={{ marginBottom: "48px" }}>
            <p style={{ fontFamily: SANS, fontSize: "1.125rem", lineHeight: 1.6, color: "#CBD5E1" }}>
              Claude Code's Auto Memory saves insights per-repository. This works for single-agent workflows but creates knowledge silos when your team uses multiple AI tools.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#64748B", marginTop: "16px" }}>Last updated: June 2026</p>
          </div>
          <div className="prose-blog-dark" style={{ fontFamily: SANS, color: "#CBD5E1", lineHeight: 1.7 }}>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Claude Auto Memory's architecture
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Auto Memory stores notes at <code>~/.claude/projects/&#123;project-id&#125;/memory/</code> as markdown files keyed by repository. The MEMORY.md index loads the first 200 lines (25KB) into each session.
            </p>
            <p style={{ marginBottom: "24px" }}>
              This design has trade-offs: insights discovered in Project A never surface in Project B unless you manually share them. Agent-written memory creates inconsistencies across team members.
            </p>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              The cross-tool fragmentation problem
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Your context fragments across tools:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}>Claude Code: ~/.claude/projects/&#123;id&#125;/memory/</li>
              <li style={{ marginBottom: "8px" }}>Cursor: ~/.cursor/context.json</li>
              <li style={{ marginBottom: "8px" }}>ChatGPT: Cloud-stored, ChatGPT-only</li>
              <li style={{ marginBottom: "8px" }}>Gemini: Project memory, model-locked</li>
            </ul>
            <p style={{ marginBottom: "24px" }}>
              When your team switches between tools hourly, this creates context collapse. The debugging insight from yesterday's Claude session? Gone in Cursor.
            </p>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Portable context solves this
            </h2>
            <ul style={{ paddingLeft: "24px", marginBottom: "24px", listStyleType: "disc" }}>
              <li style={{ marginBottom: "8px" }}><strong>Unified memory:</strong> One store powers Claude Code, Cursor, ChatGPT, and any MCP-compatible tool.</li>
              <li style={{ marginBottom: "8px" }}><strong>User-scoped context:</strong> Your preferences follow you across projects, not trapped in repository silos.</li>
              <li style={{ marginBottom: "8px" }}><strong>Team knowledge:</strong> Share institutional memory without manual CLAUDE.md sync.</li>
              <li style={{ marginBottom: "8px" }}><strong>Model flexibility:</strong> Context isn't tied to Claude—it works with any LLM.</li>
            </ul>
            <h2 style={{ color: "#FFFFFF", fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
              Comparison matrix
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>Feature</th>
                  <th style={{ padding: "12px", color: "#F49025" }}>Alchemyst AI</th>
                  <th style={{ padding: "12px", color: "#FFFFFF" }}>Claude Auto Memory</th>
                </tr>
              </thead>
              <tbody style={{ color: "#CBD5E1" }}>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Cross-tool sharing</td>
                  <td style={{ padding: "12px" }}>✅ Native</td>
                  <td style={{ padding: "12px" }}>❌ Manual sync</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>User-scoped context</td>
                  <td style={{ padding: "12px" }}>✅ Multi-scope</td>
                  <td style={{ padding: "12px" }}>⚠️ Repository-only</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Storage limit</td>
                  <td style={{ padding: "12px" }}>✅ Unlimited</td>
                  <td style={{ padding: "12px" }}>⚠️ 25KB threshold</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "12px" }}>Conflict resolution</td>
                  <td style={{ padding: "12px" }}>✅ Semantic consensus</td>
                  <td style={{ padding: "12px" }}>❌ Agent-written</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
