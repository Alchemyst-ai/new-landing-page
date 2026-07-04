# Alchemyst AI -- Design System

> Canonical reference for every visual decision on getalchemystai.com.
> Last updated: July 2026

---

## 1. Brand Identity

Alchemyst AI is a **context engine** -- institutional memory and semantic retrieval for enterprise AI agents. The visual language communicates **precision, engineering confidence, and quiet authority**. No gimmicks, no decorative noise; every element earns its place.

---

## 2. Colour Palette

### Primary Tokens (CSS custom properties on `:root`)

| Token              | Hex        | Role                                |
| ------------------ | ---------- | ----------------------------------- |
| `--paper`          | `#F7F4EE`  | Warm off-white page canvas          |
| `--ink`            | `#0F172A`  | Primary text (near-black)           |
| `--ink-soft`       | `#475569`  | Secondary / body text               |
| `--amber`          | `#F49025`  | Brand accent (primary, logo chevron)|
| `--amber-light`    | `#FDB560`  | Light amber for diagrams only       |
| `--teal`           | `#128F8B`  | Secondary accent (logo "I" stroke)  |
| `--teal-light`     | `#2BB6B4`  | Light teal for diagrams only        |
| `--teal-dark`      | `#0B6E6B`  | Hover teal                          |
| `--muted`          | `#64748B`  | Tertiary text / captions            |
| `--subtle`         | `#94A3B8`  | Quaternary text / placeholders      |
| `--border-light`   | `#E5E7EB`  | Card / section borders              |
| `--hairline`       | `rgba(15, 23, 42, 0.08)` | Decorative hairlines  |

### Usage Rules

- **Headings**: `--ink` (`#0F172A`)
- **Body copy**: `--ink-soft` (`#475569`)
- **Captions / meta**: `--muted` (`#64748B`)
- **Brand highlights**: `--amber` for primary CTAs and emphasis, `--teal` for secondary accents and status indicators
- **Backgrounds**: `--paper` for page canvas, `#FFFFFF` for elevated cards, `#FAFAFA` for section alternation
- **Borders**: `--border-light` for visible borders, `--hairline` for subtle separators

---

## 3. Typography

### Font Stack

| Role       | Family                              | Weights   | Usage                              |
| ---------- | ----------------------------------- | --------- | ---------------------------------- |
| **Display + Body** | `'Sora', sans-serif`       | 400--800  | All headings, body text, UI labels |
| **Code + Captions** | `'JetBrains Mono', monospace` | 400--600 | Eyebrows, code blocks, metrics, mono captions |

### Type Scale

| Element           | Size                                    | Weight | Tracking       | Line Height |
| ----------------- | --------------------------------------- | ------ | -------------- | ----------- |
| Hero H1           | `clamp(2.25rem, 5vw, 3.75rem)`         | 700    | `-0.035em`     | 1.1         |
| Section H2        | `clamp(1.75rem, 3.5vw, 2.75rem)`       | 700    | `-0.025em`     | 1.15        |
| Card H3           | `1.25rem`                               | 700    | `-0.01em`      | 1.3         |
| Body (large)      | `1.0625rem`                             | 400    | normal         | 1.7         |
| Body (base)       | `0.9375rem`                             | 400    | normal         | 1.65        |
| Caption / Eyebrow | `0.6875rem` (11px)                      | 600    | `0.12em`       | 1           |
| Code              | `0.8125rem` (13px)                      | 400    | normal         | 1.6         |

### Rules

- All body text uses `'Sora'`. No other sans-serif.
- JetBrains Mono is **only** for: eyebrow labels, code snippets, metric callouts, and the mono caption system.
- Never use italic for body copy. Italic is reserved exclusively for key branded phrases in headings (e.g. the amber-coloured phrase in a section headline).
- Letter-spacing on headings is always negative. Letter-spacing on mono captions is always positive.

---

## 4. Layout & Spacing

### Grid

- **Max content width**: `1200px` (large sections), `800px` (article prose)
- **Horizontal padding**: `1.5rem` (mobile), `2rem` (desktop)
- **Section vertical padding**: `py-28` (112px) desktop, `py-20` (80px) mobile
- **Spacing unit**: `4px` base. Every margin/padding should be a multiple of 4.

### Bento Grid System

Bento grids use CSS Grid with named areas. Typical patterns:

```
/* 2-column hero */
grid-template-columns: 1fr 1fr;

/* 3-column bento (desktop) */
grid-template-columns: repeat(3, 1fr);
grid-template-rows: auto auto;

/* Asymmetric bento: one tall + two stacked */
grid-template-columns: 1fr 1fr;
grid-template-rows: auto auto;
/* First card spans 2 rows */
```

On mobile (`< 768px`), all bento grids collapse to a single column stack.

### Two-Column Layouts

- Hero and CTA sections use a 55/45 or 50/50 split.
- Left column holds text content; right column holds the visual / interactive element.
- On mobile, columns stack vertically -- text first, visual second.

---

## 5. Components

### Cards

