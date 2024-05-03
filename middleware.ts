import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const excludeRoute = ["/cs"]
const route = [
    "/",
    "/login",
    "/cis/:path",
    "/parameter/:path",
    "/account/:path",
    "/cs/:path",
]
export default async function middleware(req: NextRequest) {
    const { nextUrl: { origin, pathname } } = req
    const isExcludedRoute = excludeRoute.includes(pathname)
    const isInRoute = route.includes(pathname)
    const isLoginPage = pathname === "/login"
    const token = await getToken({
        req: req,
        secret: process.env.NEXTAUTH_SECRET
    });
    const redirectTo = (path: string) => NextResponse.redirect(new URL(path, origin));

    if (!isInRoute) {
        return NextResponse.next()
    }

    if (isLoginPage && token) {
        return redirectTo("/")
    }

    if (!token && !isLoginPage && !isExcludedRoute) {
        return redirectTo("/login")
    }
}

export const config = {
    match: [...route],
};
