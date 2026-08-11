import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "./lib/auth";
import { rateLimitForPath } from "./lib/rate-limit";

const PUBLIC_API_ROUTES = new Set([
  "/api/login",
  "/api/register",
  "/api/leads",
  "/api/logout",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/webhooks/daily",
  "/api/webhooks/stripe",
]);

const AUTH_PAGES = new Set(["/login", "/register", "/forgot-password"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit sensitive public endpoints before anything else
  if (pathname.startsWith("/api/")) {
    const limited = rateLimitForPath(pathname, request);
    if (limited && !limited.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((limited.resetAt - Date.now()) / 1000)
      );
      return NextResponse.json(
        { error: "Too Many Requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
  }

  // Never run redirect logic on auth pages themselves (hard stop for loops)
  if (AUTH_PAGES.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  const isProtectedPage =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/lessons" ||
    pathname.startsWith("/lessons/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  if (isProtectedPage && !session) {
    // Guard: never redirect to the same path
    if (pathname === "/login") {
      return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/api/")) {
    if (PUBLIC_API_ROUTES.has(pathname)) {
      return NextResponse.next();
    }
    if (!session) {
      return NextResponse.json({ error: "נדרשת התחברות למערכת" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/lessons",
    "/lessons/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/api/:path*",
  ],
};
