'use client'

import type { navProps } from "@/app/types/sidebar"
import { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { FaChevronLeft } from "react-icons/fa"

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
            <li className="sidebar__item justify-between">
                <span>Parameter B</span>
            </li>
        </motion.ul >
    )
}

export default ItemParameter