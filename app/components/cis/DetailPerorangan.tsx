"use client"

import { motion } from "framer-motion"
import CardField from "../CardField"
import { Divider } from "@nextui-org/divider";

const DetailPerorangan = () => {
    return (
        <motion.div className="mt-3"
            initial={{ translateY: 1000, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 1000, opacity: 0 }}
            transition={{
                type: "spring",
                duration: 0.5,
            }}
        >
            <Divider />
            <h2 className="font-medium md:text-lg">Informasi Perorangan</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* nama ibu */}
                <CardField label="Nama Ibu" value="###" />
                {/* tempat lahir */}
                <CardField label="Tempat Lahir" value="###" />
                {/* tanggal lahir */}
                <CardField label="Tanggal Lahir" value="###" />
                {/* jenis kelamin */}
                <CardField label="Jenis Kelamin" value="###" />
                {/* flag karyawan */}
                <CardField label="Karyawan Bank" value="###" />
                {/* status pernikahan */}
                <CardField label="Status Pernikahan" value="###" />
                {/* nama pasangan */}
                <CardField label="Nama Pasangan" value="###" />
                {/* no ident pasangan */}
                <CardField label="Nomor Identitas Pasangan" value="###" />
                {/* nama ahli waris */}
                <CardField label="Nama Ahli Waris" value="###" />
                {/* agama */}
                <CardField label="Agama" value="###" />
                {/* kewarganegaraan */}
                <CardField label="Kewarganegaraan" value="###" />
                {/* profesi */}
                <CardField label="Profesi" value="###" />
                {/* jenis pekerjaan */}
                <CardField label="Jenis Pekerjaan" value="###" />
                {/* jabatan */}
                <CardField label="Jabatan" value="###" />
                {/* nama kantor */}
                <CardField label="Nama Kantor" value="###" />
            </div>
        </motion.div>
    )
}

export default DetailPerorangan