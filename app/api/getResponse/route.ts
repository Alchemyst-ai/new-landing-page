import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
    chatHistory: z.array(z.record(z.any())).optional().default([]),
    chatId: z.string().optional().nullable(),
});

const handler = async (req: NextRequest, { params }: any) => {
    const reqBody = await req.json();
    // const { data, success, error } = requestSchema.safeParse(reqBody);

    // if (!data || !success) {
    //     console.log("Error parsing request body", error);
    //     return NextResponse.json({ success: false, error: error }, { status: 400 });
    // }

    console.log("Request body", JSON.stringify(reqBody, null, 2));
    // const { chatHistory: chat_history, chatId } = data;

    const response = await fetch(process.env.CONVERSE_BACKEND_URL ?? "http://localhost:3001/api/chat/generate", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.ADMIN_API_KEY ?? "sk-SW5Q0-D3RTB-UMOSW-LFTRU"}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
    }
    )

    if (!response.ok) {
        console.log("Response from backend failed", response);
        console.log("Status", response.status);
        return NextResponse.json({ success: false, error: "Failed to fetch response from backend" }, { status: 500 });
    }


    const responseData = await response.json();

    return NextResponse.json(responseData);
}

export { handler as POST };