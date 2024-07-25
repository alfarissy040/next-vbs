import { z } from "zod";

const schemaPerorangan = z
    .object({
        nm_ibu: z.string(),
        tempat_lahir: z.string(),
        tgl_lahir: z.string().datetime(),
        jns_kelamin: z.string(),
        flag_karyawan: z.boolean(),
        kd_status_pernikahan: z.number(),
        nm_pasangan: z.string().optional(),
        no_ident_pasangan: z.string().optional(),
        nm_ahli_waris: z.string().optional(),
        kd_agama: z.number(),
        kd_kewarganegaraan: z.string(),
        kd_profesi: z.number(),
        kd_jns_pekerjaan: z.number(),
        jabatan: z.string(),
        nm_kntr: z.string(),
    })
    .required({
        nm_ibu: true,
        tempat_lahir: true,
        tgl_lahir: true,
        jns_kelamin: true,
        flag_karyawan: true,
        kd_status_pernikahan: true,
        kd_agama: true,
        kd_kewarganegaraan: true,
        kd_profesi: true,
        kd_jns_pekerjaan: true,
        jabatan: true,
        nm_kntr: true,
    });

export default schemaPerorangan;
