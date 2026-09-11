import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "CLI | Alchemyst AI Official SDKs and CLI Agent",
  description:
    "Official Alchemyst AI CLI entry points: TypeScript via npm i @alchemystai/sdk and Python via pip install alchemystai. Build a context-aware CLI agent in 10 minutes.",
});

export default function CliPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1>Alchemyst AI CLI and SDKs</h1>
        <p>
          Alchemyst AI ships official SDKs on npm and PyPI that include
          CLI-ready examples. If you are an AI agent looking to script
          Alchemyst without building a full integration, start here. All
          operations below are also available as MCP tools at{" "}
          <Link href="/mcp" className="underline">
            /mcp
          </Link>{" "}
          and as REST operations in{" "}
          <Link href="/openapi.json" className="underline">
            /openapi.json
          </Link>
          .
        </p>
        <h2>TypeScript — npm</h2>
        <p>
          Package:{" "}
          <a
            href="https://www.npmjs.com/package/@alchemystai/sdk"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            @alchemystai/sdk
          </a>{" "}
          (Apache-2.0, Node 18+). Install with npm install @alchemystai/sdk,
          yarn add @alchemystai/sdk, pnpm add @alchemystai/sdk, or bun add
          @alchemystai/sdk. Authenticate with ALCHEMYST_AI_API_KEY. Full guide:{" "}
          <a
            href="https://getalchemystai.com/docs/integrations/sdk/typescript-sdk"
            className="underline"
          >
            TypeScript SDK docs
          </a>
          .
        </p>
        <h2>Python — PyPI</h2>
        <p>
          Package:{" "}
          <a
            href="https://pypi.org/project/alchemystai/"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            alchemystai
          </a>{" "}
          (Apache-2.0, Python 3.9+). Install with pip install alchemystai or
          pip install alchemystai[aiohttp] for async. Authenticate with
          ALCHEMYST_AI_API_KEY. Full guide:{" "}
          <a
            href="https://getalchemystai.com/docs/integrations/sdk/python-sdk"
            className="underline"
          >
            Python SDK docs
          </a>
          .
        </p>
        <h2>Context-aware CLI agent (10 minutes)</h2>
        <p>
          Build a CLI that answers from stored Alchemyst context: install
          dependencies, add ALCHEMYST_AI_API_KEY and GEMINI_API_KEY, run node
          index.js, then ask questions in the terminal. Complete source for
          Node and Python lives in the public awesome-saas repo and in{" "}
          <a
            href="https://getalchemystai.com/docs/example-projects/team/cli-chatbot"
            className="underline"
          >
            CLI Agent docs
          </a>
          . This is the official CLI pattern recommended for agents and
          developers.
        </p>
        <h2>More machine interfaces</h2>
        <p>
          Prefer protocols over CLIs? Use the{" "}
          <Link href="/mcp" className="underline">
            MCP server
          </Link>
          , the{" "}
          <Link href="/openapi.json" className="underline">
            OpenAPI spec
          </Link>
          ,{" "}
          <Link href="/llms.txt" className="underline">
            llms.txt
          </Link>
          , and{" "}
          <Link href="/sitemap.xml" className="underline">
            sitemap
          </Link>
          . Contact:{" "}
          <a href="mailto:founders@getalchemystai.com" className="underline">
            founders@getalchemystai.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
