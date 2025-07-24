"use client";

import React, { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import IntegrationsMcps from "./mcpsCode/IntegrationsMcps";

interface FeatureOption {
  id: number;
  title: string;
  description: string;
  code?: string;
  isMcp?: boolean;
}

interface RawFeature {
  id: number;
  title: string;
  description: string;
  rawCode?: string;
  lang?: string;
  isMcp?: boolean;
}

const rawFeatures: RawFeature[] = [
  {
    id: 1,
    title: "Context API",
    description: "Manage context data with user and organization-level access control.",
    lang: "javascript",
    rawCode: `const response = await fetch('https://platform-backend.getalchemystai.com/api/v1/context/add', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    documents: [
      {
        content: "User preferences for AI interactions"
      }
    ],
    source: "platform/maya/smart-settings.upload",
    context_type: "resource",
    chained: "false",
    scope: "internal",
    metadata: {
      file_name: "Name of file",
      doc_type: "Type of file",
      modalities: "['text', 'image']",
      size: "Size of file"
    }
  })
});

const result = await response.json();
console.log(result);`
  },
  {
    id: 2,
    title: "Chat API",
    description: "Streaming chat functionality with AI-generated responses, thinking steps using memory, and metadata.",
    lang: "javascript",
    rawCode: `const response = await fetch('/api/v1/chat/generate/stream', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here'
  },
  body: JSON.stringify({
    chat_history: [
      {
        content: 'Explain quantum computing',
        role: 'user'
      }
    ],
    persona: 'maya'
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') {
        console.log('Stream completed');
        return;
      }
      
      try {
        const parsed = JSON.parse(data);
        console.log('Received:', parsed);
      } catch (e) {
        // Handle parsing errors
      }
    }
  }
}`
  },
  {
    id: 3,
    title: "Context Proxy API",
    description: "OpenAI-compatible proxy API that provides intelligent context filtering and chat completion capabilities with enhanced message relevance processing.",
    lang: "bash",
    rawCode: `curl -X POST "/api/v1/proxy/https://api.openai.com/v1/sk-your-key/chat/completions" \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ]
  }'`
  },
  {
    id: 4,
    title: "Model Context Protocol",
    description: "Integrate our context processor MCP on the fly across different environments and modes.",
    isMcp: true
  }
];

interface FeatureSelectorProps {
  features?: FeatureOption[];
}

export const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  features,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [processedFeatures, setProcessedFeatures] = useState<FeatureOption[]>([]);

  useEffect(() => {
    const processFeatures = async () => {
      if (features) {
        setProcessedFeatures(features);
      } else {
        const processed = await Promise.all(
          rawFeatures.map(async (feature) => ({
            id: feature.id,
            title: feature.title,
            description: feature.description,
            code: feature.rawCode ? await codeToHtml(feature.rawCode, {
              lang: feature.lang || "javascript",
              theme: "github-dark",
            }) : undefined,
            isMcp: feature.isMcp
          }))
        );
        setProcessedFeatures(processed);
      }
    };

    processFeatures();
  }, [features]);

  if (processedFeatures.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 relative">
      <div className="md:col-span-2 border-b md:border-b-0 bg-background md:border-r border-border sticky lg:relative top-[var(--header-height)] lg:top-0">
        <div className="flex md:flex-col feature-btn-container overflow-x-auto p-4 pb-2">
          {processedFeatures.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-64 md:w-full text-left p-4 mb-2 mr-2 last:mr-0 md:mr-0 rounded border border-border ${
                selectedIndex === index ? "bg-accent/70" : "hover:bg-muted/50"
              }`}
            >
              <h3 className="font-medium tracking-tight">{option.title}</h3>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-1 md:col-span-3">
        {processedFeatures[selectedIndex].isMcp ? (
          <div className="p-4">
            <IntegrationsMcps />
          </div>
        ) : (
          <div
            className="bg-background font-mono text-sm [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all md:max-h-[45vh] overflow-scroll"
            dangerouslySetInnerHTML={{ __html: processedFeatures[selectedIndex].code || '' }}
          />
        )}
      </div>
    </div>
  );
};
