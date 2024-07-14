import { authOption } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { Suspense } from "react"
import MainLoading from "../components/MainLoading"
import { redirect } from "next/navigation"
import toast from "react-hot-toast"
import { headers } from 'next/headers';


const levelRoute: Record<number, string[]> = {
    1: ["/parameter", "/cis/aktivasi-nasabah", "cis/permintaan-ubah", "/users"],
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
        const levelKey = parseInt(key);
        return level <= levelKey && paths.includes(pathname);
    });

    if(!session) {
        return redirect("/login")
    }
    if (!isAuthorized) {
        toast.error("Unauthorized action!")
        return redirect("/")
    }
  return (
    <Suspense fallback={<MainLoading />}>
        {children}
    </Suspense>
  )
}

export default AuthMiddleware