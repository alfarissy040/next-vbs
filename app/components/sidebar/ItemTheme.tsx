'use client'

import type { navProps } from "@/app/types/sidebar"
import { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { FaCheck, FaChevronLeft } from "react-icons/fa"
import { useTheme } from "next-themes"

interface ItemThemeProps {
    setNavState: Dispatch<SetStateAction<navProps>>
}

const ItemTheme: React.FC<ItemThemeProps> = ({ setNavState }) => {
    const { theme, setTheme } = useTheme()
    return (
        <motion.ul
            initial={{ translateX: '100%' }}
            exit={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            transition={{
                ease: "easeInOut",
                duration: 0.2
            }}
            layout
        >
            <li className="sidebar__item gap-x-3" onClick={() => setNavState("home")}>
                <FaChevronLeft className="w-3 h-3 text-zinc-400" />
                <span className="font-medium">Tema</span>
            </li>
            <li className="sidebar__item justify-between" onClick={() => setTheme("light")}>
                <span>Terang</span>
                {theme === "light" && <FaCheck className="w-3 h-3 dark:text-slate-400 text-slate-50" />}
            </li>
            <li className="sidebar__item justify-between" onClick={() => setTheme("dark")}>
                <span>Gelap</span>
                {theme === "dark" && <FaCheck className="w-3 h-3 dark:text-slate-400 text-slate-50" />}
            </li>
            <li className="sidebar__item justify-between" onClick={() => setTheme("system")}>
                <span>Sistem</span>
                {theme === "system" && <FaCheck className="w-3 h-3 dark:text-slate-400 text-slate-50" />}
            </li>
        </motion.ul>
    )
}

export default ItemTheme