import { NextResponse } from "next/server";

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN!;
const USER_ID = process.env.TWITTER_USER_ID!;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.twitter.com/2/users/${USER_ID}?user.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData }, { status: res.status });
    }

    const data = await res.json();
    const followers = data.data?.public_metrics?.followers_count;

    return NextResponse.json({ followers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Twitter followers" }, { status: 500 });
  }
}
