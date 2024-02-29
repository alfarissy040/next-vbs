'use client'

import type { navProps } from '@/app/types/sidebar';
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, User } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { HiMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { SiNginx } from 'react-icons/si';
import ItemCis from './ItemCis';
import ItemHome from './ItemHome';
import ItemParameter from './ItemParameter';
import ItemTheme from './ItemTheme';

const Navbar = () => {
    const [navState, setNavState] = useState<navProps>("home")
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleToggle = useCallback((state: boolean) => {
        setIsMenuOpen(state)
        setNavState("home")
    }, [])
    return (
        <Nav onMenuOpenChange={handleToggle} className='lg:hidden' classNames={{
            base: "bg-blue-500 dark:bg-blue-700",
            menu: "bg-slate-900 bg-opacity-60"
        }} position='sticky'>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    icon={(isClicked) => isClicked ? (
                        <HiOutlineX className='w-6 h-6 text-white backdrop' />
                    ) : (
                        <HiMenuAlt2 className='w-6 h-6 text-white' />
                    )}
                />
                <NavbarBrand className='gap-x-3'>
                    <SiNginx className="text-secondary w-6 h-6 sm:block hidden" />
                    <h1 className="font-bold text-white ">Neural Bank</h1>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem >
                    <User
                        name="Faza"
                        description="Administrator"
                        classNames={{
                            name: "text-white",
                            description: "text-slate-300 dark:text-slate-400"
                        }}
                    />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
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
                </NavbarMenuItem>
            </NavbarMenu>
        </Nav>
        // <nav className='fixed top-0 h-auto w-full z-50'>
        //     <div className="flex lg:hidden items-center w-full px-4 py-2 bg-blue-500 shadow border-r border-slate-200 dark:bg-blue-700 dark:border-slate-600 sm:gap-x-5 gap-x-3">
        //         <Button isIconOnly variant='light' size='sm' onClick={handleToggle} >
        //             <HiMenuAlt2 className='w-6 h-6 text-white' />
        //         </Button>
        //         <div className="flex items-center gap-x-3">
        //             <SiNginx className="text-secondary w-6 h-6 sm:block hidden" />
        //             <h1 className="font-bold text-white ">Neural Bank</h1>
        //         </div>
        //         <div className="ml-auto text-right flex flex-col gap-y-0">
        //             <User
        //                 name="Faza"
        //                 description="Administrator"
        //                 classNames={{
        //                     name: "text-white",
        //                     description: "text-slate-300 dark:text-slate-400"
        //                 }}
        //             />
        //         </div>
        //     </div>
        //     <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='opaque' placement='top-center'>
        //         <ModalContent>
        //             {() => (
        //                 <>
        //                     <ModalBody >
        //                         <div className="w-full h-full shadow-md bg-slate-50 dark:bg-slate-800 px-2 py-3 lg:hidden block overflow-y-auto">
        //                             {navState == "home" && (
        //                                 <ItemHome setNavState={setNavState} />
        //                             )}
        //                             {navState == "cis" && (
        //                                 <ItemCis setNavState={setNavState} />
        //                             )}
        //                             {navState == "parameter" && (
        //                                 <ItemParameter setNavState={setNavState} />
        //                             )}
        //                             {navState == "tema" && (
        //                                 <ItemTheme setNavState={setNavState} />
        //                             )}
        //                         </div>
        //                     </ModalBody>
        //                 </>
        //             )}
        //         </ModalContent>
        //     </Modal>

        // </nav>
    )
}

export default Navbar