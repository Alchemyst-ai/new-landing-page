import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export interface LeadData {
    email: string;
    callingAgents: number;
    acceptedTerms: boolean;
    phoneCountryCode: string;
    phoneNumber: string;
    phoneE164: string;
    source: string;
    userAgent: string;
}

export async function appendLeadToSheet(data: LeadData) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Leads!A:I"; // A to I for 9 columns

    if (!spreadsheetId) {
        console.error("GOOGLE_SHEET_ID is not defined in environment variables.");
        return;
    }

    try {
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
    } catch (error) {
        console.error("Error appending to Google Sheet:", error);
        throw error;
    }
}
