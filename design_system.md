# Alchemyst AI: Design System

> Canonical reference for every visual and interactive decision on
> getalchemystai.com. Any agent working on this site must read this file
> before touching markup, styles or diagrams.
>
> Base theme imported from tweakcn ("Alchemyst Theme 1 - Serif",
> tweakcn.com/themes/cmsry03jx000004kzb7m22yek) and extended with a bespoke
> isometric diagram system. Last updated: September 2026 (page-level system added).

---

## 1. Brand Identity

Alchemyst AI is a context engine: institutional memory and semantic retrieval
for enterprise AI agents. The visual language is warm, editorial and
paper-first: a cream canvas, warm-brown ink, one deep-amber accent, and serif
typography throughout. Diagrams are drawn as isometric exploded cross-sections
("the context layer as a stack of plates on top of your data sources"). The
system reads like a well-set technical document: quiet authority, engineering
confidence, zero decorative noise.

Voice rules that affect visuals:

- **No em-dashes anywhere.** Not in copy, comments, labels or docs. Use a
  colon, comma or full stop.
- Mono captions use the site-wide "spec sheet" language: uppercase, tracked
  out, JetBrains Mono.

---

## 2. Colour

### Raw tokens (CSS custom properties on `:root`)

| Token               | Hex        | Role                                 |
| ------------------- | ---------- | ------------------------------------ |
| `--paper`           | `#FDFBF7`  | Cream page canvas                    |
| `--ink`             | `#4A3B33`  | Primary text (warm brown)            |
| `--ink-soft`        | `#57534E`  | Secondary / body text                |
| `--amber`           | `#B45309`  | Brand accent (primary actions)       |
| `--amber-light`     | `#E4C090`  | Sand secondary accent                |
| `--teal`            | `#A16207`  | Legacy slot, dark amber companion    |
| `--teal-light`      | `#E4C090`  | Legacy slot, sand                    |
| `--teal-dark`       | `#78350F`  | Legacy slot, deepest amber           |
| `--muted`           | `#78716C`  | Tertiary text / captions             |
| `--subtle`          | `#A8A29E`  | Quaternary text / placeholders       |
| `--border-light`    | `#E4D9BC`  | Tan card / section borders           |
| `--hairline`        | `rgba(74, 59, 51, 0.08)`  | Decorative hairlines   |
| `--hairline-strong` | `rgba(74, 59, 51, 0.14)`  | Stronger hairlines     |
| `--dark-hero`       | `#1C1917`  | Warm charcoal (dark anchors)         |
| `--dark-section`    | `#1C1917`  | Warm charcoal surface                |

The theme has no teal and no cool slate. The legacy `--teal*` tokens exist only
as aliases into the warm amber family so old class names keep working.

### shadcn token mapping (HSL triplets in `globals.css`)

Light base: `--background 40 60% 98%` · `--foreground 21 18% 25%` ·
`--card 36 42% 95%` · `--primary 26 91% 37%` · `--secondary 34 61% 73%` ·
`--muted 39 45% 90%` / `--muted-foreground 25 5% 45%` · `--accent 34 68% 84%` ·
`--destructive 0 70% 35%` · `--border 43 43% 82%` · `--ring 26 91% 37%`.

### Dark anchors: `[data-theme="dark"]` (shadcn `.dark` parity block exists too)

| Token                | Hex       |
| -------------------- | --------- |
| background           | `#1C1917` |
| foreground           | `#F5F5F4` |
| card / popover       | `#292524` |
| primary (filled CTA) | `#B45309` |
| accent text (`--amber`) | `#E4C090` sand (contrast on charcoal) |
| secondary            | `#57534E` |
| muted / muted-fg     | `#201D1A` / `#A8A29E` |
| accent               | warm umber wash `hsl(34 30% 20%)` |
| destructive          | `#DC2626` |
| border / input       | `#44403C` |
| ring                 | `#E4C090` |

`#F97316` and the `#1E4252` teal accent are retired. On dark surfaces, text
accents, link hovers and HUD squares use sand `#E4C090`; filled buttons stay
deep amber `#B45309`.

### Diagram accents

- Amber family: `#B45309` (primary), `#A16207` (deep), `#CA8A04` (write-back
  gold), `#E4C090` / `#F2DABA` / `#F1E9DA` (sand fills), `#E4D9BC` (lines).
