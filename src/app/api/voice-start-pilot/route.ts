// import { dbConnect } from "@/lib/dbconnect";
import { appendLeadToSheet } from "@/lib/google-sheets";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  callingAgents: z.coerce.number().int().min(1, "Number of calling agents is required"),
  acceptedTerms: z.coerce.boolean(),

  phoneCountryCode: z.string().trim().optional().default(""),
  phoneNumber: z.string().trim().optional().default(""),
  phoneE164: z.string().trim().optional().default(""),

  source: z.string().trim().optional().default(""),
}).refine((data) => data.acceptedTerms === true, {
  message: "You must agree to the T&C and Privacy Policy",
  path: ["acceptedTerms"],
}).refine((data) => {
  // phone is optional, but if provided, it must be reasonably shaped
  if (!data.phoneNumber) return true;
  return /^[0-9\s()-]{5,20}$/.test(data.phoneNumber);
}, {
  message: "Invalid mobile number",
  path: ["phoneNumber"],
});


export async function POST(request: NextRequest) {
  // await dbConnect();

  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", issues: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const userAgent = request.headers.get("user-agent") ?? "";

    // const doc = await StartPilot.create({
    //   email: data.email,
    //   callingAgents: data.callingAgents,
    //   acceptedTerms: data.acceptedTerms,

    //   phoneCountryCode: data.phoneCountryCode,
    //   phoneNumber: data.phoneNumber,
    //   phoneE164: data.phoneE164,

    //   source: data.source,
    //   meta: {
    //     userAgent,
    //   },
    // });

    // Write to Google Sheets
    await appendLeadToSheet({
      email: data.email,
      callingAgents: data.callingAgents,
      acceptedTerms: data.acceptedTerms,
      phoneCountryCode: data.phoneCountryCode,
      phoneNumber: data.phoneNumber,
      phoneE164: data.phoneE164,
      source: data.source,
      userAgent,
    });

    return NextResponse.json({ email: data.email }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
