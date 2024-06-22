"use client";

import useFetchPaginateParameter from "@/app/hooks/useFetchPaginateParameter";
import { ISelectItem } from "@/app/types/parameter";
import { getJenisAlamat } from "@/app/utilities/Cis";
import { baseFormVariant } from "@/app/utilities/MotionVariant";
import { cis_alamat, para_kecamatan, para_kelurahan, para_kota, para_negara, para_provinsi } from "@prisma/client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import FormInput from "../../FormInput";
import FormTextarea from "../../FormTextarea";
import FormSelect from "../FormSelect";

interface FormAlamatProps {
    navDirection: TNavDirection;
    typeNasabah: TNasabahType;
    formMethod: UseFormReturn<FieldValues>;
    kdTypeNasabah: number;
    defaultValue?: cis_alamat
}

const FormAlamat: React.FC<FormAlamatProps> = ({ navDirection, typeNasabah, defaultValue, formMethod }) => {
    const { getValues } = formMethod;
    const [kdProvinsi, setKdProvinsi] = useState<number | null>(getValues("provinsi") ?? (defaultValue?.kd_provinsi ?? null));
    const [kdKota, setKdKota] = useState<number | null>(getValues("kota") ?? (defaultValue?.kd_kota ?? null));
    const [kdKecamatan, setKdKecamatan] = useState<number | null>(getValues("kecamatan") ?? (defaultValue?.kd_kecamatan ?? null));

    const {
        data: INegara,
        sanitizedData: INegaraSanitized,
        isLoading: isLoadingNegara,
        setSize: setPageNegara,
        size: sizeNegara,
        setSearch: setSearchNegara,
    } = useFetchPaginateParameter<para_negara>({
        parameter: "negara",
    });
    const {
        data: IProvinsi,
        sanitizedData: IProvinsiSanitized,
        isLoading: isLoadingProvinsi,
        setSize: setPageProvinsi,
        size: sizeProvinsi,
        setSearch: setSearchProvinsi,
    } = useFetchPaginateParameter<para_provinsi>({
        parameter: "provinsi",
        option: {
            value: "kd_provinsi",
        },
    });
    const {
        data: IKota,
        sanitizedData: IKotaSanitized,
        isLoading: isLoadingKota,
        setSize: setPageKota,
        size: sizeKota,
        setSearch: setSearchKota,
    } = useFetchPaginateParameter<para_kota>({
        parameter: "kota",
        option: { value: "kd_kota", keepPreviousData: false },
        queryParams: {
            provinsi: kdProvinsi ?? undefined,
        },
    });
    const {
        data: IKecamatan,
        sanitizedData: IKecamatanSanitized,
        isLoading: isLoadingKecamatan,
        setSize: setPageKecamatan,
        size: sizeKecamatan,
        setSearch: setSearchKecamatan,
    } = useFetchPaginateParameter<para_kecamatan>({
        parameter: "kecamatan",
        option: { value: "kd_kecamatan", keepPreviousData: false },
        queryParams: {
            kota: kdKota ?? undefined,
        },
    });
    const {
        data: IKelurahan,
        sanitizedData: IkelurahanSanitized,
        isLoading: isLoadingKelurahan,
        setSize: setPageKelurahan,
        size: sizeKelurahan,
        setSearch: setSearchKelurahan,
    } = useFetchPaginateParameter<para_kelurahan>({
        parameter: "kelurahan",
        option: { value: "kd_kelurahan", keepPreviousData: false },
        queryParams: {
            kecamatan: kdKecamatan ?? undefined,
        },
    });
    return (
        <motion.div
            layout
            initial={"initial"}
            animate={"show"}
            exit={"hide"}
            variants={baseFormVariant(navDirection)}
            transition={{
                type: "spring",
                duration: 0.5,
            }}
            className="rounded-lg shadow-lg w-full p-3 bg-slate-100 dark:bg-slate-800"
        >
            <h2 className="font-medium md:text-lg">
                Nasabah Tipe <b className="capitalize">{typeNasabah.toLowerCase()}</b> - Alamat {typeNasabah}
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* jenis alamat */}
                <FormSelect items={getJenisAlamat() as ISelectItem[]} formMethod={formMethod} id="jns_alamat" label="Jenis Alamat" placeholder="Pilih Jenis Alamat" isRequired />
                {/* negara */}
                <FormSelect
                    isLoading={isLoadingNegara}
                    items={INegaraSanitized}
                    currentPage={sizeNegara}
                    maxPage={INegara ? INegara[0]?.totalPage : 0}
                    handleChangePage={setPageNegara}
                    handleSearch={setSearchNegara}
                    formMethod={formMethod}
                    id="kd_negara"
                    label="Negara"
                    placeholder="Pilih Negara"
                    defaultValue={defaultValue?.kd_negara}
                    isSearchable
                    isRequired
                />
                {/* provinsi */}
                <FormSelect
                    isLoading={isLoadingProvinsi}
                    items={IProvinsiSanitized}
                    currentPage={sizeProvinsi}
                    maxPage={IProvinsi ? IProvinsi[0]?.totalPage : 0}
                    handleChangePage={setPageProvinsi}
                    handleSearch={setSearchProvinsi}
                    onChange={setKdProvinsi}
                    formMethod={formMethod}
                    id="kd_provinsi"
                    label="Provinsi"
                    placeholder="Pilih Provinsi"
                    defaultValue={defaultValue?.kd_provinsi}
                    isSearchable
                    isRequired
                />
                {/* kota */}
                <FormSelect
                    isLoading={isLoadingKota}
                    items={IKotaSanitized}
                    currentPage={sizeKota}
                    maxPage={IKota ? IKota[0]?.totalPage : 0}
                    handleChangePage={setPageKota}
                    onChange={setKdKota}
                    handleSearch={setSearchKota}
                    formMethod={formMethod}
                    id="kd_kota"
                    label="Kota"
                    placeholder="Pilih Kota"
                    defaultValue={defaultValue?.kd_kota}
                    isSearchable
                    isRequired
                />
                {/* kecamatan */}
                <FormSelect
                    currentPage={sizeKecamatan}
                    maxPage={IKecamatan ? IKecamatan[0]?.totalPage : 0}
                    isLoading={isLoadingKecamatan}
                    items={IKecamatanSanitized}
                    handleChangePage={setPageKecamatan}
                    handleSearch={setSearchKecamatan}
                    onChange={setKdKecamatan}
                    formMethod={formMethod}
                    id="kd_kecamatan"
                    label="Kecamatan"
                    placeholder="Pilih Kecamatan"
                    defaultValue={defaultValue?.kd_kecamatan}
                    isSearchable
                    isRequired
                />
                {/* kelurahan */}
                <FormSelect
                    currentPage={sizeKelurahan}
                    maxPage={IKelurahan ? IKelurahan[0]?.totalPage : 0}
                    isLoading={isLoadingKelurahan}
                    items={IkelurahanSanitized}
                    handleChangePage={setPageKelurahan}
                    handleSearch={setSearchKelurahan}
                    formMethod={formMethod}
                    id="kd_kelurahan"
                    label="Kelurahan"
                    placeholder="Pilih Kelurahan"
                    defaultValue={defaultValue?.kd_kelurahan}
                    isSearchable
                    isRequired
                />
                {/* rt rw */}
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <FormInput
                        type="text"
                        rules={{
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "Hanya angka yang diperbolehkan",
                            },
                        }}
                        inputMode="numeric"
                        label="RT"
                        formMethod={formMethod}
                        id="rt"
                        placeholder="Masukan RT"
                        defaultValue={defaultValue?.rt}
                        isRequired
                    />
                    <FormInput
                        type="text"
                        rules={{
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "Hanya angka yang diperbolehkan",
                            },
                        }}
                        inputMode="numeric"
                        label="RW"
                        formMethod={formMethod}
                        id="rw"
                        placeholder="Masukan RW"
                        defaultValue={defaultValue?.rw}
                        isRequired
                    />
                </div>
                {/* kode pos */}
                <FormInput
                    type="text"
                    rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Hanya angka yang diperbolehkan",
                        },
                    }}
                    inputMode="numeric"
                    label="Kode Pos"
                    formMethod={formMethod}
                    id="kd_pos"
                    placeholder="Masukan Kode Pos"
                    defaultValue={defaultValue?.kd_pos}
                    isRequired
                />
                {/* alamat detail */}
                <div className="md:col-span-2">
                    <FormTextarea formMethod={formMethod} id="alamat_detail" label="Detail Alamat" placeholder="Masukan Alamat" defaultValue={defaultValue?.alamat_detail} isRequired />
                </div>
            </div>
        </motion.div>
    );
};

export default FormAlamat;
