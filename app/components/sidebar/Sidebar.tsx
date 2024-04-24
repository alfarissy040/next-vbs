'use client'

import type { navProps } from "@/app/types/sidebar";
import { Button, Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { MdArrowRight, MdNotifications } from "react-icons/md";
import { SiNginx } from "react-icons/si";
import ItemCis from "./ItemCis";
import ItemHome from "./ItemHome";
import ItemParameter from "./ItemParameter";
import ItemTheme from "./ItemTheme";

const Sidebar = () => {
    const [navState, setNavState] = useState<navProps>("home")
    const { data: dataSession } = useSession()
    return (
        <aside className="p-3 w-full max-w-xs min-h-[100dvh] bg-white shadow border-r border-slate-200 dark:bg-slate-800 dark:border-slate-600 lg:flex flex-col hidden">
            {/* title */}
            <div className="flex justify-center items-center gap-x-3">
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
            <div className="px-3 flex items gap-x-2">
                <div className="flex-1">
                    <User
                        name={dataSession?.user?.name}
                        description="Administrator"
                        classNames={{
                            description: "text-slate-500",
                        }}
                    />
                </div>
                {/* notifikasi button */}
                <Popover placement="top-start" showArrow>
                    <PopoverTrigger>
                        <Button variant="light" radius="full" size="sm" className="relative" isIconOnly>
                            {/* jika ada notif */}
                            <span className="w-2 h-2 absolute rounded-full bg-red-600 inset-1 ml-auto" />
                            <MdNotifications className="w-5 h-5 dark:text-slate-50 text-slate-900" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-slate-100 dark:bg-slate-800 border border-slate-900 w-80 rounded-lg p-1">
                        <div className="flex flex-col gap-1 w-full h-full">
                            <Link href={"#"} className="group w-full px-3 py-2 rounded-md dark:bg-slate-700 bg-slate-200 flex items-center hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                                <div className="flex-1">
                                    <h4 className="font-medium">Aktivasi Customer</h4>
                                    <p className="dark:text-slate-300 text-slate-700">Foo meminta aktivasi customer</p>
                                </div>
                                <MdArrowRight className="w-5 h-5 dark:text-white text-slate-900 opacity-0 group-hover:opacity-100 transition" />
                            </Link>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
        </aside>
    )
}

export default Sidebar;