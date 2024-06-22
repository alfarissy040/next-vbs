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

const DetailPerorangan: React.FC<DetailPeroranganPorps> = ({ data }) => {
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
                <CardField label="Nama Ibu" value={data?.nm_ibu} />
                {/* tempat lahir */}
                <CardField label="Tempat Lahir" value={data?.tempat_lahir} />
                {/* tanggal lahir */}
                <CardField label="Tanggal Lahir" value={moment(data?.tgl_lahir).format("DD MMMM YYYY") ?? ""} />
                {/* jenis kelamin */}
                <CardField label="Jenis Kelamin" value={data?.jns_kelamin.toLowerCase() === "l"? "Laki-laki":"Perempuan"} />
                {/* flag karyawan */}
                <CardField label="Karyawan Bank Sendiri" value={data?.flag_karyawan ? "Karyawan Sendiri" : "Bukan Karyawan"} />
                {/* status pernikahan */}
                <CardField label="Status Pernikahan" value={data?.status_nikah.keterangan} />
                {/* nama pasangan */}
                <CardField label="Nama Pasangan" value={data?.nm_pasangan} />
                {/* no ident pasangan */}
                <CardField label="Nomor Identitas Pasangan" value={data?.no_ident_pasangan} />
                {/* nama ahli waris */}
                <CardField label="Nama Ahli Waris" value={data?.nm_ahli_waris} />
                {/* agama */}
                <CardField label="Agama" value={data?.agama.keterangan} />
                {/* kewarganegaraan */}
                <CardField label="Kewarganegaraan" value={data?.negara.keterangan} />
                {/* profesi */}
                <CardField label="Profesi" value={data?.profesi.keterangan} />
                {/* jenis pekerjaan */}
                <CardField label="Jenis Pekerjaan" value={data?.jenis_pekerjaan.keterangan} />
                {/* jabatan */}
                <CardField label="Jabatan" value={data?.jabatan} />
                {/* nama kantor */}
                <CardField label="Nama Kantor" value={data?.nm_kntr} />
            </div>
        </motion.div>
    );
};

export default DetailPerorangan;
