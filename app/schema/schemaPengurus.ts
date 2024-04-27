import { z } from "zod";

const schemaPengurus = z.object({
    pengurus: z
        .object({
            no_nas: z.string(),
            jns_pengurus: z.number(),
            kewarganegaraan: z.string(),
            jns_ident: z.number(),
            no_ident: z.string(),
            nm_nas: z.string(),
            masa_ident: z.number(),
            tgl_ident: z.string().datetime(),
            tempat_lahir: z.string(),
            tgl_lahir: z.string().datetime(),
            agama: z.number(),
            no_hp: z.string(),
            no_telp: z.string(),
            email: z.string().email(),
            nm_ibu: z.string(),
            jabatan: z.string(),
            kepemilikan: z.number(),
            npwp: z.string(),
        })
        .required(),
});

export default schemaPengurus;
