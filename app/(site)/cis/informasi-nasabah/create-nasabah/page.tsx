"use client";

import { TCommonApiError } from "@/app/types";
import { usePrefetchNavigate } from "@/app/utilities";
import { sanitizeCisAlamat, sanitizeCisAlamatPengurus, sanitizeCisMaster, sanitizeCisPengurus, sanitizeCisPerorangan, sanitizeCisPerusahaan } from "@/app/utilities/Cis";
import { Button } from "@/components/ui/button";
import { mapValues } from "lodash";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateNasabahPage = () => {
    const [formType, setFormType] = useState<TAddFormState>("home");
    const [isLoading, setIsLoading] = useState(false);

    const navigateTo = usePrefetchNavigate();
    const formMethod = useForm({
        shouldUnregister: false,
    });

    const getTypeNasabah = useMemo(() => {
        const result: Record<TAddFormState, number> = {
            perorangan: 1,
            perusahaan: 2,
            pemerintah: 3,
            "Lembaga non-profit": 4,
            home: 0,
        };
        return result[formType] ?? undefined;
    }, [formType]);

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        setIsLoading(true);
        const loadingToast = toast.loading("Sedang memproses...");
        try {
            const dataPost = {
                ...sanitizeCisMaster(values),
                alamat: sanitizeCisAlamat(values["alamat"]),
                ...(getTypeNasabah === 1 ? sanitizeCisPerorangan(values) : {}),
                ...(getTypeNasabah === 2 || getTypeNasabah === 4 ? sanitizeCisPerusahaan(values) : {}),
                pengurus: {
                    ...(getTypeNasabah !== 1 ? sanitizeCisPengurus(values["pengurus"]) : {}),
                    alamat: getTypeNasabah !== 1 ? sanitizeCisAlamatPengurus(values["pengurus"]["alamat"]) : {},
                },
                tipe_nas: getTypeNasabah,
            };
            const res = await fetch("/api/cis/informasi-nasabah/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataPost),
            });
            if (!res.ok) {
                const result = await res.json();
                let errorMessage = result.message;
                if (res.status === 400) {
                    errorMessage = "Invalid data";
                    mapValues(result.message as Record<string, any>, (value, key) => {
                        formMethod.setError(key, {
                            message: value.join(", "),
                        });
                    });
                }
                throw {
                    status: res.status,
                    message: errorMessage,
                };
            }
            toast.success("Data tersimpan");
            return navigateTo("/cis");
        } catch (err) {
            const error = err as TCommonApiError;
            toast.error(error.message);
            if (error.status === 400) {
            }
        } finally {
            toast.dismiss(loadingToast);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="-mt-16 flex flex-col gap-4 w-full max-w-xl">
                <h3 className="text-lg text-center">Pilih Tipe Nasabah</h3>
                <Button variant={"outline"} className="dark:bg-blue-950 bg-blue-200 hover:bg-primary dark:text-foreground text-background border-none justify-start w-full" size={"lg"} asChild>
                    <Link href={"/cis/informasi-nasabah/create-nasabah/perorangan"}>Perorangan</Link>
                </Button>
                <Button variant={"outline"} className="dark:bg-blue-950 bg-blue-200 hover:bg-primary dark:text-foreground text-background border-none justify-start w-full" size={"lg"} asChild>
                    <Link href={"/cis/informasi-nasabah/create-nasabah/perusahaan"}>Perusahaan</Link>
                </Button>
                <Button variant={"outline"} className="dark:bg-blue-950 bg-blue-200 hover:bg-primary dark:text-foreground text-background border-none justify-start w-full" size={"lg"} asChild>
                    <Link href={"/cis/informasi-nasabah/create-nasabah/instansi-pemerintah"}>Instansi Pemerintah</Link>
                </Button>
                <Button variant={"outline"} className="dark:bg-blue-950 bg-blue-200 hover:bg-primary dark:text-foreground text-background border-none justify-start w-full" size={"lg"} asChild>
                    <Link href={"/cis/informasi-nasabah/create-nasabah/non-profit"}>Non-Profit</Link>
                </Button>
            </div>
        </div>
    );
};

export default CreateNasabahPage;

{
    /* <div className="flex flex-col flex-1 h-auto gap-3">
{formType === "home" && <ChooseNasabah setFormType={setFormType} />}
{formType === "perorangan" && <SectionPerorangan setFormType={setFormType} onSubmit={onSubmit} isLoading={isLoading} formMethod={formMethod} />}
{formType === "perusahaan" && <SectionPerusahaan setFormType={setFormType} onSubmit={onSubmit} isLoading={isLoading} formMethod={formMethod} />}
{formType === "pemerintah" && <SectionInstansi setFormType={setFormType} onSubmit={onSubmit} isLoading={isLoading} formMethod={formMethod} />}
{formType === "Lembaga non-profit" && <SectionNonProfit setFormType={setFormType} onSubmit={onSubmit} isLoading={isLoading} formMethod={formMethod} />}
</div> */
}
