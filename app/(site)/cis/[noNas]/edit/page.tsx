"use client"
import SectionPerorangan from "@/app/components/cis/create/SectionPerorangan";
import { TCommonApiError } from "@/app/types";
import { usePrefetchNavigate } from "@/app/utilities";
import { fetcherNoCache } from "@/app/utilities/Fetcher";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";

interface IParamSlug {
    noNas: string;
}
// TODOS create page edit data nasabah
const EditNasabahPage = ({ params }: { params: IParamSlug }) => {
    const { noNas } = params;
    const [isLoading, setIsLoading] = useState(false)
    const navigateTo = usePrefetchNavigate()
    const formMethod = useForm({
        shouldUnregister: false,
    });

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true)
        const loadingToast = toast.loading("Sedang memproses...")
        try {
            const res = await fetch("/api/cis/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            if (!res.ok) {
                const result = await res.json()
                throw ({
                    status: res.status,
                    message: result.message
                })
            }
            toast.success("Data tersimpan")
            return navigateTo("/cis")
        } catch (err) {
            const error = err as TCommonApiError
            toast.error(error.message)
        } finally {
            toast.dismiss(loadingToast)
            setIsLoading(false)
        }
    };
    const { data, isLoading:isLoadingData, error } = useSWR(`/api/cis/${noNas}`, fetcherNoCache);

    const formType = useMemo(() => {
        const tipe: Record<string, string> = {
            "1": "perorangan",
            "2": "perusahaan",
            "3": "pemerintah",
            "4": "Lembaga non-profit",
        }
        return tipe[data?.tipe_nas] ?? "perorangan";
    }, [data])
    return (
        <section className="flex flex-col gap-3 flex-1 h-auto">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold">Tambah nasabah baru</h1>
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
                    <BreadcrumbItem>Tambah Nasabah Baru</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="flex flex-col flex-1 h-auto gap-3">
            {formType === "perorangan" && <SectionPerorangan defaultValue={data} isLoading={isLoading} formMethod={formMethod} onSubmit={onSubmit} />}
            {formType === "perusahaan" && <EditPerusahaan data={data} isLoading={isLoading} error={error} />}
            {formType === "pemerintah" && <EditInstansi data={data} isLoading={isLoading} error={error} />}
            {formType === "Lembaga non-profit" && <EditNonProfit data={data} isLoading={isLoading} error={error} />}
            </div>
        </section>
    )
}

export default EditNasabahPage