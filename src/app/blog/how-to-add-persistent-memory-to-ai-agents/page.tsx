import ComparisonTable from "@/components/brand/ComparisonTable";
import HowToSchema from "@/components/HowToSchema";
import ArticleSchema from "@/components/ArticleSchema";
import { PageHero, PageShell, Prose } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

const PAGE_PATH = "/blog/how-to-add-persistent-memory-to-ai-agents";
const PAGE_TITLE = "How to Add Persistent Memory to AI Agents";
const description = "Build AI agent memory with company knowledge. Diagnose generic answers, compare RAG vs fine-tuning, and ground responses in internal documents.";
const steps = [
  { name: "Choose what the agent should remember", text: "Separate interaction memory, such as preferences and unfinished tasks, from shared business knowledge, such as policies and product documentation. Assign an owner and a retention rule to each source." },
  { name: "Store context outside the model", text: "Save approved information in a persistent store or context service with source, user, team, and version metadata. Keep sensitive information out of scopes where it does not belong." },
  { name: "Retrieve relevant evidence at runtime", text: "For each request, retrieve context within the authenticated user's permitted scope. Pass the relevant passages and their source references to the LLM alongside the task instructions." },
  { name: "Test recall and unsupported answers", text: "Test whether the agent recalls saved facts, uses the latest policy, respects access boundaries, and declines to invent an answer when evidence is missing. Inspect traces and refresh the stored information as sources change." },
];

export const metadata: Metadata = {
  title: PAGE_TITLE, description,
  alternates: { canonical: `https://getalchemystai.com${PAGE_PATH}` },
  openGraph: { title: PAGE_TITLE, description, url: `https://getalchemystai.com${PAGE_PATH}`, type: "article", modifiedTime: "2026-09-29" },
  twitter: { card: "summary_large_image", title: PAGE_TITLE, description },
};