- Failure narratives use `#991B1B` with `#7F1D1D` borders and a red halo.
- Plate side faces: context plates `#F1E9DA` left / `#E4C090` right; source
  plates `#E7E5E4` left / `#D6D3D1` right.
- Whites: plate tops and chips `#FFFFFF`, underlays `#F1E9DA`, track lines
  `#E4D9BC`, grid lines `#F6F0E4`.

### Usage rules

- Headings: `--ink`. Body: `--ink-soft`. Captions: `--muted`.
- Primary CTAs and emphasis: `--amber`. Secondary accents: `#A16207` or sand.
- Backgrounds: `--paper` canvas, `#FFFFFF` elevated cards, `#F8F4EE` section
  alternation, `#F1E9DA` muted fills and code blocks.
- Borders: `#E4D9BC` visible borders, `--hairline` subtle separators.
- Off-palette colours are allowed only for third-party brand marks (social
  share swatches) and macOS window dots. Y Combinator's white "Y" glyph is a
  documented exception.

---

## 3. Typography

### Fonts (loaded via `next/font` in `src/app/layout.tsx`)

| Role              | Family             | Weights                     | Variable                 |
| ----------------- | ------------------ | --------------------------- | ------------------------ |
| Display + body    | `Merriweather`     | 300 / 400 / 700 / 900 (+it) | `--font-merriweather`    |
| Code + captions   | `JetBrains Mono`   | 400 / 500 / 600             | `--font-jetbrains-mono`  |

Tailwind mapping (`tailwind.config.ts`): `font-sans` and `font-serif` both
resolve to Merriweather; `font-mono` resolves to JetBrains Mono. Never add raw
Google Fonts link tags; `next/font` is the only loader.

### Type scale

| Element           | Size                              | Weight | Tracking   | Line height |
| ----------------- | --------------------------------- | ------ | ---------- | ----------- |
| Hero H1           | `clamp(2.25rem, 5vw, 3.75rem)`    | 700    | `-0.035em` | 1.1         |
| Section H2        | `clamp(1.75rem, 3.5vw, 2.75rem)`  | 700    | `-0.025em` | 1.15        |
| Card H3           | `1.25rem`                         | 700    | `-0.01em`  | 1.3         |
| Body large        | `1.0625rem`                       | 400    | normal     | 1.7         |
| Body base         | `0.9375rem`                       | 400    | normal     | 1.65        |
| Caption / eyebrow | `0.6875rem` (11px)                | 600    | `0.12em`   | 1           |
| Code              | `0.8125rem` (13px)                | 400    | normal     | 1.6         |

### Rules

- Merriweather is the default voice for everything except mono captions and
  code. Sora, Inter and system sans stacks are banned.
- Italic is reserved for key branded phrases in headings (Merriweather italic,
  usually in amber).
- Heading tracking is always negative; mono caption tracking is always
  positive.
- Inside SVG diagrams, text is JetBrains Mono (HUD voice) or Merriweather
  (titles only). Use the shared `MONO` / `SERIF` constants from the iso kit.
- Inside SVGs, labels are drawn flat in screen space (readable), while shapes
  are drawn in plate-local coordinates (projected). See §8.

---

## 4. Radius, Depth and Shadows

- `--radius: 0.3rem` is the system default (cards, buttons, inputs, chips).
- Tailwind scale: `sm 0.125rem` · `DEFAULT/md/lg 0.3rem` · `xl +0.2rem` ·
  `2xl +0.4rem` · `3xl +0.7rem` · `full 9999px` (dots and avatars only).
- The old hard `0px` angular rule is retired.

### Shadows (warm and soft, never hard offset blocks)

| Token             | Value                                                   |
| ----------------- | ------------------------------------------------------- |
| `--shadow-color`  | `28 18% 25%` (warm brown; `0 0% 5%` in dark anchors)    |
| `--shadow-opacity`| `0.18`                                                  |
| `--shadow-soft`   | `0 2px 3px 0 hsl(var(--shadow-color) / 0.18)` (resting) |
| `--shadow-soft-lg`| `0 10px 24px -10px hsl(var(--shadow-color) / 0.28)` (hover) |

In SVG diagrams the equivalent is `filter: url(#<prefix>Shadow)` (an
`feDropShadow` with the same warm colour), plus a blurred ground ellipse under
each plate.

---

## 5. Layout and Spacing

