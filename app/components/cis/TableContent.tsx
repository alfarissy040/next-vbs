"use client"

import { useNasabahType } from "@/app/utilities/Cis"
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, SortDescriptor } from "@nextui-org/react"
import { cis_master } from "@prisma/client"
import Link from "next/link"
import { useState, useMemo } from "react"
import { MdRemoveRedEye, MdCreate } from "react-icons/md"

interface sortStateType {
    column: "nonas" | "nama" | "tipe",
    direction: "ascending" | "descending"
}

interface TableContentProps {
    dataCis: cis_master[]
    isLoading: boolean
    isError: boolean
}

const TableContent: React.FC<TableContentProps> = ({ dataCis, isLoading, isError }) => {
    const [page, setPage] = useState(1)
    const [sortState, setSortState] = useState<sortStateType>({
        column: "nonas",
        direction: "ascending"
    })
    const { getBadgeColor, getTypeName } = useNasabahType()

    const totalPage = useMemo(() => {
        return dataCis?.length ? Math.ceil(dataCis.length / 10) : 0;
    }, [dataCis.length]);

    const handleSortChange = (descriptor: SortDescriptor) => {
        setSortState({
            column: descriptor.column as "nonas" | "nama" | "tipe",
            direction: descriptor.direction as "ascending" | "descending",
        });
    };
    return (
        <Table

            aria-label="table for data cis"
            className="h-full overflow-y-auto"
            classNames={{
                wrapper: "dark:bg-slate-800 bg-slate-100",
                th: ["dark:bg-slate-900 bg-slate-300 text-slate-600 dark:text-slate-400"],
                tr: ["dark:hover:bg-slate-800 hover:bg-slate-400 transition-colors"]
            }}
            sortDescriptor={sortState}
            onSortChange={handleSortChange}
            bottomContent={
                totalPage > 0 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={totalPage}
                            onChange={(page) => setPage(page)}
                            classNames={{
                                next: "dark:bg-slate-700 dark:[&[data-hover=true]:not([data-active=true])]:bg-slate-600 bg-slate-200 [&[data-hover=true]:not([data-active=true])]:bg-slate-300",
                                prev: "dark:bg-slate-700 dark:[&[data-hover=true]:not([data-active=true])]:bg-slate-600 bg-slate-200 [&[data-hover=true]:not([data-active=true])]:bg-slate-300",
                                item: "dark:bg-slate-700 dark:[&[data-hover=true]:not([data-active=true])]:bg-slate-600 bg-slate-200 [&[data-hover=true]:not([data-active=true])]:bg-slate-300",
                            }}
                        />
                    </div>
                ) : null
            }
            isHeaderSticky
        >
            <TableHeader>
                <TableColumn key="nonas" allowsSorting>NOMOR NASABAH</TableColumn>
                <TableColumn key="nama" allowsSorting>NAMA</TableColumn>
                <TableColumn key="tipe" allowsSorting>TIPE</TableColumn>
                <TableColumn className="flex justify-center items-center" >MENU</TableColumn>
            </TableHeader>
            <TableBody
                emptyContent="Data tidak ditemukan!"
                items={dataCis}
                isLoading={isLoading}
            >
                {(item) => (
                    <TableRow key={item.no_nas}>
                        <TableCell>{item.no_nas}</TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                {item.nm_nas}
                                <span className="text-slate-400 dark:text-slate-500 text-sm">{item.no_ident}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Chip classNames={{
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
                )}
            </TableBody>
        </Table>
    )
}

export default TableContent