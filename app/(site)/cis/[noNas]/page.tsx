"use client"

import DetailAlamat from "@/app/components/cis/DetailAlamat"
import DetailAlamatPengurus from "@/app/components/cis/DetailAlamatPengurus"
import DetailMaster from "@/app/components/cis/DetailMaster"
import DetailPengurus from "@/app/components/cis/DetailPengurus"
import DetailPerorangan from "@/app/components/cis/DetailPerorangan"
import DetailPerusahaan from "@/app/components/cis/create/DetailPerusahaan"
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react"
import { cis_alamat, cis_master, cis_pengurus, cis_perorangan, cis_perusahaan } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr"

interface IParamSlug {
    noNas: string
}

const PageDetail = ({ params }: { params: IParamSlug }) => {
    const { noNas } = params
    const [isShowAll, setIsShowAll] = useState(false)
    const { data: dataMaster, isLoading, error } = useSWR("https://my.api.mockaroo.com/next_vbs__cis_master.json", async (url) => {
        const data: cis_master = await fetch(url, {
            headers: {
                'X-API-Key': 'a14c6770'
            }
        }).then((res) => res.json())
            .catch(() => new Error("Something went wrong"))
        return data
    })
    const { data: dataPerorangan, isLoading: isLoadingPerorangan } = useSWR("https://my.api.mockaroo.com/next_vbs__cis_perorangan.json", async (url) => {
        const data: cis_perorangan = await fetch(url, {
            headers: {
                'X-API-Key': 'a14c6770'
            }
        }).then((res) => res.json())
            .catch(() => new Error("Something went wrong"))
        return data
    })
    const { data: dataPerusahaan, isLoading: isLoadingPerusahaan } = useSWR("https://my.api.mockaroo.com/next_vbs__cis_perusahaan.json", async (url) => {
        const data: cis_perusahaan = await fetch(url, {
            headers: {
                'X-API-Key': 'a14c6770'
            }
        }).then((res) => res.json())
            .catch(() => new Error("Something went wrong"))
        return data
    })
    const { data: dataAlamat, isLoading: isLoadingAlamat } = useSWR("https://my.api.mockaroo.com/next_vbs__cis_alamat.json", async (url) => {
        const data: cis_alamat = await fetch(url, {
            headers: {
                'X-API-Key': 'a14c6770'
            }
        }).then((res) => res.json())
            .catch(() => new Error("Something went wrong"))
        return data
    })
    const { data: dataPengurus, isLoading: isLoadingPengurus } = useSWR("https://my.api.mockaroo.com/next_vbs__cis_pengurus.json", async (url) => {
        const data: cis_pengurus = await fetch(url, {
            headers: {
                'X-API-Key': 'a14c6770'
            }
        }).then((res) => res.json())
            .catch(() => new Error("Something went wrong"))
        return data
    })
    const { data: dataAlamatPengurus, isLoading: isLoadingAlamatPengurus } = useSWR("https://my.api.mockaroo.com/next_vbs__cis_alamat.json", async (url) => {
        const data: cis_alamat = await fetch(url, {
            headers: {
                'X-API-Key': 'a14c6770'
            }
        }).then((res) => res.json())
            .catch(() => new Error("Something went wrong"))
        return data
    })

    const nasabahType = dataMaster?.tipe_nas
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
            <DetailMaster data={dataMaster} isLoading={isLoading} />
            {isShowAll && (
                <>
                    {/* perorangan */}
                    {nasabahType === 1 && < DetailPerorangan data={dataPerorangan} isLoading={isLoadingPerorangan} />}
                    {/* perusahaan */}
                    {nasabahType === 2 || nasabahType === 4 && <DetailPerusahaan data={dataPerusahaan} isLoading={isLoadingPerusahaan} />}
                    {/* alamat */}
                    <DetailAlamat data={dataAlamat} isLoading={isLoadingPerusahaan} />
                    {/* pengurus */}
                    {nasabahType != 1 && <DetailPengurus data={dataPengurus} isLoading={isLoadingPengurus} />}
                    {/* alamat pengurus */}
                    {nasabahType != 1 && <DetailAlamatPengurus data={dataAlamatPengurus} isLoading={isLoadingAlamatPengurus} />}
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