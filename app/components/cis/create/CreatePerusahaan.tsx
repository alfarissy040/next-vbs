"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import FormInput from "../../FormInput"
import FormSelect from "../FormSelect"
import { FieldValues, UseFormReturn } from "react-hook-form"
import useFetchParameter from "@/app/hooks/useFetchParameter"
import { para_grup_nas, para_jns_usaha_tkt } from "@prisma/client"

interface CreatePerusahaanProps {
    navDirection: TNavDirection;
    typeNasabah: TNasabahType
    formMethod: UseFormReturn<FieldValues>
    kdTypeNasabah: number
}

const CreatePerusahaan: React.FC<CreatePerusahaanProps> = ({ navDirection, typeNasabah, kdTypeNasabah, formMethod }) => {
    const { convertedData: IJnsUsahaTkt, isLoading: isLoadingJnsUsahaTkt, apiUrl: urlJnsUsahaTkt } = useFetchParameter<para_jns_usaha_tkt>("jenis-usaha-tkt")
    const { convertedData: IGropNasabah, isLoading: isLoadingGropNasabah, apiUrl: urlGropNasabah } = useFetchParameter<para_grup_nas>("group-nasabah")
    return (
        <motion.div
            layout
            initial={navDirection === "in" ? { translateX: 1000, opacity: 0, zIndex: 0 } : { translateX: -1000, opacity: 0, zIndex: 0 }}
            animate={{ translateX: 0, opacity: 100, zIndex: 1 }}
            exit={navDirection === "in" ? { translateX: -1000, opacity: 0, zIndex: 0 } : { translateX: 1000, opacity: 0, zIndex: 0 }}
            transition={{
                type: "spring",
                duration: 0.5,
            }}
            className="rounded-lg shadow-lg w-full p-3 bg-slate-100 dark:bg-slate-800">
            <h2 className="font-medium md:text-lg">Nasabah Tipe <b className="capitalize">{typeNasabah.toLowerCase()}</b> - Informasi <span className="capitalize">{typeNasabah.toLowerCase()}</span></h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* 1. Jenis Usaha Tertentu (jns_usaha_tkt) - String */}
                <FormSelect
                    fetchUrl={urlJnsUsahaTkt}
                    isLoading={isLoadingJnsUsahaTkt}
                    items={IJnsUsahaTkt}
                    formMethod={formMethod}
                    id="jns_usaha_tkt"
                    label="Jenis Usaha Tertentu"
                    placeholder="Pilih Jenis Usaha Tertentu"
                    isSearchable
                    isRequired
                />
                {/* 2. Nama Kontak (kontak_person) - String */}
                <FormInput type="text"
                    formMethod={formMethod}
                    id="kontak_person" label="Nama Kontak" placeholder="Masukan Nama Kontak" isRequired />
                {/* 4. Group Nasabah (group_nas) - String */}
                <FormSelect
                    fetchUrl={urlGropNasabah}
                    isLoading={isLoadingGropNasabah}
                    items={IGropNasabah}
                    formMethod={formMethod}
                    id="group_nas"
                    label="Group Nasabah"
                    placeholder="Pilih Group Nasabah"
                    isSearchable
                    isRequired
                />
                {/* 5. Modal Sendiri (modal_sendiri) - String */}
                <FormInput type="number"
                    formMethod={formMethod}
                    id="modal_sendiri" label="Modal Sendiri" placeholder="Masukan Modal Sendiri" isRequired />
                {/* 6. Modal Setor (modal_setor) - String */}
                <FormInput type="number"
                    formMethod={formMethod}
                    id="modal_sendiri" label="Modal Sendiri" placeholder="Masukan Modal Sendiri" isRequired />
                {/* 7. Termasuk Bank (flag_bank) - Boolean */}
                <FormSelect
                    items={[
                        { label: "Bank", value: "Y" },
                        { label: "Bukan Bank", value: "T" },
                    ]}
                    formMethod={formMethod}
                    id="flag_bank"
                    label="Kategori Perusahaan"
                    placeholder="Pilih Kategori Perusahaan"
                    isRequired
                />
                {/* 8. Nomor Akte Awal (no_akte_awal) - String */}
                <FormInput type="text"
                    formMethod={formMethod}
                    id="no_akte_awal" label="Nomor Akte Awal" placeholder="Masukan Nomor Akte Awal" isRequired />
                {/* 9. Tanggal Akte Awal (tgl_akte_awal) - DateTime */}
                <FormInput type="date"
                    formMethod={formMethod}
                    id="tgl_akte_awal" label="Tanggal Akte Awal" placeholder="Masukan Tanggal Akte Awal" max={new Date().toISOString().split('T')[0] as string} isRequired />
                {/* 10. Nomor Akte Akhir (no_akte_akhir) - String */}
                <FormInput type="text"
                    formMethod={formMethod}
                    id="no_akte_akhir" label="Nomor Akte Akhir" placeholder="Masukan Nomor Akte Akhir" isRequired />
                {/* 11. Tanggal Akte Akhir (tgl_akte_akhir) - DateTime */}
                <FormInput type="date"
                    formMethod={formMethod}
                    id="tgl_akte_awal" label="Tanggal Akte Awal" placeholder="Masukan Tanggal Akte Awal" isRequired />
                {/* 12. Nama Notaris (nm_notaris) - String */}
                <FormInput type="text"
                    formMethod={formMethod}
                    id="nm_notaris" label="Nama Notaris" placeholder="Masukan Nama Notaris" isRequired />
                {/* 13. Nomor Notaris (no_notaris) - String */}
                <FormInput type="text"
                    formMethod={formMethod}
                    id="no_notaris" label="Nomor Notaris" placeholder="Masukan Nomor Notaris" isRequired />
                {/* 14. Tanggal Notaris (tgl_notaris) - DateTime */}
                <FormInput type="date"
                    formMethod={formMethod}
                    id="tgl_notaris" label="Tanggal Notaris" placeholder="Masukan Tanggal Notaris" max={new Date().toISOString().split('T')[0] as string} isRequired />
                {/* 15. Nomor Permohonan Departemen (no_permohonan_dep) - String */}
                <FormInput type="text"
                    formMethod={formMethod}
                    id="no_permohonan_dep" label="Nomor Permohonan Departemen" placeholder="Masukan Nomor Permohonan Departemen" isRequired />
                {/* 16. Tanggal Permohonan Departemen (tgl_permohonan_dep) - DateTime */}
                <FormInput type="date"
                    formMethod={formMethod}
                    id="tgl_permohonan_dep" label="Tanggal Permohonan Departemen" placeholder="Masukan Tanggal Permohonan Departemen" max={new Date().toISOString().split('T')[0] as string} isRequired />
                {/* 17. Nomor Izin Departemen (no_izin_dep) - String */}
                <FormInput type="text"
                    formMethod={formMethod}
                    id="no_izin_dep" label="Nomor Izin Departemen" placeholder="Masukan Nomor Izin Departemen" isRequired />
                {/* 18. Tanggal Izin Departemen (tgl_izin_dep) - DateTime */}
                <FormInput type="date"
                    formMethod={formMethod}
                    id="tgl_izin_dep" label="Tanggal Izin Departemen" placeholder="Masukan Tanggal Izin Departemen" max={new Date().toISOString().split('T')[0] as string} isRequired />
                {/* 19. Nomor Publikasi (no_pub) - String */}
                <FormInput type="text"
                    formMethod={formMethod}
                    id="no_pub" label="Nomor Publikasi" placeholder="Masukan Nomor Publikasi" isRequired />
                {/* 20. Tanggal Publikasi (tgl_pub) - DateTime */}
                <FormInput type="date"
                    formMethod={formMethod}
                    id="tgl_permohonan_dep" label="Tanggal Publikasi" placeholder="Masukan Tanggal Publikasi" max={new Date().toISOString().split('T')[0] as string} isRequired />

            </div>
        </motion.div>
    )
}

export default CreatePerusahaan