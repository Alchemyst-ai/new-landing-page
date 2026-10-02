import { jsonError, withApiHeaders } from "@/lib/api-error";
import { matchCaseStudy } from "@/lib/assessment/caseStudyMatch";
import { saveAssessmentRow } from "@/lib/assessment/db";
import { buildAssessmentMarkdown } from "@/lib/assessment/markdown";
import { modelResultSchema, normalizeModelResult } from "@/lib/assessment/normalize";
import {
  answersByRole,
  assessmentRequestSchema,
  generateApiResponseSchema,
  ROLE_BY_FAMILIARITY,
  type CaseStudySlug,
  type GeneratedResult,
} from "@/lib/assessment/schema";
import { CASE_STUDY_BY_SLUG } from "@/lib/caseStudies";
import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, generateObject, NoObjectGeneratedError } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are Alchemyst AI's context maturity assessor. Given a respondent's role and answers, produce a personalized context maturity profile and an actionable checklist.

Scoring rubric for maturity_score (0 to 100), scoring context maturity, not general AI maturity:
- Builders: tracking rigor counts most. "Nothing whatsoever" caps near 30. "Basic logging" caps near 55. "Full scale observability" without a self-improvement loop caps near 70. A self-improvement loop plus shared context can exceed 80.
- Managers: frequent shipping drag and coordination pain score low. "Often" or "Almost always" on both caps near 40.
- Stakeholders: vague strategy state, missing first goal, RoI 0, or no fixed timeline each pull the score down. Concrete milestones and measured RoI score high.

Checklist rules:
- Return 6 to 9 items. Each title is imperative, max 70 characters. Each detail is 1 to 2 sentences, max 240 characters.
- Tie items to the context layer value props: shared context, cross agent collaboration, observability that feeds self-improvement, ROI instrumentation.
- Personalize: builders with no tracking get at least 2 observability items. Builders with self-improve No or Not sure get an instrumentation item. Managers answering Often or Almost always get coordination plus shipping bottleneck items. Stakeholders with RoI 0 get a measurement baseline item. Stakeholders with a vague timeline get a milestone item.
- Never invent Alchemyst pricing and never guarantee ROI figures.