- **Background**: `#FFFFFF`
- **Border**: `1px solid #E5E7EB`
- **Border radius**: `0` everywhere (sharp/angular design language)
- **Shadow (resting)**: `none` or `0 1px 3px rgba(15,23,42,0.04)`
- **Shadow (hover)**: `0 8px 24px -8px rgba(15,23,42,0.08)`
- **Hover lift**: `translateY(-2px)`
- **Transition**: `all 300ms cubic-bezier(0.23, 1, 0.32, 1)`
- **Internal padding**: `p-8` to `p-10`

### Buttons

| Variant   | Background   | Text       | Border           | Shadow                       |
| --------- | ------------ | ---------- | ---------------- | ---------------------------- |
| Primary   | `#0F172A`    | `#FFFFFF`  | none             | `4px 4px 0 #0F172A`         |
| Amber CTA | `#F49025`    | `#FFFFFF`  | none             | `4px 4px 0 #B45309`         |
| Outline   | `transparent`| `#475569`  | `1px solid #E5E7EB` | `4px 4px 0 #E2E8F0`      |

All buttons: `rounded-none`, `px-7 py-3`, `text-sm font-semibold tracking-wide`.
Hover: shift `translate(-1px, -1px)` and grow shadow by `+2px`.

### Eyebrow Labels

```
font: JetBrains Mono, 11px, 600
letter-spacing: 0.12em
text-transform: uppercase
colour: var(--amber) or var(--teal)
background: colour at 8% opacity
border: 1px solid colour at 20% opacity
padding: 4px 12px
border-radius: 0
```

### Metric Callouts

Displayed in a horizontal strip or within bento cards. Use JetBrains Mono for the value and Sora for the label.

---

## 6. Motion & Animation

### Principles

- Motion is **subtle and purposeful**. It signals hierarchy (elements enter in reading order) and interactivity (hover states).
- No bounces, no springs, no elastic easing. Use `cubic-bezier(0.23, 1, 0.32, 1)` for enter animations.
- Reduced motion: all animation disabled via `@media (prefers-reduced-motion: reduce)`.

### Entrance Animations

- **Fade + slide up**: `opacity: 0 -> 1`, `y: 24px -> 0`, duration `600ms`, stagger `80ms` between siblings.
- Applied once on viewport enter (`whileInView`, `once: true`).
- No animation on elements already visible on load (above the fold content uses a lighter, faster entrance).

### Hover States

- Cards: `translateY(-2px)` + shadow deepens. Duration `300ms`.
- Buttons: `translate(-1px, -1px)` + shadow grows by `2px`. Duration `200ms`.
- Links: colour transition to `--amber`. Duration `150ms`.

### Background Animation (Hero only)

- Canvas-based particle network (`HeroNetwork.tsx`).
- Subtle, low-opacity, radially masked to stay behind content.
- Respects `prefers-reduced-motion`.

---

## 7. Section Patterns

### Hero (Two-Column)

```
[Eyebrow] ─────────────────────────────────────
[H1 Headline - left aligned]    | [Visual: ContextGraphLive]
[Description paragraph]          |
[CTA buttons]                    |
[Metrics strip]                  |
```

### Content Section (Bento Grid)

```
[Eyebrow] ─ [Section H2] ─ [Description]

┌──────────────────┬──────────┐
│  Large card      │ Small    │
│  (spans 2 rows)  │ card     │
│                  ├──────────┤
│                  │ Small    │
│                  │ card     │
└──────────────────┴──────────┘
```

### CTA (Two-Column)

```
[Headline + description]  |  [Email form / primary CTA]
[Trust badges]             |  [Secondary link]
```

---

## 8. Responsive Breakpoints

| Breakpoint | Width    | Layout behaviour                                   |
| ---------- | -------- | -------------------------------------------------- |
| `sm`       | `640px`  | Minor padding adjustments                          |
| `md`       | `768px`  | Two-column layouts activate, bento grids activate  |
| `lg`       | `1024px` | Full desktop layout, max-width containers kick in  |

### Mobile rules

- All multi-column layouts collapse to single column.
- Hero: text column stacks above visual column.
- Bento grids: all cards become full-width stacked.
- Section padding reduces from `py-28` to `py-16`.
- Heading sizes scale down via `clamp()`.

---

## 9. File Organisation

```
src/
  app/globals.css          ← All CSS custom properties, base styles, utility classes
  components/
    sections/
      HeroSection.tsx      ← Two-column hero with ContextGraphLive
      HeroNetwork.tsx      ← Canvas background animation
      WhyContextSection.tsx ← Bento grid: why context matters
      AlchemystFixesSection.tsx ← Bento grid: product features
      CTASection.tsx        ← Two-column CTA with email capture
      LogoBar.tsx           ← Trust logo marquee
      ...
```

---

## 10. Anti-Patterns (Do Not)

- Do not use `rounded-full` or any border-radius > 0 on cards, buttons, or badges.
- Do not use decorative gradient blobs or glow effects.
- Do not center-align full sections of body text (headings may be centered for standalone section headers, but body text is always left-aligned or in its natural column).
- Do not use more than 2 motion effects simultaneously on any element.
- Do not use font weights below 400 or above 800.
- Do not use colours outside the defined palette.
- Do not use `font-serif` anywhere.
- Do not add drop shadows on text.
