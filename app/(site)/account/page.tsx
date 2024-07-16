"use client"

import CardField from "@/app/components/CardField"
import { CDialog } from "@/app/components/ClassnamesData"
import FormInput from "@/app/components/FormInput"
import MainLoading from "@/app/components/MainLoading"
import { TCommonApiError } from "@/app/types"
import { fetcherNoCache } from "@/app/utilities/Fetcher"
import { findStaticParameterValue, paraJenisKelamin } from "@/app/utilities/staticParameter"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, useDisclosure } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useSWR from "swr"

const AccountPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const formMethod = useForm()
    const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()
    const { handleSubmit, setError, unregister } = formMethod

    const { data, isLoading: isLoadingData } = useSWR(`/api/users/${session.data?.user?.id_karyawan}`, fetcherNoCache)

    const handleOpenChange = () => {
        if (!isLoading) {
            onOpenChange()
        }
    }
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        const loadingToast = toast.loading("Sedang memproses...")

        try {
            const response = await fetch(`/api/users/${session.data?.user?.id_karyawan}/edit-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const res = await response.json()

            if (!response.ok) {
                throw ({
                    status: response.status,
                    message: res.message
                })
            }

            toast.success("Berhasil merubah password")
            unregister()
            onClose()
        } catch (err) {
            const errorApi = err as TCommonApiError
            if (errorApi.status === 400) {
                Object.entries(errorApi.message).forEach(([key, value]) => {
                    setError(key, { type: "custom", message: value })
                })
                toast.error("Invalid input")
            } else {
                toast.error("Something went wrong!")
            }
        } finally {
            setIsLoading(false)
            toast.dismiss(loadingToast)
        }
    }
    return (
        <>
            {isLoadingData && <MainLoading />}
            {!isLoadingData && (
                <section className="w-full h-full flex flex-col">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-extrabold">User Pemakai</h1>
                    </div>
                    <div className="grid grid-cols-2 mt-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <CardField
                            label="Username"
                            value={data?.username}
                            isLoading={isLoadingData}
                        />
                        <CardField
                            label="Email"
                            value={data?.email}
                            isLoading={isLoadingData}
                        />
                        <CardField
                            label="Jenis User"
                            value={data?.para_level_user?.keterangan}
                            isLoading={isLoadingData}
                        />
                        <div className="py-1 col-span-2">
                            <h3 className="text-slate-500 dark:text-slate-300">Informasi User</h3>
                        </div>
                        <CardField
                            label="Nama"
                            value={data?.karyawan?.name}
                            isLoading={isLoadingData}
                        />
                        <CardField
                            label="Jenis Kelamin"
                            value={findStaticParameterValue(paraJenisKelamin, data?.karyawan?.jenis_kelamin)?.label}
                            isLoading={isLoadingData}
                        />
                        <CardField
                            label="Kantor"
                            value={data?.karyawan?.kantor?.nm_kantor}
                            isLoading={isLoadingData}
                        />
                        <div className="flex items-center justify-end col-span-2 gap-2">
                            <Button color="primary" isDisabled={isLoading} onPress={onOpen}>Ubah password</Button>
                        </div>
                    </div>
                </section>
            )}
            <Modal isOpen={isOpen} onOpenChange={handleOpenChange} backdrop="blur" classNames={CDialog} size="5xl" className="max-h-[85%] h-auto" scrollBehavior="outside">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Ubah password
                    </ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <ScrollShadow hideScrollBar>
                            <ModalBody>
                                <div className="grid grid-cols-2 gap-3">
                                    <FormInput type="password" formMethod={formMethod} id="password" label="Password" placeholder="Masukan Password" isRequired isDisabled={isLoading} />
                                    <FormInput type="password" formMethod={formMethod} id="new_password" label="Password Baru" placeholder="Masukan password baru" isRequired isDisabled={isLoading} />
                                    <FormInput type="password" formMethod={formMethod} id="confirm_password" label="Konfirmasi password baru" placeholder="Masukan Konfirmasi Password" isRequired isDisabled={isLoading} />
                                </div>
                            </ModalBody>
                        </ScrollShadow>
                        <ModalFooter>
                            <Button color="danger" className="bg-red-600" onPress={() => !isLoading && onClose}>
                                Batal
                            </Button>
                            <Button color="primary" type="submit">
                                Konfirmasi
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AccountPage