import { z } from "zod";

const schemaAlamat = z
    .object({
        id_alamat: z.string().nullable(),
        id_pengurus: z.string().nullable(),
        no_nas: z.string().min(1, { message: "Nomor Nasabah Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Nomor Nasabah Harus Angka!" }),
        jns_alamat: z.string().min(1, { message: "Jenis Alamat Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Jenis Alamat Harus Angka!" }).transform((value) => Number(value)),
        kd_negara: z.string().min(1, { message: "Kode Negara Harus Diisi!" }).regex(/^[A-Z]+$/, { message: "Kode Negara Harus Huruf Kapital!" }),
        kd_provinsi: z.string().min(1, { message: "Kode Provinsi Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Provinsi Harus Angka!" }).transform((v) => Number(v)),
        kd_kota: z.string().min(1, { message: "Kode Kota Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Kota Harus Angka!" }).transform((v) => Number(v)),
        kd_kecamatan: z.string().min(1, { message: "Kode Kecamatan Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Kecamatan Harus Angka!" }).transform((v) => Number(v)),
        kd_kelurahan: z.string().min(1, { message: "Kode Kelurahan Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Kelurahan Harus Angka!" }).transform((v) => Number(v)),
        rt: z.string().min(1, { message: "RT Harus Diisi!" }).regex(/^[0-9]+$/, { message: "RT Harus Angka!" }),
        rw: z.string().min(1, { message: "RW Harus Diisi!" }).regex(/^[0-9]+$/, { message: "RT Harus Angka!" }),
        kd_pos: z.string().min(1, { message: "Kode Pos Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Pos Harus Angka!" }),
        alamat_detail: z.string().min(1, { message: "Alamat Detail Harus Diisi!" }),
        usrid_create: z.string().min(1, { message: "User ID Create Harus Diisi!" }),
        usrid_update: z.string().nullable(),
        created_at: z.string().datetime().nullable(),
        updated_at: z.string().datetime().nullable(),
    })

export type TAlamat = z.infer<typeof schemaAlamat>

export default schemaAlamat;
