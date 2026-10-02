// Model output normalization.
//
// The model is asked for a *lenient* shape (no length, count, or slug
// constraints) because free and small models routinely overshoot a max length
// by a few characters, which used to fail the whole generation. The output is
// then clamped into the strict `generatedResultSchema` contract the frontend,
// storage, and email route rely on. Truly unusable output still fails.

import { z } from "zod";
import {
  caseStudySlugs,
  generatedResultSchema,
  type CaseStudySlug,
  type GeneratedResult,
} from "@/lib/assessment/schema";

const CATEGORIES = ["Trust", "Collaboration", "Observability", "Improvement", "ROI"] as const;
const PRIORITIES = ["P0", "P1", "P2"] as const;
const EFFORTS = ["S", "M", "L"] as const;

/** Schema sent to the model. Enums stay to guide it; limits live in the prompt. */
export const modelResultSchema = z.object({
  profile: z.object({
    archetype: z
      .string()
      .describe(
        "Evocative 2 to 5 word persona name, e.g. 'The Instrumented Tinkerer'. Never just the role or designation. At most 80 characters.",
      ),
    maturity_score: z.number().describe("Integer 0 to 100."),
    summary: z.string().describe("2 to 5 sentences, at most 1200 characters."),
    strengths: z.array(z.string()).describe("2 to 4 short strengths."),
    risks: z.array(z.string()).describe("2 to 4 short risks."),
    focus_theme: z.string().describe("The single next lever, at most 200 characters."),
  }),
  checklist: z
    .array(
      z.object({
        id: z.string().describe("kebab-case slug, e.g. version-context"),
        title: z.string().describe("Imperative, at most 70 characters."),
        detail: z.string().describe("1 to 2 sentences, at most 240 characters."),
        category: z.enum(CATEGORIES),
        priority: z.enum(PRIORITIES),
        effort: z.enum(EFFORTS),
      }),
    )
    .describe("6 to 9 items."),
  case_study: z.object({
    slug: z.string().describe(`One of: ${caseStudySlugs.join(", ")}.`),
    reason: z.string().describe("1 to 2 sentences, at most 240 characters."),
  }),
});

export type ModelResult = z.infer<typeof modelResultSchema>;

/** Strip em/en dashes (house style) and collapse whitespace. */
function clean(text: string): string {
  return text
    .replace(/\s*[\u2014\u2013]\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Truncate to `max` chars on a word boundary, keeping the sentence readable. */
export function clampText(text: string, max: number): string {
  const value = clean(text);
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-]+$/, "");
  return `${base}…`.slice(0, max);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

function clampList(items: string[], minLength: number, maxLength: number, maxItems: number): string[] {
  return items
    .map((item) => clampText(item, maxLength))
    .filter((item) => item.length >= minLength)
    .slice(0, maxItems);
}

/**
 * Coerce lenient model output into the strict contract.
 * Returns the issues when the output cannot satisfy the contract even after
 * clamping (too few checklist items, missing strengths, and similar).
 */
export function normalizeModelResult(
  raw: ModelResult,
  fallbackSlug: () => CaseStudySlug,
): { ok: true; data: GeneratedResult } | { ok: false; issues: string } {
  const seen = new Set<string>();
  const checklist = raw.checklist.slice(0, 9).map((item, index) => {
    const title = clampText(item.title, 70);
    let id = slugify(item.id) || slugify(title) || `item-${index + 1}`;
    if (id.length < 2) id = `item-${index + 1}`;
    while (seen.has(id)) id = `${id.slice(0, 56)}-${index + 1}`;
    seen.add(id);
    return {
      id,
      title,
      detail: clampText(item.detail, 240),
      category: item.category,
      priority: item.priority,
      effort: item.effort,
    };
  });

  const slug = (caseStudySlugs as readonly string[]).includes(raw.case_study.slug.trim().toLowerCase())
    ? (raw.case_study.slug.trim().toLowerCase() as CaseStudySlug)
    : fallbackSlug();

  const candidate = {
    profile: {
      archetype: clampText(raw.profile.archetype, 80),
      maturity_score: Math.max(0, Math.min(100, Math.round(raw.profile.maturity_score))),
      summary: clampText(raw.profile.summary, 1200),
      strengths: clampList(raw.profile.strengths, 5, 300, 4),
      risks: clampList(raw.profile.risks, 5, 300, 4),
      focus_theme: clampText(raw.profile.focus_theme, 200),
    },
    checklist,
    case_study: { slug, reason: clampText(raw.case_study.reason, 240) },
  };

  const parsed = generatedResultSchema.safeParse(candidate);
  if (parsed.success) return { ok: true, data: parsed.data };
  return {
    ok: false,
    issues: parsed.error.issues
      .slice(0, 3)
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; "),
  };
}
