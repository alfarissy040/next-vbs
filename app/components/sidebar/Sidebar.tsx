'use client'

import type { navProps } from "@/app/types/sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { SiNginx } from "react-icons/si";
import ItemParameter from "./ItemParameter";
import ItemHome from "./ItemHome";
import ItemTheme from "./ItemTheme";

const Sidebar = () => {
    const [navState, setNavState] = useState<navProps>("home")

    return (
        <aside className="p-3 w-full max-w-xs bg-white shadow border-r border-slate-200 dark:bg-slate-800 dark:border-slate-600 lg:flex flex-col hidden">
            {/* title */}
            <div className="flex items-center gap-x-3">
                <SiNginx className="text-blue-500 dark:text-secondary w-10 h-10" />
                <h1 className="text-xl font-bold text-black dark:text-white">Neural Bank</h1>
            </div>
            {/* navigasi */}
            <nav className="overflow-clip mt-4 flex-1">
                <AnimatePresence>
                    {navState == "home" && (
                        <ItemHome setNavState={setNavState} />
                    )}
                    {navState == "parameter" && (
                        <ItemParameter setNavState={setNavState} />
                    )}
                    {navState == "tema" && (
                        <ItemTheme setNavState={setNavState} />
                    )}
                </AnimatePresence>
            </nav>
            <div className="px-3 py-2">
                {/* name */}
                <h3 className="font-medium">Muhammad Faza Alfarisy</h3>
                {/* role */}
                <p className="text-slate-500">Administrator</p>
            </div>
        </aside>
    )
}

export default Sidebar;