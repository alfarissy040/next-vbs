import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AuthContext from '../context/AuthProvider'
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/sidebar/Navbar";


export default async function MainLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const session = await getServerSession(authOption)

    return (
        <AuthContext session={session}>
            <div className="w-full lg:flex min-h-[100dvh] bg-slate-50 dark:bg-slate-900">
                {/* sidebar */}
                <Sidebar />
                <Navbar />
                {/* content */}
                <main className="w-full p-3 lg:pt-3 pt-14 overflow-y-auto">
                    {children}
                </main>
            </div>
        </AuthContext>
    );
}