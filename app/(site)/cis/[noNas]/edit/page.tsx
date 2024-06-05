"use client"
import { fetcherNoCache } from "@/app/utilities/Fetcher";
import { extendCisMaster } from "@prisma/client";
import { useMemo } from "react";
import useSWR from "swr";

interface IParamSlug {
    noNas: string;
}
// TODOS create page edit data nasabah
const EditNasabahPage = ({ params }: { params: IParamSlug }) => {
    const { noNas } = params;
    const { data, isLoading, error } = useSWR(`/api/cis/${noNas}`, fetcherNoCache);

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
            {formType === "perorangan" && <EditPerorangan data={data} isLoading={isLoading} error={error} />}
            {formType === "perusahaan" && <EditPerusahaan data={data} isLoading={isLoading} error={error} />}
            {formType === "pemerintah" && <EditInstansi data={data} isLoading={isLoading} error={error} />}
            {formType === "Lembaga non-profit" && <EditNonProfit data={data} isLoading={isLoading} error={error} />}
        </section>
    )
}

export default EditNasabahPage