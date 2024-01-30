'use client'

import type { navProps } from "@/app/types/sidebar"
import { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { FaChevronLeft } from "react-icons/fa"
import Link from "next/link"

interface ItemParameterProps {
    setNavState: Dispatch<SetStateAction<navProps>>
}

const ItemParameter: React.FC<ItemParameterProps> = ({ setNavState }) => {
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
                <Link href={"/parameter/agama"} className="sidebar__item" >
                    <span>Parameter Agama</span>
                </Link>
            </li>
            <li>
                <Link href={"/parameter/agama"} className="sidebar__item" >
                    <span>Parameter Gelar</span>
                </Link>
            </li>
            <li>
                <Link href={"/parameter/agama"} className="sidebar__item" >
                    <span>Parameter Negara</span>
                </Link>
            </li>
            <li>
                <Link href={"/parameter/agama"} className="sidebar__item" >
                    <span>Parameter Provinsi</span>
                </Link>
            </li>
            <li>
                <Link href={"/parameter/agama"} className="sidebar__item" >
                    <span>Parameter Kota</span>
                </Link>
            </li>
            <li>
                <Link href={"/parameter/agama"} className="sidebar__item" >
                    <span>Parameter Kecamatan</span>
                </Link>
            </li>
            <li>
                <Link href={"/parameter/agama"} className="sidebar__item" >
                    <span>Parameter Kelurahan</span>
                </Link>
            </li>
        </motion.ul >
    )
}

export default ItemParameter