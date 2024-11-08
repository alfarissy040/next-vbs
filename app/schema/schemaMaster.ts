import moment from "moment";
import { z } from "zod";

export const schemaMaster = z
    .object({
        no_nas: z.string().min(1, { message: "Nomor Nasabah Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Nomor Nasabah Harus Angka!" }),
        nm_nas: z.string().min(1, { message: "Nama Harus Diisi!" }),
        tipe_nas: z.string().min(1, { message: "Tipe Nasabah Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Tipe Nasabah Harus Angka!" }).transform((value) => Number(value)),
        kd_jns_ident: z.string().regex(/^[0-9]+$/, { message: "Tipe Nasabah Harus Angka!" }).min(1, { message: "Jenis Identitas Harus Diisi!" }).transform((value) => Number(value)),
        no_ident: z.string().regex(/^[0-9]+$/, { message: "Tipe Nasabah Harus Angka!" }).min(1, { message: "Jenis Identitas Harus Diisi!" }),
        masa_ident: z.string().min(1, { message: "Masa Identitas Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Tipe Nasabah Harus Angka!" }),
        tgl_ident: z.string().datetime().refine((date) => moment(date) < moment(), { message: "Tanggal Identitas Sudah Expired!" }),
        kd_acc_off: z.string().min(1, { message: "Account Officer Harus Diisi!" }),
        kd_bntk_hkm: z.string().min(1, { message: "Kode Bentuk Hukum Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Bentuk Hukum Harus Angka!" }),
        kd_gol_pemilik: z.string().min(1, { message: "Kode Golongan Pemilik Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Golongan Pemilik Harus Angka!" }),
        flag_hub_bank: z.boolean(),
        kd_sumber_dana: z.string().min(1, { message: "Kode Sumber Dana Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Sumber Dana Harus Angka!" }).transform((value) => Number(value)),
        kd_tujuan_dana: z.string().min(1, { message: "Kode Tujuan Dana Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Tujuan Dana Harus Angka!" }).transform((value) => Number(value)),
        kd_maks_trans: z.string().min(1, { message: "Kode Maksimal Transaksi Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Maksimal Transaksi Harus Angka!" }).transform((value) => Number(value)),
        kd_penghasilan_bulan: z.string().min(1, { message: "Kode Penghasilan Bulan Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Pengeluaran Bulan Harus Angka!" }).transform((value) => Number(value)),
        kd_penghasilan_lainnya: z.string().regex(/^[0-9]+$/, { message: "Kode Penghasilan Lainnya Harus Angka!" }).transform((value) => Number(value)).optional(),
        kd_pengeluaran_bulan: z.string().min(1, { message: "Kode Pengeluaran Bulan Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Pengeluaran Bulan Harus Angka!" }).transform((value) => Number(value)),
        kd_pengeluaran_lainnya: z.string().regex(/^[0-9]+$/, { message: "Kode Pengeluaran Bulan Lainnya Harus Angka!" }).transform((value) => Number(value)).optional(),
        npwp: z.string().regex(/^[0-9]+$/, { message: "NPWP Harus Angka!" }).transform((v) => Number(v)).nullable().optional(),
        no_telp: z.string().regex(/^[0-9]+$/).min(1, { message: "Nomor Telpon Harus Diisi!" }),
        email: z.string().email({ message: "Email Tidak Valid!" }).min(1, { message: "Email Harus Diisi!" }),
        kd_bidang_usaha: z.string().regex(/^[0-9]$/, { message: "Kode Bidang Usaha Harus Angka!" }).transform((value) => Number(value)).nullable().optional(),
        usrid_create: z.string().min(1, { message: "User ID Create Harus Diisi!" }),
        usrid_update: z.string().nullable(),
        created_at: z.string().datetime().nullable(),
        updated_at: z.string().datetime().nullable(),
    });

export type TMaster = z.infer<typeof schemaMaster>