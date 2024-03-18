"use client"

import CardField from "../CardField"


const DetailMaster = () => {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
            {/* nama nasabah */}
            <CardField label="Nama Lengkap" value="Muhammad Faza Alfarisy" />
            {/* jenis identitas */}
            <CardField label="Jenis Identitas" value="KTP" />
            {/* nomor identitas */}
            <CardField label="Nomor Identitas" value="###" />
            {/* masa berlaku identitas */}
            <CardField label="Masa Belaku Identitas" value="###" />
            {/* tanggal identitas */}
            <CardField label="Tanggal Masa Identitas" value="###" />
            {/* bentuk hukum */}
            <CardField label="Bentuk Hukum" value="###" />
            {/* golongan pemilik */}
            <CardField label="Golongan Pemilik" value="###" />
            {/* sumber dana */}
            <CardField label="Sumber Dana" value="###" />
            {/* tujuan dana */}
            <CardField label="Tujuan Dana" value="###" />
            {/* maksimal transaksi */}
            <CardField label="Maskimal Transaksi" value="###" />
            {/* penghasilan bulanan */}
            <CardField label="Penghasilan Bulanan" value="###" />
            {/* penghasilan lainnya */}
            <CardField label="Penghasilan Lainnya" value="###" />
            {/* pengeluaran bulanan */}
            <CardField label="Pengeluaran Bulanan" value="###" />
            {/* pengeluaran lainnya */}
            <CardField label="Pengeluaran Lainnya" value="###" />
            {/* npwp */}
            <CardField label="NPWP" value="###" />
            {/* no telp */}
            <CardField label="Nomor Telp" value="###" />
            {/* email */}
            <CardField label="Email" value="###" />
            {/* bidang usaha */}
            <CardField label="Bidang Usaha" value="###" />
            {/* flag hubungan bank */}
            <CardField label="Hubungan Bank" value="###" />
        </div>
    )
}

export default DetailMaster