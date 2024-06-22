"use client";

import useFetchParameter from "@/app/hooks/useFetchParameter";
import { cis_pengurus, para_agama, para_jns_ident, para_negara } from "@prisma/client";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import FormInput from "../../FormInput";
import FormSelect from "../FormSelect";

interface FormPengurusProps {
    navDirection: TNavDirection;
    typeNasabah: TNasabahType;
    formMethod: UseFormReturn<FieldValues>;
    kdTypeNasabah: number;
    defaultValue?: cis_pengurus
}

const FormPengurus: React.FC<FormPengurusProps> = ({ navDirection, typeNasabah, formMethod, defaultValue }) => {
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
                <FormInput type="text" formMethod={formMethod} id="pengurus.nm_nas" label="Nama Pengurus" placeholder="Masukan Nama Pengurus" defaultValue={defaultValue?.nm_nas} isRequired />
                {/* Jenis Identitas (jns_ident) - Int */}
                <FormSelect items={IJnsIdent} isLoading={isLoadingJnsIdent} formMethod={formMethod} id="pengurus.kd_jns_ident" label="Jenis Identitas" placeholder="Pilih Jenis Identitas" defaultValue={defaultValue?.kd_jns_ident} isRequired />
                {/* Nomor Identitas (no_ident) - String */}
                <FormInput type="text" inputMode="numeric" formMethod={formMethod} id="pengurus.no_ident" label="Nomor Identitas" placeholder="Masukan Nomor Identitas" isRequired defaultValue={defaultValue?.no_ident} />
                {/* agama */}
                <FormSelect isLoading={isLoadingAgama} items={IAgama} formMethod={formMethod} id="pengurus.kd_agama" label="Agama" placeholder="Pilih Agama" isRequired defaultValue={defaultValue?.kd_agama} />
                {/* Kewarganegaraan (kewarganegaraan) - String */}
                <FormSelect items={INegara} isLoading={isLoadingNegara} formMethod={formMethod} id="pengurus.kd_kewarganegaraan" label="Kewarganegaraan" placeholder="Pilih Kewarganegaraan" isRequired defaultValue={defaultValue?.kd_kewarganegaraan} />
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
                    defaultValue={defaultValue?.masa_ident}
                    isRequired
                />
                {/* Tanggal Identitas (tgl_ident) - DateTime */}
                {getMasaIdent !== "1" && <FormInput type="date" label="Tanggal Masa Identitas" formMethod={formMethod} id="pengurus.tgl_ident" placeholder="Masukan Tanggal Masa Identitas" max={moment().format("YYYY-MM-DD")} defaultValue={defaultValue?.tgl_ident?moment(defaultValue?.tgl_ident).format("YYYY-MM-DD"):""} isRequired />}
                {/* Tempat Lahir (tempat_lahir) - String */}
                <FormInput type="text" label="Tempat Lahir" formMethod={formMethod} id="pengurus.tempat_lahir" placeholder="Masukan Tempat Lahir" defaultValue={defaultValue?.tempat_lahir} isRequired />
                {/* Tanggal Lahir (tgl_lahir) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="pengurus.tgl_lahir" label="Tanggal Lahir" placeholder="Masukan Tanggal Lahir" max={moment().format("YYYY-MM-DD")} defaultValue={defaultValue?.tgl_lahir?moment(defaultValue?.tgl_lahir).format("YYYY-MM-DD"):""} isRequired />
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
                    defaultValue={defaultValue?.no_hp}
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
                    defaultValue={defaultValue?.no_telp}
                />
                {/* Email (email) - String */}
                <FormInput type="email" formMethod={formMethod} id="pengurus.email" label="Email" placeholder="Masukan Email" inputMode="email" defaultValue={defaultValue?.email} isRequired />
                {/* Nama Ibu Kandung (nm_ibu) - String */}
                <FormInput type="text" formMethod={formMethod} id="pengurus.nm_ibu" label="Nama Ibu Kandung" placeholder="Masukan Nama Ibu Kandung" defaultValue={defaultValue?.nm_ibu} isRequired />
                {/* Jabatan (jabatan) - String */}
                <FormInput type="text" formMethod={formMethod} id="pengurus.jabatan" label="Jabatan" placeholder="Masukan Jabatan" defaultValue={defaultValue?.jabatan} isRequired />
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
                    defaultValue={defaultValue?.kepemilikan.toString()}
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
                    defaultValue={defaultValue?.npwp}
                    isRequired
                />
            </div>
        </motion.div>
    );
};

export default FormPengurus;
