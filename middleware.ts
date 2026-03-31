import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { LocalSession } from "@/lib/types/auth";

const SESSION_COOKIE = "kt_session";

const PUBLIC_ONLY_ROUTES = ["/", "/about", "/faq", "/sign-in", "/sign-up"];

const AUTH_REQUIRED_ROUTES = ["/complete-profile", "/user", "/admin"];

const PROFILE_REQUIRED_ROUTES = ["/user"];

const ADMIN_ONLY_ROUTES = ["/admin"];

function getSession(request: NextRequest): LocalSession | null {
    const cookie = request.cookies.get(SESSION_COOKIE);
    if (!cookie?.value) return null;

    try {
        return JSON.parse(decodeURIComponent(cookie.value)) as LocalSession;
    } catch {
        return null;
    }
}

function redirectTo(path: string, request: NextRequest): NextResponse {
    return NextResponse.redirect(new URL(path, request.url));
}

export function middleware(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl;
    const session = getSession(request);

    const isAuthenticated = session !== null;
    const isAdmin = session?.role === "admin";

    const isProfileComplete = isAuthenticated;

    const isPublicOnly = PUBLIC_ONLY_ROUTES.includes(pathname);
    const isAuthRequired = AUTH_REQUIRED_ROUTES.some((r) => pathname.startsWith(r));
    const isProfileRequired = PROFILE_REQUIRED_ROUTES.some((r) => pathname.startsWith(r));
    const isAdminOnly = ADMIN_ONLY_ROUTES.some((r) => pathname.startsWith(r));

    if (isPublicOnly && isAuthenticated){
        if (isAdmin) return redirectTo("/admin", request);
        if (isProfileComplete) return redirectTo("/user", request);
        return redirectTo("/complete-profile", request);
    }

    if (isAuthRequired && !isAuthenticated){
        return redirectTo("/", request);
    }

    if (isAuthRequired && isAuthenticated){
        if (isProfileRequired && !isProfileComplete){
            return redirectTo("/complete-profile", request);
        }

        if (pathname === "/complete-profile" && (isProfileComplete || isAdmin)){
            return redirectTo(isAdmin ? "/admin" : "/user", request);
        }

        if (isAdminOnly && !isAdmin){
            return redirectTo("/user", request);
        }

        if (isAdmin && pathname.startsWith("/user")){
            return redirectTo("/admin", request);
        }
    }

  return NextResponse.next();
}

// ─── Matcher ──────────────────────────────────────────────────────────────────

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};