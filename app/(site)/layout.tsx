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
            <div className="w-full flex flex-col lg:flex-row h-[100dvh] ">
                {/* sidebar */}
                <Sidebar />
                <Navbar />
                {/* content */}
                <main className="w-full h-full flex-1 p-3 overflow-y-auto bg-slate-50 dark:bg-slate-900 flex flex-col">
                    {children}
                </main>
            </div>
        </AuthContext>
    );
}