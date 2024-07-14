import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const excludeRoute = ["/cs"];
const route = ["/", "/login", "/cis", "/parameter", "/account", "/cs"];
const levelRoute: Record<number, string[]> = {
    1: ["/parameter", "/cis/aktivasi-nasabah", "cis/permintaan-ubah"],
    99: ["/", "/login", "/cis", "/account", "/cs", "/api"]
}

export async function POST(request:NextRequest) {
    const body = await request.json()
    const pathname = body.pathname ?? ""

    const isExcludedRoute = excludeRoute.includes(pathname);
    const isLoginPage = pathname === "/login";
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const level: number = token?.level.level ?? 99
    const isAuthorized = Object.entries(levelRoute).some(([key, paths]) => {
        const levelKey = parseInt(key);
        return level <= levelKey && paths.includes(pathname);
    });
    
    if (isLoginPage && token) {
        return NextResponse.json({status:true, dest:"/"});
    }

    if (!token && !isLoginPage && !isExcludedRoute) {
        return NextResponse.json({status:true, dest:"/login"})
    }

    if (!isAuthorized) {
        return NextResponse.json({status:true, dest:"/error/403"})
    }
    
    return NextResponse.json({status:false});
}