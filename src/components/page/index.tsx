// Page templates shared by every secondary page: PageShell (nav + main +
// optional closing CTA + footer), PageHero (breadcrumbs, eyebrow, revealed
// H1, lead, meta) and Prose (the long-form typography system).

import * as React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import CTASection from "@/components/sections/CTASection";
import { Eyebrow } from "@/components/brand";
import { DrawLine, FadeUp, RevealText } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  cta = false,
  className,
}: {
  children: React.ReactNode;
  /** Append the shared closing CTA (dark chapter) before the footer. */
  cta?: boolean;
  className?: string;
}) {
  return (
    <>
      <Navbar />
      <main className={cn("bg-[#FDFBF7] text-[#4A3B33]", className)}>{children}</main>
      {cta && <CTASection />}
      <Footer />
    </>
  );
}

const WIDTHS = {
  narrow: "max-w-[848px]",
  medium: "max-w-[1000px]",
  wide: "max-w-[1200px]",
} as const;

export function PageHero({
  crumbs,
  currentPath,
  eyebrow,
  title,
  lead,
  meta,
  children,
  width = "narrow",
  className,
  titleClassName,
}: {
  crumbs?: Crumb[];
  currentPath?: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  meta?: React.ReactNode;
  children?: React.ReactNode;
  width?: keyof typeof WIDTHS;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden bg-[#FDFBF7]", className)}>
      <div aria-hidden className="plate-grid plate-grid-top absolute inset-0" />
      <div className={cn("relative mx-auto px-6 lg:px-8 pt-32 md:pt-44 pb-12 md:pb-16", WIDTHS[width])}>
        {crumbs && (
          <FadeUp standalone distance={12}>
            <Breadcrumbs items={crumbs} currentPath={currentPath} />
          </FadeUp>
        )}
        {eyebrow && (
          <FadeUp standalone distance={12} delay={0.05} className="mb-7">
            <Eyebrow variant="pill">{eyebrow}</Eyebrow>
          </FadeUp>
        )}
        <RevealText
          as="h1"
          onMount
          delay={0.08}
          className={cn(
            "text-[clamp(2.125rem,4.6vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.035em] text-[#4A3B33] text-balance",
            titleClassName,
          )}
        >
          {title}
        </RevealText>
        {lead && (
          <FadeUp standalone delay={0.25}>
            <p className="mt-7 max-w-[68ch] text-[1.125rem] leading-[1.75] text-[#57534E]">{lead}</p>
          </FadeUp>
        )}
        {meta && (
          <FadeUp standalone delay={0.35}>
            <p className="mt-8 flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#78716C]">
              <span aria-hidden className="h-[6px] w-[6px] bg-[#E4C090]" />
              {meta}
            </p>
          </FadeUp>
        )}
        {children && (
          <FadeUp standalone delay={0.4} className="mt-10">
            {children}
          </FadeUp>
        )}
        <DrawLine className="mt-12 md:mt-16" delay={0.3} />
      </div>
    </header>
  );
}

/** Long-form body container using the site prose system. */
export function Prose({
  children,
  className,
  width = "narrow",
}: {
  children: React.ReactNode;
  className?: string;
  width?: keyof typeof WIDTHS;
}) {
  return (
    <div className={cn("relative mx-auto px-6 lg:px-8 pb-24 md:pb-32", WIDTHS[width])}>
      <div className={cn("prose-blog-dark prose-brand", className)}>{children}</div>
    </div>
  );
}

/** Plain content container matching PageHero widths. */
export function PageBody({
  children,
  className,
  width = "narrow",
}: {
  children: React.ReactNode;
  className?: string;
  width?: keyof typeof WIDTHS;
}) {
  return <div className={cn("relative mx-auto px-6 lg:px-8 pb-24 md:pb-32", WIDTHS[width], className)}>{children}</div>;
}

/**
 * Legal document page (privacy notice, terms). No hero and no motion: the
 * document renders exactly as written, including its own title, inside the
 * site chrome (nav, breadcrumbs, footer).
 */
export function LegalShell({
  crumb,
  currentPath,
  children,
}: {
  crumb: string;
  currentPath: string;
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <div className="relative mx-auto max-w-[848px] px-6 pb-24 pt-32 md:pb-32 md:pt-40 lg:px-8">
        <Breadcrumbs items={[{ name: crumb }]} currentPath={currentPath} />
        <article className="legal-doc mt-8">{children}</article>
      </div>
    </PageShell>
  );
}
