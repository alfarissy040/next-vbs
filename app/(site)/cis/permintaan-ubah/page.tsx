"use client"

import { CDialog } from "@/app/components/ClassnamesData"
import CardUpdate from "@/app/components/cis/permintaan-ubah/CardUpdate"
import { TCommonApiError } from "@/app/types"
import { flatQueryParams } from "@/app/utilities"
import { fetcherNoCache } from "@/app/utilities/Fetcher"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import { cis_update, extendCisUpdate } from "@prisma/client"
import { isArray } from "lodash"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import useSWR, { useSWRConfig } from "swr"

const AktivasiNasabahPage = () => {
    const queryParams = useSearchParams();
    const { mutate } = useSWRConfig()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState("");
    const [modalState, setModalState] = useState<"terima" | "tolak" | null>(null)
    const [sortState, setSortState] = useState<SortDescriptor>({
        column: queryParams.get("orderby") ?? "nomor-nasabah",
        direction: queryParams.get("direction") === "asc" ? "ascending" : "descending",
    });
    const [qParams, setQParams] = useState({
        orderBy: sortState.column,
        direction: sortState.direction === "ascending" ? "asc" : "desc",
    })
    const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

    const { data, error: isError, isLoading: loadingData } = useSWR<extendCisUpdate[]>(`/api/cis/permintaan-ubah?${flatQueryParams(qParams)}`, fetcherNoCache, {
        refreshInterval: 3000
    });
    const handleSortChange = (sortDescriptor: SortDescriptor) => {
        const orderByParam = sortDescriptor.column?.toString() ?? "";
        const directionParam = sortDescriptor.direction === "ascending" ? "asc" : "desc";
        setSortState(sortDescriptor);
        setQParams({
            orderBy: orderByParam,
            direction: directionParam,
        })
    };

    const getDataUpdate = useMemo<Record<string, any>>(() => {
        if (!isArray(data)) return [];
        const result = data.find(
            (item: extendCisUpdate) =>
                item.no_nas.trim().toLowerCase() === selectedUser.trim().toLowerCase()
        );
        return result?.cis_update ?? [];
    }, [data, selectedUser]);

    const handleOpenModal = (noNas: string) => {
        onOpen()
        setSelectedUser(noNas)
    }
    const handleCloseModal = () => {
        setModalState(null)
        closeModal()
    }
    const handleSubmit = async (isApprove: boolean) => {
        setIsLoading(true);
        const loadingToast = toast.loading("Memperoses...")

        try {
            const res = await fetch(`/api/cis/permintaan-ubah/${selectedUser}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    no_nas: selectedUser,
                    isApprove: isApprove
                }),
            })
            const result = await res.json()

            if (!res.ok) {
                throw {
                    status: res.status,
                    message: result.message
                }
            }
            mutate(`/api/cis/permintaan-ubah`)
            toast.success(isApprove ? "Berhasil merubah data" : "Perubahan data ditolak")
        } catch (error) {
            const errorApi = error as TCommonApiError
            toast.error(errorApi.message)
        } finally {
            toast.dismiss(loadingToast)
            setIsLoading(false)
            setModalState(null)
            closeModal()
        }
    }

    return (
        <section className="w-full h-full flex flex-col">
            <h1 className="font-medium text-2xl">Permintaan Perubahan Data</h1>
            <Table
                className="flex-1"
                classNames={{
                    wrapper: "dark:bg-slate-800 bg-slate-200 overflow-auto shadow-lg mt-3 h-full",
                    th: ["dark:bg-slate-900 bg-slate-300 text-slate-600 dark:text-slate-400"],
                    tr: ["dark:hover:bg-slate-800 hover:bg-slate-400 transition-colors"],
                }}
                sortDescriptor={sortState}
                onSortChange={handleSortChange}
                isHeaderSticky
            >
                <TableHeader>
                    <TableColumn key="nomor-nasabah" allowsSorting>
                        Nomor Nasabah
                    </TableColumn>
                    <TableColumn key="nama-nasabah" allowsSorting>
                        Nama
                    </TableColumn>
                    <TableColumn key="tipe-nasabah" allowsSorting>
                        Diubah oleh
                    </TableColumn>
                    <TableColumn className="flex justify-center items-center">Menu</TableColumn>
                </TableHeader>
                <TableBody items={isArray(data) ? data : []} emptyContent={isError ? "Something went wrong!" : (loadingData ? "" : "Data tidak ditemukan!")} isLoading={loadingData} loadingContent={<Spinner size="md" />}>
                    {(item: extendCisUpdate) => (
                        <TableRow key={item?.no_nas}>
                            <TableCell>{item?.no_nas}</TableCell>
                            <TableCell>{item?.nm_nas}</TableCell>
                            <TableCell>
                                {item?.cis_update?.usrid_create}
                            </TableCell>
                            <TableCell className="flex items-center justify-center gap-2">
                                <Button color="primary" onPress={() => handleOpenModal(item?.no_nas)}>Menu</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={handleCloseModal} backdrop="blur" classNames={CDialog} size="5xl" className="max-h-[85%] h-auto" scrollBehavior="outside">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {modalState === null ? "Detail Perubahan" : "Konfirmasi Tindakan"}
                    </ModalHeader>
                    <ScrollShadow hideScrollBar>
                        <ModalBody>
                            {modalState === null && (
                                <div className="grid grid-cols-3 gap-3">
                                    {/* card */}
                                    {getDataUpdate.map((item: cis_update) => (
                                        <CardUpdate
                                            key={item.id_update}
                                            label={item?.nm_field}
                                            currentValue={item?.current_record ?? "null"}
                                            newValue={item?.new_record ?? "null"}
                                            created_at={item?.created_at}
                                        />
                                    ))}
                                </div>
                            )}
                            {modalState === "terima" && (
                                <p>Apakah Anda yakin ingin <span className="font-semibold border-b-2 dark:border-slate-50">menerima</span> permintaan ini? Harap pastikan semua informasi sudah benar sebelum melanjutkan.
                                </p>
                            )}
                            {modalState === "tolak" && (
                                <p>Apakah Anda yakin ingin <span className="font-semibold border-b-2 dark:border-slate-50">menolak</span> permintaan ini? Harap pastikan semua informasi sudah benar sebelum melanjutkan.
                                </p>
                            )}
                        </ModalBody>
                    </ScrollShadow>
                    <ModalFooter>
                        {modalState === null ? (
                            <>
                                <Button color="danger" className="bg-red-600" onPress={() => setModalState("tolak")}>
                                    Tolak
                                </Button>
                                <Button color="primary" onPress={() => setModalState("terima")}>
                                    Terima
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="danger" className="bg-red-600" onPress={handleCloseModal}>
                                    Batal
                                </Button>
                                <Button color="primary" onPress={() => handleSubmit(modalState === "terima" ? true : false)}>
                                    Konfirmasi
                                </Button>
                            </>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}

export default AktivasiNasabahPage