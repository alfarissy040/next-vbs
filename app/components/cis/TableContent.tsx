"use client";

import { useNasabahType } from "@/app/utilities/Cis";
import { Chip, Pagination, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { cis_master } from "@prisma/client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { MdCreate, MdRemoveRedEye } from "react-icons/md";

interface sortStateType {
    column: "no_nas" | "nm_nas" | "type";
    direction: "ascending" | "descending";
}

interface TableContentProps {
    dataCis: {
        page: number;
        itemPerPage: number;
        totalPage: number;
        total: number;
        data?: cis_master[];
    };
    isLoading: boolean;
    isError: boolean;
    handleSort: (orderBy: TMasterSort, direction: TSortDirection) => void;
    handleChangePage: (page: number) => void;
}

// TODOS sesuaikan data dengan api hasil api

const TableContent: React.FC<TableContentProps> = ({ dataCis, isLoading, isError, handleSort, handleChangePage }) => {
    const [page, setPage] = useState((dataCis && dataCis.page) ?? 1);
    const [sortState, setSortState] = useState<sortStateType>({
        column: "no_nas",
        direction: "ascending",
    });
    const { getBadgeColor, getTypeName } = useNasabahType();

    const handleSortChange = (descriptor: SortDescriptor) => {
        setSortState({
            column: descriptor.column as TMasterSort,
            direction: descriptor.direction as TSortDirection,
        });
        handleSort(descriptor.column as TMasterSort, descriptor.direction as TSortDirection);
    };

    const handlePaginator = useCallback(
        (page: number) => {
            setPage(page);
            handleChangePage(page);
        },
        [handleChangePage]
    );
    return (
        <Table
            aria-label="table for data cis"
            classNames={{
                wrapper: "dark:bg-slate-800 bg-slate-200 overflow-auto h-[calc(100dvh-185px)] shadow-lg",
                th: ["dark:bg-slate-900 bg-slate-300 text-slate-600 dark:text-slate-400"],
                tr: ["dark:hover:bg-slate-800 hover:bg-slate-400 transition-colors"],
            }}
            sortDescriptor={sortState}
            onSortChange={handleSortChange}
            bottomContentPlacement="outside"
            bottomContent={
                dataCis?.total > 0 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showShadow
                            color="primary"
                            page={page}
                            total={dataCis?.totalPage}
                            onChange={handlePaginator}
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
                <TableColumn key="no_nas" allowsSorting>
                    NOMOR NASABAH
                </TableColumn>
                <TableColumn key="nm_nas" allowsSorting>
                    NAMA
                </TableColumn>
                <TableColumn key="type" allowsSorting>
                    TIPE
                </TableColumn>
                <TableColumn className="flex justify-center items-center">MENU</TableColumn>
            </TableHeader>
            <TableBody items={dataCis?.data ?? []} emptyContent={isError ? "Something went wrong!" : "Data tidak ditemukan!"} isLoading={isLoading} loadingContent={<Spinner size="md" />}>
                {(item) => (
                    <TableRow key={item?.no_nas}>
                        <TableCell>{item?.no_nas}</TableCell>
                        <TableCell>
                            <div className="flex flex-col">
                                {item?.nm_nas}
                                <span className="text-slate-400 dark:text-slate-500 text-sm">{item?.no_ident}</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Chip
                                size="sm"
                                variant="light"
                                classNames={{
                                    base: getBadgeColor(item?.tipe_nas),
                                    content: ["text-white"],
                                }}
                            >
                                {getTypeName(item?.tipe_nas)}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center justify-center gap-3">
                                <Tooltip content="Detail">
                                    <Link href={`/cis/${item?.no_nas}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <MdRemoveRedEye className="w-5 h-5 dark:text-slate-50 text-slate-900" />
                                    </Link>
                                </Tooltip>
                                <Tooltip content="Edit">
                                    <Link href={`/cis/${item?.no_nas}/edit`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <MdCreate className="w-5 h-5 dark:text-slate-50 text-slate-900" />
                                    </Link>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default TableContent;
