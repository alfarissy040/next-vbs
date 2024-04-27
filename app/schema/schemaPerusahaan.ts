import { z } from "zod";

const schemaPerusahaan = z.object({
    no_nas: z.string(),
    jns_usaha_tkt: z.number(),
    flag_bank: z.boolean(),
    group_nas: z.number(),
    modal_sendiri: z.number(),
    modal_setor: z.number(),
    no_akte_awal: z.string(),
    tgl_akte_awal: z.string().datetime(),
    no_akte_akhir: z.string(),
    tgl_akte_akhir: z.string().datetime(),
    nm_notaris: z.string(),
    no_notaris: z.string(),
    tgl_notaris: z.string().datetime(),
    no_permohonan_dep: z.string(),
    tgl_permohonan_dep: z.string().datetime(),
    no_izin_dep: z.string(),
    tgl_izin_dep: z.string().datetime(),
    no_pub: z.string(),
    tgl_pub: z.string().datetime(),
    usrid_create: z.string(),
});

schemaPerusahaan.required({
    no_nas: true,
    jns_usaha_tkt: true,
    flag_bank: true,
    group_nas: true,
    modal_sendiri: true,
    modal_setor: true,
    no_akte_awal: true,
    tgl_akte_awal: true,
    no_akte_akhir: true,
    tgl_akte_akhir: true,
    nm_notaris: true,
    no_notaris: true,
    tgl_notaris: true,
    no_permohonan_dep: true,
    tgl_permohonan_dep: true,
    no_izin_dep: true,
    tgl_izin_dep: true,
    no_pub: true,
    tgl_pub: true,
    usrid_create: true,
});

export default schemaPerusahaan;
