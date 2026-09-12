import { jsonError, withApiHeaders } from "@/lib/api-error";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError({
      title: "Invalid JSON",
      detail: "Request body must be valid JSON with name, email, and useCase.",
      code: "validation_failed",
      status: 422,
      resolution: "Send {name, email, company?, useCase} as application/json. See /openapi.json.",
    });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const company = typeof b.company === "string" ? b.company.trim() : "";
  const useCase = typeof b.useCase === "string" ? b.useCase.trim() : "";

  if (!name || !email || !useCase) {
    return jsonError({
      title: "Missing required fields",
      detail: "Fields required: name, email, useCase. Optional: company.",
      code: "validation_failed",
      status: 422,
      resolution: "Include name, a valid email, and useCase. See POST /api/leads in /openapi.json.",
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonError({
      title: "Invalid email",
      detail: `"${email}" is not a valid email address.`,
      code: "validation_failed",
      status: 422,
      resolution: "Provide a valid work email, e.g. you@company.com.",
    });
  }

  // Stateless acknowledgement (no PII persisted on marketing site).
  // Real ingestion happens via platform signup at /platform/signin.
  const res = NextResponse.json(
    {
      ok: true,
      message:
        "Thanks — our team replies within 2 business days. For instant access, sign up at https://getalchemystai.com/platform/signin.",
      contact: "founders@getalchemystai.com",
    },
    { status: 201 }
  );
  return withApiHeaders(res);
}

export async function GET() {
  return jsonError({
    title: "Method not allowed",
    detail: "GET is not supported on /api/leads. Use POST to create a lead.",
    code: "method_not_allowed",
    status: 405,
    resolution: "POST {name, email, useCase} as JSON. See /openapi.json operation createLead.",
  });
}
