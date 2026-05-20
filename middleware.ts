import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Deck routes stay shareable by direct URL but must not appear in search indexes.
 * `metadata.robots` is set on each pitch page; this header reinforces it for crawlers.
 */
export function middleware(_request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  matcher: ["/pitch", "/pitch/:path*", "/pitch-jp", "/pitch-jp/:path*", "/hub", "/hub/:path*"],
};
