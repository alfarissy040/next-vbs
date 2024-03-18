"use client"

import { motion } from "framer-motion"
import CardField from "../CardField"
import { Divider } from "@nextui-org/divider";

const DetailPengurus = () => {
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
                <CardField label="Jenis Pengurus" value="###" />
                {/* Nama Pengurus (nm_nas) - String */}
                <CardField label="Nama Pengurus" value="###" />
                {/* Jenis Identitas (jns_ident) - Int */}
                <CardField label="Jenis Identitas" value="###" />
                {/* Nomor Identitas (no_ident) - String */}
                <CardField label="Nomor Identitas" value="###" />
                {/* Kewarganegaraan (kewarganegaraan) - String */}
                <CardField label="Kewarganegaraan" value="###" />
                {/* Masa Berlaku Identitas (masa_ident) - String */}
                <CardField label="Masa Belaku Identitas" value="###" />
                {/* Tanggal Identitas (tgl_ident) - DateTime */}
                <CardField label="Tanggal Masa Identitas" value="###" />
                {/* Tempat Lahir (tempat_lahir) - String */}
                <CardField label="Tempat Lahir" value="###" />
                {/* Tanggal Lahir (tgl_lahir) - DateTime */}
                <CardField label="Tanggal Lahir" value="###" />
                {/* Nomor HP (no_hp) - String */}
                <CardField label="Nomor HP" value="###" />
                {/* Nomor Telepon (no_telp) - String */}
                <CardField label="Nomor Telepon" value="###" />
                {/* Email (email) - String */}
                <CardField label="Email" value="###" />
                {/* Nama Ibu Kandung (nm_ibu) - String */}
                <CardField label="Nama Ibu Kandung" value="###" />
                {/* Jabatan (jabatan) - String */}
                <CardField label="Jabatan" value="###" />
                {/* Kepemilikan (kepemilikan) - Int */}
                <CardField label="Kepemilikan" value="###" />
                {/* NPWP (npwp) - String */}
                <CardField label="NPWP" value="###" />
            </div>
        </motion.div>
    )
}

export default DetailPengurus