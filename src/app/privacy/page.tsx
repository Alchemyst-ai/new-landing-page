import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice | Alchemyst AI",
  description:
    "Privacy Notice for Xalchemyst Technologies Pvt. Ltd. (Alchemyst AI) — what we collect, how we process it, retention, rights, and how to contact founders@getalchemystai.com.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", padding: "120px 0 80px" }}>
        <article className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, color: "#0F172A", marginBottom: "24px" }}>
            Privacy Notice
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            This Privacy Notice for Xalchemyst Technologies Private Limited (doing business as Alchemyst AI, “we”, “us”, “our”) describes how and why we collect, store, use, and share your information when you use our services at https://getalchemystai.com, including the website, APIs, SDKs, MCP server, and browser extension. Last updated June 2026. Questions: founders@getalchemystai.com.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Summary of key points</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            We process personal information you provide (name, email, account, billing, usage) to provide, improve, and secure our Alchemyst AI services, and only with a valid legal basis. We do not sell personal data. We retain data only as long as necessary and for no longer than 36 months past account termination unless law requires longer. You have rights to access, correct, delete, and withdraw consent.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>What we collect and why</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            Account and contact data to create and authenticate accounts; payment data via Razorpay to bill paid tiers; product telemetry to evaluate and improve retrieval quality, latency, and safety; and support correspondence to resolve issues. We also receive limited data from public sources and integrations you connect.
          </p>
          <h2 style={{ color: "#0F172A", fontSize: "1.5rem", fontWeight: 700, marginTop: "36px", marginBottom: "16px" }}>Your rights and contact</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.0625rem", lineHeight: 1.7, color: "#475569", marginBottom: "16px" }}>
            To exercise access, correction, deletion, or consent withdrawal, email <a href="mailto:founders@getalchemystai.com" style={{ color: "#F49025" }}>founders@getalchemystai.com</a> or write to Xalchemyst Technologies Private Limited, 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, Kolkata, West Bengal, India 700048. Also see <Link href="/about" style={{ color: "#F49025" }}>About Alchemyst AI</Link>, <Link href="/contact" style={{ color: "#F49025" }}>Contact</Link>, <Link href="/sitemap.xml" style={{ color: "#F49025" }}>sitemap</Link>, and <Link href="/llms.txt" style={{ color: "#F49025" }}>llms.txt</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
