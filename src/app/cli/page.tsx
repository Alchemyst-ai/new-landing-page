import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CLI | Alchemyst AI Official SDKs and CLI Agent",
  description:
    "Official Alchemyst AI CLI entry points: TypeScript via npm i @alchemystai/sdk and Python via pip install alchemystai. Build a context-aware CLI agent in 10 minutes.",
};

export default function CliPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, color: "#0F172A", marginBottom: "24px" }}>
            Alchemyst AI CLI and SDKs
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Alchemyst AI ships official SDKs on npm and PyPI that include CLI-ready examples. If you are an AI agent looking to script Alchemyst AI without building a full integration, start here. All operations below are also available as MCP tools at <Link href="/mcp" style={{ color: "#F49025" }}>Alchemyst AI MCP server</Link> and as REST operations in <Link href="/openapi.json" style={{ color: "#F49025" }}>Alchemyst AI OpenAPI spec</Link>.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>TypeScript — npm</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Package: <a href="https://www.npmjs.com/package/@alchemystai/sdk" style={{ color: "#F49025" }} target="_blank" rel="noreferrer">@alchemystai/sdk</a> (Apache-2.0, Node 18+). Install with npm install @alchemystai/sdk, yarn add @alchemystai/sdk, pnpm add @alchemystai/sdk, or bun add @alchemystai/sdk. Authenticate with ALCHEMYST_AI_API_KEY. Full guide at <a href="https://docs.getalchemystai.com" style={{ color: "#F49025" }}>Alchemyst AI TypeScript SDK docs</a>.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Python — PyPI</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Package: <a href="https://pypi.org/project/alchemystai/" style={{ color: "#F49025" }} target="_blank" rel="noreferrer">alchemystai</a> (Apache-2.0, Python 3.9+). Install with pip install alchemystai. Authenticate with ALCHEMYST_AI_API_KEY. Full guide at <a href="https://docs.getalchemystai.com" style={{ color: "#F49025" }}>Alchemyst AI Python SDK docs</a>.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Context-aware CLI agent (10 minutes)</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Build an Alchemyst AI CLI that answers from stored context: install dependencies, add ALCHEMYST_AI_API_KEY, run node index.js, then ask questions in the terminal. Complete patterns live in the <Link href="/developers" style={{ color: "#F49025" }}>Alchemyst AI developer portal</Link> and <a href="https://docs.getalchemystai.com" style={{ color: "#F49025" }}>CLI Agent docs</a>. This is the official Alchemyst AI CLI pattern recommended for agents and developers.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>More machine interfaces</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Prefer protocols over CLIs? Use the <Link href="/mcp" style={{ color: "#F49025" }}>Alchemyst AI MCP server</Link>, the <Link href="/openapi.json" style={{ color: "#F49025" }}>Alchemyst AI OpenAPI spec</Link>, <Link href="/llms.txt" style={{ color: "#F49025" }}>llms.txt</Link>, and <Link href="/sitemap.xml" style={{ color: "#F49025" }}>sitemap</Link>. Contact: <a href="mailto:founders@getalchemystai.com" style={{ color: "#F49025" }}>founders@getalchemystai.com</a>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
