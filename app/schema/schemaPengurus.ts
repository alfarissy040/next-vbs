import { z } from "zod";

const schemaPengurus = z.object({
    kd_kewarganegaraan: z.string(),
    kd_jns_ident: z.number(),
    no_ident: z.string(),
    nm_nas: z.string(),
    masa_ident: z.number(),
    tgl_ident: z.union([z.string().datetime(), z.null()]).optional(),
    tempat_lahir: z.string(),
    tgl_lahir: z.string().datetime(),
    kd_agama: z.number(),
    no_hp: z.string(),
    no_telp: z.string().optional(),
    email: z.string().email(),
    nm_ibu: z.string(),
    jabatan: z.string(),
    kepemilikan: z.number(),
    npwp: z.string(),
});

export default schemaPengurus;
