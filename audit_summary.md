# Refactoring Strategy: Total Visual Reinvention

## Step 1: Study References

### hydradb.com (Engineered Aesthetic)
- **Learnings**: Uses precise grids, monospace typography for metadata, thin 1px borders (hairlines), glowing accents against dark backgrounds, and schematic/blueprint styles for technical diagrams.
- **Application**: We will use this in the `HeroSection` and the architecture diagrams (e.g., `ContextGraphLive`, `SemanticDriftFlow`). We'll employ strict grid layouts, `JetBrains Mono` for captions/metadata, and highly technical, precise SVGs with flowing particles that feel like real data.

### supermemory.ai (Clean, Tasteful Layout)
- **Learnings**: Expansive whitespace, subtle drop shadows, gentle border radii, extreme typographic hierarchy (very large headings vs. small, crisp body text), and absolute restraint. It avoids clutter.
- **Application**: The light-mode sections (`WhyContextSection`, `AlchemystFixesSection`, `PricingSection`) will use this aesthetic. Lots of breathing room. Soft off-white backgrounds (`#FAFAFA` or similar), sharp typography (`Sora`), and elegant card hover states.

### palantir.com (Capability & Authority)
- **Learnings**: Staggered scroll reveals, confident full-width sections, stark contrasts between light and dark sections to create a dramatic rhythm, and bold, uncompromising statements.
- **Application**: We will alternate between high-contrast dark sections (Hero, CTA) and pristine light sections. We'll use Framer Motion heavily to trigger staggered animations as elements enter the viewport, creating a cinematic, authoritative pacing.

## Step 2: Codebase Audit
- **Framework**: Next.js 16 (App Router), React 19, Tailwind CSS, Framer Motion, Radix UI.
- **Fonts**: `Anta` (Display), `Sora` (Sans-serif), `JetBrains Mono` (Monospace).
- **Colors**: Teal `#128F8B` and Orange `#F49025`.
- **Text Nodes Constraint**: ALL existing text nodes in `page.tsx` and the sections must be preserved exactly as they are. The order, semantic HTML, and IDs must remain intact.
- **Sections to Rebuild**:
  1. `HeroSection.tsx` + `ContextGraphLive.tsx`
  2. `LogoBar.tsx`
  3. `WhyContextSection.tsx`
  4. `AlchemystFixesSection.tsx` + `SemanticDriftFlow.tsx` + `ContextSovereigntyFlow.tsx`
  5. `CTASection.tsx`
  6. `PricingSection.tsx` / `PricingCard.tsx` (If on landing page)

## Step 3: Rebuild Plan
I will systematically replace the content of each section with a completely new layout and Framer Motion animation setup, while strictly preserving the text.
