"use client"

import CardField from "@/app/components/CardField"
import FormSelect from "@/app/components/cis/FormSelect"
import FormInput from "@/app/components/FormInput"
import MainLoading from "@/app/components/MainLoading"
import useFetchParameter from "@/app/hooks/useFetchParameter"
import { TCommonApiError } from "@/app/types"
import { usePrefetchNavigate } from "@/app/utilities"
import { convertToSelectObject } from "@/app/utilities/action"
import { convertToNumber } from "@/app/utilities/Cis"
import { fetcherNoCache } from "@/app/utilities/Fetcher"
import { findStaticParameterValue, paraJenisKelamin } from "@/app/utilities/staticParameter"
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react"
import { extendAksPemakai, para_jns_ident } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useSWR from "swr"

interface IParamSlug {
    id: string
}
const EditUserPage = ({ params }: { params: IParamSlug }) => {
    const { id: idUser } = params
    const [isLoading, setIsLoading] = useState(false)
    const formMethod = useForm()
    const navigateTo = usePrefetchNavigate()
    const { handleSubmit, setError } = formMethod

    const { convertedData: dataLevel, isLoading: isLoadingLevel } = useFetchParameter({ parameter: "level-user", metaDataConvert: { value: "id_level" } })
    const { convertedData: dataKantor, isLoading: isLoadingKantor } = useFetchParameter({ parameter: "kantor", metaDataConvert: { keterangan: "nm_kantor", value: "kd_kantor" } })
    const { convertedData: dataJenisIdentitas, isLoading: isLoadingJenisIdentitas } = useFetchParameter<para_jns_ident>({
        parameter: "jenis-identitas",
        queryParams: { "jenis-nasabah": 1 },
    });
    const { data, isLoading: isLoadingData } = useSWR<extendAksPemakai>(`/api/users/${idUser}`, fetcherNoCache)

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        const toastLoading = toast.loading("Sedang memproses...")

        try {
            const fetchData = await fetch(`/api/users/${idUser}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    kd_jns_ident: convertToNumber(data.kd_jns_ident),
                }),
            })
            const res = await fetchData.json()
            if (!fetchData.ok) {
                throw ({
                    status: fetchData.status,
                    message: res
                })
            }
            toast.success("User Pemakai Berhasil dibuat")
            navigateTo("/users")
        } catch (error) {
            const errorApi = error as TCommonApiError
            if (errorApi.status === 400) {
                Object.entries(errorApi.message).forEach(([key, value]) => {
                    setError(key, { type: "custom", message: value })
                })
                toast.error("Invalid input")
            }
            if (errorApi.status === 500) {
                toast.error("Something went wrong!")
            }
        } finally {
            toast.dismiss(toastLoading)
            setIsLoading(false)
        }
    }
    const handleResetPassword = async () => {
        setIsLoading(true)
        const toastLoading = toast.loading("Sedang memproses...")

        try {
            const fetchData = await fetch(`/api/users/${idUser}/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const res = await fetchData.json()
            if (!fetchData.ok) {
                throw ({
                    status: fetchData.status,
                    message: res
                })
            }
            toast.success("Berhasil mereset password")
            navigateTo("/users")
        } catch (error) {
            const errorApi = error as TCommonApiError

            if (errorApi.status === 500) {
                return toast.error("Something went wrong!")
            }
            toast.error(errorApi.message)
        } finally {
            toast.dismiss(toastLoading)
            setIsLoading(false)
        }
    }
    return isLoadingData ? (
        <>
            <MainLoading />
        </>
    ) : (
        <section className="w-full h-full flex flex-col">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold">User Pemakai</h1>
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
                    <BreadcrumbItem>
                        <Link href="#">Detail User</Link>
                    </BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <form className="grid grid-cols-2 mt-2 gap-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormInput type="email" formMethod={formMethod} id="email" label="Email" placeholder="Masukan Email" isRequired isDisabled={isLoading} defaultValue={data?.email} />
                <FormInput type="text" formMethod={formMethod} id="username" label="Username" placeholder="Masukan Username" isRequired isDisabled={isLoading} defaultValue={data?.username} />
                <FormSelect
                    formMethod={formMethod}
                    id="id_lvl"
                    label="Jenis User"
                    placeholder="Pilih Jenis User"
                    items={dataLevel ?? []}
                    defaultValue={convertToSelectObject(data?.para_level_user, "keterangan", "id_level")}
                    isLoading={isLoadingLevel}
                    isRequired isDisabled={isLoading}
                />
                <div className="py-1 col-span-2">
                    <h3 className="text-slate-500 dark:text-slate-300">Informasi User</h3>
                </div>
                <FormSelect
                    formMethod={formMethod}
                    id="kd_jns_ident"
                    label="Jenis Identitas"
                    placeholder="Pilih Jenis Identitas"
                    items={dataJenisIdentitas ?? []}
                    isLoading={isLoadingJenisIdentitas}
                    isRequired isDisabled={isLoading}
                    defaultValue={convertToSelectObject(data?.karyawan?.jenis_identitas)}
                />
                <FormInput type="text" label="Nomor Identitas" formMethod={formMethod} id="no_ident" placeholder="Masukan Nomor Identitas" isRequired isDisabled={isLoading} defaultValue={data?.karyawan?.no_ident} />
                <FormInput type="text" formMethod={formMethod} id="name" label="Nama" placeholder="Masukan Nama" isRequired isDisabled={isLoading} defaultValue={data?.karyawan?.name} />
                <FormSelect
                    items={paraJenisKelamin}
                    formMethod={formMethod}
                    id="jenis_kelamin"
                    label="Jenis Kelamin"
                    placeholder="Pilih Jenis Kelamin"
                    isRequired isDisabled={isLoading}
                    defaultValue={findStaticParameterValue(paraJenisKelamin, data?.karyawan?.jenis_kelamin)}
                />
                <FormSelect
                    formMethod={formMethod}
                    id="kd_kantor"
                    label="Kantor"
                    placeholder="Pilih Kantor"
                    items={dataKantor ?? []}
                    isLoading={isLoadingKantor}
                    isRequired isDisabled={isLoading}
                    defaultValue={convertToSelectObject(data?.karyawan?.kantor, "nm_kantor", "kd_kantor")}
                />
                <div className="flex items-center justify-end col-span-2 gap-2">
                    <Button className="text-white bg-red-600" isDisabled={isLoading} onPress={handleResetPassword}>Reset Password</Button>
                    <Button type="submit" color="primary" isDisabled={isLoading}>Simpan</Button>
                </div>
            </form>
        </section>
    )
}

export default EditUserPage