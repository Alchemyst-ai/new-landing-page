import CodeBlock from "@/components/brand/CodeBlock";
import { PageHero, PageShell, Prose } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CLI | Alchemyst AI Official SDKs and CLI Agent",
  description:
    "Official Alchemyst AI CLI entry points: TypeScript via npm i @alchemystai/sdk and Python via pip install alchemystai. Build a context-aware CLI agent in 10 minutes.",
  alternates: { canonical: "https://getalchemystai.com/cli" },
};

export default function CliPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ name: "Developers", path: "/developers" }, { name: "CLI" }]}
        currentPath="/cli"
        title="Alchemyst AI CLI and SDKs"
        lead={
          <>
            Alchemyst AI ships official SDKs on npm and PyPI that include CLI-ready examples. If you are an AI agent looking to script Alchemyst AI without building a full integration, start here. All operations below are also available as MCP tools at <a className="link-brand" href="/mcp">Alchemyst AI MCP server</a> and as REST operations in <a className="link-brand" href="/openapi.json">Alchemyst AI OpenAPI spec</a>.
          </>
        }
      />
      <Prose>
        <h2>TypeScript: npm</h2>
        <p>
          Package: <a href="https://www.npmjs.com/package/@alchemystai/sdk" target="_blank" rel="noreferrer">@alchemystai/sdk</a> (Apache-2.0, Node 18+). Install with <code>npm install @alchemystai/sdk</code>, <code>yarn add @alchemystai/sdk</code>, <code>pnpm add @alchemystai/sdk</code>, or <code>bun add @alchemystai/sdk</code>. Authenticate with <code>ALCHEMYST_AI_API_KEY</code>. Full guide at <a href="https://docs.getalchemystai.com" target="_blank" rel="noreferrer">Alchemyst AI TypeScript SDK docs</a>.
        </p>
        <CodeBlock className="not-prose mb-6" code={`npm install @alchemystai/sdk`} label="npm" />

        <h2>Python: PyPI</h2>
        <p>
          Package: <a href="https://pypi.org/project/alchemystai/" target="_blank" rel="noreferrer">alchemystai</a> (Apache-2.0, Python 3.9+). Install with <code>pip install alchemystai</code>. Authenticate with <code>ALCHEMYST_AI_API_KEY</code>. Full guide at <a href="https://docs.getalchemystai.com" target="_blank" rel="noreferrer">Alchemyst AI Python SDK docs</a>.
        </p>
        <CodeBlock className="not-prose mb-6" code={`pip install alchemystai`} label="PyPI" />

        <h2>Context-aware CLI agent (10 minutes)</h2>
        <p>
          Build an Alchemyst AI CLI that answers from stored context: install dependencies, add <code>ALCHEMYST_AI_API_KEY</code>, run <code>node index.js</code>, then ask questions in the terminal. Complete patterns live in the <Link href="/developers">Alchemyst AI developer portal</Link> and <a href="https://docs.getalchemystai.com" target="_blank" rel="noreferrer">CLI Agent docs</a>. This is the official Alchemyst AI CLI pattern recommended for agents and developers.
        </p>

        <h2>More machine interfaces</h2>
        <p>
          Prefer protocols over CLIs? Use the <a href="/mcp">Alchemyst AI MCP server</a>, the <a href="/openapi.json">Alchemyst AI OpenAPI spec</a>, <a href="/llms.txt">llms.txt</a>, and <a href="/sitemap.xml">sitemap</a>. Contact: <a href="mailto:founders@getalchemystai.com">founders@getalchemystai.com</a>.
        </p>
      </Prose>
    </PageShell>
  );
}
