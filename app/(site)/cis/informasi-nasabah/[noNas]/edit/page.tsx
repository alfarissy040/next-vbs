"use client"
import SectionInstansi from "@/app/components/cis/create/SectionInstansi";
import SectionNonProfit from "@/app/components/cis/create/SectionNonProfit";
import SectionPerorangan from "@/app/components/cis/create/SectionPerorangan";
import SectionPerusahaan from "@/app/components/cis/create/SectionPerusahaan";
import MainLoading from "@/app/components/MainLoading";
import { TCommonApiError } from "@/app/types";
import { usePrefetchNavigate } from "@/app/utilities";
import { convertToNumber, sanitizeCisAlamat, sanitizeCisAlamatPengurus, sanitizeCisMaster, sanitizeCisPengurus, sanitizeCisPerorangan, sanitizeCisPerusahaan } from "@/app/utilities/Cis";
import { fetcherNoCache } from "@/app/utilities/Fetcher";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";

interface IParamSlug {
    noNas: string;
}
// TODOS create page edit data nasabah
const EditNasabahPage = ({ params }: { params: IParamSlug }) => {
    const { mutate } = useSWRConfig()
    const { noNas } = params;
    const [isLoading, setIsLoading] = useState(false)
    const navigateTo = usePrefetchNavigate()
    const formMethod = useForm({
        shouldUnregister: false,
    });

    const { data, isLoading: isLoadingData, error } = useSWR(`/api/cis/${noNas}`, fetcherNoCache);

    const formType = useMemo(() => {
        const tipe: Record<string, string> = {
            "1": "perorangan",
            "2": "perusahaan",
            "3": "pemerintah",
            "4": "Lembaga non-profit",
        }
        return tipe[data?.tipe_nas] ?? "perorangan";
    }, [data])
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true)
        const loadingToast = toast.loading("Sedang memproses...")
        try {
            const dataPost = {
                ...sanitizeCisMaster(values),
                alamat: sanitizeCisAlamat(values["alamat"]),
                ...(data?.tipe_nas === 1 ? sanitizeCisPerorangan(values) : {}),
                ...(data?.tipe_nas === 2 || data?.tipe_nas === 4 ? sanitizeCisPerusahaan(values) : {}),
                pengurus: {
                    ...(data?.tipe_nas !== 1 ? sanitizeCisPengurus(values["pengurus"]) : {}),
                    alamat: (data?.tipe_nas !== 1 ? sanitizeCisAlamatPengurus(values["pengurus"]["alamat"]) : {}),
                },
                tipe_nas: data?.tipe_nas
            }
            const res = await fetch(`/api/cis/${noNas}/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataPost),
            })
            const result = await res.json()
            if (!res.ok) {
                throw ({
                    status: res.status,
                    message: result.message
                })
            }
            mutate("/api/cis/permintaan-ubah")
            toast.success("Data tersimpan")
            return navigateTo("/cis")
        } catch (err) {
            const error = err as TCommonApiError
            console.log(error)
            toast.error(error.message)
        } finally {
            toast.dismiss(loadingToast)
            setIsLoading(false)
        }
    };
    return (
        <section className="flex flex-col gap-3 flex-1 h-auto">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold">Ubah Data Nasabah</h1>
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
                        <Link href="/cis">Informasi Customer</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Ubah Data Nasabah</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="flex flex-col flex-1 h-auto gap-3">
                {isLoadingData && <MainLoading />}
                {!isLoadingData && formType === "perorangan" && <SectionPerorangan onSubmit={onSubmit} isLoading={isLoading ?? isLoadingData} formMethod={formMethod} defaultValue={data} />}
                {!isLoadingData && formType === "perusahaan" && <SectionPerusahaan onSubmit={onSubmit} isLoading={isLoading ?? isLoadingData} formMethod={formMethod} defaultValue={data} />}
                {!isLoadingData && formType === "pemerintah" && <SectionInstansi onSubmit={onSubmit} isLoading={isLoading ?? isLoadingData} formMethod={formMethod} defaultValue={data} />}
                {!isLoadingData && formType === "Lembaga non-profit" && <SectionNonProfit onSubmit={onSubmit} isLoading={isLoading ?? isLoadingData} formMethod={formMethod} defaultValue={data} />}
            </div>
        </section>
    )
}

export default EditNasabahPage