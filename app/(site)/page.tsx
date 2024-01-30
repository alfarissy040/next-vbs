"use client"
import { useSession } from "next-auth/react"
import { SiNginx } from "react-icons/si"

const MainPage = () => {
    const session = useSession()
    console.log(session)
    return (
        <section className="w-full h-full flex items-center justify-center flex-col">
            <SiNginx className="text-blue-500 dark:text-secondary w-28 h-28" />
            <h1 className="text-4xl mt-5 font-bold text-black dark:text-white">Neural Bank</h1>
            <p className="text-slate-400 mt-5 w-full max-w-prose prose-sm text-center prose-slate">Neural Bank menghadirkan perbankan masa depan. Solusi finansial cerdas, efisien, dan terpersonal untuk keamanan dan privasi yang unggul. Selamat datang di Neural Bank, di mana masa depan perbankan sudah kini.</p>
        </section>
    )
}

export default MainPage