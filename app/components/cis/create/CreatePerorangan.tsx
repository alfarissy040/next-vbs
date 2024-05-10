import useFetchParameter from "@/app/hooks/useFetchParameter";
import { baseFormVariant } from "@/app/utilities/MotionVariant";
import { para_agama, para_jns_pekerjaan, para_negara, para_profesi, para_sts_nikah } from "@prisma/client";
import { motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import FormInput from "../../FormInput";
import FormSelect from "../FormSelect";

interface CreatePeroranganProps {
    navDirection: TNavDirection;
    formMethod: UseFormReturn<FieldValues>;
    typeNasabah: TNasabahType;
}

const CreatePerorangan: React.FC<CreatePeroranganProps> = async ({ navDirection, formMethod, typeNasabah }) => {
    const [statusPenikahan, setStatusPernikahan] = useState<"Y" | "T" | undefined>();

    const { convertedData: IStsPernikahan, isLoading: isLoadingStsPernikahan } = useFetchParameter<para_sts_nikah>({
        parameter: "status-nikah",
    });
    const { convertedData: IAgama, isLoading: isLoadingAgama } = useFetchParameter<para_agama>({
        parameter: "agama",
    });
    const { convertedData: INegara, isLoading: isLoadingNegara } = useFetchParameter<para_negara>({
        parameter: "negara",
    });
    const { convertedData: IProfesi, isLoading: isLoadingProfesi } = useFetchParameter<para_profesi>({
        parameter: "profesi",
    });
    const { convertedData: IJnsPekerjaan, isLoading: isLoadingJnsPekerjaan } = useFetchParameter<para_jns_pekerjaan>({
        parameter: "jenis-pekerjaan",
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
                Nasabah Tipe <b>Perorangan</b> - Informasi <span className="capitalize">{typeNasabah.toLowerCase()}</span>
            </h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                {/* nama ibu */}
                <FormInput type="text" label="Nama Ibu" formMethod={formMethod} id="nm_ibu" placeholder="Masukan Nama Ibu" isRequired />
                {/* tempat lahir */}
                <FormInput type="text" label="Tempat Lahir" formMethod={formMethod} id="tmpt_lahir" placeholder="Masukan Tempat Lahir" isRequired />
                {/* tanggal lahir */}
                <FormInput type="date" label="Tanggal Lahir" formMethod={formMethod} id="tgl_lahir" placeholder="Masukan Tanggal Lahir" max={moment().format("YYYY-MM-DD")} isRequired />
                {/* jenis kelamin */}
                <FormSelect
                    items={[
                        { label: "Laki-laki", value: "LK" },
                        { label: "Perempuan", value: "PR" },
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
                    id="flag_karyawan"
                    label="Karyawan Bank"
                    placeholder="Pilih Jenis Kelamin"
                    isRequired
                />
                {/* status pernikahan */}
                <FormSelect isLoading={isLoadingStsPernikahan} items={IStsPernikahan} formMethod={formMethod} id="kd_sts_nikah" label="Status Pernikahan" placeholder="Pilih Status Pernikahan" onChange={setStatusPernikahan} isRequired />
                {/* nama pasangan */}
                <FormInput type="text" label="Nama Pasangan" formMethod={formMethod} id="nm_pasangan" placeholder="Masukan Nama Pasangan" isRequired={statusPenikahan === "Y"} />
                {/* no ident pasangan */}
                <FormInput type="text" label="Nomor Identitas Pasangan" formMethod={formMethod} id="no_ident_pasangan" placeholder="Masukan Nomor Identitas Pasangan" isRequired={statusPenikahan === "Y"} />
                {/* nama ahli waris */}
                <FormInput type="text" label="Nama Ahli Waris" formMethod={formMethod} id="nm_ahli_waris" placeholder="Masukan Nama Ahli Waris" isRequired={statusPenikahan === "Y"} />
                {/* agama */}
                <FormSelect isLoading={isLoadingAgama} items={IAgama} formMethod={formMethod} id="kd_agama" label="Agama" placeholder="Pilih Agama" isRequired />
                {/* kewarganegaraan */}
                <FormSelect isLoading={isLoadingNegara} items={INegara} formMethod={formMethod} id="kd_kewarganegaraan" label="Kewarganegaraan" placeholder="Pilih Kewarganegaraan" isRequired />
                {/* profesi */}
                <FormSelect isLoading={isLoadingProfesi} items={IProfesi} formMethod={formMethod} id="kd_profesi" label="Profesi" placeholder="Pilih Profesi" isRequired />
                {/* jenis pekerjaan */}
                <FormSelect isLoading={isLoadingJnsPekerjaan} items={IJnsPekerjaan} formMethod={formMethod} id="kd_jns_pekerjaan" label="Jenis Pekerjaan" placeholder="Pilih Jenis Pekerjaan" isRequired />
                {/* jabatan */}
                <FormInput type="text" label="Jabatan" formMethod={formMethod} id="jabatan" placeholder="Masukan Jabatan" isRequired />
                {/* nama kantor */}
                <FormInput type="text" label="Nama Kantor" formMethod={formMethod} id="nm_kntr" placeholder="Masukan Nama Kantor" isRequired />
            </div>
        </motion.div>
    );
};

export default CreatePerorangan;
