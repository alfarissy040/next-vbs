import { authOption } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { headers } from 'next/headers'
import { redirect, RedirectType } from "next/navigation"
import { Suspense } from "react"


const levelRoute: Record<number, string[]> = {
    1: ["/parameter", "/cis/aktivasi-nasabah", "cis/permintaan-ubah", "/users", "/users/create", "/users/:path"],
    99: ["/", "/login", "/cis", "/account", "/cs", "/api"]
}

const AuthMiddleware = async ({
    children
}: {
    children: React.ReactNode,
}) => {
    const headersList = headers();
    const pathname = headersList.get('x-url') ?? "";
    const session = await getServerSession(authOption)
    const level: number = session?.user.level.level ?? 99
    const isAuthorized = Object.entries(levelRoute).some(([key, paths]) => {
        const isInPath = paths.includes(pathname)
        const levelKey = parseInt(key);

        if (!isInPath) {
            const isDynamicPath = paths.some((item) => {
                const splitedItem = item.split("/").filter((item) => item !== "");
                return splitedItem.includes(":path")
            });
            if (isDynamicPath) {
                return level <= levelKey
            }
        }

        return level <= levelKey && isInPath;
    });

    if (!session) {
        return redirect("/login", RedirectType.push)
    }
    if (!isAuthorized && pathname !== "/") {
        return redirect("/", RedirectType.push)
    }
    return (
        <Suspense fallback={"Loading..."}>
            {children}
        </Suspense>
    )
}

export default AuthMiddleware