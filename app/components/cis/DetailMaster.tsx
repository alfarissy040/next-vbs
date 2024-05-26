"use client";

import moment from "moment";
import CardField from "../CardField";
import { extendCisMaster } from "@prisma/client";

interface DetailMasterProps {
    data?: extendCisMaster;
}

const DetailMaster: React.FC<DetailMasterProps> = ({ data }) => {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
            {/* nama nasabah */}
            <CardField label="Nama Lengkap" value={data?.nm_nas} />
            {/* jenis identitas */}
            <CardField label="Jenis Identitas" value={data?.jenis_identitas?.keterangan} />
            {/* nomor identitas */}
            <CardField label="Nomor Identitas" value={data?.no_ident} />
            {/* tanggal identitas */}
            {data?.masa_ident === 1 ? <CardField label="Masa Belaku Identitas" value="Seumur Hidup" /> : <CardField label="Tanggal Masa Identitas" value={moment(data?.tgl_ident).format("DD MMMM YYYY") ?? ""} />}
            {/* bentuk hukum */}
            <CardField label="Bentuk Hukum" value={data?.bentuk_hukum.keterangan} />
            {/* golongan pemilik */}
            <CardField label="Golongan Pemilik" value={data?.golongan_pemilik.keterangan} />
            {/* sumber dana */}
            <CardField label="Sumber Dana" value={data?.sumber_dana.keterangan} />
            {/* tujuan dana */}
            <CardField label="Tujuan Dana" value={data?.tujuan_dana.keterangan} />
            {/* maksimal transaksi */}
            <CardField label="Maskimal Transaksi" value={data?.transaksi.keterangan} />
            {/* penghasilan bulanan */}
            <CardField label="Penghasilan Bulanan" value={data?.penghasilan.keterangan} />
            {/* penghasilan lainnya */}
            <CardField label="Penghasilan Lainnya" value={data?.penghasilan_lainnya?.keterangan} />
            {/* pengeluaran bulanan */}
            <CardField label="Pengeluaran Bulanan" value={data?.pengeluaran.keterangan} />
            {/* pengeluaran lainnya */}
            <CardField label="Pengeluaran Lainnya" value={data?.pengeluaran_lainnya?.keterangan} />
            {/* npwp */}
            <CardField label="NPWP" value={data?.npwp} />
            {/* no telp */}
            <CardField label="Nomor Telp" value={data?.no_telp} />
            {/* email */}
            <CardField label="Email" value={data?.email} />
            {/* bidang usaha */}
            <CardField label="Bidang Usaha" value={data?.bidang_usaha?.keterangan} />
            {/* flag hubungan bank */}
            <CardField label="Hubungan Bank" value={data?.flag_hub_bank ? "Berhubungan dengan Bank" : "Tidak Berhubungan dengan Bank"} />
        </div>
    );
};

export default DetailMaster;
