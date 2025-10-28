"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function PlugAndPlayIntegration() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (language: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(language);
    setTimeout(() => setCopied(null), 2000);
  };

  const tsCode = `import AlchemystAI from '@alchemystai/sdk';

const client = new AlchemystAI({ apiKey: process.env.ALCHEMYST_AI_API_KEY });

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
    groupName: ["project-alpha"]
  }
});`;

  const pyCode = `import os
from alchemyst_ai import AlchemystAI

client = AlchemystAI(api_key=os.environ.get("ALCHEMYST_AI_API_KEY"))

response = client.v1.context.add(
  documents=[{ "content": "files content" }],
  source="web-upload",
  context_type="resource",
  scope="internal",
  metadata={
    "fileName": "notes.txt",
    "fileType": "text/plain",
    "lastModified": "2025-10-28T12:00:00Z",
    "fileSize": 1024,
    "groupName": ["project-alpha"]
  }
)`;


  return (
    <div className="w-full bg-card py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
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

                <TabsContent value="typescript">
                  <div className="relative">
                    <pre className="bg-muted/20 rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{tsCode}</code>
                    </pre>
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

                <TabsContent value="python">
                  <div className="relative">
                    <pre className="bg-muted/20 rounded-lg p-4 text-sm overflow-x-auto">
                      <code>{pyCode}</code>
                    </pre>
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

          {/* Right Side */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Two liner integration
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Alchemyst connects seamlessly with your current setup. Just one copy-paste command away.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                </div>
                <span className="text-muted-foreground">Huge repertoire of compatible tools.</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                </div>
                <span className="text-muted-foreground">SOC-2 and HIPAA compliant with secure storage.</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                </div>
                <span className="text-muted-foreground">Observability on runtime.</span>
              </div>
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
