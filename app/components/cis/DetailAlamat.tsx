"use client";

import { paraJenisAlamat } from "@/app/utilities/staticParameter";
import { Divider } from "@nextui-org/divider";
import { extendCisAlamat } from "@prisma/client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import CardField from "../CardField";

interface DetailAlamatProps {
    data?: extendCisAlamat;
    isLoading: boolean;
}

const DetailAlamat: React.FC<DetailAlamatProps> = ({ data }) => {
    const jenisAlamat = useMemo(() => paraJenisAlamat.find((item) => item.value === data?.jns_alamat), [data?.jns_alamat]);
    return (
        <motion.div
            className="mt-3"
            initial={{ translateY: 1000, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 1000, opacity: 0 }}
            transition={{
                type: "spring",
                duration: 0.5,
            }}
        >
            <Divider />
            <h2 className="font-medium md:text-lg">Alamat</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* jenis alamat */}
                <CardField label="Jenis Alamat" value={jenisAlamat?.label} />
                {/* negara */}
                <CardField label="Negara" value={data?.negara.keterangan} />
                {/* provinsi */}
                <CardField label="Provinsi" value={data?.provinsi.keterangan} />
                {/* kota */}
                <CardField label="Kota" value={data?.kota.keterangan} />
                {/* kecamatan */}
                <CardField label="Kecamatan" value={data?.kecamatan.keterangan} />
                {/* kelurahan */}
                <CardField label="Kelurahan" value={data?.kelurahan.keterangan} />
                {/* rt rw */}
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <CardField label="RT" value={data?.rt} />
                    <CardField label="RW" value={data?.rw} />
                </div>
                {/* kode pos */}
                <CardField label="Kode Pos" value={data?.kd_pos} />
                {/* alamat detail */}
                <div className="md:col-span-2">
                    <CardField label="Detail Alamat" value={data?.alamat_detail} isTextarea />
                </div>
            </div>
        </motion.div>
    );
};

export default DetailAlamat;
