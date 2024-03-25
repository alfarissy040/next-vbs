"use client"

import { motion } from "framer-motion"
import CardField from "../CardField"
import { Divider } from "@nextui-org/divider";
import { cis_pengurus } from "@prisma/client";
import { getFormatedDate } from "@/app/utilities/action";

interface DetailPengurusProps {
    data?: cis_pengurus
    isLoading: boolean
}

const DetailPengurus: React.FC<DetailPengurusProps> = ({ data, isLoading }) => {
    return (
        <motion.div className="mt-3"
            initial={{ translateY: 1000, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 1000, opacity: 0 }}
            transition={{
                type: "spring",
                duration: 0.5,
            }}>
            <Divider />
            <h2 className="font-medium md:text-lg">Informasi Pengurus</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* Jenis Pengurus (jns_pengurus) - String */}
                <CardField label="Jenis Pengurus" value={data?.jns_pengurus} />
                {/* Nama Pengurus (nm_nas) - String */}
                <CardField label="Nama Pengurus" value={data?.nm_nas} />
                {/* Jenis Identitas (jns_ident) - Int */}
                <CardField label="Jenis Identitas" value={data?.jns_ident} />
                {/* Nomor Identitas (no_ident) - String */}
                <CardField label="Nomor Identitas" value={data?.no_ident} />
                {/* Kewarganegaraan (kewarganegaraan) - String */}
                <CardField label="Kewarganegaraan" value={data?.kewarganegaraan} />
                {/* Tanggal Identitas (tgl_ident) - DateTime */}
                {data?.masa_ident === 1 ? (
                    <CardField label="Masa Belaku Identitas" value='Seumur Hidup' />
                ) : (
                    <CardField label="Tanggal Masa Identitas" value={getFormatedDate(data?.tgl_ident ?? "")} />
                )}
                {/* Tempat Lahir (tempat_lahir) - String */}
                <CardField label="Tempat Lahir" value={data?.tempat_lahir} />
                {/* Tanggal Lahir (tgl_lahir) - DateTime */}
                <CardField label="Tanggal Lahir" value={getFormatedDate(data?.tgl_lahir ?? "")} />
                {/* Nomor HP (no_hp) - String */}
                <CardField label="Nomor HP" value={data?.no_hp} />
                {/* Nomor Telepon (no_telp) - String */}
                <CardField label="Nomor Telepon" value={data?.no_telp} />
                {/* Email (email) - String */}
                <CardField label="Email" value={data?.email} />
                {/* Nama Ibu Kandung (nm_ibu) - String */}
                <CardField label="Nama Ibu Kandung" value={data?.nm_ibu} />
                {/* Jabatan (jabatan) - String */}
                <CardField label="Jabatan" value={data?.jabatan} />
                {/* Kepemilikan (kepemilikan) - Int */}
                <CardField label="Kepemilikan" value={`${data?.kepemilikan} %`} />
                {/* NPWP (npwp) - String */}
                <CardField label="NPWP" value={data?.npwp} />
            </div>
        </motion.div>
    )
}

export default DetailPengurus