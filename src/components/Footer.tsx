import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";

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
    { label: "Context Layer", href: "#" },
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
    { label: "About Us", href: "/about-us" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "https://getalchemystai.com/careers" },
    { label: "Contact", href: "mailto:founders@getalchemystai.com" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "https://getalchemystai.com/privacy" },
    { label: "Terms of Service", href: "https://getalchemystai.com/terms" },
  ],
};

const socialLinks = [
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/alchemystai", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/getalchemystai", label: "X" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0F172A] text-white">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-32">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 mb-4 lg:mb-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Alchemyst AI logo"
                width={220}
                height={55}
                className="w-auto"
                loading="lazy"
              />
            </Link>

            <p className="text-sm text-white/50 leading-relaxed max-w-[280px] mb-6">
              Persistent, traceable context and semantic retrieval for AI
              agents over your institutional knowledge graph.
            </p>

            <p className="text-[8px] uppercase tracking-[0.14em] text-white/30 mb-1">
              Headquartered in <span className="text-[10px] text-white/50 leading-relaxed mb-6">Bangalore, India</span>
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/[0.06] hover:bg-[#F49025]/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4 text-white/60" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/45 hover:text-[#F49025] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/35">
            &copy; {new Date().getFullYear()} XAlchemyst Technologies Pvt. Ltd. All
            rights reserved.
          </p>

        </div>
      </div>

      {/* Giant watermark */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute hidden lg:block bottom-24 leading-none font-bold tracking-tight text-white/[0.03] text-[10vw] translate-y-12 translate-x-1/2 whitespace-nowrap"
      >
        Alchemyst AI
      </span>
    </footer>
  );
}
