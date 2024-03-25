import Navbar from "../components/sidebar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";


export default function MainLayout({
    children
}: {
    children: React.ReactNode,
}) {

    return (
        <div className="w-full flex flex-col lg:flex-row h-[100dvh] ">
            {/* sidebar */}
            <Sidebar />
            <Navbar />
            {/* content */}
            <main className="w-full h-full flex-1 p-3 overflow-y-auto bg-slate-50 dark:bg-slate-900 flex flex-col">
                {children}
            </main>
        </div>
    );
}