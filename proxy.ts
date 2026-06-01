import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

const LOGIN_PATH = "/backstage/login";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // The login page itself is public.
  if (pathname === LOGIN_PATH) return;

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (verifySessionToken(token)) return;

  const url = request.nextUrl.clone();
  url.pathname = LOGIN_PATH;
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/backstage/:path*"],
};
