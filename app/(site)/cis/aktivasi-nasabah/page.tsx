"use client"

import { CDialog } from "@/app/components/ClassnamesData"
import { TCommonApiError } from "@/app/types"
import { flatQueryParams } from "@/app/utilities"
import { useNasabahType } from "@/app/utilities/Cis"
import { fetcherNoCache } from "@/app/utilities/Fetcher"
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react"
import { cis_master } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
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
    const { getBadgeColor, getTypeName } = useNasabahType();
    const { isOpen, onOpen, onOpenChange, onClose: closeModal } = useDisclosure();

    const { data, error: isError, isLoading: loadingData } = useSWR(`/api/cis/aktivasi-nasabah/?${flatQueryParams(qParams)}`, fetcherNoCache);

    const handleSortChange = (sortDescriptor: SortDescriptor) => {
        const orderByParam = sortDescriptor.column?.toString() ?? "";
        const directionParam = sortDescriptor.direction === "ascending" ? "asc" : "desc";
        setSortState(sortDescriptor);
        setQParams({
            orderBy: orderByParam,
            direction: directionParam,
        })
    };
    const handleOpenModal = (noNas: string) => {
        onOpen()
        setSelectedUser(noNas)
    }
    const handleCloseModal = () => {
        setModalState(null)
        closeModal()
    }
    const handleSubmit = async (isApprove: boolean) => {
        const loadingToast = toast.loading("Memperoses...")
        setIsLoading(true)
        closeModal()

        try {
            const res = await fetch(`/api/cis/aktivasi-nasabah/${selectedUser}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
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
            mutate(`/api/cis/aktivasi-nasabah/?${flatQueryParams(qParams)}`)
            toast.success(isApprove ? "Nasabah berhasil Aktivasi" : "Aktivasi nasabah ditolak")
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
            <h1 className="font-medium text-2xl">Aktivasi Nasabah</h1>
            <Table
                aria-label="table for data cis"
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
                    <TableColumn key="nomor-identitas" allowsSorting>
                        Nomor Identitas
                    </TableColumn>
                    <TableColumn key="nama-nasabah" allowsSorting>
                        Nama
                    </TableColumn>
                    <TableColumn key="tipe-nasabah" allowsSorting>
                        Tipe
                    </TableColumn>
                    <TableColumn className="flex justify-center items-center">Menu</TableColumn>
                </TableHeader>
                <TableBody items={data?.data ?? []} emptyContent={isError ? "Something went wrong!" : "Data tidak ditemukan!"} isLoading={loadingData} loadingContent={<Spinner size="md" />}>
                    {(item: cis_master) => (
                        <TableRow key={item?.no_nas}>
                            <TableCell>{item?.no_nas}</TableCell>
                            <TableCell>{item?.no_ident}</TableCell>
                            <TableCell>{item?.nm_nas}</TableCell>
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
                            <TableCell className="flex items-center justify-center gap-2">
                                <Button color="primary" onPress={() => handleOpenModal(item?.no_nas)}>Menu</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={handleCloseModal} backdrop="blur" classNames={CDialog}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {modalState === null ? "Permintaan Persetujuan" : "Konfirmasi Tindakan"}
                    </ModalHeader>
                    <ModalBody>
                        {modalState === null && (
                            <p>Silakan konfirmasi keputusan Anda untuk permintaan ini. Pilih <span className="font-semibold border-b-2 dark:border-slate-50 border-slate-900">Terima</span> untuk menyetujui atau <span className="font-semibold border-b-2 dark:border-slate-50 border-slate-900">Tolak</span> untuk menolak.</p>
                        )}
                        {modalState === "terima" && (
                            <p>Apakah Anda yakin ingin <span className="font-semibold border-b-2 dark:border-slate-50 border-slate-900">menerima</span> permintaan ini? Harap pastikan semua informasi sudah benar sebelum melanjutkan.
                            </p>
                        )}
                        {modalState === "tolak" && (
                            <p>Apakah Anda yakin ingin <span className="font-semibold border-b-2 dark:border-slate-50 border-slate-900">menolak</span> permintaan ini? Harap pastikan semua informasi sudah benar sebelum melanjutkan.
                            </p>
                        )}
                    </ModalBody>
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