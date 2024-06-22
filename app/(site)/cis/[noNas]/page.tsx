"use client";

import DetailAlamat from "@/app/components/cis/DetailAlamat";
import DetailAlamatPengurus from "@/app/components/cis/DetailAlamatPengurus";
import DetailMaster from "@/app/components/cis/DetailMaster";
import DetailPengurus from "@/app/components/cis/DetailPengurus";
import DetailPerorangan from "@/app/components/cis/DetailPerorangan";
import DetailPerusahaan from "@/app/components/cis/create/DetailPerusahaan";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { extendCisAlamat, extendCisMaster, extendCisPengurus, extendCisPerorangan, extendCisPerusahaan } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

interface IParamSlug {
    noNas: string;
}

const PageDetail = ({ params }: { params: IParamSlug }) => {
    const { noNas } = params;
    const [isShowAll, setIsShowAll] = useState(false);

    const { data, isLoading, error } = useSWR(`/api/cis/${noNas}`, async (url) => {
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "force-cache",
            next: { revalidate: 5, tags: [url] },
        });
        return (await res.json()) as extendCisMaster;
    });

    const nasabahType = data?.tipe_nas;
    return (
        <section>
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold">Detail Nasabah</h1>
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
                        <Link href="/cis" passHref>
                            Informasi Customer
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Detail Nasabah</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            {/* master */}
            <DetailMaster data={data as extendCisMaster} />
            {isShowAll && (
                <>
                    {/* perorangan */}
                    {nasabahType === 1 && <DetailPerorangan data={data?.cis_perorangan as extendCisPerorangan} isLoading={isLoading} />}
                    {/* perusahaan */}
                    {nasabahType === 2 || (nasabahType === 4 && <DetailPerusahaan data={data?.cis_perusahaan as extendCisPerusahaan} isLoading={isLoading} />)}
                    {/* alamat */}
                    <DetailAlamat data={data?.alamat ?? undefined} isLoading={isLoading} />
                    {/* pengurus */}
                    {nasabahType !== 1 && <DetailPengurus data={data?.cis_pengurus as extendCisPengurus} isLoading={isLoading} />}
                    {/* alamat pengurus */}
                    {nasabahType !== 1 && <DetailAlamatPengurus data={(data?.cis_pengurus as extendCisPengurus)?.cis_alamat} isLoading={isLoading} />}
                </>
            )}

            <div className="flex items-center justify-center py-3">
                {!isShowAll && (
                    <Button color="primary" radius="full" onClick={() => setIsShowAll(true)}>
                        Selengkapnya
                    </Button>
                )}
            </div>
        </section>
    );
};

export default PageDetail;
