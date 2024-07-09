"use client"
import { useSession } from "next-auth/react"
import { SiNginx } from "react-icons/si"

const MainPage = () => {
    const session = useSession()
    return (
        <section className="w-full h-full flex-1 flex items-center justify-center flex-col">
            <SiNginx className="text-blue-500 dark:text-secondary md:w-28 md:h-28 w-20 h-20" />
            <h1 className="md:text-4xl text-2xl mt-5 font-bold text-black dark:text-white">Neural Bank</h1>
            <p className="text-slate-400 mt-5 w-full max-w-prose prose-sm text-center prose-slate">Neural Bank menghadirkan perbankan masa depan. Solusi finansial cerdas, efisien, dan terpersonal untuk keamanan dan privasi yang unggul. Selamat datang di Neural Bank, di mana masa depan perbankan sudah kini.</p>
        </section>
    )
}

export default MainPage