import { isEmpty, isEqual, isNull, isNumber, isString, isUndefined, toLower } from "lodash";
import moment from "moment";
import { useCallback } from "react";

/**
 * A custom hook that provides functions for getting the name and color of a
 * Nasabah type based on its type number.
 *
 * @returns An object with two functions: `getTypeName` and `getBadgeColor`.
 */
export const useNasabahType = () => {
    /**
     * Returns the name of a Nasabah type based on its type number.
     *
     * @param {number} tipe - The type number of the Nasabah type.
     * @returns {string | undefined} The name of the Nasabah type if the type number is valid, otherwise undefined.
     */
    const getTypeName = useCallback((tipe: number) => {
        // Define a mapping of type numbers to type names
        const tipeNasabah: Record<number, string> = {
            1: "Perorangan",
            2: "Perusahaan",
            3: "Instansi Pemerintah",
            4: "Lembaga non-profit",
        };
        return tipeNasabah[tipe];
    }, []);

    /**
     * Returns the color of a Nasabah type badge based on its type number.
     *
     * @param {number} tipe - The type number of the Nasabah type.
     * @returns {string | undefined} The color of the Nasabah type badge if the type number is valid, otherwise undefined.
     */
    const getBadgeColor = useCallback((tipe: number) => {
        // Define a mapping of type numbers to color names
        const colors: Record<number, string> = {
            1: "bg-rose-600",
            2: "bg-yellow-600",
            3: "bg-blue-600",
            4: "bg-green-600",
        };
        return colors[tipe];
    }, []);

    // Return the two functions as an object
    return { getTypeName, getBadgeColor };
};

/**
 * Generates a unique noNas based on the type number, creation time, and count.
 *
 * @param {number} tipeNas - The type number of the Nasabah.
 * @param {number} createdAtKantor - The creation time of the Nasabah at the office in Unix timestamp.
 * @param {number} count - The count of the Nasabah.
 * @return {string} The generated noNas.
 */
export const generateNoNas = (tipeNas: number, createdAtKantor: number | string, count: number): string => {
    // Pad the type number with leading zeros if necessary
    const paddedTipeNas = tipeNas.toString().padStart(2, "0");

    // Pad the creation time at the office with leading zeros if necessary
    const paddedCreatedAtKantor = (createdAtKantor as string).padStart(3, "0");

    // Pad the count with leading zeros if necessary
    const paddedCount = count.toString().padStart(5, "0");

    // Concatenate the padded values to form the noNas
    return `${paddedTipeNas}${paddedCreatedAtKantor}${paddedCount}`;
};

export const isEqualCaseInsensitive = (a: any, b: any, type?: "date") => {
    if (type === "date") {
        return isEqual(convertToDate(a), convertToDate(b))
    }
    return isEqual(toLower(a as string), toLower(b as string))
}

export const isDataEmpty = (value: any) => (!isNumber(value) && isEmpty(value)) || (isNumber(value) && isNull(value))

export const convertToString = (value: string | number | boolean | null | undefined) => {
    if (isDataEmpty(value)) return undefined

    return isString(value) ? value : value?.toString()
}
export const convertToNumber = (value: string | number | null | undefined) => {
    if (isEmpty(value) || isUndefined(value)) return null
    return isString(value) ? parseInt(value) : value
}
export const convertToBoolean = (value: string | number | null | undefined) => {
    if (isEmpty(value) || isUndefined(value)) return null
    if (isString(value)) {
        return value.toLowerCase() === "true" ? true : false
    }
    if (isNumber(value)) {
        return value === 1 ? true : false
    }
    return false
}

export const convertToDate = (value?: string | Date | null, type: "ISO" | "YYYY-MM-DD" = "ISO") => {
    if (isEmpty(value) || isUndefined(value) || isNull(value)) return undefined
    if (type === "ISO") {
        return moment(value).toISOString()
    }
    return moment(value).format("YYYY-MM-DD")
}

export const sanitizeCisMaster = (data: Record<string, any>) => {
    return ({
        nm_nas: convertToString(data.nm_nas),
        tipe_nas: convertToNumber(data.tipe_nas),
        kd_jns_ident: convertToNumber(data.kd_jns_ident),
        no_ident: convertToString(data.no_ident),
        masa_ident: convertToNumber(data.masa_ident),
        tgl_ident: convertToDate(data.tgl_ident),
        kd_acc_off: convertToString(data.kd_acc_off),
        kd_bntk_hkm: convertToNumber(data.kd_bntk_hkm),
        kd_gol_pemilik: convertToNumber(data.kd_gol_pemilik),
        flag_hub_bank: convertToBoolean(data.flag_hub_bank),
        kd_sumber_dana: convertToNumber(data.kd_sumber_dana),
        kd_tujuan_dana: convertToNumber(data.kd_tujuan_dana),
        kd_maks_trans: convertToNumber(data.kd_maks_trans),
        kd_penghasilan_bulan: convertToNumber(data.kd_penghasilan_bulan),
        kd_penghasilan_lainnya: convertToNumber(data.kd_penghasilan_lainnya) ?? 0,
        kd_pengeluaran_bulan: convertToNumber(data.kd_pengeluaran_bulan),
        kd_pengeluaran_lainnya: convertToNumber(data.kd_pengeluaran_lainnya) ?? 0,
        npwp: convertToString(data.npwp),
        no_telp: convertToString(data.no_telp),
        email: convertToString(data.email),
        kd_bidang_usaha: convertToNumber(data.kd_bidang_usaha),
    })
}

