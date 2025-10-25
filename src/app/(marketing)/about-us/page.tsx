import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | AlchemystAI",
  description:
    "Learn more about the vision behind AlchemystAI — building the tractable context layer for the Agentic Web.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About Us
        </h1>

        <div className="relative flex justify-center mb-20">
          <div
            className="absolute inset-0 max-w-3xl mx-auto blur-3xl opacity-50 rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,102,241,0.4), rgba(14,165,233,0.2), transparent 70%)",
            }}
          ></div>

          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/funding1.jpeg"
            alt="Founders of Alchemyst AI"
            width={1200}
            height={700}
            className="object-cover w-full h-auto hover:scale-[1.02] transition-transform duration-500"
            priority
          />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* --- About Content Section --- */}
        <div className="mx-auto max-w-3xl prose prose-lg dark:prose-invert leading-relaxed">
          <h2>Your AI agent needs tractable context.</h2>
          <p>
            AI isn&apos;t the future anymore — it&apos;s already changing our present. But here&apos;s the kicker —
            only <strong>26%</strong> are actually usable.
          </p>

          <p>Any functional agent will have three parts to it:</p>
          <ul>
            <li>The models</li>
            <li>The workflows</li>
            <li>The context</li>
          </ul>

          <p>
            The first two are already being solved: Models are crushing SoTA records every day, while workflows are
            more or less direct ports of real-world repetitive processes, specifically tailored to businesses. That&apos;s
            the UX that MCPs strive to solve for.
          </p>

          <p>The real problem lies in the <strong>context</strong>.</p>

          <h3>Context engineering is the next frontier for AI adoption.</h3>

          <p>
            As LLM context windows 10× over every year (a trend that&apos;s holding pretty well so far), data explodes
            at 100× more. So here&apos;s the uncomfortable truth:
          </p>

          <blockquote>
            Data is always going to exceed LLM context window sizes, no matter what.
          </blockquote>

          <p>
            Thus, the question for any AI-enabled business is not <strong>IF</strong> they would need a new context
            layer and context engineering in general, but <strong>WHEN</strong>. Turns out, that&apos;s pretty soon.
            Beyond ~10 sessions per user, businesses need to treat memory and user-specific context as mandatory
            requirements for their users. And that&apos;s the average number of chat sessions that a customer has with
            an AI chatbot in a month.
          </p>

          <h2>&ldquo;95% of generative AI efforts will fail by 2026–27.&rdquo; — MIT</h2>

          <p>And the reason is lack of proper contextualization.</p>

          <p>
            So, you don&apos;t just need context — you need <strong>tractable</strong> context that you can verify.
          </p>

          <p>That&apos;s the sole purpose of us building <strong>Alchemyst AI</strong>.</p>

          <p>
            The world will be moving towards <strong>Agent Era 2.0</strong> — where context matters more than prompts.
            Prompts can be auto-optimized, thanks to accurate context storage and retrieval.
          </p>

          <p>
            This is the vision we bet our entire company on, a year ago. With this coming true, we want to say one
            thing:
          </p>

          <blockquote>
            &ldquo;Everyone will upgrade — and the ones using Alchemyst AI will be at the forefront.&rdquo;
          </blockquote>

          <p className="mt-10 italic text-right">
            ~ Signing off, <br /> Anuran and Uttaran
          </p>
        </div>
      </div>
    </div>
  )
}
