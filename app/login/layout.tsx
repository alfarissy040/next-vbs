import { authOption } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import MainLoading from "../components/MainLoading"

interface layoutProps {
    children: React.ReactNode
}

export async function generateMetadata(
) {
    return {
        title: "Login",
    }
}

const LoginLayout: React.FC<layoutProps> = async ({ children }) => {
    const session = await getServerSession(authOption)

    if(session) {
        return redirect("/")
    }
    return (
        <Suspense fallback={<MainLoading />}>
            {children}
        </Suspense>
    )
}

export default LoginLayout