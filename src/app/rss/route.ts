import { NextResponse } from 'next/server';
import { generateRSSFeed } from '@/lib/rss';

export async function GET() {
    const rss = await generateRSSFeed();
    return new NextResponse(rss, {
        headers: { 'Content-Type': 'application/rss+xml' },
    });
}
