"use client";

import { Divider } from "@nextui-org/divider";
import { extendCisPerorangan } from "@prisma/client";
import { motion } from "framer-motion";
import moment from "moment";
import CardField from "../CardField";

interface DetailPeroranganPorps {
    data?: extendCisPerorangan;
    isLoading: boolean;
}

const DetailPerorangan: React.FC<DetailPeroranganPorps> = ({ data, isLoading }) => {
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
            <h2 className="font-medium md:text-lg">Informasi Perorangan</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* nama ibu */}
                <CardField label="Nama Ibu" value={data?.nm_ibu} isLoading={isLoading} />
                {/* tempat lahir */}
                <CardField label="Tempat Lahir" value={data?.tempat_lahir} isLoading={isLoading} />
                {/* tanggal lahir */}
                <CardField label="Tanggal Lahir" value={moment(data?.tgl_lahir).format("DD MMMM YYYY") ?? ""} isLoading={isLoading} />
                {/* jenis kelamin */}
                <CardField label="Jenis Kelamin" value={data?.jns_kelamin.toLowerCase() === "l" ? "Laki-laki" : "Perempuan"} isLoading={isLoading} />
                {/* flag karyawan */}
                <CardField label="Karyawan Bank Sendiri" value={data?.flag_karyawan ? "Karyawan Sendiri" : "Bukan Karyawan"} isLoading={isLoading} />
                {/* status pernikahan */}
                <CardField label="Status Pernikahan" value={data?.status_nikah.keterangan} isLoading={isLoading} />
                {/* nama pasangan */}
                <CardField label="Nama Pasangan" value={data?.nm_pasangan} isLoading={isLoading} />
                {/* no ident pasangan */}
                <CardField label="Nomor Identitas Pasangan" value={data?.no_ident_pasangan} isLoading={isLoading} />
                {/* nama ahli waris */}
                <CardField label="Nama Ahli Waris" value={data?.nm_ahli_waris} isLoading={isLoading} />
                {/* agama */}
                <CardField label="Agama" value={data?.agama.keterangan} isLoading={isLoading} />
                {/* kewarganegaraan */}
                <CardField label="Kewarganegaraan" value={data?.negara.keterangan} isLoading={isLoading} />
                {/* profesi */}
                <CardField label="Profesi" value={data?.profesi.keterangan} isLoading={isLoading} />
                {/* jenis pekerjaan */}
                <CardField label="Jenis Pekerjaan" value={data?.jenis_pekerjaan.keterangan} isLoading={isLoading} />
                {/* jabatan */}
                <CardField label="Jabatan" value={data?.jabatan} isLoading={isLoading} />
                {/* nama kantor */}
                <CardField label="Nama Kantor" value={data?.nm_kntr} isLoading={isLoading} />
            </div>
        </motion.div>
    );
};

export default DetailPerorangan;
