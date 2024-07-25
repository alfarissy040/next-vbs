'use client'

import type { navProps } from '@/app/types/sidebar';
import { Button, Link, Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Popover, PopoverContent, PopoverTrigger, ScrollShadow, User } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { HiMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { SiNginx } from 'react-icons/si';
import ItemCis from './ItemCis';
import ItemHome from './ItemHome';
import ItemParameter from './ItemParameter';
import ItemTheme from './ItemTheme';
import { useSession } from 'next-auth/react';
import { MdNotifications, MdArrowRight } from 'react-icons/md';

const Navbar = () => {
    const [navState, setNavState] = useState<navProps>("home")
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: dataSession } = useSession()

    const handleToggle = useCallback((state: boolean) => {
        setIsMenuOpen(state)
        setNavState("home")
    }, [])
    const handleNavigate = useCallback((state: navProps) => {
        setNavState(state)
        setIsMenuOpen(false)
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
                <NavbarItem className='flex items-center gap-1'>
                    <User
                        name={dataSession?.user?.name}
                        description="Administrator"
                        avatarProps={{
                            classNames: {
                                base: "hidden sm:block"
                            }
                        }}
                        classNames={{
                            name: "text-white",
                            description: "text-slate-200 dark:text-slate-300"
                        }}
                    />
                    {/* notifikasi button */}
                    <Popover placement="bottom-end" className='hidden' showArrow>
                        <PopoverTrigger>
                            <Button variant="light" radius="full" size="sm" className="relative" isIconOnly>
                                {/* jika ada notif */}
                                <span className="w-2 h-2 absolute rounded-full bg-red-600 inset-1 ml-auto" />
                                <MdNotifications className="w-5 h-5 text-slate-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-slate-100 dark:bg-slate-800 border border-slate-900 w-80 rounded-lg p-1">
                            <h3 className="font-medium text-lg px-3 py-2 w-full text-start">Notifikasi</h3>
                            <ScrollShadow className="flex flex-col gap-1 w-full h-auto max-h-[80dvh] overflow-y-auto scrollbar-hide">
                                {[...Array(25)].map((_, i) => <Link key={i} href={"#"} className="group w-full px-3 py-2 rounded-md dark:bg-slate-700 bg-slate-200 flex items-center hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                                    <div className="flex-1">
                                        <h4 className="font-medium sm:text-base text-sm dark:text-white text-blue-600">Aktivasi Customer {i + 1}</h4>
                                        <p className="dark:text-slate-300 text-slate-700 sm:text-base text-sm">Foo meminta aktivasi customer</p>
                                    </div>
                                    <MdArrowRight className="w-5 h-5 dark:text-white text-slate-900 opacity-0 group-hover:opacity-100 transition" />
                                </Link>)}
                            </ScrollShadow >
                        </PopoverContent>
                    </Popover>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className='navbar'>
                <NavbarMenuItem>
                    {navState == "home" && (
                        <ItemHome setNavState={setNavState} />
                    )}
                    {navState == "cis" && (
                        <ItemCis setNavState={handleNavigate} handleToggle={handleToggle} />
                    )}
                    {/* {navState == "parameter" && (
                        <ItemParameter setNavState={handleNavigate} handleToggle={handleToggle} />
                    )} */}
                    {navState == "tema" && (
                        <ItemTheme setNavState={setNavState} />
                    )}
                </NavbarMenuItem>
            </NavbarMenu>
        </Nav>
    )
}

export default Navbar