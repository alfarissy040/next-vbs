import { z } from "zod";

export const schemaMaster = z.object({
    created_at_kantor: z.string(),
    nm_nas: z.string(),
    tipe_nas: z.number(),
    jns_ident: z.number(),
    no_ident: z.string(),
    masa_ident: z.number(),
    tgl_ident: z.string().datetime(),
    acc_off: z.string(),
    bntk_hkm: z.number(),
    gol_pemilik: z.number(),
    flag_hub_bank: z.boolean(),
    sumber_dana: z.number(),
    tujuan_dana: z.number(),
    maks_trans: z.number(),
    penghasilan_bulan: z.number(),
    penghasilan_lainnya: z.number(),
    pengeluaran_bulan: z.number(),
    pengeluaran_lainnya: z.number(),
    npwp: z.string(),
    no_telp: z.string(),
    email: z.string(),
    bidang_usaha: z.number(),
    usrid_create: z.string(),
});

schemaMaster.required({
    created_at_kantor: true,
    nm_nas: true,
    tipe_nas: true,
    jns_ident: true,
    no_ident: true,
    masa_ident: true,
    acc_off: true,
    bntk_hkm: true,
    gol_pemilik: true,
    flag_hub_bank: true,
    sumber_dana: true,
    tujuan_dana: true,
    maks_trans: true,
    penghasilan_bulan: true,
    pengeluaran_bulan: true,
    npwp: true,
    no_telp: true,
    email: true,
    usrid_create: true,
});
