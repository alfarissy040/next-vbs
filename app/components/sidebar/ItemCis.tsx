'use client'

import type { navProps } from "@/app/types/sidebar"
import { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { FaChevronLeft } from "react-icons/fa"
import Link from "next/link"

interface ItemCisProps {
    setNavState: Dispatch<SetStateAction<navProps>>
}

const ItemCis: React.FC<ItemCisProps> = ({ setNavState }) => {
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
                <Link href={"/cis/"} className="sidebar__item">
                    <span>Informasi Customer</span>
                </Link>
            </li>
            <li>
                <Link href={"/cis/persetujuan-perubahan"} className="sidebar__item">
                    <span>Persetujuan Perubahan Informasi</span>
                </Link>
            </li>
            <li>
                <Link href={"/cis/aktivasi"} className="sidebar__item">
                    <span>Aktivasi Customer</span>
                </Link>
            </li>
        </motion.ul >
    )
}

export default ItemCis