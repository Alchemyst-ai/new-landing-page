"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import DynamicCode from "./dynamic-code";

export default function PlugAndPlayIntegration() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (language: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(language);
    setTimeout(() => setCopied(null), 2000);
  };

  const tsCode = `import AlchemystAI from '@alchemystai/sdk';

const client = new AlchemystAI({
  apiKey: process.env.ALCHEMYST_AI_API_KEY,
});

await client.v1.context.add({
  documents: [{ content: "The content of the document" }],
  context_type: "resource",
  source: "web-upload",
  scope: "internal",
  metadata: {
    fileName: "notes.txt",
    fileType: "text/plain",
    lastModified: new Date().toISOString(),
    fileSize: 1024,
    groupName: ["project-alpha"],
  },
});`;

  const pyCode = `import os
from alchemyst_ai import AlchemystAI

client = AlchemystAI(
    api_key=os.environ.get("ALCHEMYST_AI_API_KEY")
)

response = client.v1.context.add(
    documents=[{"content": "files content"}],
    source="web-upload",
    context_type="resource",
    scope="internal",
    metadata={
        "fileName": "notes.txt",
        "fileType": "text/plain",
        "lastModified": "2025-10-28T12:00:00Z",
        "fileSize": 1024,
        "groupName": ["project-alpha"],
    },
)`;

  return (
    <div className="w-full bg-card py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT: CODE */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <Tabs defaultValue="typescript">
                <TabsList className="flex mb-4 w-fit bg-muted/30 rounded-lg p-1">
                  <TabsTrigger
                    value="typescript"
                    className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md px-3 py-1 text-sm font-medium"
                  >
                    TypeScript
                  </TabsTrigger>
                  <TabsTrigger
                    value="python"
                    className="data-[state=active]:bg-foreground data-[state=active]:text-background rounded-md px-3 py-1 text-sm font-medium"
                  >
                    Python
                  </TabsTrigger>
                </TabsList>

                {/* TypeScript */}
                <TabsContent value="typescript">
                  <div className="relative">
                    {/* <SyntaxHighlighter
                      language="typescript"
                      style={oneDark}
                      customStyle={{
                        borderRadius: "0.75rem",
                        padding: "1rem",
                        background: "hsl(var(--muted) / 0.2)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {tsCode}
                    </SyntaxHighlighter> */}
                    <DynamicCode language="typescript">{tsCode}</DynamicCode>

                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 text-xs"
                      onClick={() => handleCopy("typescript", tsCode)}
                    >
                      {copied === "typescript" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </TabsContent>

                {/* Python */}
                <TabsContent value="python">
                  <div className="relative">
                    {/* <SyntaxHighlighter
                      language="python"
                      style={oneDark}
                      customStyle={{
                        borderRadius: "0.75rem",
                        padding: "1rem",
                        background: "hsl(var(--muted) / 0.2)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {pyCode}
                    </SyntaxHighlighter> */}
                    <DynamicCode language="python">{pyCode}</DynamicCode>

                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 text-xs"
                      onClick={() => handleCopy("python", pyCode)}
                    >
                      {copied === "python" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Two liner integration
            </h2>

            <p className="text-lg text-muted-foreground">
              Alchemyst connects seamlessly with your current setup. Just one
              copy-paste command away.
            </p>

            <div className="space-y-4">
              <FeatureItem text="Huge repertoire of compatible tools." />
              <FeatureItem text="SOC-2 and HIPAA compliant with secure storage." />
              <FeatureItem text="Observability on runtime." />
            </div>

            <div className="pt-6">
              <Link
                href="/platform/signin"
                className="inline-block bg-foreground text-background px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90"
              >
                Integrate Alchemyst
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1">
        <div className="w-2 h-2 bg-muted-foreground rounded-full" />
      </div>
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