export const sanitizeCisPerorangan = (data: Record<string, any>) => {
    return ({
        nm_ibu: convertToString(data.nm_ibu),
        tempat_lahir: convertToString(data.tempat_lahir),
        tgl_lahir: convertToDate(data.tgl_lahir),
        jns_kelamin: convertToString(data.jns_kelamin),
        flag_karyawan: convertToBoolean(data.flag_karyawan),
        kd_status_pernikahan: convertToNumber(data.kd_status_pernikahan),
        nm_pasangan: convertToString(data.nm_pasangan),
        no_ident_pasangan: convertToString(data.no_ident_pasangan),
        nm_ahli_waris: convertToString(data.nm_ahli_waris),
        kd_agama: convertToNumber(data.kd_agama),
        kd_kewarganegaraan: convertToString(data.kd_kewarganegaraan),
        kd_profesi: convertToNumber(data.kd_profesi),
        kd_jns_pekerjaan: convertToNumber(data.kd_jns_pekerjaan),
        jabatan: convertToString(data.jabatan),
        nm_kntr: convertToString(data.nm_kntr),
    })
}

export const sanitizeCisPerusahaan = (data: Record<string, any>) => {
    return ({
        flag_bank: convertToBoolean(data.flag_bank),
        kd_group_nas: convertToNumber(data.kd_group_nas),
        modal_sendiri: convertToNumber(data.modal_sendiri),
        modal_setor: convertToNumber(data.modal_setor),
        no_akte_awal: convertToString(data.no_akte_awal),
        tgl_akte_awal: convertToDate(data.tgl_akte_awal),
        no_akte_akhir: convertToString(data.no_akte_akhir),
        tgl_akte_akhir: convertToDate(data.tgl_akte_akhir),
        nm_notaris: convertToString(data.nm_notaris),
        no_notaris: convertToString(data.no_notaris),
        tgl_notaris: convertToDate(data.tgl_notaris),
        no_permohonan_dep: convertToString(data.no_permohonan_dep),
        tgl_permohonan_dep: convertToDate(data.tgl_permohonan_dep),
        no_izin_dep: convertToString(data.no_izin_dep),
        tgl_izin_dep: convertToDate(data.tgl_izin_dep),
        no_pub: convertToString(data.no_pub),
        tgl_pub: convertToDate(data.tgl_pub),
    })
}

export const sanitizeCisAlamat = (data: Record<string, any>) => {
    return ({
        jns_alamat: convertToString(data.jns_alamat),
        kd_negara: convertToString(data.kd_negara),
        kd_provinsi: convertToNumber(data.kd_provinsi),
        kd_kota: convertToNumber(data.kd_kota),
        kd_kecamatan: convertToNumber(data.kd_kecamatan),
        kd_kelurahan: convertToNumber(data.kd_kelurahan),
        rt: convertToString(data.rt),
        rw: convertToString(data.rw),
        kd_pos: convertToString(data.kd_pos),
        alamat_detail: convertToString(data.alamat_detail),
    })
}

export const sanitizeCisPengurus = (data: Record<string, any>) => {
    return ({
        kd_kewarganegaraan: convertToString(data.kd_kewarganegaraan),
        kd_jns_ident: convertToNumber(data.kd_jns_ident),
        no_ident: convertToString(data.no_ident),
        nm_nas: convertToString(data.nm_nas),
        masa_ident: convertToNumber(data.masa_ident),
        tgl_ident: convertToDate(data.tgl_ident),
        tempat_lahir: convertToString(data.tempat_lahir),
        tgl_lahir: convertToDate(data.tgl_lahir),
        kd_agama: convertToNumber(data.kd_agama),
        no_hp: convertToString(data.no_hp),
        no_telp: convertToString(data.no_telp),
        email: convertToString(data.email),
        nm_ibu: convertToString(data.nm_ibu),
        jabatan: convertToString(data.jabatan),
        kepemilikan: convertToNumber(data.kepemilikan),
        npwp: convertToString(data.npwp),
    })
}

export const sanitizeCisAlamatPengurus = (data: Record<string, any>) => {
    return ({
        jns_alamat: convertToString(data.jns_alamat),
        kd_negara: convertToString(data.kd_negara),
        kd_provinsi: convertToNumber(data.kd_provinsi),
        kd_kota: convertToNumber(data.kd_kota),
        kd_kecamatan: convertToNumber(data.kd_kecamatan),
        kd_kelurahan: convertToNumber(data.kd_kelurahan),
        rt: convertToString(data.rt),
        rw: convertToString(data.rw),
        kd_pos: convertToString(data.kd_pos),
        alamat_detail: convertToString(data.alamat_detail),
    })
}