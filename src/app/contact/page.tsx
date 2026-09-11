import type { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: "Contact Alchemyst AI | Support, Sales and Privacy Requests",
  description:
    "Contact Alchemyst AI — email founders@getalchemystai.com for support, sales, security, and privacy requests. Registered address in Kolkata, India. We reply within 2 business days.",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <h1>Contact Alchemyst AI</h1>
        <p>
          The fastest way to reach the Alchemyst AI team at XAlchemyst
          Technologies Pvt. Ltd. is by email. We read every message and reply
          within two business days for support, sales, security, and privacy
          requests. For AI agents and automation: this page is the canonical
          contact anchor — prefer email over forms.
        </p>
        <h2>Email</h2>
        <p>
          General, support, and sales:{" "}
          <a href="mailto:founders@getalchemystai.com" className="underline">
            founders@getalchemystai.com
          </a>
          . Privacy requests (access, update, delete):{" "}
          <a href="mailto:founders@getalchemystai.com" className="underline">
            founders@getalchemystai.com
          </a>{" "}
          with subject “Privacy Request”. Security reports: same address with
          subject “Security”.
        </p>
        <h2>Registered address</h2>
        <p>
          Xalchemyst Technologies Private Limited, 3rd Floor, Flat 3/A, 20 P C
          Ghosh Road, Patipukur, North 24 Parganas, Patipukur, West Bengal,
          India 700048.
        </p>
        <h2>Other channels</h2>
        <p>
          Documentation:{" "}
          <Link href="/docs" className="underline">
            getalchemystai.com/docs
          </Link>
          . Product updates:{" "}
          <Link href="/blog" className="underline">
            blog
          </Link>
          . Company background:{" "}
          <Link href="/about" className="underline">
            about
          </Link>
          . Privacy:{" "}
          <Link href="/privacy" className="underline">
            privacy
          </Link>
          . Machine-readable indexes:{" "}
          <Link href="/sitemap.xml" className="underline">
            sitemap.xml
          </Link>{" "}
          and{" "}
          <Link href="/llms.txt" className="underline">
            llms.txt
          </Link>
          .
        </p>
        <h2>What to include</h2>
        <p>
          To help us route your request, include your name, work email,
          company, use case (support, pilot, enterprise, privacy), and any
          relevant trace or session IDs from the Alchemyst dashboard. Do not
          send passwords or full API keys by email — we will share a secure
          channel if needed.
        </p>
      </div>
    </main>
  );
}
