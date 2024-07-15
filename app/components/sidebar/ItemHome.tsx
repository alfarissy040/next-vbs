"use client"

import { navProps } from "@/app/types/sidebar";
import { usePrefetchNavigate } from "@/app/utilities";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface ItemHomeProps {
    setNavState: (state: navProps) => void
}

const ItemHome: React.FC<ItemHomeProps> = ({ setNavState }) => {
    const { theme } = useTheme()
    const navigateTo = usePrefetchNavigate()
    const session = useSession()
    const level = session?.data?.user.level.level

    const handleSignOut = () => {
        signOut().then((item) => {
            console.log(item)
            navigateTo("/login")
        })
    }
    return (
        <motion.ul
            initial={{ translateX: '-100%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '-100%' }}
            transition={{
                ease: "easeInOut",
                bounce: 0,
                duration: 0.2
            }}
            layout
        >
            <h3 className="text-medium text-slate-400 px-2">Menu</h3>
            <li className="sidebar__item justify-between" onClick={() => setNavState("cis")}>
                <span>Customer Service</span>
                <FaChevronRight className="w-3 h-3 text-slate-400" />
            </li>
            {level <= 2 && <li>
                <Link href={"/users"} className="sidebar__item">
                    Users Pemakai
                </Link>
            </li>}
            {level === 1 && <li className="sidebar__item justify-between" onClick={() => setNavState("parameter")}>
                <span>Parameter</span>
                <FaChevronRight className="w-3 h-3 text-slate-400" />
            </li>}
            <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-700 my-1" />
            <h3 className="text-medium text-slate-400 px-2">Settings</h3>
            <li>
                <Link href={"/account"} className="sidebar__item">
                    Akun
                </Link>
            </li>
            <li className="sidebar__item justify-between" onClick={() => setNavState("tema")}>
                <p>
                    Tema: <span className="text-slate-400">{theme === "dark" ? "Gelap" : theme === "light" ? "Terang" : "Sistem"}</span>
                </p>
                <FaChevronRight className="w-3 h-3 text-slate-400" />
            </li>
            <button className="sidebar__item w-full" onClick={handleSignOut}>
                Logout
            </button>
        </motion.ul>
    )
}

export default ItemHome