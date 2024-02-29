"use client"

import ChooseNasabah from "@/app/components/cis/create/ChooseNasabah"
import FormInstansi from "@/app/components/cis/create/FormInstansi"
import FormNonProfit from "@/app/components/cis/create/FormNonProfit"
import FormPerorangan from "@/app/components/cis/create/FormPerorangan"
import FormPerusahaan from "@/app/components/cis/create/FormPerusahaan"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaChevronLeft } from "react-icons/fa6"

const CreateNasabahPage = () => {
    const [formType, setFormType] = useState<TAddFormState>("home")
    const router = useRouter()
    router.prefetch("/cis")
    return (
        <section className="flex flex-col gap-3 flex-1 h-auto">
            <div className="flex items-center gap-3 dark:bg-slate-800 bg-slate-100 rounded-lg shadow-lg px-3 py-2">
                {/* icon */}
                <Button isIconOnly size="sm" variant="light" className="group"
                    onClick={() => router.push("/cis")}
                >
                    <FaChevronLeft className="w-5 h-5 text-slate-500 dark:group-hover:text-slate-400 group-hover:text-slate-600 transition-colors" />
                </Button>
                {/* label */}
                <h1 className="flex w-auto md:text-2xl text-lg font-medium ">Tambah nasabah baru</h1>
            </div>
            <div className="flex flex-col flex-1 h-auto gap-3">
                {formType === "home" && <ChooseNasabah setFormType={setFormType} />}
                {formType === "perorangan" && <FormPerorangan setFormType={setFormType} />}
                {formType === "perusahaan" && <FormPerusahaan setFormType={setFormType} />}
                {formType === "pemerintah" && <FormInstansi setFormType={setFormType} />}
                {formType === "Lembaga non-profit" && <FormNonProfit setFormType={setFormType} />}
            </div>
        </section>
    )
}

export default CreateNasabahPage