"use client"

import useFetchPaginateParameter from "@/app/hooks/useFetchPaginateParameter"
import { baseFormVariant } from "@/app/utilities/MotionVariant"
import { para_kecamatan, para_kelurahan, para_kota, para_negara, para_provinsi } from "@prisma/client"
import { motion } from "framer-motion"
import { useState } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"
import FormInput from "../../FormInput"
import FormTextarea from "../../FormTextarea"
import FormSelect from "../FormSelect"

interface CreateAlamatProps {
    navDirection: TNavDirection;
    typeNasabah: TNasabahType
    formMethod: UseFormReturn<FieldValues>
    kdTypeNasabah: number
}

const CreateAlamat: React.FC<CreateAlamatProps> = ({ navDirection, typeNasabah, kdTypeNasabah, formMethod }) => {
    const [kdProvinsi, setKdProvinsi] = useState<number | undefined>(undefined)
    const [kdKota, setKdKota] = useState<number | undefined>(undefined)
    const [kdKecamatan, setKdKecamatan] = useState<number | undefined>(undefined)
    console.log({
        kdProvinsi: kdProvinsi,
        kdKota: kdKota,
        kdKecamatan: kdKecamatan
    })
    const { convertedData: INegara, isLoading: isLoadingNegara, apiUrl: urlNegara, setPage: setPageNegara, setSearch: setSearchNegara } = useFetchPaginateParameter<para_negara>("negara", {}, { value: "kd_negara" })
    const { convertedData: IProvinsi, isLoading: isLoadingProvinsi, apiUrl: urlProvinsi, setPage: setPageProvinsi, setSearch: setSearchProvinsi } = useFetchPaginateParameter<para_provinsi>("provinsi", {}, { value: "kd_provinsi" })
    const { convertedData: IKota, isLoading: isLoadingKota, apiUrl: urlKota, setPage: setPageKota, setSearch: setSearchKota } = useFetchPaginateParameter<para_kota>("kota", { provinsi: kdProvinsi ?? undefined }, { value: "kd_kota" })
    const { convertedData: IKecamatan, isLoading: isLoadingKecamatan, apiUrl: urlKecamatan, setPage: setPageKecamatan, setSearch: setSearchKecamatan } = useFetchPaginateParameter<para_kecamatan>("kecamatan", { kota: kdKota ?? undefined }, { value: "kd_kecamatan" })
    const { convertedData: IKelurahan, isLoading: isLoadingKelurahan, apiUrl: urlKelurahan, setPage: setPageKelurahan, setSearch: setSearchKelurahan } = useFetchPaginateParameter<para_kelurahan>("kelurahan", { kecamatan: kdKecamatan ?? undefined }, { value: "kd_kelurahan" })
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
            className="rounded-lg shadow-lg w-full p-3 bg-slate-100 dark:bg-slate-800">
            <h2 className="font-medium md:text-lg">Nasabah Tipe <b className="capitalize">{typeNasabah.toLowerCase()}</b> - Alamat {typeNasabah}</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* jenis alamat */}
                <FormSelect
                    items={[
                        { label: "Cat", value: "cat" },
                        { label: "Dog", value: "dog" },
                    ]}

                    formMethod={formMethod}
                    id="jns_alamat"
                    label="Jenis Alamat"
                    placeholder="Pilih Jenis Alamat"
                    isRequired
                />
                {/* negara */}
                <FormSelect
                    fetchUrl={urlNegara}
                    isLoading={isLoadingNegara}
                    items={INegara}
                    handleChangePage={setPageNegara}
                    handleSearch={setSearchNegara}
                    formMethod={formMethod}
                    id="negara"
                    label="Negara"
                    placeholder="Pilih Negara"
                    isSearchable
                    isRequired
                />
                {/* provinsi */}
                <FormSelect
                    fetchUrl={urlProvinsi}
                    isLoading={isLoadingProvinsi}
                    items={IProvinsi}
                    handleChangePage={setPageProvinsi}
                    handleSearch={setSearchProvinsi}
                    onChange={(value) => setKdProvinsi(value)}
                    formMethod={formMethod}
                    id="provinsi"
                    label="Provinsi"
                    placeholder="Pilih Provinsi"
                    isSearchable
                    isRequired
                />
                {/* kota */}
                <FormSelect
                    fetchUrl={urlKota}
                    isLoading={isLoadingKota}
                    items={IKota}
                    handleChangePage={setPageKota}
                    handleSearch={setSearchKota}
                    onChange={setKdKota}
                    formMethod={formMethod}
                    id="kota"
                    label="Kota"
                    placeholder="Pilih Kota"
                    isSearchable
                    isRequired
                />
                {/* kecamatan */}
                <FormSelect
                    fetchUrl={urlKecamatan}
                    isLoading={isLoadingKecamatan}
                    items={IKecamatan}
                    handleChangePage={setPageKecamatan}
                    handleSearch={setSearchKecamatan}
                    onChange={setKdKecamatan}
                    formMethod={formMethod}
                    id="kecamatan"
                    label="Kecamatan"
                    placeholder="Pilih Kecamatan"
                    isSearchable
                    isRequired
                />
                {/* kelurahan */}
                <FormSelect
                    fetchUrl={urlKelurahan}
                    isLoading={isLoadingKelurahan}
                    items={IKelurahan}
                    handleChangePage={setPageKelurahan}
                    handleSearch={setSearchKelurahan}
                    formMethod={formMethod}
                    id="kelurahan"
                    label="Kelurahan"
                    placeholder="Pilih Kelurahan"
                    isSearchable
                    isRequired
                />
                {/* rt rw */}
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <FormInput type="text" rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'Hanya angka yang diperbolehkan'
                        }
                    }} inputMode="numeric" label="RT"
                        formMethod={formMethod}
                        id="rt" placeholder="Masukan RT" isRequired />
                    <FormInput type="text" rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'Hanya angka yang diperbolehkan'
                        }
                    }} inputMode="numeric" label="RW"
                        formMethod={formMethod}
                        id="rw" placeholder="Masukan RW" isRequired />
                </div>
                {/* kode pos */}
                <FormInput type="text"
                    rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'Hanya angka yang diperbolehkan'
                        }
                    }}
                    inputMode="numeric" label="Kode Pos"
                    formMethod={formMethod}
                    id="kd_pos" placeholder="Masukan Kode Pos" isRequired />
                {/* alamat detail */}
                <div className="md:col-span-2">
                    <FormTextarea

                        formMethod={formMethod}
                        id="alamat"
                        label="Detail Alamat"
                        placeholder="Masukan Alamat"
                        isRequired
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default CreateAlamat