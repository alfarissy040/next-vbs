import moment from "moment";
import { z } from "zod";

const schemaPerusahaan = z.object({
    id_perusahaan: z.string().cuid().optional(),
    no_nas: z.string().min(1, { message: "Nomor Nasabah Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Nomor Nasabah Harus Angka!" }),
    kd_group_nas: z.string().min(1, { message: "Kode Grup Nasabah Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Kode Grup Nasabah Harus Angka!" }).transform((v) => Number(v)),
    flag_bank: z.boolean().default(false),
    modal_sendiri: z.string().regex(/^[0-9]+$/, { message: "Modal Sendiri Harus Angka!" }).transform((v) => Number(v)),
    modal_setor: z.string().regex(/^[0-9]+$/, { message: "Modal Setor Harus Angka!" }).transform((v) => Number(v)),
    no_akte_awal: z.string().min(1, { message: "Nomor Akte Awal Harus Diisi!" }),
    tgl_akte_awal: z.string().datetime().min(1, { message: "Tanggal Akte Awal Harus Diisi!" }).refine((date) => moment(date) > moment().add(1, "day"), { message: "Tidak Boleh Melebihi Hari Ini!" }),
    no_akte_akhir: z.string().min(1, { message: "Nomor Akte Akhir Harus Diisi!" }),
    tgl_akte_akhir: z.string().datetime().min(1, { message: "Tanggal Akte Akhir Harus Diisi!" }).refine((date) => moment(date) > moment().add(1, "day"), { message: "Tidak Boleh Melebihi Hari Ini!" }),
    nm_notaris: z.string().min(1, { message: "Nama Notaris Harus Diisi!" }),
    no_notaris: z.string().min(1, { message: "Nomor Notaris Harus Diisi!" }),
    tgl_notaris: z.string().datetime().min(1, { message: "Tanggal Notaris Harus Diisi!" }).refine((date) => moment(date) > moment().add(1, "day"), { message: "Tidak Boleh Melebihi Hari Ini!" }),
    no_permohonan_dep: z.string().min(1, { message: "Nomor Permohonan dep. Harus Diisi!" }),
    tgl_permohonan_dep: z.string().datetime().min(1, { message: "Tanggal Permohonan dep. Harus Diisi!" }).refine((date) => moment(date) > moment().add(1, "day"), { message: "Tidak Boleh Melebihi Hari Ini!" }),
    no_izin_dep: z.string().min(1, { message: "Nomor Izin dep. Harus Diisi!" }),
    tgl_izin_dep: z.string().datetime().min(1, { message: "Tanggal Izin dep. Harus Diisi!" }).refine((date) => moment(date) > moment().add(1, "day"), { message: "Tidak Boleh Melebihi Hari Ini!" }),
    no_pub: z.string().min(1, { message: "Nomor Publikasi Harus Diisi!" }),
    tgl_pub: z.string().datetime().min(1, { message: "Tanggal Publikasi Harus Diisi!" }).refine((date) => moment(date) > moment().add(1, "day"), { message: "Tidak Boleh Melebihi Hari Ini!" }),
    usrid_create: z.string().min(1, { message: "User ID Create Harus Diisi!" }),
    usrid_update: z.string().nullable(),
    created_at: z.string().datetime().nullable(),
    updated_at: z.string().datetime().nullable(),
});

export type TPerusahaan = z.infer<typeof schemaPerusahaan>;

export default schemaPerusahaan;
