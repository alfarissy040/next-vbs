"use client"

import CardField from "@/app/components/CardField"
import { fetcherNoCache } from "@/app/utilities/Fetcher"
import { findStaticParameterValue, paraJenisKelamin } from "@/app/utilities/staticParameter"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react"
import { extendAksPemakai } from "@prisma/client"
import Link from "next/link"
import useSWR from "swr"

interface IParamSlug {
    id: string
}
const DetailUserPage = ({ params }: { params: IParamSlug }) => {
    const { id: idUser } = params
    const { data, isLoading } = useSWR<extendAksPemakai>(`/api/users/${idUser}`, fetcherNoCache)
    return (
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
            <div className="grid grid-cols-2 mt-2 gap-2">
                <CardField label="Email" isLoading={isLoading} value={data?.email} />
                <CardField label="Username" isLoading={isLoading} value={data?.username} />
                <CardField label="Jenis User" isLoading={isLoading} value={data?.para_level_user?.keterangan} />
                <div className="py-1 col-span-2">
                    <h3 className="text-slate-500 dark:text-slate-300">Informasi User</h3>
                </div>
                <CardField label="Jenis Identitas" isLoading={isLoading} value={data?.karyawan?.jenis_identitas?.keterangan} />
                <CardField label="Nomor Identitas" isLoading={isLoading} value={data?.karyawan.no_ident} />
                <CardField label="Nama" isLoading={isLoading} value={data?.karyawan.name} />
                <CardField label="Jenis Kelamin" isLoading={isLoading} value={findStaticParameterValue(paraJenisKelamin, data?.karyawan.jenis_kelamin)?.label} />
                <CardField label="Kantor" isLoading={isLoading} value={data?.email} />
            </div>
        </section>
    )
}

export default DetailUserPage