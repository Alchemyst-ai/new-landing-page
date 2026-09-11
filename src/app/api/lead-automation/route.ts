import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const exampleRequestBody = {
  "campaign": 1332714,
  "linkedin_profile_url": "https://www.linkedin.com/in/debayan-pradhan-b138641b4",
  "email": "debayan@getalchemystai.com",
  "csv_email": "debayan@getalchemystai.com",
  "csv_phone": "",
  "csv_name": "Debayan Pradhan",
  "csv_firstname": "Debayan",
  "csv_lastname": "",
  "csv_currentemployer": "",
  "csv_currenttitle": "Lead SDE",
  "csv_industry": "",
  "csv_location": "",
  "csv_linkedinhandle": "https://www.linkedin.com/in/debayan-pradhan-b138641b4/",
  "csv_companysize": "",
  "csv_linkedinactionprofileviewed": false,
  "csv_linkedinactionconnectrequested": false,
  "csv_linkedinactionconnected": false,
  "csv_linkedinactionfollowedup": false,
  "csv_linkedinactionmessagesent": false,
  "csv_linkedinactioninmailsent": false,
  "csv_linkedinactionuserreplied": false,
  "csv_linkedinactionalreadyinvited": false,
  "csv_linkedinactionalreadyconnected": true,
  "csv_csvfirstname": "Debayan",
  "csv_csvcompanyname": "Alchemyst AI"
}

const leadSchema = z.object({
  campaign: z.number(),
  linkedin_profile_url: z.string().optional().default(""),
  email: z.string(),
  csv_csvfirstname: z.string(),
  csv_csvcompanyname: z.string(),
  csv_currenttitle: z.string(),
  csv_linkedinhandle: z.string(),
}).and(z.record(z.string(), z.any())).transform((data) => {
  const { campaign, linkedin_profile_url, email, ...rest } = data as Record<string, unknown> & { campaign: number; linkedin_profile_url?: string; email: string };
  const customFields = Object.entries(rest).reduce((acc, [key, value]) => {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value ?? '');
    if ((key as string).startsWith('csv_')) {
      acc[key as string] = stringValue;
    } else {
      acc[`csv_${key}`] = stringValue;
    }
    return acc;
  }, {} as Record<string, string>);

  return {
    campaign,
    linkedin_profile_url,
    email,
    ...customFields
  };
});

const POST = async (req: NextRequest, ctx: { params: Promise<Record<string, any>> }) => {
  const CAMPAIGN_ID = 1332714;

  try {
    const reqBody = await req.json();
    const { data: campaignAddBody, success, error } = leadSchema.safeParse({
      ...exampleRequestBody,
      campaign: CAMPAIGN_ID,
      ...reqBody
    });

    if (!success || !!error) {
      return NextResponse.json(
        {
          type: "about:blank",
          title: "Invalid lead payload",
          status: 422,
          detail: "Cannot process entity - fields missing. Required: email, csv_csvfirstname, csv_csvcompanyname, csv_currenttitle, csv_linkedinhandle.",
          code: "validation_failed",
          resolution: "Check /openapi.json operation createLeadAutomation for the schema and retry.",
          error: "Cannot process entity - fields missing. Please check the request body once again.",
        },
        { status: 422, headers: { "Content-Type": "application/problem+json" } }
      );
    }

    const campaignAddResponse = await fetch(`https://meetalfred.com/api/integrations/webhook/add_lead_to_campaign?webhook_key=${process.env.MEET_ALFRED_API_KEY ?? ''}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...exampleRequestBody, ...campaignAddBody })
    });

    if (!campaignAddResponse.ok) {
      return NextResponse.json(
        {
          type: "about:blank",
          title: "Upstream campaign failed",
          status: 500,
          detail: `MeetAlfred responded with ${campaignAddResponse.status}.`,
          code: "upstream_failed",
          resolution: "Retry shortly, or contact founders@getalchemystai.com with the campaign ID 1332714.",
          error: `MeetAlfred responded with ${campaignAddResponse.status}.`,
        },
        { status: 500, headers: { "Content-Type": "application/problem+json" } }
      );
    }
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        type: "about:blank",
        title: "Lead automation failed",
        status: 500,
        detail: error instanceof Error ? error.message : "Unknown error",
        code: "internal_error",
        resolution: "Retry, verify JSON body per /openapi.json, or contact founders@getalchemystai.com.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500, headers: { "Content-Type": "application/problem+json" } }
    );
  }
}

export { POST };
