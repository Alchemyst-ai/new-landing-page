import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname

  if (url.startsWith('/labs')) {
    const newPath = url.replace('/labs', '') || '/'
    const target = new URL(newPath, 'https://labs.getalchemystai.com')
    target.search = request.nextUrl.search
    return NextResponse.rewrite(target)
  }
}

export const config = {
  matcher: ['/labs', '/labs/:path*', '/_next/:path*'],
}