import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";

const MAINT_COOKIE = "__maint";

const ALWAYS_ALLOW = [
  "/maintenance",
  "/api/auth",
  "/api/admin/maintenance",
  "/_next",
  "/favicon",
  "/images",
  "/videos",
  "/icons",
  "/fonts",
];

function isAlwaysAllowed(pathname: string): boolean {
  return ALWAYS_ALLOW.some((prefix) => pathname.startsWith(prefix));
}

export default auth((req: NextAuthRequest) => {
  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // ── Admin route protection ────────────────────────────────────────────────
  if (isAdminRoute && !isLoginPage) {
    if (!req.auth?.user?.email) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isLoginPage && req.auth?.user?.email) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // ── Maintenance mode ──────────────────────────────────────────────────────
  const maintenanceActive = req.cookies.get(MAINT_COOKIE)?.value === "1";

  if (maintenanceActive && !isAlwaysAllowed(pathname)) {
    const isAuthenticated = !!req.auth?.user?.email;
    if (isAuthenticated) {
      const res = NextResponse.next();
      res.headers.set("x-maintenance-bypass", "1");
      return res;
    }
    const url = req.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)).*)",
  ],
};
