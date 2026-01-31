import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip if already in /docs, static files, or API routes
  if (
    pathname.startsWith('/docs') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  // Check if this is a middleware check request (prevent infinite loop)
  if (request.headers.get('x-middleware-check')) {
    return NextResponse.next();
  }

  // First, check if the original path exists
  try {
    const originalResponse = await fetch(new URL(pathname, request.url), {
      method: 'HEAD',
      headers: { 'x-middleware-check': '1' },
    });

    // If original path exists, don't redirect
    if (originalResponse.ok) {
      return NextResponse.next();
    }
  } catch {
    // Original path doesn't exist, continue to check docs
  }

  // Original path doesn't exist, check if /docs version exists
  const docsPath = `/docs${pathname}`;
  const docsUrl = new URL(docsPath, request.url);

  try {
    const docsResponse = await fetch(docsUrl, {
      method: 'HEAD',
      headers: { 'x-middleware-check': '1' },
    });

    if (docsResponse.ok) {
      return NextResponse.redirect(docsUrl);
    }
  } catch {
    // Docs path doesn't exist, continue to 404
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};