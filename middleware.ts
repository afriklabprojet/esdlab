import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage  = pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage) {
    // Pas de session valide → login
    if (!req.auth?.user?.email) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Déjà connecté et sur login → dashboard
  if (isLoginPage && req.auth?.user?.email) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
