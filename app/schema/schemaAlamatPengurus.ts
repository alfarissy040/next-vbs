import { z } from "zod";

const schemaAlamatPengurus = z.object({
    no_nas: z.string(),
    id_pengurus: z.string(),
    no_urut: z.number(),
    jns_alamat: z.string(),
    negara: z.string(),
    provinsi: z.number(),
    kota: z.number(),
    kecamatan: z.number(),
    kelurahan: z.number(),
    rt: z.string(),
    rw: z.string(),
    kd_pos: z.string(),
    alamat_detail: z.string(),
    usrid_create: z.string(),
});

schemaAlamatPengurus.required({
    id_pengurus: true,
    jns_alamat: true,
    negara: true,
    provinsi: true,
    kota: true,
    kecamatan: true,
    kelurahan: true,
    rt: true,
    rw: true,
    kd_pos: true,
    alamat_detail: true,
    usrid_create: true,
});

export default schemaAlamatPengurus;
