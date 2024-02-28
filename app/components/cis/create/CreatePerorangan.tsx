"use client"

import { motion } from "framer-motion"
import FormInput from "../../FormInput"
import FormSelect from "../FormSelect"
import { useState } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"
import { baseFormVariant } from "@/app/utilities/MotionVariant"

interface CreatePeroranganProps {
    navDirection: TNavDirection
    formMethod: UseFormReturn<FieldValues>
    typeNasabah: TNasabahType;
}

const CreatePerorangan: React.FC<CreatePeroranganProps> = ({ navDirection, formMethod, typeNasabah }) => {
    const [statusPenikahan, setStatusPernikahan] = useState<"Y" | "T" | undefined>()
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
            <h2 className="font-medium md:text-lg">Nasabah Tipe <b>Perorangan</b> - Informasi <span className="capitalize">{typeNasabah.toLowerCase()}</span></h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* nama ibu */}
                <FormInput type="text" label="Nama Ibu"
                    formMethod={formMethod}
                    id="nm_ibu" placeholder="Masukan Nama Ibu" isRequired />
                {/* tempat lahir */}
                <FormInput type="text" label="Tempat Lahir"
                    formMethod={formMethod}
                    id="tmpt_lahir" placeholder="Masukan Tempat Lahir" isRequired />
                {/* tanggal lahir */}
                <FormInput type="date" label="Tanggal Lahir"
                    formMethod={formMethod}
                    id="tgl_lahir" placeholder="Masukan Tanggal Lahir" max={new Date().toISOString().split('T')[0] as string} isRequired />
                {/* jenis kelamin */}
                <FormSelect
                    items={[

                        { label: "Laki-laki", value: "LK" },
                        { label: "Perempuan", value: "PR" },
                        { label: "Kantong kresek", value: "KK" },
                    ]}

                    formMethod={formMethod}
                    id="jns_kel"
                    label="Jenis Kelamin"
                    placeholder="Pilih Jenis Kelamin"

                    isRequired
                />
                {/* flag karyawan */}
                <FormSelect
                    items={[

                        { label: "Bukan Karyawan Sendiri", value: "T" },
                        { label: "Karyawan Sendiri", value: "Y" },
                    ]}

                    formMethod={formMethod}
                    id="jns_kel"
                    label="Jenis Kelamin"
                    placeholder="Pilih Jenis Kelamin"

                    isRequired
                />
                {/* status pernikahan */}
                <FormSelect
                    items={[

                        { label: "Bukan Karyawan Sendiri", value: "T" },
                        { label: "Karyawan Sendiri", value: "Y" },
                    ]}

                    formMethod={formMethod}
                    id="sts_nikah"
                    label="Status Pernikahan"
                    placeholder="Pilih Status Pernikahan"
                    onChange={(e) => setStatusPernikahan(e.target.value)}
                    isRequired
                />
                {/* nama pasangan */}
                <FormInput type="text" label="Nama Pasangan"
                    formMethod={formMethod}
                    id="nm_pasangan" placeholder="Masukan Nama Pasangan" isRequired={statusPenikahan === "Y"} />
                {/* no ident pasangan */}
                <FormInput type="text" label="Nomor Identitas Pasangan"
                    formMethod={formMethod}
                    id="no_ident_pasangan" placeholder="Masukan Nomor Identitas Pasangan" isRequired={statusPenikahan === "Y"} />
                {/* nama ahli waris */}
                <FormInput type="text" label="Nama Ahli Waris"
                    formMethod={formMethod}
                    id="nm_ahli_waris" placeholder="Masukan Nama Ahli Waris" isRequired={statusPenikahan === "Y"} />
                {/* agama */}
                <FormSelect
                    items={[

                        { label: "Bukan Karyawan Sendiri", value: "T" },
                        { label: "Karyawan Sendiri", value: "Y" },
                    ]}

                    formMethod={formMethod}
                    id="agama"
                    label="Agama"
                    placeholder="Pilih Agama"
                    isRequired
                />
                {/* kewarganegaraan */}
                <FormSelect
                    items={[

                        { label: "Bukan Karyawan Sendiri", value: "T" },
                        { label: "Karyawan Sendiri", value: "Y" },
                    ]}

                    formMethod={formMethod}
                    id="kewarganegaraan"
                    label="Kewarganegaraan"
                    placeholder="Pilih Kewarganegaraan"
                    isRequired
                />
                {/* profesi */}
                <FormSelect
                    items={[

                        { label: "Bukan Karyawan Sendiri", value: "T" },
                        { label: "Karyawan Sendiri", value: "Y" },
                    ]}

                    formMethod={formMethod}
                    id="profesi"
                    label="Profesi"
                    placeholder="Pilih Profesi"
                    isRequired
                />
                {/* jenis pekerjaan */}
                <FormSelect
                    items={[

                        { label: "Bukan Karyawan Sendiri", value: "T" },
                        { label: "Karyawan Sendiri", value: "Y" },
                    ]}

                    formMethod={formMethod}
                    id="jns_pekerjaan"
                    label="Jenis Pekerjaan"
                    placeholder="Pilih Jenis Pekerjaan"
                    isRequired
                />
                {/* jabatan */}
                <FormInput type="text" label="Jabatan"
                    formMethod={formMethod}
                    id="jabatan" placeholder="Masukan Jabatan" isRequired />
                {/* nama kantor */}
                <FormInput type="text" label="Nama Kantor"
                    formMethod={formMethod}
                    id="nm_kntr" placeholder="Masukan Nama Kantor" isRequired />

            </div>
        </motion.div>
    )
}

export default CreatePerorangan