import moment from "moment";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

const excludeRoute = ["/cs"];
const route = ["/", "/login", "/cis", "/parameter", "/account", "/cs"];
const levelRoute: Record<number, string[]> = {
    1: ["/parameter", "/cis/aktivasi-nasabah", "cis/permintaan-ubah"],
    99: ["/", "/login", "/cis", "/account", "/cs", "/api"]
}
export default async function middleware(req: NextRequest) {
    const {
        nextUrl: { origin, pathname },
    } = req;
    const isExcludedRoute = excludeRoute.includes(pathname);
    const isInRoute = route.includes(pathname);
    const isLoginPage = pathname === "/login";
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const isExpired = (token?.exp as number) * 1000
    console.log("middleware: ", isExpired)
    console.log(moment(token?.exp ?? 0).format("YYYY-MM-DD HH:mm:ss"))
    const level: number = token?.level.level ?? 99
    const isAuthorized = Object.entries(levelRoute).some(([key, paths]) => {
        const levelKey = parseInt(key);
        return level <= levelKey && paths.includes(pathname);
    });
    const redirectTo = (path: string) => NextResponse.redirect(new URL(path, origin));

    if (!isInRoute) {
        return NextResponse.next();
    }

    if (isLoginPage && token) {
        return redirectTo("/");
    }

    if (!token && !isLoginPage && !isExcludedRoute) {
        signOut();
        return redirectTo("/login");
    }

    if (!isAuthorized) {
        return redirectTo("/error/403");
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },

        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            has: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },

        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            has: [{ type: "header", key: "x-present" }],
            missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
        },
        "/",
        "/login",
        "/cis/:path",
        "/parameter/:path",
        "/account/:path",
        "/cs/:path",
    ],
};
