import moment from "moment";
import { z } from "zod";

const schemaPengurus = z.object({
    id_pengurus: z.string().nullable(),
    no_pengurus: z.number().nullable(),
    no_nas: z.string().min(1, { message: "Nomor Nasabah Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Nomor Nasabah Harus Angka!" }),
    kd_agama: z.string().min(1, { message: "Kode Agama Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Agama Harus Diisi!" }).transform((v) => Number(v)),
    kd_kewarganegaraan: z.string().min(1, { message: "Kode Kewarganegaraan Harus Diisi!" }).regex(/^[A-Z]+$/, { message: "Kode Kewarganegaraan Harus Diisi!" }),
    kd_jns_ident: z.string().regex(/^[0-9]+$/, { message: "Tipe Nasabah Harus Angka!" }).min(1, { message: "Jenis Identitas Harus Diisi!" }).transform((value) => Number(value)),
    no_ident: z.string().regex(/^[0-9]+$/, { message: "Tipe Nasabah Harus Angka!" }).min(1, { message: "Jenis Identitas Harus Diisi!" }),
    nm_nas: z.string().min(1, { message: "Nama Harus Diisi!" }),
    masa_ident: z.string().regex(/^[0-1]+$/, { message: "Masa Identitas Hanya Boleh Angka 1 atau 0" }).min(1, { message: "Masa Identitas Harus Diisi!" }).transform((v) => Number(v)),
    tgl_ident: z.string().datetime().nullable(),
    tempat_lahir: z.string().min(1, { message: "Tempat Lahir Harus Diisi!" }),
    tgl_lahir: z.string().datetime().min(1, { message: "Tanggal Lahir Harus Diisi!" }).refine((date) => moment(date) > moment().subtract(15, "year")),
    no_hp: z.string().regex(/^[0-9]+$/).min(1, { message: "Nomor Hp Harus Diisi!" }),
    no_telp: z.string().regex(/^[0-9]+$/).min(1, { message: "Nomor Telpon Harus Diisi!" }),
    email: z.string().email({ message: "Email Tidak Valid!" }).min(1, { message: "Email Harus Diisi!" }),
    nm_ibu: z.string().min(1, { message: "Nama Ibu Harus Diisi" }),
    jabatan: z.string().min(1, { message: "Jabatan Harus Diisi!" }),
    kepemilikan: z.string().refine((val) => /^-?\d+(\.\d+)?$/.test(val), { message: 'Harus berupa angka float yang valid' }).transform((val) => parseFloat(val)),
    npwp: z.string().regex(/^[0-9]+$/, { message: "NPWP Harus Angka!" }).transform((v) => Number(v)).nullable().optional(),
    usrid_create: z.string().min(1, { message: "User ID Create Harus Diisi!" }),
    usrid_update: z.string().nullable(),
    created_at: z.string().datetime().nullable(),
    updated_at: z.string().datetime().nullable(),
});

export default schemaPengurus;
