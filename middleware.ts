import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const {
            nextUrl: { pathname, origin },
            nextauth: { token },
        } = req;
        const redirectTo = (path: string) => NextResponse.redirect(new URL(path, origin));

        return NextResponse.next();
    },
    {
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    match: ["/:path"],
};
