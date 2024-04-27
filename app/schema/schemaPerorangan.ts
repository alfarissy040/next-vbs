import { z } from "zod";

const schemaPerorangan = z
    .object({
        nm_ibu: z.string(),
        tempat_lahir: z.string(),
        tgl_lahir: z.string().datetime(),
        jns_kelamin: z.string(),
        flag_karyawan: z.boolean(),
        status_pernikahan: z.number(),
        nm_pasangan: z.string(),
        no_ident_pasangan: z.string(),
        nm_ahli_waris: z.string(),
        agama: z.number(),
        kewarganegaraan: z.string(),
        profesi: z.number(),
        jns_pekerjaan: z.number(),
        jabatan: z.string(),
        nm_kntr: z.string(),
    })
    .required({
        nm_ibu: true,
        tempat_lahir: true,
        tgl_lahir: true,
        jns_kelamin: true,
        flag_karyawan: true,
        status_pernikahan: true,
        agama: true,
        kewarganegaraan: true,
        profesi: true,
        jns_pekerjaan: true,
        jabatan: true,
        nm_kntr: true,
    });

export default schemaPerorangan;
