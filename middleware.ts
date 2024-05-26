import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const excludeRoute = ["/cs"];
const route = ["/", "/login", "/cis/:path", "/parameter/:path", "/account/:path", "/cs/:path"];
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
    const redirectTo = (path: string) => NextResponse.redirect(new URL(path, origin));

    if (!isInRoute) {
        return NextResponse.next();
    }

    if (isLoginPage && token) {
        return redirectTo("/");
    }

    if (!token && !isLoginPage && !isExcludedRoute) {
        return redirectTo("/login");
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
