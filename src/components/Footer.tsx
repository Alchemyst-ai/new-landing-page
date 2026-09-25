import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";
import BackToTop from "./BackToTop";
import FooterWatermark from "./FooterWatermark";

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.046c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.064 2.063 2.063 0 1 1 2.063 2.064zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { label: "Context Layer", href: "/#how-it-works" },
    { label: "Thesis", href: "/thesis" },
    { label: "Kathan Voice AI", href: "https://getalchemystai.com/kathan" },
    { label: "Agent Builder", href: "https://getalchemystai.com/agents" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "https://getalchemystai.com/changelog" },
    { label: "Creators Program", href: "/creators-program" },
  ],
  Developers: [
    { label: "Documentation", href: "https://docs.getalchemystai.com" },
    { label: "API Reference", href: "https://docs.getalchemystai.com/api" },
    { label: "Python SDK", href: "https://docs.getalchemystai.com/sdk/python" },
    { label: "Node.js SDK", href: "https://docs.getalchemystai.com/sdk/node" },
    { label: "Status", href: "https://status.getalchemystai.com" },
    { label: "llms.txt", href: "/llms.txt" },
    { label: "llms-full.txt", href: "/llms-full.txt" },
  ],
  Compare: [
    { label: "vs Mem0", href: "/compare/alchemyst-ai-vs-mem0" },
    { label: "vs Zep", href: "/compare/alchemyst-ai-vs-zep" },
    { label: "vs Palantir", href: "/compare/alchemyst-ai-vs-palantir" },
    { label: "vs Glean", href: "/compare/alchemyst-ai-vs-glean" },
    { label: "vs Databricks", href: "/compare/alchemyst-ai-vs-databricks" },
    { label: "All Comparisons", href: "/compare" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "https://getalchemystai.com/careers" },
    { label: "Contact", href: "mailto:founders@getalchemystai.com" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Security", href: "/security" },
    { label: "Terms of Service", href: "https://getalchemystai.com/terms" },
  ],
};

const socialLinks = [
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/alchemystai", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/getalchemystai", label: "X" },
];

export default function Footer() {
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-[#1C1917] text-[#F5F5F4]">
      <div aria-hidden className="plate-grid plate-grid-top absolute inset-0 opacity-60" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="h-px w-full bg-white/[0.08]" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pt-16 pb-16 md:grid-cols-4 lg:grid-cols-7 lg:pb-20">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:pr-10">
            <Link href="/" className="mb-7 inline-flex items-center" aria-label="Alchemyst AI home">
              <Image src="/logo.png" alt="Alchemyst AI logo" width={1388} height={200} className="h-7 w-auto" loading="lazy" />
            </Link>

            <p className="mb-8 max-w-[300px] text-[0.9375rem] leading-[1.7] text-[#A8A29E]">
              Persistent, traceable context and semantic retrieval for AI
              agents over your institutional knowledge graph.
            </p>

            <p className="mb-6 flex items-baseline gap-2.5 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.16em] text-[#78716C]">
              <span aria-hidden className="h-[6px] w-[6px] shrink-0 translate-y-[-1px] bg-[#E4C090]" />
              <span>
                Headquartered in <span className="whitespace-nowrap text-[#D6D3D1]">Bangalore, India</span>
              </span>
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-white/[0.08] text-[#A8A29E] transition-colors duration-200 hover:border-[#E4C090]/50 hover:text-[#E4C090]"
                >
                  <social.icon className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#78716C]">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => {
                  const external = /^(https?:|mailto:)/.test(link.href);
                  return (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        {...(external && !link.href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="footer-link text-[0.875rem] text-[#A8A29E]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <FooterWatermark />

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-6 sm:flex-row">
          <p className="text-[0.8125rem] text-[#78716C]">
            &copy; {new Date().getFullYear()} XAlchemystai Technologies Pvt. Ltd. All
            rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
