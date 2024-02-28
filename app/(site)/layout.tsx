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
            <div className="w-full lg:flex h-[100dvh] ">
                {/* sidebar */}
                <Sidebar />
                <Navbar />
                {/* content */}
                <main className="w-full h-auto p-3 lg:pt-3 pt-[4.25rem] overflow-y-auto bg-slate-50 dark:bg-slate-900">
                    {children}
                </main>
            </div>
        </AuthContext>
    );
}