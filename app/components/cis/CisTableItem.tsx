"use client"

import { useNasabahType } from "@/app/utilities/Cis"
import { Chip, TableCell, TableRow, Tooltip } from "@nextui-org/react"
import { cis_master } from "@prisma/client"
import Link from "next/link"
import { MdCreate, MdRemoveRedEye } from "react-icons/md"


const CisTableItem = ({ item }: { item: cis_master }) => {
    const { getBadgeColor, getTypeName } = useNasabahType()
    return (
        <TableRow key={item.no_nas}>
            <TableCell>{item.no_nas}</TableCell>
            <TableCell>
                <div className="flex flex-col">
                    {item.nm_nas}
                    <span className="text-slate-400 dark:text-slate-500 text-sm">{item.no_ident}</span>
                </div>
            </TableCell>
            <TableCell>
                <Chip
                    size="sm"
                    variant="light"
                    classNames={{
                        base: getBadgeColor(item.jns_ident),
                        content: ["text-white"]
                    }}>
                    {getTypeName(item.jns_ident)}
                </Chip>
            </TableCell>
            <TableCell>
                <div className="flex items-center justify-center gap-3">
                    <Tooltip content="Detail">
                        <Link href={`/cis/${item.no_nas}/detail`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <MdRemoveRedEye className="w-5 h-5 dark:text-slate-50 text-slate-900" />
                        </Link>
                    </Tooltip>
                    <Tooltip content="Edit">
                        <Link href={`/cis/${item.no_nas}/edit`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <MdCreate className="w-5 h-5 dark:text-slate-50 text-slate-900" />
                        </Link>
                    </Tooltip>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default CisTableItem