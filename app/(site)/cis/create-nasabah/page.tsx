"use client";

import ChooseNasabah from "@/app/components/cis/create/ChooseNasabah";
import FormInstansi from "@/app/components/cis/create/FormInstansi";
import FormNonProfit from "@/app/components/cis/create/FormNonProfit";
import FormPerorangan from "@/app/components/cis/create/SectionPerorangan";
import FormPerusahaan from "@/app/components/cis/create/FormPerusahaan";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { TCommonApiError } from "@/app/types";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { usePrefetchNavigate } from "@/app/utilities";

const CreateNasabahPage = () => {
    const [formType, setFormType] = useState<TAddFormState>("home");
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
                {formType === "home" && <ChooseNasabah setFormType={setFormType} />}
                {formType === "perorangan" && <FormPerorangan setFormType={setFormType} onSubmit={onSubmit} isLoading={isLoading} formMethod={formMethod} />}
                {formType === "perusahaan" && <FormPerusahaan setFormType={setFormType} />}
                {formType === "pemerintah" && <FormInstansi setFormType={setFormType} />}
                {formType === "Lembaga non-profit" && <FormNonProfit setFormType={setFormType} />}
            </div>
        </section>
    );
};

export default CreateNasabahPage;