Case study rules:
- Pick exactly one slug from: healthcare, edtech, agrotech, bfsi, real-estate, auto-retail, hr-services.
- Signals: hospital, clinic, patient, HIMS map to healthcare. Student, enrollment, coaching map to edtech. Delivery, dispatch, NDR, RTO, COD map to agrotech. Bank, loan, collections, mortgage, fraud, insurance map to bfsi. Property, buyer, CRM, channel partner map to real-estate. Dealership, DMS, vehicle, VIN map to auto-retail. Hiring, ATS, staffing, shift, onboarding map to hr-services.
- With no industry signal, default to bfsi as the broadest enterprise story.
- reason is 1 to 2 sentences, max 240 characters, linking their answers to the story. No em dashes anywhere in any field.`;

function formatAnswers(role: string, answers: Record<string, string | number>): string {
  return Object.entries(answers)
    .map(([key, value]) => `${key}: ${typeof value === "number" ? value : value || "(not answered)"}`)
    .join("\n");
}

/* ── Generation with bounded retries ──────────────────────────────────────── */

function envMs(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

/** Per attempt cap. A slow model is abandoned and the next attempt starts. */
const ATTEMPT_TIMEOUT_MS = envMs("ASSESSMENT_ATTEMPT_TIMEOUT_MS", 45_000);
/** Whole generation budget, kept well under `maxDuration`. */
const TOTAL_TIMEOUT_MS = envMs("ASSESSMENT_TOTAL_TIMEOUT_MS", 110_000);
/** Do not start an attempt with less time than this left. */
const MIN_ATTEMPT_MS = 10_000;
const MAX_ATTEMPTS = 3;
const MAX_OUTPUT_TOKENS = 6_000;

/** Recover a JSON object wrapped in prose or Markdown code fences. */
function extractJson(text: string): string | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  return start >= 0 && end > start ? candidate.slice(start, end + 1) : null;
}

type FailureKind = "timeout" | "invalid_output" | "upstream";
type Failure = { model: string; kind: FailureKind; ms: number; detail: string };

/**
 * Attempt order: OPENROUTER_MODEL, then each OPENROUTER_FALLBACK_MODELS entry
 * (comma separated). With no fallbacks the primary is retried once, which on
 * router models such as `openrouter/free` lands on a different model.
 */
function attemptModels(): string[] {
  const primary = process.env.OPENROUTER_MODEL as string;
  const fallbacks = (process.env.OPENROUTER_FALLBACK_MODELS ?? "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  const models = [primary, ...fallbacks];
  if (models.length === 1) models.push(primary);
  return models.slice(0, MAX_ATTEMPTS);
}

function classify(error: unknown, timedOut: boolean): { kind: FailureKind; detail: string } {
  if (timedOut) return { kind: "timeout", detail: "attempt timeout" };
  if (NoObjectGeneratedError.isInstance(error)) {
    const cause = error.cause instanceof Error ? `${error.cause.name}: ${error.cause.message}` : error.message;
    return { kind: "invalid_output", detail: cause.slice(0, 200) };
  }
  if (APICallError.isInstance(error)) {
    return { kind: "upstream", detail: `HTTP ${error.statusCode ?? "?"}: ${error.message.slice(0, 160)}` };
  }
  return {
    kind: "upstream",
    detail: error instanceof Error ? `${error.name}: ${error.message.slice(0, 160)}` : String(error),
  };
}

async function generateWithRetries({
  provider,
  prompt,
  requestSignal,
  fallbackSlug,
}: {
  provider: ReturnType<typeof createOpenAI>;
  prompt: string;
  requestSignal: AbortSignal;
  fallbackSlug: () => CaseStudySlug;
}): Promise<
  { ok: true; result: GeneratedResult; model: string } | { ok: false; failures: Failure[] }
> {
  const deadline = Date.now() + TOTAL_TIMEOUT_MS;
  const failures: Failure[] = [];

  for (const model of attemptModels()) {
    const remaining = deadline - Date.now();
    if (remaining < MIN_ATTEMPT_MS || requestSignal.aborted) break;

    const timer = AbortSignal.timeout(Math.min(ATTEMPT_TIMEOUT_MS, remaining));
    const started = Date.now();
    try {
      const { object, response } = await generateObject({
        model: provider.chat(model),
        system: SYSTEM_PROMPT,
        prompt,
        temperature: 0.3,
        schema: modelResultSchema,
        // A full report is ~1k tokens. Without a cap OpenRouter reserves the
        // model maximum (often 128k) and rejects low-balance keys outright.
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        maxRetries: 0,
        experimental_repairText: async ({ text }) => extractJson(text),
        abortSignal: AbortSignal.any([requestSignal, timer]),
      });
      const normalized = normalizeModelResult(object, fallbackSlug);
      if (normalized.ok) {
        console.info("[assessment] generated", {
          model,
          servedBy: response.modelId,
          ms: Date.now() - started,
          attempt: failures.length + 1,
        });
        return { ok: true, result: normalized.data, model: response.modelId || model };
      }
      failures.push({ model, kind: "invalid_output", ms: Date.now() - started, detail: normalized.issues });
    } catch (error) {
      if (requestSignal.aborted) break;
      failures.push({ model, ms: Date.now() - started, ...classify(error, timer.aborted) });
    }
    console.warn("[assessment] attempt failed", failures[failures.length - 1]);
  }

  return { ok: false, failures };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError({
      title: "Invalid JSON",
      detail: "Request body must be valid JSON matching the assessment schema.",
      code: "validation_failed",
      status: 422,
      resolution: "Send identity fields plus branch answers as application/json. See /openapi.json.",
    });
  }

  const parsed = assessmentRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError({
      title: "Invalid assessment input",
      detail: parsed.error.issues.slice(0, 3).map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(" "),
      code: "validation_failed",
      status: 422,
      resolution: "Fix the listed fields and resubmit.",
    });
  }

  const input = parsed.data;
  const role = ROLE_BY_FAMILIARITY[input.familiarity];
  const branch = answersByRole[role].safeParse(input.answers);
  if (!branch.success) {
    return jsonError({
      title: "Invalid branch answers",
      detail: branch.error.issues.slice(0, 3).map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(" "),
      code: "validation_failed",
      status: 422,
      resolution: "Complete the questions shown for your role and resubmit.",
    });
  }

  if (!process.env.OPENROUTER_API_KEY || !process.env.OPENROUTER_MODEL) {
    return jsonError({
      title: "Assessment unavailable",
      detail: "Report generation is not configured yet. Your answers were not stored.",
      code: "upstream_failed",
      status: 503,
      resolution: "Try again later or contact founders@getalchemystai.com.",
    });
  }

  try {
    const provider = createOpenAI({
      baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      name: "openrouter",
    });

    const answersText = formatAnswers(role, input.answers as Record<string, string | number>);
    const prompt = [`Role: ${role}`, `Designation: ${input.designation}`, `Answers:\n${answersText}`].join("\n\n");
    const searchable = `${input.designation}\n${answersText}`;

    const generation = await generateWithRetries({
      provider,
      prompt,
      requestSignal: request.signal,
      fallbackSlug: () => matchCaseStudy(searchable),
    });

    if (!generation.ok) {
      const timedOut = generation.failures.length > 0 && generation.failures.every((f) => f.kind === "timeout");
      return jsonError(
        timedOut
          ? {
              title: "Report generation timed out",
              detail: "The model took too long to write your report. Your answers are still in your browser.",
              code: "upstream_failed",
              status: 504,
              resolution: "Retry now. Generation usually takes under a minute.",
            }
          : {
              title: "Could not generate the report",
              detail: "The assessment service failed to produce a valid report. Nothing was stored.",
              code: "upstream_failed",
              status: 502,
              resolution: "Retry in a few seconds. If it persists, contact founders@getalchemystai.com.",
            },
      );
    }

    const object = generation.result;
    const slug = object.case_study.slug in CASE_STUDY_BY_SLUG ? object.case_study.slug : matchCaseStudy(searchable);

    const assessmentId = crypto.randomUUID();
    const model = generation.model;
    const reportMarkdown = buildAssessmentMarkdown(
      { name: input.name, designation: input.designation, linkedin: input.linkedin },
      role,
      object.profile,
      object.checklist,
      { slug, reason: object.case_study.reason },
    );

    // Persist the report without any PII. Fail open: persistence must never
    // block the response. The full report is always returned so the frontend
    // can store it in localStorage.
    let persisted = false;
    try {
      persisted = await saveAssessmentRow({
        id: assessmentId,
        role,
        answers: input.answers as Record<string, string | number>,
        profile: object.profile,
        checklist: object.checklist,
        caseStudySlug: slug,
        model,
      });
    } catch {
      persisted = false;
    }

    const payload = {
      assessmentId,
      role,
      profile: object.profile,
      checklist: object.checklist,
      case_study: { slug, reason: object.case_study.reason },
      reportMarkdown,
      persisted,
    };

    const validated = generateApiResponseSchema.safeParse(payload);
    if (!validated.success) {
      console.error("[assessment] final payload failed validation", { assessmentId, role });
      return jsonError({
        title: "Could not generate the report",
        detail: "The assessment service produced an invalid report. Nothing was stored.",
        code: "upstream_failed",
        status: 502,
        resolution: "Retry in a few seconds. If it persists, contact founders@getalchemystai.com.",
      });
    }

    const res = NextResponse.json(validated.data, {
      headers: { "Cache-Control": "no-store" },
    });
    return withApiHeaders(res);
  } catch (error) {
    console.error("[assessment] unexpected failure", {
      role,
      error: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
    });

    return jsonError({
      title: "Could not generate the report",
      detail: "The assessment service failed to produce a report. Nothing was stored.",
      code: "upstream_failed",
      status: 502,
      resolution: "Retry in a few seconds. If it persists, contact founders@getalchemystai.com.",
    });
  }
}

export async function GET() {
  return jsonError({
    title: "Method not allowed",
    detail: "GET is not supported on /api/assessment/generate. Use POST with assessment answers.",
    code: "method_not_allowed",
    status: 405,
    resolution: "POST assessment answers as JSON. See /openapi.json operation generateAssessment.",
  });
}
