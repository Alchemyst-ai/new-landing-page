import CodeBlock from "@/components/brand/CodeBlock";
import { PageHero, PageShell, Prose } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developers | Alchemyst AI Developer Portal",
  description:
    "Alchemyst AI developer portal: API keys, quickstart, SDKs, sandbox, OpenAPI spec, and MCP server for building context-aware agents.",
  alternates: { canonical: "https://getalchemystai.com/developers" },
};

export default function DevelopersPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ name: "Developers" }]}
        currentPath="/developers"
        title="Alchemyst AI Developer Portal"
        lead={
          <>
            Build context-aware AI agents on the Alchemyst AI institutional context backbone. Get API keys, follow the 5-minute quickstart, explore SDKs and the sandbox, and integrate via REST, MCP, or CLI. Every operation below is also described in <a className="link-brand" href="/openapi.json">Alchemyst AI OpenAPI spec</a> and <a className="link-brand" href="/llms.txt">llms.txt</a>.
          </>
        }
      />
      <Prose>
        <h2>API keys</h2>
        <p>
          Sign up at <Link href="/platform/signin">Alchemyst AI platform sign-in</Link> to create an <code>ALCHEMYST_AI_API_KEY</code>. Free tier includes 5M tokens with no credit card. Use the key as Bearer auth for REST, SDKs, and MCP. Rotate keys anytime from the dashboard. Never commit keys: use environment variables.
        </p>

        <h2>Quickstart (5 minutes)</h2>
        <ol>
          <li>Install: <code>npm install @alchemystai/sdk</code> or <code>pip install alchemystai</code>.</li>
          <li>Store context via the API.</li>
          <li>Retrieve with context arithmetic (intersection, union, subtraction, ranking).</li>
          <li>Inspect the context trace for every decision.</li>
        </ol>
        <CodeBlock className="not-prose mb-6" code={`npm install @alchemystai/sdk\n# or\npip install alchemystai`} label="Install" />
        <p>
          Full guides at <a href="https://docs.getalchemystai.com" target="_blank" rel="noreferrer">Alchemyst AI docs</a> and the <Link href="/cli">Alchemyst AI CLI guide</Link>.
        </p>

        <h2>Documentation and API reference</h2>
        <p>
          Full API reference and SDK guides: <a href="https://docs.getalchemystai.com" target="_blank" rel="noreferrer">docs.getalchemystai.com</a>. Machine-readable REST catalog: <a href="/openapi.json">Alchemyst AI OpenAPI 3.1 spec</a> with operationIds <code>getApiStatus</code>, <code>listArticles</code>, <code>getArticleBySlug</code>, <code>createLead</code>. Service status: <a href="/api/status">/api/status</a>. MCP Streamable HTTP: <a href="/mcp">Alchemyst AI MCP server</a>.
        </p>

        <h2>Sandbox environment</h2>
        <p>
          Try without writing code: use the Free tier as your sandbox, with the same API, same traces, and no credit card. Explore sample articles via <code>GET /api/articles</code>, check health at <code>/api/status</code>, and call MCP <code>tools/list</code> then <code>tools/call</code> at <code>/mcp</code>. Contact <a href="mailto:founders@getalchemystai.com">founders@getalchemystai.com</a> for enterprise sandbox limits. See also <Link href="/about">About</Link>, <Link href="/contact">Contact</Link>, and <Link href="/privacy">Privacy</Link>.
        </p>
      </Prose>
    </PageShell>
  );
}
