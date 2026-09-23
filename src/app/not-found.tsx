import Link from "next/link";
import { BrandButton } from "@/components/brand";
import { PageShell } from "@/components/page";

const INDEXES = [
  ["Homepage", "https://getalchemystai.com/"],
  ["Sitemap", "https://getalchemystai.com/sitemap.xml"],
  ["LLM index", "https://getalchemystai.com/llms.txt"],
  ["Full content", "https://getalchemystai.com/llms-full.txt"],
  ["Docs", "https://docs.getalchemystai.com"],
  ["API spec", "https://getalchemystai.com/openapi.json"],
  ["About", "https://getalchemystai.com/about"],
  ["Contact", "https://getalchemystai.com/contact"],
  ["Privacy", "https://getalchemystai.com/privacy"],
] as const;

export default function NotFound() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="plate-grid absolute inset-0" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-[760px] flex-col items-center justify-center px-6 pt-36 pb-24 text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309]">404</p>
          <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#4A3B33]">
            Page not found
          </h1>

          {/* Agent recovery hint: a plain index for crawlers and AI agents. */}
          <div className="mt-12 w-full rounded-[var(--radius)] border border-[#E4D9BC] bg-white p-6 text-left shadow-[var(--shadow-soft)]">
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#78716C]">
              # Page not found. Try these public indexes instead:
            </p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2 font-mono text-[12px] sm:grid-cols-2">
              {INDEXES.map(([label, href]) => (
                <li key={href} className="flex gap-2 text-[#57534E]">
                  <span className="text-[#A8A29E]">-</span>
                  <span>
                    {label}:{" "}
                    <a href={href} className="link-brand break-all">
                      {href.replace("https://", "")}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="404 recovery" className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <BrandButton href="/">← Back to home</BrandButton>
            <Link href="/about" className="link-brand px-3 text-sm font-bold">About</Link>
            <Link href="/contact" className="link-brand px-3 text-sm font-bold">Contact</Link>
            <Link href="/privacy" className="link-brand px-3 text-sm font-bold">Privacy</Link>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
