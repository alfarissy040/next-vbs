"use client";

import { Divider } from "@nextui-org/divider";
import { motion } from "framer-motion";
import CardField from "../../CardField";
import { extendCisPerusahaan } from "@prisma/client";
import moment from "moment";

interface DetailPerusahaanProps {
    data?: extendCisPerusahaan;
    isLoading: boolean;
}

const DetailPerusahaan: React.FC<DetailPerusahaanProps> = ({ data }) => {
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
            <h2 className="font-medium md:text-lg">Informasi Perusahaan</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* 4. Group Nasabah (group_nas) - String */}
                <CardField label="Group Nasabah" value={data?.grup_nasabah.keterangan} />
                {/* 5. Modal Sendiri (modal_sendiri) - String */}
                <CardField label="Modal Sendiri" value={data?.modal_sendiri} />
                {/* 6. Modal Setor (modal_setor) - String */}
                <CardField label="Modal yang disetor" value={data?.modal_setor} />
                {/* 7. Termasuk Bank (flag_bank) - Boolean */}
                <CardField label="Perusahaan Bank" value={data?.flag_bank ? "Bank" : "Bukan Bank"} />
                {/* 8. Nomor Akte Awal (no_akte_awal) - String */}
                <CardField label="Nomor Akte Awal" value={data?.no_akte_awal} />
                {/* 9. Tanggal Akte Awal (tgl_akte_awal) - DateTime */}
                <CardField label="Tanggal Akte Awal" value={moment(data?.tgl_akte_awal).format("DD MMMM YYYY") ?? ""} />
                {/* 10. Nomor Akte Akhir (no_akte_akhir) - String */}
                <CardField label="Nomor Akte Akhir" value={data?.no_akte_akhir} />
                {/* 11. Tanggal Akte Akhir (tgl_akte_akhir) - DateTime */}
                <CardField label="Tanggal Akte Awal" value={moment(data?.tgl_akte_akhir).format("DD MMMM YYYY") ?? ""} />
                {/* 12. Nama Notaris (nm_notaris) - String */}
                <CardField label="Nama Notaris" value={data?.nm_notaris} />
                {/* 13. Nomor Notaris (no_notaris) - String */}
                <CardField label="Nomor Notaris" value={data?.no_notaris} />
                {/* 14. Tanggal Notaris (tgl_notaris) - DateTime */}
                <CardField label="Tanggal Notaris" value={moment(data?.tgl_notaris).format("DD MMMM YYYY") ?? ""} />
                {/* 15. Nomor Permohonan Departemen (no_permohonan_dep) - String */}
                <CardField label="Nomor Permohonan Departemen" value={data?.no_permohonan_dep} />
                {/* 16. Tanggal Permohonan Departemen (tgl_permohonan_dep) - DateTime */}
                <CardField label="Tanggal Permohonan Departemen" value={moment(data?.tgl_permohonan_dep).format("DD MMMM YYYY") ?? ""} />
                {/* 17. Nomor Izin Departemen (no_izin_dep) - String */}
                <CardField label="Nomor Izin Departemen" value={data?.no_izin_dep} />
                {/* 18. Tanggal Izin Departemen (tgl_izin_dep) - DateTime */}
                <CardField label="Tanggal Izin Departemen" value={moment(data?.tgl_izin_dep).format("DD MMMM YYYY") ?? ""} />
                {/* 19. Nomor Publikasi (no_pub) - String */}
                <CardField label="Nomor Publikasi" value={data?.no_pub} />
                {/* 20. Tanggal Publikasi (tgl_pub) - DateTime */}
                <CardField label="Tanggal Publikasi" value={moment(data?.tgl_pub).format("DD MMMM YYYY")} />
            </div>
        </motion.div>
    );
};

export default DetailPerusahaan;
