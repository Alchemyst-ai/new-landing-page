import { Section } from "@/components/brand";
import Link from "next/link";

const questions = [
  {
    question: "What is an AI context layer?",
    answer: "An AI context layer stores and retrieves the information an AI application needs for a task: company documents, business definitions, and saved interactions. Alchemyst AI provides this knowledge layer for AI agents through an API, so teams can reuse business context across models and inspect the sources used in retrieval.",
    href: "/developers",
    link: "Connect your company knowledge",
  },
  {
    question: "Why does my AI agent keep giving generic answers?",
    answer: "An agent may give generic answers because the relevant company information never reaches its context window. Check whether your application has ingested the right documents, retrieved the relevant passages, and passed them to the model. Better prompts help specify the task, but cannot supply missing business facts by themselves.",
    href: "/blog/how-to-add-persistent-memory-to-ai-agents#generic-answers",
    link: "Diagnose generic and unsupported answers",
  },
  {
    question: "How can I add business knowledge to my AI agent?",
    answer: "Start with a trusted set of company documents and record their sources, versions, and access boundaries. Store that context, retrieve relevant passages for each question, and pass those passages to your LLM. In Alchemyst AI, developers integrate context storage and search through the API or SDKs; teams remain responsible for source quality and application permissions.",
    href: "/developers#business-knowledge",
    link: "Follow the business knowledge integration steps",
  },
  {
    question: "How is AI agent memory different from a company knowledge base?",
    answer: "AI agent memory preserves information from previous interactions, such as a user preference or an unfinished task. A company knowledge base holds shared information such as policies and product documentation. An agent may need both: session history to understand the conversation, and current business knowledge to answer a company-specific question.",
    href: "/blog/how-to-add-persistent-memory-to-ai-agents",
    link: "Learn how persistent agent memory works",
  },
  {
    question: "Can grounding an LLM in enterprise data stop hallucinations?",
    answer: "Grounding gives the model relevant evidence, which can reduce unsupported answers about your business. It does not guarantee correctness. Keep documents current, check retrieval quality, require source references, and make the agent say when evidence is missing. Review high-impact answers and test both retrieval and generation before expanding a workflow.",
    href: "/blog/how-to-add-persistent-memory-to-ai-agents#grounding",
    link: "Build a workflow for grounded answers",
  },
];

export default function ContextQuestions() {
  return (
    <Section id="context-questions" tone="sand" aria-labelledby="context-questions-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://getalchemystai.com/#context-questions",
        mainEntity: questions.map(({ question, answer }) => ({
          "@type": "Question", name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }).replace(/</g, "\\u003c") }} />
      <h2 id="context-questions-heading" className="mb-10 text-3xl font-bold text-foreground">
        How do you give AI agents your business knowledge?
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {questions.map(({ question, answer, href, link }) => (
          <div key={question}>
            <h3 className="mb-3 text-xl font-bold text-foreground">{question}</h3>
            <p className="mb-4 leading-relaxed text-muted-foreground">{answer}</p>
            <Link href={href} className="link-brand">{link} &rarr;</Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
