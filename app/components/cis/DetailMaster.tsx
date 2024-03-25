"use client"

import { cis_master } from "@prisma/client"
import CardField from "../CardField"
import { getFormatedDate } from "@/app/utilities/action"
import useParameter from "@/app/hooks/useParameter"

interface DetailMasterProps {
    data?: cis_master
    isLoading: boolean
}

const DetailMaster: React.FC<DetailMasterProps> = ({ data, isLoading }) => {
    const { getJnsIdent, getBntkHkm } = useParameter()
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
            {/* nama nasabah */}
            <CardField label="Nama Lengkap" value={data?.nm_nas} />
            {/* jenis identitas */}
            <CardField label="Jenis Identitas" value={getJnsIdent(data?.jns_ident)?.[0].keterangan} />
            {/* nomor identitas */}
            <CardField label="Nomor Identitas" value={data?.no_ident} />
            {/* tanggal identitas */}
            {data?.masa_ident === 1 ? (
                <CardField label="Masa Belaku Identitas" value='Seumur Hidup' />
            ) : (
                <CardField label="Tanggal Masa Identitas" value={getFormatedDate(data?.tgl_ident ?? "")} />
            )}
            {/* bentuk hukum */}
            <CardField label="Bentuk Hukum" value={getBntkHkm(data?.bntk_hkm)?.[0]?.keterangan} />
            {/* golongan pemilik */}
            <CardField label="Golongan Pemilik" value={data?.gol_pemilik} />
            {/* sumber dana */}
            <CardField label="Sumber Dana" value={data?.sumber_dana} />
            {/* tujuan dana */}
            <CardField label="Tujuan Dana" value={data?.tujuan_dana} />
            {/* maksimal transaksi */}
            <CardField label="Maskimal Transaksi" value={data?.maks_trans} />
            {/* penghasilan bulanan */}
            <CardField label="Penghasilan Bulanan" value={data?.penghasilan_bulan} />
            {/* penghasilan lainnya */}
            <CardField label="Penghasilan Lainnya" value={data?.penghasilan_lainnya as unknown as string} />
            {/* pengeluaran bulanan */}
            <CardField label="Pengeluaran Bulanan" value={data?.pengeluaran_bulan} />
            {/* pengeluaran lainnya */}
            <CardField label="Pengeluaran Lainnya" value={data?.pengeluaran_lainnya as unknown as string} />
            {/* npwp */}
            <CardField label="NPWP" value={data?.npwp as unknown as string} />
            {/* no telp */}
            <CardField label="Nomor Telp" value={data?.no_telp} />
            {/* email */}
            <CardField label="Email" value={data?.email} />
            {/* bidang usaha */}
            <CardField label="Bidang Usaha" value={data?.bidang_usaha as unknown as string} />
            {/* flag hubungan bank */}
            <CardField label="Hubungan Bank" value={data?.flag_hub_bank ? "Berhubungan dengan Bank" : "Tidak Berhubungan dengan Bank"} />
        </div>
    )
}

export default DetailMaster