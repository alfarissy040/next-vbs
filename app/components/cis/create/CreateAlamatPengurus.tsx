"use client"

import { motion } from "framer-motion"
import FormInput from "../../FormInput"
import FormSelect from "../FormSelect"
import FormTextarea from "../../FormTextarea"
import { baseFormVariant } from "@/app/utilities/MotionVariant"
import { FieldValues, UseFormReturn } from "react-hook-form"

interface CreateAlamatPengurusProps {
    navDirection: TNavDirection;
    typeNasabah: TNasabahType
    formMethod: UseFormReturn<FieldValues>
}

const CreateAlamatPengurus: React.FC<CreateAlamatPengurusProps> = ({ navDirection, typeNasabah, formMethod }) => {
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
            <h2 className="font-medium md:text-lg">Nasabah Tipe <b className="capitalize">{typeNasabah.toLowerCase()}</b> - Alamat Pengurus</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* jenis alamat */}
                <FormSelect
                    items={[
                        { label: "Cat", value: "cat" },
                        { label: "Dog", value: "dog" },
                    ]}

                    formMethod={formMethod}
                    id="pengurus.alamat.jns_alamat"
                    label="Jenis Alamat Pengurus"
                    placeholder="Pilih Jenis Alamat"
                    isRequired
                />
                {/* negara */}
                <FormSelect
                    items={[
                        { label: "Cat", value: "cat" },
                        { label: "Dog", value: "dog" },
                    ]}

                    formMethod={formMethod}
                    id="pengurus.alamat.negara"
                    label="Negara Pengurus"
                    placeholder="Pilih Negara"
                    isSearchable
                    isRequired
                />
                {/* provinsi */}
                <FormSelect
                    items={[
                        { label: "Cat", value: "cat" },
                        { label: "Dog", value: "dog" },
                    ]}

                    formMethod={formMethod}
                    id="pengurus.alamat.provinsi"
                    label="Provinsi"
                    placeholder="Pilih Provinsi"
                    isSearchable
                    isRequired
                />
                {/* kota */}
                <FormSelect
                    items={[
                        { label: "Cat", value: "cat" },
                        { label: "Dog", value: "dog" },
                    ]}

                    formMethod={formMethod}
                    id="pengurus.alamat.kota"
                    label="Kota"
                    placeholder="Pilih Kota"
                    isSearchable
                    isRequired
                />
                {/* kecamatan */}
                <FormSelect
                    items={[
                        { label: "Cat", value: "cat" },
                        { label: "Dog", value: "dog" },
                    ]}

                    formMethod={formMethod}
                    id="pengurus.alamat.kecamatan"
                    label="Kecamatan"
                    placeholder="Pilih Kecamatan"
                    isSearchable
                    isRequired
                />
                {/* kelurahan */}
                <FormSelect
                    items={[
                        { label: "Cat", value: "cat" },
                        { label: "Dog", value: "dog" },
                    ]}

                    formMethod={formMethod}
                    id="pengurus.alamat.kelurahan"
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
                        id="pengurus.alamat.rt" placeholder="Masukan RT" isRequired />
                    <FormInput type="text" rules={{
                        pattern: {
                            value: /^[0-9]*$/,
                            message: 'Hanya angka yang diperbolehkan'
                        }
                    }} inputMode="numeric" label="RW"
                        formMethod={formMethod}
                        id="pengurus.alamat.rw" placeholder="Masukan RW" isRequired />
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
                    id="pengurus.alamat.kd_pos" placeholder="Masukan Kode Pos" isRequired />
                {/* alamat detail */}
                <div className="md:col-span-2">
                    <FormTextarea
                        formMethod={formMethod}
                        id="pengurus.alamat.alamat"
                        label="Detail Alamat Pengurus"
                        placeholder="Masukan Alamat"
                        isRequired
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default CreateAlamatPengurus