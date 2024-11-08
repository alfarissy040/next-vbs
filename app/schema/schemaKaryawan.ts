import { z } from "zod";

const SchemaKaryawan = z.object({
    id_karyawan: z.string().optional(),
    kd_kantor: z.string().min(1, { message: "Kantor Harus Diisi!" }),
    kd_jns_ident: z.string().regex(/^[0-9]+$/, { message: "Jenis Identitas Harus Angka!" }).transform((value) => Number(value)),
    no_ident: z.string().min(1, { message: "No Identitas Harus Diisi!" }).regex(/^[0-9]+$/, { message: "No Identitas Harus Angka!" }),
    name: z.string().min(1, { message: "Nama Harus Diisi!" }),
    jenis_kelamin: z.string().min(1, { message: "Jenis Kelamin Harus Diisi!" }),
});

export type TKaryawan = z.infer<typeof SchemaKaryawan>;
export default SchemaKaryawan;