import { dbConnect } from "@/lib/dbconnect";
import { google } from "googleapis";
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

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function appendToGoogleSheet(data: {
  email: string;
  callingAgents: number;
  acceptedTerms: boolean;
  phoneCountryCode: string;
  phoneNumber: string;
  phoneE164: string;
  source: string;
  userAgent: string;
}) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = "Sheet1!A:H";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.email,
          data.callingAgents,
          data.acceptedTerms,
          data.phoneCountryCode,
          data.phoneNumber,
          data.phoneE164,
          data.source,
          data.userAgent,
          new Date().toISOString(),
        ],
      ],
    },
  });
}

export async function POST(request: NextRequest) {
  await dbConnect();

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
    await appendToGoogleSheet({
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


