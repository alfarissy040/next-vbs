'use client'

import type { navProps } from "@/app/types/sidebar"
import { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { FaChevronLeft } from "react-icons/fa"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface ItemCisProps {
    setNavState: (state: navProps) => void
    handleToggle?: (val: boolean) => void
}

const ItemCis: React.FC<ItemCisProps> = ({ setNavState, handleToggle = () => { } }) => {
    const session = useSession()
    const level = session?.data?.user.level.level
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
                <span>Kembali</span>
            </li>
            <li>
                <Link href={"/cis/"} className="sidebar__item" onClick={() => handleToggle(false)}>
                    <span>Informasi Customer</span>
                </Link>
            </li>
            {level <= 2 && <li>
                <Link href={"/cis/aktivasi-nasabah"} className="sidebar__item" onClick={() => handleToggle(false)}>
                    <span>Aktivasi Customer</span>
                </Link>
            </li>}
            {level <= 2 && <li>
                <Link href={"/cis/permintaan-ubah"} className="sidebar__item" onClick={() => handleToggle(false)}>
                    <span>Persetujuan Perubahan Informasi</span>
                </Link>
            </li>}
        </motion.ul >
    )
}

export default ItemCis