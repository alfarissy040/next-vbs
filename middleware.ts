import { getToken } from "next-auth/jwt";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const {
        nextUrl: { origin, pathname },
    } = req;
    
    return NextResponse.next({
        headers: {
            "x-url":pathname
        }
    })
    // const apiUrl = new URL(`/api/middleware`, origin)
    // const redirectTo = (path: string) => NextResponse.redirect(new URL(path, origin));
    // const fetchRedirect = await fetch(apiUrl.href, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Cookies: req.cookies.toString()
    //     },
    //     credentials: "include",
    //     cache: "no-cache",
    //     body: JSON.stringify({pathname:pathname, cookies:req.cookies})
    // })
    // const isRedirect = await fetchRedirect.json()

    // if(!isRedirect.status) {
    // }

    // return redirectTo(isRedirect.dest)

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
