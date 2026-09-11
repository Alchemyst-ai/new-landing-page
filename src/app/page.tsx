// import { Blog } from "@/components/sections/blog";
import { Community } from "@/components/sections/community";
import { CTA } from "@/components/sections/cta";
import { Examples } from "@/components/sections/examples";
import { FAQSection } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
// import { Pricing } from "@/components/sections/pricing";
import { Statistics } from "@/components/sections/statistics";
// import { Testimonials } from "@/components/sections/testimonials";
import { UseCases } from "@/components/sections/use-cases";
// import { CalBooking } from "@/components/sections/cal-booking";
import { InstallExtensionIsland } from "@/components/InstallExtensionIsland";
import FeedspaceWOL from "@/components/FeedSpaceWOL";
import TweetAboutUs from "@/components/TweetAboutUs";

export default function Home() {
  return (
    <main>
      {/* Server-rendered agent-readable summary — visually hidden, no UI change.
          Boosts no-JS content ratio with semantic H2/H3 hierarchy. */}
      <section aria-label="Alchemyst AI overview" className="sr-only">
        <h2>Alchemyst AI — the institutional context backbone for AI agents</h2>
        <p>
          Alchemyst AI is the ONLY verifiable AI context engine. Stop
          re-explaining your business to your AI agents every time. Enable AI
          agents to run day-to-day operations at enterprise scale with
          persistent, traceable context, semantic retrieval, and context
          arithmetic over your institutional knowledge graph. One API. Zero
          infrastructure. Sub-300ms retrieval latency at p95, 99.7% reduction
          in domain hallucinations, 20x faster debugging, 99.9% uptime SLA.
        </p>
        <h3>Context arithmetic — the core primitive</h3>
        <p>
          Dynamic set algebra over meaning computed at query time.
          Intersection narrows scope by team, region, or version. Union widens
          recall across sources. Subtraction removes superseded or out-of-scope
          content. Ranking keeps only the right context in the window. Memory
          is derived, not hard-coded: recall what happened, resolve what it
          means, inform how to act — all from one institutional knowledge
          graph.
        </p>
        <h3>Context traces and semantic consensus</h3>
        <p>
          Every agent decision is traceable to the exact context it had, with
          sources, scores, and rules applied. Define canonical term
          definitions at the org level so revenue, pricing, and policy resolve
          before they reach the model. Pairs with OpenAI Euphony for visual
          debugging. Works with Python, TypeScript, LangChain, LlamaIndex,
          n8n, MCP servers in Claude Desktop, Cursor, and VS Code, plus a
          Chrome extension.
        </p>
        <h3>Use cases, pricing, and trust</h3>
        <p>
          Production use cases include customer support with memory-powered
          personalization, EdTech tutoring, finance fraud detection, healthcare
          continuity, and voice agents. Free tier includes 5M tokens, with
          Starter, Accelerate, Supercharge, and Enterprise tiers. Company:
          XAlchemyst Technologies Pvt. Ltd., Kolkata, India. Contact
          founders@getalchemystai.com. See About, Contact, Privacy, sitemap,
          llms.txt, docs, and the OpenAPI spec at /openapi.json.
        </p>
      </section>
      {/* <Header /> */}
      <Hero />
      <Logos />
      <Examples />
      <UseCases />
      <Statistics />
      <Features />
      
      {/* <Testimonials /> */}
      {/* <CalBooking /> */}
      {/* <Pricing /> */}
      <Community />
      <FAQSection />
      {/* <Blog /> */}
      {/* <CTA /> */}
      <InstallExtensionIsland />
      <FeedspaceWOL pageId="69dec1c0-c92d-404c-b575-fd904e93550c"/>
      <TweetAboutUs />
      {/* <Footer /> */}
    </main>
  );
}