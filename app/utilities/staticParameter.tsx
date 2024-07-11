import { isEmpty } from "lodash"
import { ISelectItem } from "../types/parameter"
import { isEqualCaseInsensitive } from "./Cis"

export const paraHubunganBank = [
    { label: "Berhubungan dengan Bank", value: "true" },
    { label: "Tidak ada hubungan", value: "false" },
]

export const paraMasaBelakuIdentitas = [
    { label: "Seumur Hidup", value: "1" },
    { label: "Berlaku Sampai", value: "0" },
]

export const paraJenisKelamin = [
    { label: "Laki-laki", value: "LK" },
    { label: "Perempuan", value: "PR" },
]

export const paraKaryawanSendiri = [
    { label: "Bukan Karyawan Sendiri", value: 'false' },
    { label: "Karyawan Sendiri", value: "true" },
]

export const paraJenisAlamat = [
    { label: "Sesuai Identitas", value: "1" },
    { label: "Sesuai Domisili", value: "2" },
    { label: "Sesuai Alamat", value: "3" },
]

export const paraKategoriBank = [
    { label: "Bank", value: "Y" },
    { label: "Bukan Bank", value: "T" },
]

export const findStaticParameterValue = (obj: ISelectItem[], value?: string) => {
    if (isEmpty(value)) return undefined
    return obj.find((item) => isEqualCaseInsensitive(item.value, value))
}