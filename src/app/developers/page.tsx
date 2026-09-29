import CodeBlock from "@/components/brand/CodeBlock";
import { PageHero, PageShell, Prose } from "@/components/page";
import HowToSchema from "@/components/HowToSchema";
import type { Metadata } from "next";
import Link from "next/link";

const title = "Add Business Knowledge to Your AI Agent";
const description = "Connect internal documents to your AI agent with Alchemyst AI. Learn context ingestion, semantic retrieval, access scoping, and grounded answers.";
const url = "https://getalchemystai.com/developers";
const steps = [
  { name: "Choose trusted business sources", text: "Start with a small set of current policies, product documents, or support instructions. Record each source, owner, version, and the users who may access it." },
  { name: "Store documents with useful metadata", text: "Use the Alchemyst AI context API or SDK to add business information. Keep source identifiers and group metadata with the content so your application can retrieve the right scope." },
  { name: "Retrieve context for each question", text: "Search for relevant context before calling the model. Apply the appropriate scope for the authenticated user, team, customer, and task. Validate permissions in your application; a group label alone is not authorization." },
  { name: "Give the LLM evidence and answer rules", text: "Pass the retrieved passages and source references into the model request. Ask it to answer using those sources and say when the available evidence is insufficient." },
  { name: "Evaluate, update, and inspect", text: "Test questions with known answers, missing evidence, conflicting versions, and restricted documents. Inspect retrieval traces, update changed sources, and repeat evaluations when your workflow changes." },
];

export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function DevelopersPage() {
  return (
    <PageShell>
      <HowToSchema name={title} description={description} url={url} dateModified="2026-09-29"
        steps={steps.map((step, i) => ({ ...step, url: `${url}#step-${i + 1}` }))} />
      <PageHero crumbs={[{ name: "Developers" }]} currentPath="/developers"
        eyebrow="For developers and enterprise teams" title={title}
        lead="To make AI agents aware of company data, connect a trusted knowledge source to your application, retrieve relevant information for each request, and pass it to the model. Alchemyst AI provides context storage and retrieval through an API, giving developers an integration path and enterprises a shared knowledge layer across agent workflows."
        meta="Updated September 29, 2026" />
      <Prose>
        <h2 id="business-knowledge">How do you give an LLM access to an internal knowledge base?</h2>
        <p>An LLM does not automatically have access to your internal documents. Your application must supply them through a prompt, a retrieval service, or an authorized tool. For a growing knowledge base, retrieve the relevant evidence for each request instead of sending every document on every turn.</p>
        <ol>
          {steps.map((step, i) => <li key={step.name} id={`step-${i + 1}`} className="scroll-mt-28"><strong>{step.name}.</strong> {step.text}</li>)}
        </ol>
        <p>For example, a support agent answering a refund question needs the policy for that customer&apos;s product and region. Returning a similar policy from another region is a retrieval failure even if the generated sentence sounds plausible. Keep the policy source and version available so the answer can be checked.</p>

        <h2>How do you start with the Alchemyst AI SDK?</h2>
        <p>Create an API key through the <Link href="/platform/signin">Alchemyst AI platform</Link> and install the SDK for your stack. Keep credentials on the server in environment variables. Follow the <a href="https://getalchemystai.com/docs">official Alchemyst AI documentation</a> for the current context API request shapes and supported integrations.</p>
        <CodeBlock className="not-prose mb-6" code={`npm install @alchemystai/sdk\n# Python\npip install alchemystai`} label="Install an SDK" />
        <p>The integration sequence is store, search, then generate: add your business context, search it when the user asks a question, and include the returned evidence in your model call. See the <Link href="/cli">CLI agent walkthrough</Link> for a developer workflow and <Link href="/pricing">usage-based pricing</Link> when planning a rollout.</p>

        <h2 id="document-retrieval">How does document retrieval for an LLM work?</h2>
        <p>Document retrieval selects passages that can help answer a question. Semantic search for internal documents looks for related meaning, so a question about vacation can find a policy titled paid time off. Exact identifiers, dates, and access rules still matter: similarity alone does not establish that a document is current or authorized.</p>
        <p>Alchemyst uses context arithmetic to narrow, combine, exclude, and rank context. Define the relevant business scope and inspect the returned sources before treating retrieval as evidence. The <a href="https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview">Microsoft RAG overview</a> explains the wider retrieval pattern, including why source access, token limits, and governance affect answer quality.</p>

        <h2 id="managed-rag">Where does Alchemyst fit in a managed RAG platform?</h2>
        <p>RAG as a service usually means a provider operates some or all of the ingestion, indexing, retrieval, and generation pipeline. Alchemyst supplies a managed context layer for the storage and retrieval part of that architecture. Your application connects source data, calls its chosen model, and controls how the answer is used.</p>
        <p>When evaluating a managed RAG platform, check exactly which responsibilities it covers. Ask how documents are updated and deleted, how permissions are enforced, which retrieval details are available for debugging, and how usage is billed. Alchemyst&apos;s <Link href="/security">security page</Link> describes its controls and their current status; validate your deployment requirements with the team.</p>

        <h2>What should enterprise teams verify before launch?</h2>
        <ul>
          <li><strong>Access:</strong> verify that each user can retrieve only the documents they are entitled to see.</li>
          <li><strong>Freshness:</strong> give source owners a process for updating, replacing, and removing content.</li>
          <li><strong>Quality:</strong> test answer correctness and source support separately from retrieval speed.</li>
          <li><strong>Operations:</strong> agree on failure behavior, retention, usage limits, and ownership of production incidents.</li>
        </ul>
        <p>Continue with the <Link href="/blog/how-to-add-persistent-memory-to-ai-agents">AI agent memory and grounding guide</Link>, or <Link href="/contact">discuss an enterprise integration</Link> with Alchemyst AI.</p>
      </Prose>
    </PageShell>
  );
}
