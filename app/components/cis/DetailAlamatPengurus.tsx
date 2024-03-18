"use client"

import { motion } from "framer-motion"
import CardField from "../CardField"
import { Divider } from "@nextui-org/divider";

const DetailAlamatPengurus = () => {
    return (
        <motion.div className="mt-3"
            initial={{ translateY: 1000, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 1000, opacity: 0 }}
            transition={{
                type: "spring",
                duration: 0.5,
            }}>
            <h2 className="font-medium md:text-lg">Informasi Alamat Pengurus</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* jenis alamat */}
                <CardField label="Jenis Alamat Pengurus" value="###" />
                {/* negara */}
                <CardField label="Negara Pengurus" value="###" />
                {/* provinsi */}
                <CardField label="Provinsi" value="###" />
                {/* kota */}
                <CardField label="Kota" value="###" />
                {/* kecamatan */}
                <CardField label="Kecamatan" value="###" />
                {/* kelurahan */}
                <CardField label="Kelurahan" value="###" />
                {/* rt rw */}
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <CardField label="RT" value="###" />
                    <CardField label="RW" value="###" />
                </div>
                {/* kode pos */}
                <CardField label="Kode Pos" value="###" />
                {/* alamat detail */}
                <div className="md:col-span-2">
                    <CardField label="Detail Alamat Pengurus" value="###" isTextarea />
                </div>
            </div>
        </motion.div>
    )
}

export default DetailAlamatPengurus