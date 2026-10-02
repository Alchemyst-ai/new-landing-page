import { jsonError, withApiHeaders } from "@/lib/api-error";
import { emailRequestSchema } from "@/lib/assessment/schema";
import { scoreBand } from "@/lib/assessment/score";
import { caseStudyPath, CASE_STUDY_BY_SLUG } from "@/lib/caseStudies";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

const SITE_URL = "https://getalchemystai.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError({
      title: "Invalid JSON",
      detail: "Request body must be valid JSON with the report payload.",
      code: "validation_failed",
      status: 422,
      resolution: "Send the generated report as application/json. See /openapi.json.",
    });
  }

  const parsed = emailRequestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError({
      title: "Invalid email request",
      detail: parsed.error.issues.slice(0, 3).map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(" "),
      code: "validation_failed",
      status: 422,
      resolution: "Generate a report first, then request delivery with a work email.",
    });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
    return jsonError({
      title: "Email delivery unavailable",
      detail: "Report delivery is not configured yet. Use copy as markdown instead.",
      code: "upstream_failed",
      status: 503,
      resolution: "Try again later or contact founders@getalchemystai.com.",
    });
  }

  const payload = parsed.data;
  const study = CASE_STUDY_BY_SLUG[payload.case_study.slug];
  if (!study) {
    return jsonError({
      title: "Invalid case study",
      detail: "The report references an unknown case study.",
      code: "validation_failed",
      status: 422,
      resolution: "Regenerate the report and try again.",
    });
  }

  const { band } = scoreBand(payload.profile.maturity_score);
  const greeting = payload.name || payload.designation || "there";
  const studyUrl = `${SITE_URL}${caseStudyPath(study.slug)}`;
  const doneCount = payload.checklist.filter((item) => payload.checked[item.id]).length;

  const checklistHtml = payload.checklist
    .map((item) => {
      const done = !!payload.checked[item.id];
      return `<li>${done ? "Done" : "To do"}: <strong>${escapeHtml(item.title)}</strong> (${item.priority}, Effort ${item.effort}, ${item.category}). ${escapeHtml(item.detail)}</li>`;
    })
    .join("");

  const html = [
    `<p>Hi ${escapeHtml(greeting)},</p>`,
    `<p>Your context assessment: <strong>${escapeHtml(payload.profile.archetype)}</strong> (${Math.round(payload.profile.maturity_score)}/100, ${band}).</p>`,
    `<p>${escapeHtml(payload.profile.summary)}</p>`,
    `<p><strong>Focus:</strong> ${escapeHtml(payload.profile.focus_theme)}</p>`,
    `<h2>Checklist (${doneCount}/${payload.checklist.length} done)</h2>`,
    `<ul>${checklistHtml}</ul>`,
    `<h2>Closest customer story</h2>`,
    `<p>${escapeHtml(study.shortLabel)} (${escapeHtml(study.industry)}): ${escapeHtml(study.h1)}</p>`,
    `<p>Why this matches: ${escapeHtml(payload.case_study.reason)}</p>`,
    `<p><a href="${studyUrl}">Read the ${escapeHtml(study.shortLabel)} story</a></p>`,
    `<p>Your tick state lives only in your browser. Revisit ${SITE_URL}/assessment to continue.</p>`,
  ].join("\n");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM as string,
      to: payload.to,
      replyTo: "founders@getalchemystai.com",
      subject: `Your Context Assessment: ${payload.profile.archetype} (${Math.round(payload.profile.maturity_score)}/100)`,
      html,
      text: payload.reportMarkdown,
    });
    if (error) throw new Error(error.message);
    const res = NextResponse.json({ ok: true, id: data?.id ?? null }, { status: 200 });
    return withApiHeaders(res);
  } catch {
    return jsonError({
      title: "Could not send the email",
      detail: "Delivery failed. Your report is safe in the browser; try again or copy it as markdown.",
      code: "upstream_failed",
      status: 502,
      resolution: "Retry in a few seconds. If it persists, contact founders@getalchemystai.com.",
    });
  }
}

export async function GET() {
  return jsonError({
    title: "Method not allowed",
    detail: "GET is not supported on /api/assessment/email. Use POST with the generated report.",
    code: "method_not_allowed",
    status: 405,
    resolution: "POST the report payload as JSON. See /openapi.json operation emailAssessment.",
  });
}
