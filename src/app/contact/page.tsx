import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Alchemyst AI | Support, Sales and Privacy Requests",
  description:
    "Contact Alchemyst AI — email founders@getalchemystai.com for support, sales, security, and privacy requests. Registered address in Kolkata, India. We reply within 2 business days.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, color: "#0F172A", marginBottom: "24px" }}>
            Contact Alchemyst AI
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            The fastest way to reach the Alchemyst AI team at XAlchemyst Technologies Pvt. Ltd. is by email. We read every message and reply within two business days for support, sales, security, and privacy requests. For AI agents and automation: this page is the canonical Alchemyst AI contact anchor — prefer email over forms.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Email</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            General, support, and sales: <a href="mailto:founders@getalchemystai.com" style={{ color: "#F49025" }}>founders@getalchemystai.com</a>. Privacy requests (access, update, delete): <a href="mailto:founders@getalchemystai.com" style={{ color: "#F49025" }}>founders@getalchemystai.com</a> with subject “Privacy Request”. Security reports: same address with subject “Security”.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Registered address</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Xalchemyst Technologies Private Limited, 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, Kolkata, West Bengal, India 700048.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Other channels</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Documentation: <a href="https://docs.getalchemystai.com" style={{ color: "#F49025" }}>docs.getalchemystai.com</a>. Developer portal: <Link href="/developers" style={{ color: "#F49025" }}>Alchemyst AI developers</Link>. Company background: <Link href="/about" style={{ color: "#F49025" }}>about Alchemyst AI</Link>. Privacy: <Link href="/privacy" style={{ color: "#F49025" }}>privacy</Link>. Machine-readable indexes: <Link href="/sitemap.xml" style={{ color: "#F49025" }}>sitemap.xml</Link> and <Link href="/llms.txt" style={{ color: "#F49025" }}>llms.txt</Link>.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>What to include</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            To help us route your request, include your name, work email, company, use case (support, pilot, enterprise, privacy), and any relevant trace or session IDs from the Alchemyst dashboard. Do not send passwords or full API keys by email — we will share a secure channel if needed.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
