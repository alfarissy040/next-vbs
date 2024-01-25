'use client'

import React, { useCallback, useState } from 'react'
import { SiNginx } from 'react-icons/si'
import { HiMenuAlt2 } from "react-icons/hi";
import ItemHome from './ItemHome';
import { Button } from '@nextui-org/react';
import { AnimatePresence } from "framer-motion"
import type { navProps } from '@/app/types/sidebar';
import ItemParameter from './ItemParameter';
import ItemTheme from './ItemTheme';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [navState, setNavState] = useState<navProps>("home")

    const handleToggle = useCallback(() => {
        setIsOpen(!isOpen)
        setNavState("home")
    }, [isOpen])
    return (
        <nav className='fixed top-0 h-auto w-full'>
            <div className="flex lg:hidden items-center w-full px-4 py-3 bg-blue-500 shadow border-r border-slate-200 dark:bg-blue-700 dark:border-slate-600">
                <Button isIconOnly variant='light' size='sm' onClick={handleToggle} >
                    <HiMenuAlt2 className='w-6 h-6 text-white' />
                </Button>
                <div className="flex items-center gap-x-3 mx-auto">
                    <SiNginx className="text-secondary w-6 h-6" />
                    <h1 className=" font-bold text-white">Neural Bank</h1>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <div className="w-full h-full shadow-md bg-slate-50 dark:bg-slate-800 px-2 py-3 lg:hidden block">
                        {navState == "home" && (
                            <ItemHome setNavState={setNavState} />
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