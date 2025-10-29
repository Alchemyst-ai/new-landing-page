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

}).and(z.record(z.string(), z.string())).transform((data) => {
  const { campaign, linkedin_profile_url, email, ...rest } = data;
  const customFields = Object.entries(rest).reduce((acc, [key, value]) => {
    acc[`csv_${key}`] = value;
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
      return NextResponse.json({ error: "Cannot process entity - fields missing. Please check the request body once again." }, { status: 422 })
    }

    const campaignAddResponse = await fetch(`https://meetalfred.com/api/integrations/webhook/add_lead_to_campaign?webhook_key=${process.env.MEET_ALFRED_API_KEY ?? ''}`, {
      body: JSON.stringify({ ...exampleRequestBody, ...campaignAddBody })
    });

    if (!campaignAddResponse.ok) {
      return NextResponse.json({}, { status: 500 })
    }
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}

export { POST };
