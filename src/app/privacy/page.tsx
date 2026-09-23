import { PageHero, PageShell, Prose } from "@/components/page";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice | Alchemyst AI",
  description:
    "Privacy Notice for XAlchemystai Technologies Pvt. Ltd. (Alchemyst AI): what we collect, how we process it, retention, rights, and how to contact founders@getalchemystai.com.",
  alternates: { canonical: "https://getalchemystai.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        crumbs={[{ name: "Privacy Notice" }]}
        currentPath="/privacy"
        title="Privacy Notice"
        lead={
          <>
            This Privacy Notice for XAlchemystai Technologies Private Limited (doing business as Alchemyst AI, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) describes how and why we collect, store, use, and share your information when you use our services at <a className="link-brand" href="https://getalchemystai.com">https://getalchemystai.com</a>, including the website, APIs, SDKs, MCP server, and browser extension. Questions: <a className="link-brand" href="mailto:founders@getalchemystai.com">founders@getalchemystai.com</a>.
          </>
        }
        meta="Last updated June 2026"
      />
      <Prose>
        <h2>Summary of key points</h2>
        <p>
          We process personal information you provide (name, email, account, billing, usage) to provide, improve, and secure our Alchemyst AI services, and only with a valid legal basis. We do not sell personal data. We retain data only as long as necessary and for no longer than 36 months past account termination unless law requires longer. You have rights to access, correct, delete, and withdraw consent.
        </p>
        <h2>What we collect and why</h2>
        <p>
          Account and contact data to create and authenticate accounts; payment data via Razorpay to bill paid tiers; product telemetry to evaluate and improve retrieval quality, latency, and safety; and support correspondence to resolve issues. We also receive limited data from public sources and integrations you connect.
        </p>
        <h2>Your rights and contact</h2>
        <p>
          To exercise access, correction, deletion, or consent withdrawal, email <a href="mailto:founders@getalchemystai.com">founders@getalchemystai.com</a> or write to XAlchemystai Technologies Private Limited, 3rd Floor, Flat 3/A, 20 P C Ghosh Road, Patipukur, Kolkata, West Bengal, India 700048. Also see <Link href="/about">About Alchemyst AI</Link>, <Link href="/contact">Contact</Link>, <a href="/sitemap.xml">sitemap</a>, and <a href="/llms.txt">llms.txt</a>.
        </p>
      </Prose>
    </PageShell>
  );
}
