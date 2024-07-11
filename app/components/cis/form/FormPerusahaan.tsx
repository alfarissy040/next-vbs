"use client";

import useFetchParameter from "@/app/hooks/useFetchParameter";
import { convertToSelectObject } from "@/app/utilities/action";
import { convertToDate } from "@/app/utilities/Cis";
import { findStaticParameterValue, paraKategoriBank } from "@/app/utilities/staticParameter";
import { extendCisPerusahaan, para_grup_nas } from "@prisma/client";
import { motion } from "framer-motion";
import moment from "moment";
import { FieldValues, UseFormReturn } from "react-hook-form";
import FormInput from "../../FormInput";
import FormSelect from "../FormSelect";

interface FormPerusahaanProps {
    navDirection: TNavDirection;
    kdTypeNasabah: number;
    handleReset?: () => void;
    typeNasabah: TNasabahType;
    formMethod: UseFormReturn<FieldValues>;
    isLoading?: boolean;
    defaultValue?: extendCisPerusahaan
}

const FormPerusahaan: React.FC<FormPerusahaanProps> = ({ navDirection, handleReset, typeNasabah, kdTypeNasabah, formMethod, isLoading = false, defaultValue }) => {
    const { convertedData: IGropNasabah, isLoading: isLoadingGropNasabah } = useFetchParameter<para_grup_nas>({ parameter: "group-nasabah" });
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
            className="rounded-lg shadow-lg w-full p-3 bg-slate-100 dark:bg-slate-800"
        >
            <h2 className="font-medium md:text-lg">
                Nasabah Tipe <b className="capitalize">{typeNasabah.toLowerCase()}</b> - Informasi <span className="capitalize">{typeNasabah.toLowerCase()}</span>
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* 4. Group Nasabah (group_nas) - String */}
                <FormSelect isLoading={isLoadingGropNasabah} items={IGropNasabah} formMethod={formMethod} id="kd_group_nas" label="Group Nasabah" placeholder="Pilih Group Nasabah" defaultValue={convertToSelectObject(defaultValue?.grup_nasabah)} isRequired />
                {/* 5. Modal Sendiri (modal_sendiri) - String */}
                <FormInput type="number" formMethod={formMethod} id="modal_sendiri" label="Modal Sendiri" placeholder="Masukan Modal Sendiri" defaultValue={defaultValue?.modal_sendiri} isRequired />
                {/* 6. Modal yang disetor (modal_setor) - String */}
                <FormInput type="number" formMethod={formMethod} id="modal_setor" label="Modal yang disetor" placeholder="Masukan Modal yang disetor" defaultValue={defaultValue?.modal_setor} isRequired />
                {/* 7. Termasuk Bank (flag_bank) - Boolean */}
                <FormSelect
                    items={paraKategoriBank}
                    formMethod={formMethod}
                    id="flag_bank"
                    label="Kategori Perusahaan"
                    placeholder="Pilih Kategori Perusahaan"
                    defaultValue={findStaticParameterValue(paraKategoriBank, defaultValue?.flag_bank ? "Y" : "T")}
                    isRequired
                />
                {/* 8. Nomor Akte Awal (no_akte_awal) - String */}
                <FormInput type="text" formMethod={formMethod} id="no_akte_awal" label="Nomor Akte Awal" placeholder="Masukan Nomor Akte Awal" defaultValue={defaultValue?.no_akte_awal} isRequired />
                {/* 9. Tanggal Akte Awal (tgl_akte_awal) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="tgl_akte_awal" label="Tanggal Akte Awal" placeholder="Masukan Tanggal Akte Awal" max={moment().format("YYYY-MM-DD")} defaultValue={convertToDate(defaultValue?.tgl_akte_awal, "YYYY-MM-DD")} isRequired />
                {/* 10. Nomor Akte Akhir (no_akte_akhir) - String */}
                <FormInput type="text" formMethod={formMethod} id="no_akte_akhir" label="Nomor Akte Akhir" placeholder="Masukan Nomor Akte Akhir" defaultValue={defaultValue?.no_akte_akhir} isRequired />
                {/* 11. Tanggal Akte Akhir (tgl_akte_akhir) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="tgl_akte_akhir" label="Tanggal Akte Akhir" placeholder="Masukan Tanggal Akte Awal" defaultValue={convertToDate(defaultValue?.tgl_akte_akhir, "YYYY-MM-DD")} min={moment().format("YYYY-MM-DD")} isRequired />
                {/* 12. Nama Notaris (nm_notaris) - String */}
                <FormInput type="text" formMethod={formMethod} id="nm_notaris" label="Nama Notaris" placeholder="Masukan Nama Notaris" defaultValue={defaultValue?.nm_notaris} isRequired />
                {/* 13. Nomor Notaris (no_notaris) - String */}
                <FormInput type="text" formMethod={formMethod} id="no_notaris" label="Nomor Notaris" placeholder="Masukan Nomor Notaris" defaultValue={defaultValue?.no_notaris} isRequired />
                {/* 14. Tanggal Notaris (tgl_notaris) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="tgl_notaris" label="Tanggal Notaris" placeholder="Masukan Tanggal Notaris" max={moment().format("YYYY-MM-DD")} defaultValue={convertToDate(defaultValue?.tgl_notaris, "YYYY-MM-DD")} isRequired />
                {/* 15. Nomor Permohonan Departemen (no_permohonan_dep) - String */}
                <FormInput type="text" formMethod={formMethod} id="no_permohonan_dep" label="Nomor Permohonan Departemen" placeholder="Masukan Nomor Permohonan Departemen" defaultValue={defaultValue?.no_permohonan_dep} isRequired />
                {/* 16. Tanggal Permohonan Departemen (tgl_permohonan_dep) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="tgl_permohonan_dep" label="Tanggal Permohonan Departemen" placeholder="Masukan Tanggal Permohonan Departemen" max={moment().format("YYYY-MM-DD")} defaultValue={convertToDate(defaultValue?.tgl_permohonan_dep, "YYYY-MM-DD")} isRequired />
                {/* 17. Nomor Izin Departemen (no_izin_dep) - String */}
                <FormInput type="text" formMethod={formMethod} id="no_izin_dep" label="Nomor Izin Departemen" placeholder="Masukan Nomor Izin Departemen" defaultValue={defaultValue?.no_izin_dep} isRequired />
                {/* 18. Tanggal Izin Departemen (tgl_izin_dep) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="tgl_izin_dep" label="Tanggal Izin Departemen" placeholder="Masukan Tanggal Izin Departemen" max={moment().format("YYYY-MM-DD")} defaultValue={convertToDate(defaultValue?.tgl_izin_dep, "YYYY-MM-DD")} isRequired />
                {/* 19. Nomor Publikasi (no_pub) - String */}
                <FormInput type="text" formMethod={formMethod} id="no_pub" label="Nomor Publikasi" placeholder="Masukan Nomor Publikasi" defaultValue={defaultValue?.no_pub} isRequired />
                {/* 20. Tanggal Publikasi (tgl_pub) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="tgl_pub" label="Tanggal Publikasi" placeholder="Masukan Tanggal Publikasi" max={moment().format("YYYY-MM-DD")} defaultValue={convertToDate(defaultValue?.tgl_pub, "YYYY-MM-DD")} isRequired />
            </div>
        </motion.div>
    );
};

export default FormPerusahaan;
