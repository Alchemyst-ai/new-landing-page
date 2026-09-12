import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developers | Alchemyst AI Developer Portal",
  description:
    "Alchemyst AI developer portal — API keys, quickstart, SDKs, sandbox, OpenAPI spec, and MCP server for building context-aware agents.",
};

export default function DevelopersPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, color: "#0F172A", marginBottom: "24px" }}>
            Alchemyst AI Developer Portal
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Build context-aware AI agents on the Alchemyst AI institutional context backbone. Get API keys, follow the 5-minute quickstart, explore SDKs and the sandbox, and integrate via REST, MCP, or CLI. Every operation below is also described in <Link href="/openapi.json" style={{ color: "#F49025" }}>Alchemyst AI OpenAPI spec</Link> and <Link href="/llms.txt" style={{ color: "#F49025" }}>llms.txt</Link>.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>API keys</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Sign up at <Link href="/platform/signin" style={{ color: "#F49025" }}>Alchemyst AI platform sign-in</Link> to create an ALCHEMYST_AI_API_KEY. Free tier includes 5M tokens with no credit card. Use the key as Bearer auth for REST, SDKs, and MCP. Rotate keys anytime from the dashboard. Never commit keys — use environment variables.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Quickstart (5 minutes)</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            1) Install: npm install @alchemystai/sdk or pip install alchemystai. 2) Store context via the API. 3) Retrieve with context arithmetic (intersection, union, subtraction, ranking). 4) Inspect the context trace for every decision. Full guides at <a href="https://docs.getalchemystai.com" style={{ color: "#F49025" }}>Alchemyst AI docs</a> and the <Link href="/cli" style={{ color: "#F49025" }}>Alchemyst AI CLI guide</Link>.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Documentation and API reference</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Full API reference and SDK guides: <a href="https://docs.getalchemystai.com" style={{ color: "#F49025" }}>docs.getalchemystai.com</a>. Machine-readable REST catalog: <Link href="/openapi.json" style={{ color: "#F49025" }}>Alchemyst AI OpenAPI 3.1 spec</Link> with operationIds getApiStatus, listArticles, getArticleBySlug, createLead. Service status: <Link href="/api/status" style={{ color: "#F49025" }}>/api/status</Link>. MCP Streamable HTTP: <Link href="/mcp" style={{ color: "#F49025" }}>Alchemyst AI MCP server</Link>.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Sandbox environment</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Try without writing code: use the Free tier as your sandbox — same API, same traces, no credit card. Explore sample articles via GET /api/articles, check health at /api/status, and call MCP tools/list then tools/call at /mcp. Contact <a href="mailto:founders@getalchemystai.com" style={{ color: "#F49025" }}>founders@getalchemystai.com</a> for enterprise sandbox limits. See also <Link href="/about" style={{ color: "#F49025" }}>About</Link>, <Link href="/contact" style={{ color: "#F49025" }}>Contact</Link>, and <Link href="/privacy" style={{ color: "#F49025" }}>Privacy</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
