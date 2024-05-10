"use client";

import useFetchParameter from "@/app/hooks/useFetchParameter";
import { para_agama, para_jns_ident, para_negara } from "@prisma/client";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import FormInput from "../../FormInput";
import FormSelect from "../FormSelect";

interface CreatePengurusProps {
    navDirection: TNavDirection;
    typeNasabah: TNasabahType;
    formMethod: UseFormReturn<FieldValues>;
    kdTypeNasabah: number;
}

const CreatePengurus: React.FC<CreatePengurusProps> = ({ navDirection, typeNasabah, formMethod }) => {
    const { unregister, getValues } = formMethod;

    const { convertedData: IJnsIdent, isLoading: isLoadingJnsIdent } = useFetchParameter<para_jns_ident>({
        parameter: "jenis-identitas",
        queryParams: { "jenis-nasabah": 1 },
    });
    const { convertedData: IAgama, isLoading: isLoadingAgama } = useFetchParameter<para_agama>({
        parameter: "agama",
    });
    const { convertedData: INegara, isLoading: isLoadingNegara } = useFetchParameter<para_negara>({
        parameter: "negara",
    });

    const getMasaIdent = useMemo(() => getValues("pengurus.masa_ident"), [getValues]);

    useEffect(() => {
        if (getMasaIdent !== "1") {
            unregister("pengurus.tgl_ident");
        }
    }, [getMasaIdent, unregister]);
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
                Nasabah Tipe <b className="capitalize">{typeNasabah.toLowerCase()}</b> - Informasi Pengurus
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* Nama Pengurus (nm_nas) - String */}
                <FormInput type="text" formMethod={formMethod} id="pengurus.nm_nas" label="Nama Pengurus" placeholder="Masukan Nama Pengurus" isRequired />
                {/* Jenis Identitas (jns_ident) - Int */}
                <FormSelect items={IJnsIdent} isLoading={isLoadingJnsIdent} formMethod={formMethod} id="pengurus.kd_jns_ident" label="Jenis Identitas" placeholder="Pilih Jenis Identitas" isRequired />
                {/* Nomor Identitas (no_ident) - String */}
                <FormInput type="text" inputMode="numeric" formMethod={formMethod} id="pengurus.no_ident" label="Nomor Identitas" placeholder="Masukan Nomor Identitas" isRequired />
                {/* agama */}
                <FormSelect isLoading={isLoadingAgama} items={IAgama} formMethod={formMethod} id="kd_agama" label="Agama" placeholder="Pilih Agama" isRequired />
                {/* Kewarganegaraan (kewarganegaraan) - String */}
                <FormSelect items={INegara} isLoading={isLoadingNegara} formMethod={formMethod} id="pengurus.kd_kewarganegaraan" label="Kewarganegaraan" placeholder="Pilih Kewarganegaraan" isRequired />
                {/* Masa Berlaku Identitas (masa_ident) - String */}
                <FormSelect
                    items={[
                        { label: "Seumur Hidup", value: "1" },
                        { label: "Berlaku Sampai", value: "0" },
                    ]}
                    formMethod={formMethod}
                    id="pengurus.masa_ident"
                    label="Masa Belaku Identitas"
                    placeholder="Pilih Masa Belaku Identitas"
                    isRequired
                />
                {/* Tanggal Identitas (tgl_ident) - DateTime */}
                {getMasaIdent !== "1" && <FormInput type="date" label="Tanggal Masa Identitas" formMethod={formMethod} id="pengurus.tgl_ident" placeholder="Masukan Tanggal Masa Identitas" max={moment().format("YYYY-MM-DD")} isRequired />}
                {/* Tempat Lahir (tempat_lahir) - String */}
                <FormInput type="text" label="Tempat Lahir" formMethod={formMethod} id="pengurus.tempat_lahir" placeholder="Masukan Tempat Lahir" isRequired />
                {/* Tanggal Lahir (tgl_lahir) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="pengurus.tgl_lahir" label="Tanggal Lahir" placeholder="Masukan Tanggal Lahir" max={moment().format("YYYY-MM-DD")} isRequired />
                {/* Nomor HP (no_hp) - String */}
                <FormInput
                    type="text"
                    formMethod={formMethod}
                    id="pengurus.no_hp"
                    label="Nomor HP"
                    placeholder="Masukan Nomor HP"
                    rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Hanya angka yang diperbolehkan",
                        },
                    }}
                    inputMode="numeric"
                    isRequired
                />
                {/* Nomor Telepon (no_telp) - String */}
                <FormInput
                    type="text"
                    formMethod={formMethod}
                    id="pengurus.no_telp"
                    label="Nomor Telepon"
                    placeholder="Masukan Nomor Telepon"
                    rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Hanya angka yang diperbolehkan",
                        },
                    }}
                    inputMode="numeric"
                />
                {/* Email (email) - String */}
                <FormInput type="email" formMethod={formMethod} id="pengurus.email" label="Email" placeholder="Masukan Email" inputMode="email" isRequired />
                {/* Nama Ibu Kandung (nm_ibu) - String */}
                <FormInput type="text" formMethod={formMethod} id="pengurus.nm_ibu" label="Nama Ibu Kandung" placeholder="Masukan Nama Ibu Kandung" isRequired />
                {/* Jabatan (jabatan) - String */}
                <FormInput type="text" formMethod={formMethod} id="pengurus.jabatan" label="Jabatan" placeholder="Masukan Jabatan" isRequired />
                {/* Kepemilikan (kepemilikan) - Int */}
                <FormInput
                    type="text"
                    formMethod={formMethod}
                    id="pengurus.kepemilikan"
                    label="Kepemilikan"
                    placeholder="Masukan Kepemilikan"
                    rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Hanya angka yang diperbolehkan",
                        },
                    }}
                    inputMode="numeric"
                    prefix="%"
                    isRequired
                />
                {/* NPWP (npwp) - String */}
                <FormInput
                    type="text"
                    formMethod={formMethod}
                    id="pengurus.npwp"
                    label="NPWP"
                    placeholder="Masukan NPWP"
                    rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Hanya angka yang diperbolehkan",
                        },
                    }}
                    inputMode="numeric"
                    isRequired
                />
            </div>
        </motion.div>
    );
};

export default CreatePengurus;
