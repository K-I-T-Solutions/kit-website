import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  res.headers.set(
    "Content-Security-Policy",
    `
      default-src 'self';
      img-src 'self' data: blob:;
      script-src 'self' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      font-src 'self';
      connect-src 'self' https://vitals.vercel-insights.com;
      frame-ancestors 'none';
    `
      .replace(/\n/g, " ")
      .trim()
  )

  return res
}

export const config = {
  matcher: "/:path*",
}