- Max content width: `1200px` large sections, `800px` article prose. Diagram
  wrappers use `max-w-5xl` (row / terrain diagrams) or the hero column width
  (vertical stack).
- Horizontal padding: `1.5rem` mobile, `2rem` desktop.
- Section vertical padding: `py-28` desktop, `py-20` mobile.
- Spacing unit: 4px. All margins and paddings are multiples of 4.
- Bento grids collapse to a single column under `768px`.
- Wide diagrams keep their aspect ratio and scroll sideways under `lg`
  instead of shrinking text to unreadable sizes (`min-w-[860px]` +
  `overflow-x-auto lg:overflow-visible`).

### Breakpoints

| Breakpoint | Width    | Behaviour                                          |
| ---------- | -------- | -------------------------------------------------- |
| `sm`       | `640px`  | Minor padding adjustments                          |
| `md`       | `768px`  | Two-column layouts and bento grids activate        |
| `lg`       | `1024px` | Full desktop layout, max-width containers kick in  |

---

## 6. Component Standards

### Cards

- Background `#FFFFFF` (or `hsl(var(--card))`), border `1px solid #E4D9BC`,
  radius `var(--radius)`, resting shadow `--shadow-soft`.
- Hover: `--shadow-soft-lg` and `translateY(-2px)`,
  `300ms cubic-bezier(0.23, 1, 0.32, 1)`.

### Buttons

| Variant | Background | Text      | Border               | Shadow          |
| ------- | ---------- | --------- | -------------------- | --------------- |
| Primary | `#B45309`  | `#FFFFFF` | none                 | `--shadow-soft` |
| Ink     | `#4A3B33`  | `#FFFFFF` | none                 | `--shadow-soft` |
| Outline | `#FFFFFF`  | `#57534E` | `1px solid #E4D9BC`  | `--shadow-soft` |

All buttons: `border-radius: var(--radius)`, `px-7 py-3`,
`text-sm font-semibold tracking-wide`. Hover: `translateY(-1px)` and
`--shadow-soft-lg`. Primary hover background `#A16207`.

### Eyebrow labels

Mono 11px, weight 600, tracking `0.12em` to `0.15em`, uppercase, colour
`#B45309` (or `#A16207` secondary), background at 8% opacity, border at 20 to
22% opacity, padding `4px 12px`, radius `var(--radius)`.

### Utility classes in `globals.css`

- Caption system: `.caption-eyebrow`, `.caption-meta`, `.caption-status`
  (pulsing dot), `.caption-chapter`, `.caption-rail-num`, legacy `.eyebrow`,
  `.eyebrow-teal`.
- Buttons: `.btn-primary`, `.btn-ghost` (both dark-anchor aware).
- Nav: `.nav-link`, `.nav-docs-btn`, `.nav-menu-item`, `.nav-menu-item-accent`.
- Surfaces: `.surface-card`, `.surface-divider`, `.hairline-grid-bg`.
- Behaviour: `.logo-marquee-item`, `.pricing-card`, `.compare-card`,
  `.footer-link`, `.blog-*` family, `.prose-blog-dark`.
- Animations: `.animate-fade-in(-up)`, `.animate-pulse-slow`,
  `.animate-marquee`, `.animate-blink`, `.delay-100..900`.

### Dark anchors

Deliberate dark sections use `[data-theme="dark"]` token scopes, applied by
`<Section tone="dark">`, `<DarkAnchor>` (which also paints `#1C1917`), the
shared `CTASection` and the `Footer`. A shadcn `.dark` class parity block
exists for primitives with dormant `dark:` variants. The Navbar probes the
element behind it and flips to its charcoal glass treatment (and the white
logo) over any `[data-theme='dark']` ancestor.

**The dark closing chapter.** Every page ends dark: proof or CTA, then the
footer, as one continuous charcoal stretch. Home: `ProofMetrics` →
`CTASection` → `Footer`. Compare, blog posts, how-to, placeholders:
`PageShell cta` appends `CTASection`. Thesis and Creators Program end with
their own dark `Section`. Never place a light section between a dark chapter
and the footer.

---

## 7. Motion and Interaction

- Easing: entrances `cubic-bezier(0.23, 1, 0.32, 1)` (`EASE` in the kit);
  plate explode uses spring `{ stiffness: 170, damping: 22 }` (`SPRING`).
- Entrances: fade + slide up (`y: 24px → 0`, 600ms, 80ms stagger),
  `whileInView`, `once: true` for sections; diagrams use their own loops.
