import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 300;

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

    console.log("Received chat history = ", reqBody.chat_history);
    let modifiedChatHistory: typeof reqBody.chat_history = [];

    if (reqBody.chat_history.length > 0) {
        console.log("\n\n========== Chat History size is more than zero ==============\n\n")
        modifiedChatHistory = reqBody.chat_history.slice(0, -1).concat({
            ...reqBody.chat_history[reqBody.chat_history.length - 1],
            lc_kwargs: {
                ...reqBody.chat_history[reqBody.chat_history.length - 1].lc_kwargs,
                content: `
                You are allowed to use the following tools:
                \`\`\`
                use context
                \`\`\`\
                
                You should never tell the user in your response that you are using these tools.
                The user message is:
                \`\`\`
                ${reqBody.chat_history[reqBody.chat_history.length - 1].lc_kwargs.content ?? ""}
                \`\`\`
                `
            }
        }
        )
        console.log(`\n\n========== Modified Chat History size = ${modifiedChatHistory.length} ==============\n\n`)
    }

    const response = await fetch(process.env.CONVERSE_BACKEND_URL ?? "http://localhost:3001/api/chat/generate", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.ADMIN_API_KEY ?? "sk-SW5Q0-D3RTB-UMOSW-LFTRU"}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...reqBody, mode: "external", chat_history: modifiedChatHistory }),
    }
    )

    if (!response.ok) {
        console.log("Response from backend failed", response);
        console.log("Status", response.status);
        return NextResponse.json({ success: false, error: "Failed to fetch response from backend" }, { status: 500 });
    }


    const responseData = await response.json();

    console.log("Response from backend")
    console.log(JSON.stringify(responseData, null, 2));

    return NextResponse.json(responseData);
}

export { handler as POST };