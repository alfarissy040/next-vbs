import { z } from "zod";

const schemaUpdate = z.object({
    id_update: z.string().nullable(),
    no_nas: z.string().min(1, { message: "Nomor Nasabah Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Nomor Nasabah Harus Angka!" }),
    db_field: z.string().min(1, { message: "Database Field Harus Diisi!" }),
    nm_field: z.string().min(1, { message: "Nama Field Harus Diisi!" }),
    current_record: z.string().nullable(),
    new_record: z.string().nullable(),

    sts_update: z.string().default("00"),
    kd_kantor_update: z.string().regex(/^[0-9]+$/, { message: "Kode Kantor Harus Angka!" }).min(1, { message: "Kode Kantor Harus Diisi!" }),
    usrid_create: z.string().min(1, { message: "User ID Create Harus Diisi!" }),
    usrid_update: z.string().nullable(),
    created_at: z.string().datetime().nullable(),
    updated_at: z.string().datetime().nullable(),
});

export type TUpdate = z.infer<typeof schemaUpdate>
export default schemaUpdate