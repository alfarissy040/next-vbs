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

export const findStaticParameterValue = (obj: ISelectItem[], value: string) => {
    return obj.find((item) => isEqualCaseInsensitive(item.value, value))
}