"use client";

import useFetchPaginateParameter from "@/app/hooks/useFetchPaginateParameter";
import useFetchParameter from "@/app/hooks/useFetchParameter";
import { extendCisPengurus, para_agama, para_jns_ident, para_negara } from "@prisma/client";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import FormInput from "../../FormInput";
import FormSelect from "../FormSelect";
import { convertToSelectObject } from "@/app/utilities/action";
import { findStaticParameterValue, paraMasaBelakuIdentitas } from "@/app/utilities/staticParameter";

interface FormPengurusProps {
    navDirection: TNavDirection;
    typeNasabah: TNasabahType;
    formMethod: UseFormReturn<FieldValues>;
    kdTypeNasabah: number;
    defaultValue?: extendCisPengurus
}

const FormPengurus: React.FC<FormPengurusProps> = ({ navDirection, typeNasabah, formMethod, defaultValue }) => {
    const { unregister, getValues, formState: { errors } } = formMethod;
    const [isForeverMasaIdent, setIsForeverMasaIdent] = useState(((defaultValue?.masa_ident ?? getValues("pengurus.masa_ident") ?? 1)).toString());
    console.log(errors)

    const { convertedData: IJnsIdent, isLoading: isLoadingJnsIdent } = useFetchParameter<para_jns_ident>({
        parameter: "jenis-identitas",
        queryParams: { "jenis-nasabah": 1 },
    });
    const { convertedData: IAgama, isLoading: isLoadingAgama } = useFetchParameter<para_agama>({
        parameter: "agama",
    });
    const {
        data: INegara,
        isLoading: isLoadingNegara,
        setSize: setPageNegara,
        size: sizeNegara,
        setSearch: setSearchNegara,
    } = useFetchPaginateParameter<para_negara>({
        parameter: "negara",
    });

    useEffect(() => {
        const unregisterIfNotForeverMasaIdent = (): void => {
            if (isForeverMasaIdent !== "1") {
                unregister("pengurus.tgl_ident");
            }
        };

        unregisterIfNotForeverMasaIdent();
    }, [isForeverMasaIdent, unregister]);
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
                <FormSelect items={IJnsIdent} isLoading={isLoadingJnsIdent} formMethod={formMethod} id="pengurus.kd_jns_ident" label="Jenis Identitas" placeholder="Pilih Jenis Identitas" defaultValue={convertToSelectObject(defaultValue?.jenis_identitas)} isRequired />
                {/* Nomor Identitas (no_ident) - String */}
                <FormInput type="text" inputMode="numeric" formMethod={formMethod} id="pengurus.no_ident" label="Nomor Identitas" placeholder="Masukan Nomor Identitas" isRequired defaultValue={defaultValue?.no_ident} />
                {/* agama */}
                <FormSelect isLoading={isLoadingAgama} items={IAgama} formMethod={formMethod} id="pengurus.kd_agama" label="Agama" placeholder="Pilih Agama" isRequired defaultValue={convertToSelectObject(defaultValue?.agama)} />
                {/* Kewarganegaraan (kewarganegaraan) - String */}
                <FormSelect
                    isLoading={isLoadingNegara}
                    paginateItems={INegara}
                    currentPage={sizeNegara}
                    maxPage={INegara ? INegara[0]?.totalPage : 0}
                    handleChangePage={setPageNegara}
                    handleSearch={setSearchNegara}
                    formMethod={formMethod}
                    id="pengurus.kd_kewarganegaraan"
                    label="Kewarganegaraan"
                    placeholder="Pilih Kewarganegaraan"
                    defaultValue={convertToSelectObject(defaultValue?.negara, undefined, "kd_negara")}
                    config={{
                        paginateItems: { value: "kd_negara" }
                    }}
                    isSearchable
                    isRequired
                />
                {/* Masa Berlaku Identitas (masa_ident) - String */}
                <FormSelect
                    items={paraMasaBelakuIdentitas}
                    formMethod={formMethod}
                    id="pengurus.masa_ident"
                    label="Masa Belaku Identitas"
                    placeholder="Pilih Masa Belaku Identitas"
                    onChange={setIsForeverMasaIdent}
                    defaultValue={findStaticParameterValue(paraMasaBelakuIdentitas, (defaultValue?.masa_ident ?? 1).toString())}
                    isRequired
                />
                {/* Tanggal Identitas (tgl_ident) - DateTime */}
                {isForeverMasaIdent !== "1" && <FormInput type="date" label="Tanggal Masa Identitas" formMethod={formMethod} id="pengurus.tgl_ident" placeholder="Masukan Tanggal Masa Identitas" max={moment().format("YYYY-MM-DD")} defaultValue={defaultValue?.tgl_ident} isRequired />}
                {/* Tempat Lahir (tempat_lahir) - String */}
                <FormInput type="text" label="Tempat Lahir" formMethod={formMethod} id="pengurus.tempat_lahir" placeholder="Masukan Tempat Lahir" defaultValue={defaultValue?.tempat_lahir} isRequired />
                {/* Tanggal Lahir (tgl_lahir) - DateTime */}
                <FormInput type="date" formMethod={formMethod} id="pengurus.tgl_lahir" label="Tanggal Lahir" placeholder="Masukan Tanggal Lahir" max={moment().format("YYYY-MM-DD")} defaultValue={defaultValue?.tgl_lahir} isRequired />
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
                    type="number"
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
                    defaultValue={defaultValue?.kepemilikan}
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
