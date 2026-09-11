import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Notice | Alchemyst AI",
  description:
    "Privacy Notice for Xalchemyst Technologies Pvt. Ltd. (Alchemyst AI) — what we collect, how we process it, retention, rights, and how to contact founders@getalchemystai.com.",
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1>Privacy Notice</h1>
        <p>
          This Privacy Notice for Xalchemyst Technologies Private Limited
          (doing business as Alchemyst AI, “we”, “us”, “our”) describes how and
          why we collect, store, use, and share your information when you use
          our services at https://getalchemystai.com, including the website,
          APIs, SDKs, MCP server, and browser extension. Last updated 26
          November 2024. Questions: founders@getalchemystai.com.
        </p>
        <h2>Summary of key points</h2>
        <p>
          We process personal information you provide (name, email, account,
          billing, usage) to provide, improve, and secure our services, and
          only with a valid legal basis. We do not sell personal data. We
          retain data only as long as necessary and for no longer than 36
          months past account termination unless law requires longer. You have
          rights to access, correct, delete, and withdraw consent.
        </p>
        <h2>What we collect and why</h2>
        <p>
          Account and contact data to create and authenticate accounts; payment
          data via Razorpay to bill paid tiers; product telemetry to evaluate
          and improve retrieval quality, latency, and safety; and support
          correspondence to resolve issues. We also receive limited data from
          public sources and integrations you connect. See the full policy at{" "}
          <Link href="/privacy-policy" className="underline">
            /privacy-policy
          </Link>{" "}
          for sections 1–12 covering collection, processing, sharing, social
          logins, retention, security, minors, rights, DNT, updates, and
          contact details.
        </p>
        <h2>Your rights and contact</h2>
        <p>
          To exercise access, correction, deletion, or consent withdrawal,
          email{" "}
          <a
            href="mailto:founders@getalchemystai.com"
            className="underline"
          >
            founders@getalchemystai.com
          </a>{" "}
          or write to Xalchemyst Technologies Private Limited, 3rd Floor, Flat
          3/A, 20 P C Ghosh Road, Patipukur, North 24 Parganas, West Bengal,
          India 700048. Also see{" "}
          <Link href="/about" className="underline">
            About
          </Link>
          ,{" "}
          <Link href="/contact" className="underline">
            Contact
          </Link>
          ,{" "}
          <Link href="/terms-of-use" className="underline">
            Terms
          </Link>
          ,{" "}
          <Link href="/sitemap.xml" className="underline">
            sitemap
          </Link>
          , and{" "}
          <Link href="/llms.txt" className="underline">
            llms.txt
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
