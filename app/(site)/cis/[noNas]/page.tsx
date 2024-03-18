"use client"

import DetailAlamat from "@/app/components/cis/DetailAlamat"
import DetailAlamatPengurus from "@/app/components/cis/DetailAlamatPengurus"
import DetailMaster from "@/app/components/cis/DetailMaster"
import DetailPengurus from "@/app/components/cis/DetailPengurus"
import DetailPerorangan from "@/app/components/cis/DetailPerorangan"
import DetailPerusahaan from "@/app/components/cis/create/DetailPerusahaan"
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react"
import Link from "next/link"
import { useState } from "react"

interface IParamSlug {
    noNas: string
}

const PageDetail = ({ params }: { params: IParamSlug }) => {
    const { noNas } = params
    const [isShowAll, setIsShowAll] = useState(false)
    return (
        <section>
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold">Detail Nasabah</h1>
                <Breadcrumbs size="lg" variant="solid" classNames={{
                    list: "dark:bg-slate-800 bg-slate-200",
                }}>
                    <BreadcrumbItem classNames={{
                        item: "text-slate-500 dark:text-slate-400"
                    }}>
                        <Link href="/cis" passHref>
                            Informasi Customer
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Detail Nasabah</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            {/* master */}
            <DetailMaster />
            {isShowAll && (
                <>
                    {/* perorangan */}
                    <DetailPerorangan />
                    {/* perusahaan */}
                    <DetailPerusahaan />
                    {/* alamat */}
                    <DetailAlamat />
                    {/* pengurus */}
                    <DetailPengurus />
                    {/* alamat pengurus */}
                    <DetailAlamatPengurus />
                </>
            )}

            <div className="flex items-center justify-center py-3">
                {!isShowAll && <Button color="primary" radius="full" onClick={() => setIsShowAll(true)}>Selengkapnya</Button>}
            </div>
        </section>
    )
}

// export async function generateStaticParams() {
// }

export default PageDetail