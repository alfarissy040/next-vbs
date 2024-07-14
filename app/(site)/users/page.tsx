"use client"

import { IPaginateData } from "@/app/types/parameter";
import { flatQueryParams, usePrefetchNavigate } from "@/app/utilities";
import { fetcher } from "@/app/utilities/Fetcher";
import { BreadcrumbItem, Breadcrumbs, Button, Pagination, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { extendAksPemakai } from "@prisma/client";
import { isEmpty } from "lodash";
import { JWT } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import useSWR from "swr";

const UsersPage = () => {
    const session = useSession()
    const queryParams = useSearchParams();
    const navigateTo = usePrefetchNavigate()
    const [sortState, setSortState] = useState<SortDescriptor>({
        column: queryParams.get("orderby") ?? "nama",
        direction: queryParams.get("direction") === "asc" ? "ascending" : "descending",
    });
    const [qParams, setQParams] = useState({
        page:1,
        orderBy: sortState.column,
        direction: sortState.direction === "ascending" ? "asc" : "desc",
    })
    const handleSortChange = (sortDescriptor: SortDescriptor) => {
        const orderByParam = sortDescriptor.column?.toString() ?? "";
        const directionParam = sortDescriptor.direction === "ascending" ? "asc" : "desc";
        setSortState(sortDescriptor);
        setQParams((prev) => ({
            ...prev,
            orderBy: orderByParam,
            direction: directionParam,
        }))
    };

    const {data, isLoading:isLoadingData, error:isErrorData} = useSWR<IPaginateData<extendAksPemakai>>(`/api/users?${flatQueryParams(qParams)}`, fetcher)
    const handlePaginator = useCallback(
        (page: number) => {
            setQParams({
                ...qParams,
                page: page,
            });
        },
        [qParams, setQParams]
    );
  return (
    <section className="w-full h-full flex flex-col">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold">User Pemakai</h1>
                <div className="flex items-center justify-between">
                <Breadcrumbs
                    size="lg"
                    variant="solid"
                    classNames={{
                        list: "dark:bg-slate-800 bg-slate-200",
                    }}
                >
                    <BreadcrumbItem
                        classNames={{
                            item: "text-slate-500 dark:text-slate-400",
                        }}
                    >
                        <Link href="/users">User Pemakai</Link>
                    </BreadcrumbItem>
                </Breadcrumbs>
                <Button color="primary" onPress={() => navigateTo("/users/create")}>Tambah User</Button>
                </div>
            </div>
            <Table
                className="flex-1"
                classNames={{
                    wrapper: "dark:bg-slate-800 bg-slate-200 overflow-auto shadow-lg mt-3 h-full",
                    th: ["dark:bg-slate-900 bg-slate-300 text-slate-600 dark:text-slate-400"],
                    tr: ["dark:hover:bg-slate-800 hover:bg-slate-400 transition-colors"],
                }}
                sortDescriptor={sortState}
                onSortChange={handleSortChange}
                bottomContentPlacement="outside"
            bottomContent={
                (data?.totalPage ?? 1) > 1 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showShadow
                            color="primary"
                            page={data?.page ?? 1}
                            total={data?.totalPage ?? 1}
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
                {(session.data?.user as JWT).level.level === 1? (
                <TableHeader>
                    <TableColumn key="username" allowsSorting>
                        Username
                    </TableColumn>
                    <TableColumn key="nama" allowsSorting>
                        Nama
                    </TableColumn>
                    <TableColumn key="jenis-user" allowsSorting>
                        Jenis User
                    </TableColumn>
                    
                        <TableColumn key="kantor" allowsSorting>
                            Kantor
                        </TableColumn>
                    <TableColumn className="flex justify-center items-center">Menu</TableColumn>
                </TableHeader>
                    ):(
                <TableHeader>
                    <TableColumn key="username" allowsSorting>
                        Username
                    </TableColumn>
                    <TableColumn key="nama" allowsSorting>
                        Nama
                    </TableColumn>
                    <TableColumn key="jenis-user" allowsSorting>
                        Jenis User
                    </TableColumn>
                    <TableColumn className="flex justify-center items-center">Menu</TableColumn>
                </TableHeader>
                    )}
                <TableBody items={!isEmpty(data) ? data.data : []} emptyContent={isErrorData ? "Something went wrong!" : (isLoadingData ? "" : "Data tidak ditemukan!")} isLoading={isLoadingData} loadingContent={<Spinner size="md" />}>
                    {(session.data?.user as JWT).level.level === 1? (item:extendAksPemakai) => (
                        <TableRow key={item?.id_pemakai}>
                            <TableCell>{item?.username}</TableCell>
                            <TableCell>{item?.karyawan.name}</TableCell>
                            <TableCell>{item?.para_level_user?.keterangan}</TableCell>
                            <TableCell>{item?.karyawan?.kantor.kd_kantor}</TableCell>
                            <TableCell className="flex items-center justify-center gap-2">
                            <Link href={`/users/${item?.id_pemakai}`} >
                                <MdRemoveRedEye className="w-5 h-5 dark:text-slate-400 text-slate-700" />
                            </Link>
                            <Link href={`/users/${item?.id_pemakai}/edit`} >
                            <   MdEdit className="w-5 h-5 dark:text-slate-400 text-slate-700" />
                            </Link>
                            </TableCell>
                        </TableRow>
                    ):(item:extendAksPemakai) => (
                        <TableRow key={item?.id_pemakai}>
                            <TableCell>{item?.username}</TableCell>
                            <TableCell>{item?.karyawan.name}</TableCell>
                            <TableCell>{item?.para_level_user?.keterangan}</TableCell>
                            <TableCell className="flex items-center justify-center gap-2">
                                menu
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>
  )
}

export default UsersPage