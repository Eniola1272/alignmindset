import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const SESSION_TOKEN_COOKIE = "align_pb_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function middleware(request: NextRequest) {
  const existingToken = request.cookies.get(SESSION_TOKEN_COOKIE)?.value;

  if (existingToken && existingToken.length >= 32) {
    return NextResponse.next();
  }

  const newToken = generateToken();

  // Forward cookie in the request headers so Server Components can read it immediately
  const requestHeaders = new Headers(request.headers);
  const currentCookie = requestHeaders.get("cookie") || "";
  const cookieEntry = `${SESSION_TOKEN_COOKIE}=${newToken}`;
  requestHeaders.set("cookie", currentCookie ? `${currentCookie}; ${cookieEntry}` : cookieEntry);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  // Set the cookie on the response so the browser persists it
  response.cookies.set({
    name: SESSION_TOKEN_COOKIE,
    value: newToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE
  });

  return response;
}

export const config = {
  matcher: [
    "/progress-builder/:path*",
    "/dashboard/progress-plan/:path*",
    "/api/progress-builder/:path*"
  ]
};

