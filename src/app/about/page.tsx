import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Alchemyst AI | Verifiable Context Layer for Agents",
  description:
    "About Alchemyst AI — XAlchemyst Technologies Pvt. Ltd. building the verifiable institutional context backbone for AI agents. Persistent memory, context arithmetic, and auditable traces.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, color: "#0F172A", marginBottom: "24px" }}>
            About Alchemyst AI
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Alchemyst AI is built by XAlchemyst Technologies Pvt. Ltd. to solve the hardest problem in production AI: tractable, verifiable context. We provide the institutional context backbone for enterprises — a single API that gives every AI agent persistent memory, business data, and operational context with full auditability.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>What Alchemyst AI builds</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Our context layer combines an institutional knowledge graph with context arithmetic — dynamic set algebra over meaning computed at query time. Intersection narrows scope, union widens recall, subtraction removes superseded content, and ranking keeps only the right context in the window. Every retrieval returns in under 300ms at p95, reduces domain hallucinations by 99.7%, and emits a context trace you can debug in minutes, not days.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Why Alchemyst AI exists</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Models commoditize fast. Durable advantage comes from operationalized business intelligence that stays yours across GPT, Claude, Gemini, and whatever comes next. Without a sovereign context layer, every model switch resets behavior, ontologies rot from day one, and semantic drift breaks consensus silently. Alchemyst AI decouples what your organization knows from whichever model reasons over it.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Trust and contact</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Read our <Link href="/privacy" style={{ color: "#F49025" }}>Privacy Notice</Link>, <Link href="/contact" style={{ color: "#F49025" }}>contact us</Link> at founders@getalchemystai.com. Our registered address is 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, Kolkata, West Bengal, India 700048. Explore the <Link href="/sitemap.xml" style={{ color: "#F49025" }}>sitemap</Link>, <Link href="/llms.txt" style={{ color: "#F49025" }}>llms.txt</Link>, <Link href="/developers" style={{ color: "#F49025" }}>developer portal</Link>, and <Link href="/openapi.json" style={{ color: "#F49025" }}>OpenAPI spec</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