- Hover: cards lift 2px, buttons lift 1px, links recolour in 150ms.
- Ambient loops (plate levitation, scans, pulses, particles) run at 2 to 12
  second periods and never distract from the narrative loop.

### Reduced motion (two layers, both required)

1. **Hydration-safe detection:** always use `useReducedMotionSafe()` from
   `src/components/sections/iso/kit.tsx`, never `useReducedMotion()` directly.
   The raw hook returns null on the server and true on the client for
   reduced-motion users, which breaks SSR hydration. The safe hook returns
   false for the server render and first client render, then applies the real
   preference after mount.
2. **Static resolved state:** when reduced, diagrams render their final
   narrative state with no animation (hero: all layers lit with the answer
   shown; terrain: walls grown, scrubber parked; drift: month 12, fully
   drifted).

### Interaction rules

- Every narrative loop pauses while the user inspects (hovers, focuses or
  taps) an element.
- Detail panels must never cover data or live readouts. Panels open in
  reserved slots: right column for the hero stack, centred beneath the plate
  for the sovereignty row, the reserved top-left slot for the accuracy
  terrain.
- Continuous ambient motion is allowed (particles, scans, pulses). Continuous
  narrative motion (auto-scrubbing a comparison plane) is not: park it and let
  hover drive it.
- Scroll-driven diagrams (drift stack) map scroll progress to narrative time
  and animate nothing on a timer.

---

## 8. Diagram Standard: the Isometric Stack Family

All product diagrams are isometric exploded cross-sections built from one
shared kit: `src/components/sections/iso/kit.tsx`. Never hand-roll a new
projection.

### Projection (dimetric)

```
IA = 0.9   // local x factor
IB = 0.32  // local y factor
iso(u, v)  = { x: IA * (u - v), y: IB * (u + v) }   // offset from plate centre
isoMatrix(cx, cy) = matrix(IA IB -IA IB cx cy)       // plate-local group transform
```

A plate of half-size `h` projects to a rhombus `3.6h` wide and `1.28h` tall.
Two coordinate frames are used inside a plate:

- **Plate-local (u, v):** shapes drawn inside `<g transform={isoMatrix(...)}>`.
  Rects render as parallelograms lying on the plate, which is correct for
  tiles, cards and anything that should look painted onto the surface.
- **Screen-aligned (a, b):** shapes drawn inside `<g transform="rotate(-45)">`.
  Circles stay round and rects stay axis-aligned. `a` maps to screen
  horizontal (`dx = 1.8·0.9·a ≈ 1.27a`) and `b` to screen depth
  (`dy = 1.8·0.32·b ≈ 0.58b`). Use it for graphs, circles and funnels.
  `flat(a, b)` converts a point to a screen offset for labels.

All strokes in projected groups use `vectorEffect="non-scaling-stroke"` (the
`ns` constant) so line widths stay uniform under the affine transform.

### Plate anatomy (the `Plate` component)

Each plate renders, in order: ground shadow ellipse, amber halo (lit / hovered
states), left and right side faces (thickness `thick`, default 9 to 11), top
face (white-to-cream gradient `ksTop`-style per-prefix gradient), amber front
edge-light when lit, an inset frame rect, a sparse grid (5 lines per axis,
`#F6F0E4`), the surface artwork, a slow vertical scan line, the centre port,
flat screen-space labels, and an etched `L0x` id.

- **The port:** a 7-unit ring at local (0, 0) plus a 3-unit amber dot when
  lit. Query beams pass through it. **Artwork must be mirror-symmetric around
  the port.** If a surface looks off-centre, re-lay it out; never move the
  port. (The lens of a Venn, the hub of a graph, and the middle of a grid all
  sit exactly on it.)
- **Lit state:** plate stroke and edge-light turn amber (or the plate's
  accent), the port dot fills, and the surface's lit features turn on. Lit is
  driven by the narrative loop, not by hover.

### Beams and gaps

- Vertical stacks have a dashed centre beam (`#E4C090`, `2 5`) through each
  gap, plus two rising particle columns at local (±74-ish diagonals) with
  glowing packets when the gap is lit (`GapParticles`).
- The horizontal row has dual rails with sockets at plate corners and packets
  travelling both directions.
- Gap content dims to 0.12 opacity while any plate is being inspected.

### Inspect interaction (hover to zoom)

