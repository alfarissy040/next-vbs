import { z } from "zod";

const schemaAlamat = z
    .object({
        no_nas: z.string(),
        no_urut: z.number(),
        jns_alamat: z.string(),
        negara: z.string(),
        provinsi: z.number(),
        kota: z.number(),
        kecamatan: z.number(),
        kelurahan: z.number(),
        rt: z.string(),
        rw: z.string(),
        kd_pos: z.string(),
        alamat_detail: z.string(),
    })
    .required();

export default schemaAlamat;
