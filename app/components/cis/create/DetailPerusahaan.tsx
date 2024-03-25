"use client"

import { Divider } from "@nextui-org/divider";
import { motion } from "framer-motion";
import CardField from "../../CardField";
import { cis_perusahaan } from "@prisma/client";
import { getFormatedDate } from "@/app/utilities/action";

interface DetailPerusahaanProps {
    data?: cis_perusahaan
    isLoading: boolean
}

const DetailPerusahaan: React.FC<DetailPerusahaanProps> = ({ data, isLoading }) => {
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
            <h2 className="font-medium md:text-lg">Informasi Perusahaan</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* 1. Jenis Usaha Tertentu (jns_usaha_tkt) - String */}
                <CardField label="Jenis Usaha Tertentu" value={data?.jns_usaha_tkt} />
                {/* 2. Nama Kontak (kontak_person) - String */}
                <CardField label="Nama Kontak" value={data?.kontak_person} />
                {/* 4. Group Nasabah (group_nas) - String */}
                <CardField label="Group Nasabah" value={data?.group_nas} />
                {/* 5. Modal Sendiri (modal_sendiri) - String */}
                <CardField label="Modal Sendiri" value={data?.modal_sendiri} />
                {/* 6. Modal Setor (modal_setor) - String */}
                <CardField label="Modal yang disetor" value={data?.modal_setor} />
                {/* 7. Termasuk Bank (flag_bank) - Boolean */}
                <CardField label="Perusahaan Bank" value={data?.flag_bank ? "Bank" : "Bukan Bank"} />
                {/* 8. Nomor Akte Awal (no_akte_awal) - String */}
                <CardField label="Nomor Akte Awal" value={data?.no_akte_awal} />
                {/* 9. Tanggal Akte Awal (tgl_akte_awal) - DateTime */}
                <CardField label="Tanggal Akte Awal" value={getFormatedDate(data?.tgl_akte_awal as unknown as string)} />
                {/* 10. Nomor Akte Akhir (no_akte_akhir) - String */}
                <CardField label="Nomor Akte Akhir" value={data?.no_akte_akhir} />
                {/* 11. Tanggal Akte Akhir (tgl_akte_akhir) - DateTime */}
                <CardField label="Tanggal Akte Awal" value={getFormatedDate(data?.tgl_akte_akhir as unknown as string)} />
                {/* 12. Nama Notaris (nm_notaris) - String */}
                <CardField label="Nama Notaris" value={data?.nm_notaris} />
                {/* 13. Nomor Notaris (no_notaris) - String */}
                <CardField label="Nomor Notaris" value={data?.no_notaris} />
                {/* 14. Tanggal Notaris (tgl_notaris) - DateTime */}
                <CardField label="Tanggal Notaris" value={getFormatedDate(data?.tgl_notaris as unknown as string)} />
                {/* 15. Nomor Permohonan Departemen (no_permohonan_dep) - String */}
                <CardField label="Nomor Permohonan Departemen" value={data?.no_permohonan_dep} />
                {/* 16. Tanggal Permohonan Departemen (tgl_permohonan_dep) - DateTime */}
                <CardField label="Tanggal Permohonan Departemen" value={getFormatedDate(data?.tgl_permohonan_dep as unknown as string)} />
                {/* 17. Nomor Izin Departemen (no_izin_dep) - String */}
                <CardField label="Nomor Izin Departemen" value={data?.no_izin_dep} />
                {/* 18. Tanggal Izin Departemen (tgl_izin_dep) - DateTime */}
                <CardField label="Tanggal Izin Departemen" value={getFormatedDate(data?.tgl_izin_dep as unknown as string)} />
                {/* 19. Nomor Publikasi (no_pub) - String */}
                <CardField label="Nomor Publikasi" value={data?.no_pub} />
                {/* 20. Tanggal Publikasi (tgl_pub) - DateTime */}
                <CardField label="Tanggal Publikasi" value={getFormatedDate(data?.tgl_pub as unknown as string)} />
            </div>
        </motion.div>
    )
}

export default DetailPerusahaan