`useInspect()` returns `{ hovered, enter, leave, toggle }` with a 140ms leave
grace so the pointer can travel onto the detail panel.

On inspect of plate `i`:

- Vertical stacks explode vertically (`explodeOffset`: above lift 26px, below
  drop 26px, target lifts 4px). Horizontal rows explode sideways
  (`explodeOffsetX`, 30 to 34px) and the target lifts 8px.
- The target scales to 1.07 (spring), gains the halo and accent edge; all
  other plates fade to 0.38.
- Callouts fade out and the `DetailPanel` opens (spring-free 250ms ease).
- The narrative loop pauses.
- Works with mouse, keyboard focus (`tabIndex={0}`, `role="button"`,
  `aria-label`) and tap.

### Callouts, HUD, footer

- **Callouts:** leader line from the plate to a label block. `L0x · VERB`
  (mono 9px, accent when lit), serif title 14px/700, mono sub 8.5px. Placement
  `right` (vertical stack) or `below` (horizontal row). The label block
  includes a transparent hit rect so hovering it also inspects.
- **HudHeader (top corner):** amber 7px square, `ALCHEMYST // <NAME>` mono
  8px, a meta line, pulsing LIVE dot, N phase segments that fill amber (or red
  for failure) as the narrative advances, and a `PHASE · <NAME>` line that
  follows the current step.
- **FooterStrip:** hairline, `<name>.live · …` left, interaction hint right
  (`HOVER A LAYER TO INSPECT` and friends, `#A16207`).

### DetailPanel

- `layout="stack"` (default): eyebrow row with live dot, serif title, body,
  stats rows, code line. Amber 2px left bar (or plate accent).
