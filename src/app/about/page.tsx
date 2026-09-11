import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "About Alchemyst AI | Verifiable Context Layer for Agents",
  description:
    "About Alchemyst AI — XAlchemyst Technologies Pvt. Ltd. building the verifiable institutional context backbone for AI agents. Persistent memory, context arithmetic, and auditable traces.",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1>About Alchemyst AI</h1>
        <p>
          Alchemyst AI is built by XAlchemyst Technologies Pvt. Ltd. to solve
          the hardest problem in production AI: tractable, verifiable context.
          We provide the institutional context backbone for enterprises — a
          single API that gives every AI agent persistent memory, business
          data, and operational context with full auditability.
        </p>
        <h2>What we build</h2>
        <p>
          Our context layer combines an institutional knowledge graph with
          context arithmetic — dynamic set algebra over meaning computed at
          query time. Intersection narrows scope, union widens recall,
          subtraction removes superseded content, and ranking keeps only the
          right context in the window. Every retrieval returns in under 300ms
          at p95, reduces domain hallucinations by 99.7%, and emits a context
          trace you can debug in minutes, not days.
        </p>
        <h2>Why we exist</h2>
        <p>
          Models commoditize fast. Durable advantage comes from operationalized
          business intelligence that stays yours across GPT, Claude, Gemini,
          and whatever comes next. Without a sovereign context layer, every
          model switch resets behavior, ontologies rot from day one, and
          semantic drift breaks consensus silently. Alchemyst decouples what
          your organization knows from whichever model reasons over it.
        </p>
        <h2>Who we are</h2>
        <p>
          We are a team of engineers and researchers based in India, backed by
          Techstars, NAsscom, and leading angels. Our founders Anuran and
          Uttaran started Alchemyst to make Agent Era 2.0 real — where context
          matters more than prompts, and every agent decision is traceable to
          its source.
        </p>
        <h2>Trust and contact</h2>
        <p>
          Read our{" "}
          <Link href="/privacy" className="underline">
            Privacy Notice
          </Link>
          ,{" "}
          <Link href="/terms-of-use" className="underline">
            Terms of Use
          </Link>
          , or{" "}
          <Link href="/contact" className="underline">
            contact us
          </Link>{" "}
          at founders@getalchemystai.com. Our registered address is 3rd Floor,
          Flat 3/A, 20 P C Ghosh Road, Patipukur, North 24 Parganas, West
          Bengal, India 700048. Explore the{" "}
          <Link href="/sitemap.xml" className="underline">
            sitemap
          </Link>
          ,{" "}
          <Link href="/llms.txt" className="underline">
            llms.txt
          </Link>
          , and{" "}
          <Link href="/docs" className="underline">
            documentation
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
