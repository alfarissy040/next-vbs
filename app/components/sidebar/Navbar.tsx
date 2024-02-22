'use client'

import React, { useCallback, useState } from 'react'
import { SiNginx } from 'react-icons/si'
import { HiMenuAlt2 } from "react-icons/hi";
import ItemHome from './ItemHome';
import { Button, User } from '@nextui-org/react';
import { AnimatePresence } from "framer-motion"
import type { navProps } from '@/app/types/sidebar';
import ItemParameter from './ItemParameter';
import ItemTheme from './ItemTheme';
import ItemCis from './ItemCis';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [navState, setNavState] = useState<navProps>("home")

    const handleToggle = useCallback(() => {
        setIsOpen(!isOpen)
        setNavState("home")
    }, [isOpen])
    return (
        <nav className='fixed top-0 h-auto w-full'>
            <div className="flex lg:hidden items-center w-full px-4 py-2 bg-blue-500 shadow border-r border-slate-200 dark:bg-blue-700 dark:border-slate-600 sm:gap-x-5 gap-x-3">
                <Button isIconOnly variant='light' size='sm' onClick={handleToggle} >
                    <HiMenuAlt2 className='w-6 h-6 text-white' />
                </Button>
                <div className="flex items-center gap-x-3">
                    <SiNginx className="text-secondary w-6 h-6 sm:block hidden" />
                    <h1 className="font-bold text-white ">Neural Bank</h1>
                </div>
                <div className="ml-auto text-right flex flex-col gap-y-0">
                    <User
                        name="Faza"
                        description="Administrator"
                        classNames={{
                            name: "text-white",
                            description: "text-slate-300 dark:text-slate-400"
                        }}
                    />
                    {/* <h2 className="text-white text-sm">Faza</h2>
                    <span className="text-slate-300 dark:text-slate-400 text-xs">Administrator</span> */}
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <div className="w-full h-full shadow-md bg-slate-50 dark:bg-slate-800 px-2 py-3 lg:hidden block overflow-y-auto">
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
                    </div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar