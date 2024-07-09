import { z } from "zod";

const schemaAlamatPengurus = z
    .object({
        jns_alamat: z.string(),
        kd_negara: z.string(),
        kd_provinsi: z.number(),
        kd_kota: z.number(),
        kd_kecamatan: z.number(),
        kd_kelurahan: z.number(),
        rt: z.string(),
        rw: z.string(),
        kd_pos: z.string(),
        alamat_detail: z.string(),
    })
    .required();

export default schemaAlamatPengurus;