- `layout="wide"`: compact two-column variant for short, wide slots (used by
  the accuracy terrain's reserved top slot).
- Anchors: `anchor="right"` (right column), `anchor="center"` with `left`/`top`
  in percent (beneath a plate, or the terrain's top slot).
- Stats are `[label, value]` pairs, mono, tabular numbers. Code lines use the
  shared `▸` marker.

### SVG hygiene

- Def IDs are namespaced per component via the `p` prop / prefix: `ks` (hero
  stack), `sv` (sovereignty row), `bm` (accuracy terrain), `sd` (drift stack),
  `cg` (legacy hero graph). Duplicate IDs across SVGs on one page would
  collide.
- Never animate a motion prop from `undefined`: give animated attributes a
  static value or `initial={false}` (reactivity warnings otherwise).
- framer-motion applies `transform-box: fill-box` to SVG elements: transform
  origins are relative to the element's own bounding box, not the canvas.
  Never pass absolute pixel origins; the default centre is correct for
  centred shapes.
- Throttle React state writes from rAF loops to about 30ms (`lastSet` guard)
  and gate timers behind `useInView` so offscreen diagrams do not tick.

### Registry

| Component                 | File                                        | Used in              | Narrative |
| ------------------------- | ------------------------------------------- | -------------------- | --------- |
| Hero context stack        | `sections/ContextStack.tsx`                 | Landing hero         | Query loops down through 5 plates (sources → graph → arithmetic → consensus → delivery) and a traced answer rises. |
| Sovereignty row           | `sections/ContextSovereigntyFlow.tsx`       | Landing Why Context  | Horizontal row: models ⇄ context → agents. Models hot-swap on a 4.6s loop; hovering a chip docks it. |
| Accuracy terrain          | `sections/BenchmarkChart.tsx`               | Landing Fixes        | Isometric 3-series terrain. Scrubber parked at a random point; hover scrubs; series hover isolates. |
| Drift stack               | `sections/SemanticDriftFlow.tsx`            | `/thesis`            | Scroll is time (M0 → M12). Tethers between reality and the frozen snapshot stretch, redden and snap. |
| Legacy hero graph         | `sections/ContextGraphLive.tsx`             | Unused (commented out of the hero) | Flat HUD flow diagram, kept for reference. |
| Ambient network           | `sections/HeroNetwork.tsx`                  | Landing hero backdrop| Canvas particle network, warm palette, radially masked. |

---

## 9. Accessibility

- Every diagram is `role="img"` with a full-sentence `aria-label` describing
  the narrative.
- Inspectable plates and chips are keyboard reachable (`tabIndex`, focus
  triggers the same inspect state) and expose `aria-label` with the panel
  body text.
- All motion respects `prefers-reduced-motion` via the two layers in §7.
- Colour is never the only signal: lit states also change stroke width, dot
  fill, labels or badges.

---

## 10. Anti-Patterns (Do Not)

- No em-dashes. Anywhere.
- No cool slate or blue-gray colours (`#0F172A`, `#475569`, `#64748B`,
  `#94A3B8`, `#CBD5E1`, `#E5E7EB`), and no teal (`#128F8B` family).
- No old bright amber `#F49025`. Primary is `#B45309`.
- No hard offset (`Npx Npx 0`) shadows. Use the soft warm shadow tokens.
- No Sora, Inter or other sans-serif for display or body text. Merriweather
  only.
- No decorative gradient blobs or glow effects outside the diagram halo and
  scan systems.
- No new marketing microcopy for decoration (figure captions, section
  numbers). Visual structure comes from hairlines, ticks and squares.
- No `overflow: hidden` on `html` / `body` (breaks sticky); use `clip`.
- No `next/font`-less font loading, and no font weights outside
  Merriweather's set (300 / 400 / 700 / 900).
- No fixed-height containers around aspect-locked diagrams (letterboxing is
  banned; use `aspect-[...]` wrappers).
- No transform-origin pixel values on SVG elements (fill-box rule, §8).
- No `useReducedMotion()` directly in components (hydration rule, §7).
- No continuous narrative motion without user intent (park and let hover or
  scroll drive it).
- No detail panels over data or readouts.
- No centre-aligned body text, no text drop shadows, no more than two motion
  effects on one element.

---

## 11. File Organisation

```
src/
  app/
    globals.css                 ← tokens, utility classes, blog system
    layout.tsx                  ← next/font (Merriweather, JetBrains Mono)
  components/
    brand/                      ← brand primitives, CodeBlock, ComparisonTable,
                                  Status, SectionHeader
    page/                       ← PageShell, PageHero, Prose, PageBody
    compare/                    ← ComparePage, Callout (re-exports ComparisonTable)
    motion/                     ← SmoothScroll, primitives, Reveal, DarkAnchor
    sections/
      ProofMetrics.tsx          ← dark chapter opener (count-up metrics)
      ContextStack.tsx          ← hero: vertical isometric stack + query loop
      ContextSovereigntyFlow.tsx← landing: horizontal row + hot-swap loop
      BenchmarkChart.tsx        ← landing: isometric accuracy terrain
      SemanticDriftFlow.tsx     ← thesis: scroll-driven drift stack
      ContextGraphLive.tsx      ← legacy flat HUD hero diagram (unused)
      HeroNetwork.tsx           ← ambient canvas backdrop
      iso/kit.tsx               ← shared isometric kit (Plate, DetailPanel,
                                  HudHeader, FooterStrip, GapParticles,
                                  IsoDefs, useInspect, useReducedMotionSafe,
                                  explodeOffset(X), iso / isoMatrix / flat)
```

---

## 12. Page-Level System ("the page as a spec sheet")

The site borrows the diagrams' visual language without adding copy:
hairlines instead of boxes, corner ticks as registration marks, the 7px amber
HUD square as the bullet and eyebrow marker, mono spec captions, the plate
grid as a masked backdrop, and amber reserved for active or hovered states.

### Brand primitives (`src/components/brand/`)

| Primitive | Use |
| --- | --- |
| `Section` | Every page band. `tone` paper / sand / white / dark (dark sets `data-theme`), `grid` (masked plate grid), `bordered`, `pad`, `width`. |
| `SectionHeader` (client) | Editorial header: hairline draws in, eyebrow on the rule, headline revealed word by word, lead in a right column (`align="split"`) or stacked (`left` / `center`). |
| `Eyebrow` | `square` (HUD square + mono label, default) or `pill`. `tone="red"` only for failure narratives. Replaces all hand-rolled eyebrows. |
| `SpecCard` + `Ticks` | White (or sand / dark) card with corner ticks that brighten to amber and step outward on hover; 2px lift. |
| `BrandButton` | `primary`, `ink`, `outline`, `outline-dark`, `text`; optional `arrow` that nudges on hover. |
| `SpecStrip` | Mono metric row with hairline dividers (hero). |
| `Figure` | Corner-bracket frame around a diagram. No caption text. |
| `Chip` | Mono chip that warms on card hover. |
| `CodeBlock` (client) | Editor chrome (three sand dots, optional existing label, icon-only copy), React-node tokenizer in the amber palette. Never `dangerouslySetInnerHTML`. |
| `ComparisonTable` | The only table design for comparisons: mono header, Alchemyst column tinted and ruled amber, row headers bold, horizontal scroll under 640px. |
| `Status` / `StatusText` | ✅ / ⚠️ / ❌ rendered as amber check, sand dash, stone cross glyphs with accessible labels. |

### Page templates (`src/components/page/`, `src/components/compare/`)

- `PageShell` = Navbar + `<main>` + optional `CTASection` (`cta`) + Footer.
- `PageHero` = masked plate grid, mono breadcrumbs, pill eyebrow, revealed
  H1, lead, meta line with sand square, closing hairline. Widths `narrow`
  (848px), `medium` (1000px), `wide` (1200px).
- `Prose` = `.prose-blog-dark.prose-brand` long-form: 72ch measure, h2 on a
  hairline with an amber square, sand square bullets, amber ordered markers,
  tinted blockquotes, carded tables. Embedded components opt out with
  `.not-prose`.
- `ComparePage` + `Callout` = every `/compare/*` detail page. Content lives in
  the page, layout lives in the template.

### Motion primitives (`src/components/motion/primitives.tsx`)

| Primitive | Behaviour |
| --- | --- |
| `SmoothScroll` | Lenis inertial scroll (duration 1.1, expo-out), in-page anchors land 96px below the nav. Off for reduced motion and touch. Exposed as `window.__lenis` for programmatic glides. |
| `RevealText` | Masked word-by-word rise (105% → 0, 800ms, 45ms stagger). Keeps wrapper spans (italic accents) and `&nbsp;` joins. Text stays in the DOM. |
| `FadeUp` / `Stagger` | 24px rise, 700ms `EASE`; standalone or staggered (80ms). |
| `DrawLine` | Hairline grows from `start` or `end` on first view. |
| `FigureReveal` | Clip-path wipe + 32px rise for diagrams; clip removed on completion so panels can overflow. |
| `Parallax` / `useParallax` | Scroll-linked drift of at most ±24px (hero uses 50 to 90px scroll-out depth). |

Rules: every reveal fires once (`VIEWPORT`: once, bottom margin −12%);
transform, opacity and clip-path only; one entrance plus at most one scroll
effect per element; all primitives use `useReducedMotionSafe` and resolve
instantly when reduced. `html, body` use `overflow-x: clip` (never `hidden`)
so `position: sticky` pinned sequences work.

### Signature sequences

- **Hero:** eyebrow, word-reveal H1, lead, CTAs, `SpecStrip`, then the
  `ContextStack` figure rises; on scroll-out the copy lifts faster than the
  diagram; a hairline scroll cue with a travelling amber segment.
- **How it works (pinned):** desktop sticky rail lists steps 01 to 04 with a
  HUD-style segmented progress bar; the step card crossing the viewport centre
  lights its rail entry and warms its border. Rail items glide to their card.
- **Logo marquee:** three identical sets translated by exactly −33.333% (CSS
  keyframes, 48s), paused on hover, static for reduced motion.
- **Proof metrics:** serif numerals count up once (SSR renders the real
  value), hairline grid 1 / 2x2 / 4 across.
- **Footer watermark:** outlined sand serif "Alchemyst AI" rising into place.

---

## 13. Verification Checklist (run after any visual change)

1. `npm run build` passes with all 41+ pages generated.
2. Browser console is clean (no hydration mismatches, no framer-motion
   warnings, no SVG attribute errors). `npm run lint` is unavailable because
   Next 16 removed the `next lint` command; the build is the gate.
3. Screenshot the resolved state with `--force-prefers-reduced-motion` (this
   also exercises the static reduced-motion path) and the animated idle state
   without it.
4. Exercise the inspect state (hover or focus a plate) and confirm the explode
   and the detail panel land in their reserved slots.
5. Grep the changed files for `—` and for off-palette hexes before calling
   the work done.
6. Check that the Navbar flips over every dark chapter and that the page ends
   on one continuous dark stretch.
7. JSX gotcha: in this toolchain, a text node that starts with a space right
   after a closing inline tag and later contains an HTML entity (`&apos;`,
   `&quot;`) can lose that leading space. Write `</strong>{" "}text` in such
   lines, and grep the built HTML for `</strong>[a-z]` before shipping.
