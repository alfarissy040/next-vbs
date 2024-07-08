import { z } from "zod"
import schemaAlamat from "./schemaAlamat"
import schemaAlamatPengurus from "./schemaAlamatPengurus"
import schemaPengurus from "./schemaPengurus"
import { schemaMaster } from "./schemaMaster"
import schemaPerorangan from "./schemaPerorangan"
import schemaPerusahaan from "./schemaPerusahaan"

export const schemaTypePerorangan = z.object({
    alamat: schemaAlamat.optional(),
}).merge(schemaMaster).merge(schemaPerorangan)

export const schemaTypePerusahaanNonProfit = z.object({
    alamat: schemaAlamat,
    pengurus: z.object({
        alamat: schemaAlamatPengurus
    }).merge(schemaPengurus)
}).merge(schemaMaster).merge(schemaPerusahaan)

export const schemaTypeInstansi = z.object({
    alamat: schemaAlamat,
    pengurus: z.object({
        alamat: schemaAlamatPengurus
    }).merge(schemaPengurus)
}).merge(schemaMaster)