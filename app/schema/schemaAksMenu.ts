import { z } from "zod";

const schemaAksMenu = z.object({
    id_pemakai: z.string().optional(),
    id_lvl: z.string().min(1, { message: "Level User Harus Diisi!" }).regex(/^[0-9]+$/, { message: "Level User Harus Angka!" }),
    id_karyawan: z.string().min(1, { message: "ID Karyawan Harus Diisi!" }),
    email: z.string().min(1, { message: "Email Harus Diisi!" }).email({ message: "Email Harus Valid!" }),
    username: z.string().min(1, { message: "Username Harus Diisi!" }),
    password: z.string().min(1, { message: "Password Harus Diisi!" }),
    reset_token: z.string().optional(),
    reset_expired: z.string().datetime().optional(),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional()
});

export type TAksMenu = z.infer<typeof schemaAksMenu>;

export default schemaAksMenu