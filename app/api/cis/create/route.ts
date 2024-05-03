import schemaAlamat from "@/app/schema/schemaAlamat";
import schemaAlamatPengurus from "@/app/schema/schemaAlamatPengurus";
import { schemaMaster } from "@/app/schema/schemaMaster";
import schemaPengurus from "@/app/schema/schemaPengurus";
import schemaPerorangan from "@/app/schema/schemaPerorangan";
import schemaPerusahaan from "@/app/schema/schemaPerusahaan";
import { getValidationMessage } from "@/app/utilities";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodObject, z } from "zod";

type TTipeNas = 1 | 2 | 3 | 4

const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
    let body = await request.json();
    const { no_nas, tipe_nas } = body;
    const isHavePengurus = "pengurus" in body
    // validasi tipe nasabah
    if (!["1", "2", "3", "4"].includes(tipe_nas.toString())) return NextResponse.json({ message: "tipe nasabah harus diisi!" }, { status: 400 });

    try {
        const noUrutAlamat = await prisma.cis_alamat.count({ where: { no_nas } });
        body = {
            ...body,
            no_urut: noUrutAlamat + 1
        }

        if (isHavePengurus) {
            const noUrutAlamatPengurus = await prisma.cis_alamat.count({ where: { no_nas } });
            body = {
                ...body,
                pengurus: {
                    ...body.pengurus,
                    no_urut: noUrutAlamatPengurus + 1
                }
            }
        }

        // mendapatkan schema gabungan (union) berdasarkan tipe nasabah
        const schemas: Record<number, ZodObject<any>> = {
            1: schemaMaster.merge(schemaPerorangan).merge(schemaAlamat),
            2: schemaMaster.merge(schemaPerusahaan).merge(schemaAlamat).merge(z.object({
                pengurus: schemaPengurus.merge(schemaAlamatPengurus)
            })),
            // 2: schemaMaster.merge(schemaPerusahaan).merge(schemaAlamat).merge(schemaPengurus).merge(schemaAlamatPengurus),
            4: schemaMaster.merge(schemaPerusahaan).merge(schemaAlamat).merge(z.object({
                pengurus: schemaPengurus.merge(schemaAlamatPengurus)
            })),
        };
        const defaultSchema = schemaMaster.merge(schemaAlamat).merge(schemaPengurus).merge(schemaAlamatPengurus);
        const validated = (schemas[tipe_nas as TTipeNas] ?? defaultSchema).safeParse(body);

        // validasi schema
        if (!validated.success) {
            const formatedError = validated.error.format();
            let validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);
            if ('pengurus' in formatedError) {
                const errorMessagePengurus = getValidationMessage(formatedError.pengurus ?? {})
                validationErrorMessage = {
                    ...validationErrorMessage,
                    pengurus: errorMessagePengurus,
                };
            }
            return NextResponse.json(validationErrorMessage, { status: 400 });
        }

        // TODOS test api dengan membuat user berdasarkan 4 tipe user
        const resultMaster = await prisma.cis_master.create({
            data: validated.data,
        });
        await prisma.cis_alamat.create({
            data: validated.data,
        });
        if (tipe_nas === 1) {
            await prisma.cis_perorangan.create({
                data: {
                    ...validated.data,
                    no_nas: no_nas,
                },
            });
        } else if (tipe_nas === 2 || tipe_nas === 4) {
            const fetchPerusahaan = await prisma.cis_perusahaan.create({
                data: {
                    ...validated.data,
                    no_nas: no_nas,
                },
                select: {
                    id_perusahaan: true,
                },
            });
            const fetchPengurus = await prisma.cis_pengurus.create({
                data: {
                    ...validated.data.pengurus,
                    no_nas: resultMaster.no_nas,
                },
            });
            await prisma.cis_alamat.create({
                data: {
                    ...validated.data,
                    id_pengurus: fetchPengurus.id_pengurus,
                },
            });
        }
        return NextResponse.json({ message: "data berhasil ditambahkan, silahkan lakukan aktivasi" }, { status: 202 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                {
                    error: error.name,
                    message: error.message,
                },
                { status: 500 }
            );
        }
        return NextResponse.json(
            {
                message: "Something went wrong!",
            },
            {
                status: 500,
            }
        );
    }
}
