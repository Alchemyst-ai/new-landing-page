"use client";

import { useState, useEffect } from "react";
import Prism from 'prismjs';
import '../styles/prism-black.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';

type CodeLanguage = "typescript" | "python" | "javascript";

const CodeCompiler = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<CodeLanguage>("javascript");

  const codeCaptions: Record<CodeLanguage, string> = {
    javascript: "Use the proxy to call OpenAI API for memory management without any code changes - all you need is an API key.",
    python: "Use our upcoming Python SDK",
    typescript: "Use our upcoming JavaScript/TypeScript SDK",
  };
  const codeSnippets: Record<CodeLanguage, string> = {
    javascript: `import { ChatOpenAI } from '@langchain/openai';
const BASE_URL_WITH_PROXY = 'https://platform-backend.getalchemystai.com/api/v1/proxy/https://api.openai.com/v1/YOUR_OPENAI_API_KEY';

const lcClientWithProxy = new ChatOpenAI({
    apiKey: 'YOUR ALCHEMYST PLATFORM API KEY',
    model: 'gpt-4o',
    configuration: {
      baseURL: BASE_URL_WITH_PROXY,
    },
  });
`,
    python: `from alchemyst.memory import MemoryClient

client = MemoryClient("your-api-key")

# Store user preference
messages = [
    {"role": "user", "content": "Hi, I'm Alex. I'm a vegetarian and I'm allergic to nuts."},
    {"role": "assistant", "content": "Hello Alex! I've noted that you're a vegetarian and have a nut allergy."}
]

response = client.add(messages, user_id="alex")
print(response)`,
    "typescript": `import { MemoryClient } from '@alchemyst/memory';

const client = new MemoryClient('your-api-key');

// Store user preference
const messages: Array<{role: string, content: string}> = [
  {role: "user", content: "Hi, I'm Alex. I'm a vegetarian and I'm allergic to nuts."},
  {role: "assistant", content: "Hello Alex! I've noted that you're a vegetarian and have a nut allergy."}
];

client.add(messages, { user_id: "alex" })
  .then((response) => console.log(response))
  .catch((error) => console.error(error));`
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="bg-[#000000] border border-[#FF9E3C] text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            QUICK-START
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" id="get-started">
            Get Started Today
          </h2>
          <p className="text-center text-gray-400 max-w-3xl leading-relaxed">
            Empower Your AI applications with AlchemystAI&apos;s GenAI Stack in Minutes
          </p>
          <a
            href="/docs"
            className="flex items-center text-white hover:text-gray-300 mt-4 transition-colors"
          >
            View documentation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setActiveTab("javascript")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "javascript"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M9.50005 6C11.6074 6 13.3764 7.44854 13.8657 9.40423C14.3535 9.14615 14.9097 9 15.5 9C17.2786 9 18.7473 10.3266 18.9706 12.0442C20.1264 12.2644 21 13.2802 21 14.5C21 15.8807 19.8808 17 18.5 17H6.50005C4.56705 17 3.00005 15.433 3.00005 13.5C3.00005 12.1026 3.81893 10.8965 5.003 10.3354C5.08961 7.92638 7.06986 6 9.50005 6Z" fill="#ffffff" />
                </svg>
                Proxy
              </div>
            </button>
            <button
              onClick={() => setActiveTab("python")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "python"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#3776AB" />
                  <path d="M12.005 5.25C10.818 5.25 9.746 5.47 8.894 5.835C7.473 6.45 7.005 7.43 7.005 8.77V10.25H12.005V11H5.328C3.985 11 2.831 11.795 2.204 13.075C1.501 14.493 1.489 15.611 2.204 17.08C2.747 18.195 3.693 19 5.036 19H6.505V17.24C6.505 15.705 7.852 14.32 9.505 14.32H13.505C14.867 14.32 16.005 13.13 16.005 11.77V8.77C16.005 7.455 14.831 6.485 13.505 5.835C12.657 5.447 11.192 5.25 12.005 5.25ZM9.255 6.5C9.669 6.5 10.005 6.836 10.005 7.25C10.005 7.664 9.669 8 9.255 8C8.841 8 8.505 7.664 8.505 7.25C8.505 6.836 8.841 6.5 9.255 6.5Z" fill="white" />
                  <path d="M17.505 5V6.76C17.505 8.295 16.158 9.68 14.505 9.68H10.505C9.143 9.68 8.005 10.87 8.005 12.23V15.23C8.005 16.545 9.218 17.435 10.505 17.91C12.041 18.47 13.471 18.53 14.505 17.91C15.201 17.48 16.005 16.78 16.005 15.23V13.75H10.505V13H18.682C20.025 13 20.612 12.13 21.005 11C21.411 9.84 21.388 8.73 21.005 7.5C20.724 6.58 20.025 5 18.682 5H17.505ZM14.755 16C15.169 16 15.505 16.336 15.505 16.75C15.505 17.164 15.169 17.5 14.755 17.5C14.341 17.5 14.005 17.164 14.005 16.75C14.005 16.336 14.341 16 14.755 16Z" fill="white" />
                </svg>
                Python (Coming Soon!)
              </div>
            </button>
            <button
              onClick={() => setActiveTab("typescript")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "typescript"
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3H21V21H3V3Z" fill="#007ACC" />
                  <path d="M15.5 8.5H12V7H18V8.5H15.5V15H14V8.5H11.5V15H10V7H15.5V8.5ZM6 15V13.5H9.5V12H6V10.5H9.5V9H5V15H6Z" fill="white" />
                </svg>
                JS/TS (Coming soon!)
              </div>
            </button>
          </div>

          <div className="rounded-lg overflow-hidden max-w-7xl mx-auto mt-6">
            <div className="flex justify-between items-center bg-[#000000] border border-gray-700 rounded-t-lg p-4">
              <h3 className="text-lg font-semibold text-gray-300">{codeCaptions[activeTab]}</h3>
            </div>
            <div className="p-4 relative border border-gray-700 rounded-lg">
              <pre className="text-gray-300 overflow-wrap text-sm p-4 bg-[#000000] rounded-lg w-[65vw]">
                <code className={`w-[65vw] wrap-break-word overflow-wrap language-${activeTab === 'typescript' ? 'typescript' : activeTab}`}>
                  {codeSnippets[activeTab]}
                </code>
              </pre>
              <button
                onClick={copyToClipboard}
                className="absolute top-6 right-6 bg-gray-800 hover:bg-gray-700 text-gray-300 p-2 rounded transition-colors"
                aria-label="Copy code"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lime-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeCompiler; 