export default function HowToPersistentMemoryPage() {
  return (
    <PageShell cta>
      <ArticleSchema headline={PAGE_TITLE} description={description} url={PAGE_PATH} dateModified="2026-09-29" />
      <HowToSchema name={PAGE_TITLE} description={description} url={PAGE_PATH} dateModified="2026-09-29"
        steps={steps.map((step, i) => ({ ...step, url: `${PAGE_PATH}#step-${i + 1}` }))} />
      <PageHero crumbs={[{ name: "Blog", path: "/blog" }, { name: PAGE_TITLE }]} currentPath={PAGE_PATH}
        title={PAGE_TITLE}
        lead="AI agent memory is information stored outside an individual model request and retrieved when a later task needs it. To add persistent memory, save useful interactions and company knowledge in a durable store, retrieve the relevant evidence for each request, and give the model clear rules for using it. Test both recall and answer quality."
        meta={<>By <Link href="/about">Alchemyst AI</Link> · Updated September 29, 2026</>} />
      <Prose>
        <h2>What should AI agent memory contain?</h2>
        <p>Interaction memory and business knowledge solve different problems. A saved customer preference helps an agent continue a conversation. A current refund policy helps it answer a company-specific question. Keeping both outside the model lets your application choose the right information without relying on the model to retain it between requests.</p>
        <p>A larger context window can hold more information in one request, but it does not by itself create a durable memory store. Decide what to save, how long to retain it, who can retrieve it, and how corrections replace older facts. These decisions matter whether you build the storage layer or use a service.</p>

        <h2>How do you add persistent memory in four steps?</h2>
        <ol>{steps.map((step, i) => <li key={step.name} id={`step-${i + 1}`} className="scroll-mt-28"><strong>{step.name}.</strong> {step.text}</li>)}</ol>
        <p>With Alchemyst AI, developers can store and search context through an API, while enterprise teams define the business sources and boundaries the application should respect. Follow the <Link href="/developers#business-knowledge">business knowledge integration guide</Link> and the <a href="https://getalchemystai.com/docs">Alchemyst AI documentation</a> for implementation details.</p>

        <h2 id="generic-answers">Why does my AI agent keep giving generic answers?</h2>
        <p>Generic answers often mean the agent lacks relevant evidence, but the failure can occur at several stages. The document might never have been indexed, the search might return the wrong passage, or the application might omit the retrieved text from the model request. Inspect that path before changing models.</p>
        <ComparisonTable columns={["Symptom", "What to inspect", "Next action"]} rows={[
          ["The answer sounds like general advice", "The context actually sent to the LLM", "Retrieve task-specific company documents and include them in the request."],
          ["The answer cites an old policy", "Source version and update process", "Replace or exclude superseded content and repeat the test."],
          ["The answer mixes customers or teams", "Identity, authorization, and retrieval scope", "Enforce access before context reaches the model."],
          ["The source is correct but the answer is wrong", "Generation instructions and source support", "Require evidence for claims and evaluate the generated answer."],
        ]} />

        <h3>Why doesn&apos;t ChatGPT know my business?</h3>
        <p>A conversation cannot reliably answer private business questions from general training knowledge alone. The relevant information must be supplied in the conversation or through an enabled, authorized data connection. Check which sources are actually available in your workflow; a product name or a detailed prompt is not a connection to your internal knowledge base.</p>

        <h2 id="grounding">How do you stop an AI agent from making up company information?</h2>
        <p>Ground the answer in approved enterprise data, require source references, and define what happens when the evidence is missing. These controls reduce unsupported claims but cannot guarantee that an LLM will never hallucinate. Evaluate the output as well as the retrieved context, especially for decisions with significant business consequences.</p>
        <ul>
          <li>Ask questions whose answers are absent from the knowledge base and check that the agent acknowledges the gap.</li>
          <li>Include conflicting or superseded policies in tests to verify source selection.</li>
          <li>Check that cited passages actually support each company-specific claim.</li>
          <li>Route uncertain or high-impact answers to a person who can verify them.</li>
        </ul>
        <p>For example, if a support agent has no approved refund policy for a new region, it should state that gap or escalate. Inventing a familiar thirty-day rule is still a failure, even if another region has that policy. Alchemyst Context Traces help inspect the retrieval evidence; they are not a guarantee that the generated answer is correct.</p>

        <h2 id="rag-for-business">How does RAG work for business?</h2>
        <p>Retrieval-augmented generation, or RAG, combines document retrieval with text generation. A business application searches approved sources for the user&apos;s question and includes the relevant passages in the LLM request. The model can then answer using company-specific evidence without retraining every time a source document changes.</p>
        <p>The <a href="https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview">Microsoft RAG overview</a> describes retrieval, source access, and governance as separate design concerns. For an enterprise rollout, test the complete path from the current source document to the answer a user sees.</p>

        <h2 id="rag-vs-fine-tuning">RAG vs fine-tuning for enterprise: which should you use?</h2>
        <p>Start with retrieval when the problem is access to changing internal knowledge. Consider fine-tuning when you need more consistent behavior on a defined task, such as a response format or classification pattern. They can be combined: a fine-tuned model can still retrieve current evidence before answering.</p>
        <ComparisonTable columns={["Decision", "RAG", "Fine-tuning"]} rows={[
          ["Current company facts", "Retrieve updated source content at request time.", "New facts may require another training cycle; retrieval can still be needed."],
          ["Output behavior", "Instructions and examples guide responses.", "Training examples can adapt task behavior and style."],
          ["Source references", "Preserve passage identifiers for citations and checks.", "Learned weights alone do not provide document-level source references."],
          ["Operational work", "Maintain sources, retrieval quality, and access controls.", "Maintain training data, model versions, and evaluations."],
        ]} />
        <p>The <a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/rag-vs-fine-tuning.html">AWS comparison of RAG and fine-tuning</a> recommends starting with RAG for question answering over custom documents. Validate the choice against your own questions, sources, and evaluation results.</p>

        <h2 id="vector-database-vs-knowledge-base">Vector database vs knowledge base: what is the difference?</h2>
        <p>A vector database stores embeddings and supports similarity search. A knowledge base organizes the information an application or person uses, including the source documents and their meaning. A knowledge base can use a vector database underneath, but also needs processes for updates, ownership, permissions, and retrieval quality.</p>
        <p>Vector databases can support metadata filtering, deletion, and observability; the details depend on the product and implementation. A managed context layer packages more of the surrounding workflow. Choose based on the operations your team wants to own, then verify the service against your access, export, and traceability requirements.</p>

        <h2>Where does Alchemyst AI fit?</h2>
        <p><Link href="/">Alchemyst AI&apos;s context layer</Link> combines persistent context with knowledge retrieval for AI agents. Developers integrate storage and search through an API. Enterprise teams can use shared business context across workflows and inspect retrieval through Context Traces. Your application still selects the model, enforces its access policy, and evaluates the final answer.</p>
        <p>Review <Link href="/security">security controls and deployment requirements</Link>, compare <Link href="/compare">AI context and memory platforms</Link>, or start with the <Link href="/developers">developer integration guide</Link>.</p>
      </Prose>
    </PageShell>
  );
}
