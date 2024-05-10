import { z } from "zod";

const schemaAlamatPengurus = z.object({
    no_urut: z.number(),
    jns_alamat: z.string(),
    kd_negara: z.string(),
    kd_provinsi: z.number(),
    kd_kota: z.number(),
    kd_kecamatan: z.number(),
    kd_kelurahan: z.number(),
    rt: z.string(),
    rw: z.string(),
    kd_pos: z.string(),
    alamat_detail: z.string(),
});

schemaAlamatPengurus.required({
    jns_alamat: true,
    kd_negara: true,
    kd_provinsi: true,
    kd_kota: true,
    kd_kecamatan: true,
    kd_kelurahan: true,
    rt: true,
    rw: true,
    kd_pos: true,
    alamat_detail: true,
});

export default schemaAlamatPengurus;
