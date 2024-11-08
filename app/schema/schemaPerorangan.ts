import moment from "moment";
import { z } from "zod";

const schemaPerorangan = z
    .object({
        id_perorangan: z.string().min(1, { message: "ID Perorangan Harus Diisi!" }).optional(),
        no_nas: z.string().min(1, { message: "Nomor Nasabah Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Nomor Nasabah Harus Angka!" }),
        nm_ibu: z.string().min(1, { message: "Nama Ibu Harus Diisi" }),
        tempat_lahir: z.string().min(1, { message: "Tempat Lahir Harus Diisi!" }),
        tgl_lahir: z.string().datetime().min(1, { message: "Tanggal Lahir Harus Diisi!" }).refine((date) => moment(date) > moment().subtract(15, "year")),
        jns_kelamin: z.string().min(1, { message: "Jenis Kelamin Harus Diisi!" }),
        flag_karyawan: z.boolean().default(false).optional(),
        nm_pasangan: z.string().min(1, { message: "Nama Pasangan Harus Diisi!" }).nullable(),
        no_ident_pasangan: z.string().min(1, { message: "Nomor Identitas Pasangan Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Nomor Identitas Pasangan Harus Angka!" }).nullable(),
        nm_ahli_waris: z.string().min(1, { message: "Nama Pasangan Harus Diisi!" }).nullable(),
        jabatan: z.string().min(1, { message: "Jabatan Harus Diisi!" }),
        nm_kntr: z.string().min(1, { message: "Nama Kantor Harus Diisi!" }),
        kd_status_pernikahan: z.string().min(1, { message: "Kode Status Pernikahan Harus Diisi!" }),
        kd_agama: z.string().min(1, { message: "Kode Agama Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Agama Harus Angka!" }).transform((v) => Number(v)),
        kd_kewarganegaraan: z.string().min(1, { message: "Kode Kewarganegaraan Harus Diisi!" }).regex(/^[A-Z]+$/, { message: "Kode Kewarganegaraan Harus Diisi!" }),
        kd_profesi: z.string().min(1, { message: "Kode Profesi Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Profesi Harus Angka!" }).transform((v) => Number(v)),
        kd_jns_pekerjaan: z.string().min(1, { message: "Kode Jenis Pekerjaan Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Jenis Pekerjaan Harus Angka!" }).transform((v) => Number(v)),
        usrid_create: z.string().min(1, { message: "User ID Create Harus Diisi!" }),
        usrid_update: z.string().nullable(),
        created_at: z.string().datetime().nullable(),
        updated_at: z.string().datetime().nullable(),
    });

export type TPerorangan = z.infer<typeof schemaPerorangan>;

export default schemaPerorangan;
