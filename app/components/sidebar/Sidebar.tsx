'use client'

import type { navProps } from "@/app/types/sidebar";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SiNginx } from "react-icons/si";
import ItemParameter from "./ItemParameter";
import ItemHome from "./ItemHome";
import ItemTheme from "./ItemTheme";
import ItemCis from "./ItemCis";
import { User } from "@nextui-org/react";

const Sidebar = () => {
    const [navState, setNavState] = useState<navProps>("home")

    return (
        <aside className="p-3 w-full max-w-xs min-h-[100dvh] bg-white shadow border-r border-slate-200 dark:bg-slate-800 dark:border-slate-600 lg:flex flex-col hidden">
            {/* title */}
            <div className="flex items-center gap-x-3">
                <SiNginx className="text-blue-500 dark:text-secondary w-10 h-10" />
                <h1 className="text-xl font-bold text-black dark:text-white">Neural Bank</h1>
            </div>
            {/* navigasi */}
            <nav className="overflow-clip mt-4 flex-1 overflow-y-auto">
                <AnimatePresence>
                    {navState == "home" && (
                        <ItemHome setNavState={setNavState} />
                    )}
                    {navState == "cis" && (
                        <ItemCis setNavState={setNavState} />
                    )}
                    {navState == "parameter" && (
                        <ItemParameter setNavState={setNavState} />
                    )}
                    {navState == "tema" && (
                        <ItemTheme setNavState={setNavState} />
                    )}
                </AnimatePresence>
            </nav>
            <div className="px-3">
                <User
                    name="Faza"
                    description="Administrator"
                    classNames={{
                        description: "text-slate-500"
                    }}
                />
                {/* name */}
                {/* <h3 className="font-medium">Muhammad Faza Alfarisy</h3> */}
                {/* role */}
                {/* <p className="text-slate-500">Administrator</p> */}
            </div>
        </aside>
    )
}

export default Sidebar;