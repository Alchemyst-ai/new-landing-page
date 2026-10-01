import { PageHero, PageShell, Prose } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

const title = "About Our AI Memory and Context Company";
const description = "Alchemyst AI builds an AI context layer for developers and enterprises: persistent agent memory, shared business knowledge, and traceable retrieval.";
const url = "https://getalchemystai.com/about";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero crumbs={[{ name: "About" }]} currentPath="/about" eyebrow="About Alchemyst AI"
        title="An AI memory and context company built around your business"
        lead="Alchemyst AI builds a shared context layer for AI agents. We help developers connect models to business knowledge and help enterprises make that knowledge available across agent workflows. The platform combines persistent context, retrieval over an institutional knowledge graph, and Context Traces through an API."
        meta="Updated September 29, 2026" />
      <Prose>
        <h2>What problem does Alchemyst AI solve?</h2>
        <p>A capable model can still give an unhelpful answer when it lacks the relevant company facts. Policies change, teams use different definitions, and earlier interactions may never reach the next request. Alchemyst AI provides infrastructure for storing and retrieving that context so applications can ground their work in the business information they need.</p>
        <p>We are building for developers and enterprises equally. Developers need a practical integration path and visibility into retrieval. Enterprise teams need shared knowledge, defined access boundaries, and a way to investigate how business information reaches an agent. Both need to evaluate whether the resulting answers are useful and supported.</p>

        <h2>What should you expect from an AI memory company?</h2>
        <p>Persistent storage is only part of the job. An AI memory service should make relevant information available across sessions, support corrections and deletion, and expose enough detail to investigate unexpected recall. For company knowledge, evaluate source ownership, access controls, and how the service handles changes to business facts.</p>
        <p>Alchemyst&apos;s approach is to keep context separate from the model that uses it. An application can reuse stored business information across model integrations, while selecting the context relevant to a particular task. See the <Link href="/blog/how-to-add-persistent-memory-to-ai-agents">persistent AI agent memory guide</Link> for the implementation trade-offs.</p>

        <h2>How does an enterprise knowledge graph support AI?</h2>
        <p>An enterprise knowledge graph represents business information and the relationships between it. Alchemyst describes its stored context as an institutional knowledge graph and uses context arithmetic to select information at query time: intersection narrows scope, union combines sources, subtraction excludes content, and ranking selects what enters the context window.</p>
        <p>This gives a shared knowledge layer a practical role in an agent workflow. A support agent can retrieve product and policy context, while an operations agent retrieves information for its own task. Context Traces expose the retrieval sources, scores, and rules for inspection. Correct answers still depend on source quality, application configuration, and model behavior.</p>

        <h2>How can developers and enterprises get started?</h2>
        <p>Start with one workflow and a small, trusted knowledge set. Use the <Link href="/developers">developer guide to connect internal documents</Link>, test questions with known answers, and check the behavior when evidence is missing. Expand coverage after validating retrieval quality and permissions.</p>
        <p>Enterprise teams can review <Link href="/security">security controls and current compliance status</Link>, <Link href="/pricing">pricing</Link>, and <Link href="/contact">integration requirements with our team</Link>. Read <Link href="/thesis">our context thesis</Link> for the reasoning behind the product.</p>

        <h2>Who is behind Alchemyst AI?</h2>
        <p>Alchemyst AI is built by XAlchemystai Technologies Pvt. Ltd., led by CEO and co-founder <a href="https://www.linkedin.com/in/uttarannayak/" target="_blank" rel="noopener noreferrer">Uttaran Nayak</a>, CTO and co-founder <a href="https://www.linkedin.com/in/anuran-roy/" target="_blank" rel="noopener noreferrer">Anuran Roy</a>, and COO <a href="https://www.linkedin.com/in/prithwijitdey/" target="_blank" rel="noopener noreferrer">Prithwijit Dey</a>.</p>
        <p>Contact <a href="mailto:founders@getalchemystai.com">founders@getalchemystai.com</a> for product and enterprise questions. Our <Link href="/privacy">Privacy Notice</Link> explains how we handle personal data.</p>
      </Prose>
    </PageShell>
  );
}
