import schemaAlamat from "@/app/schema/schemaAlamat";
import schemaAlamatPengurus from "@/app/schema/schemaAlamatPengurus";
import { schemaMaster } from "@/app/schema/schemaMaster";
import schemaPengurus from "@/app/schema/schemaPengurus";
import schemaPerorangan from "@/app/schema/schemaPerorangan";
import schemaPerusahaan from "@/app/schema/schemaPerusahaan";
import { getValidationMessage } from "@/app/utilities";
import { Prisma, PrismaClient, cis_alamat, cis_master, cis_pengurus, cis_perorangan, cis_perusahaan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodSchema, z } from "zod";

const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { no_nas, tipe_nas } = body;

    // TODOS buat validasi untuk tipe perorangan, perusahaan, pemertintah, dan non-profit
    // validasi tipe nasabah
    if (!["1", "2", "3", "4"].includes(tipe_nas.toString())) return NextResponse.json({ message: "tipe nasabah harus diisi!" }, { status: 400 });

    // mendapatkan schema gabungan (union) berdasarkan tipe nasabah
    const unionSchema = () => {
        if (tipe_nas === 1) {
            console.log("A");
            return z.union([schemaMaster, schemaPerorangan, schemaAlamat]);
        } else if (tipe_nas === 2 || tipe_nas === 4) {
            console.log("B");
            return z.union([schemaMaster, schemaPerusahaan, schemaAlamat, schemaPengurus, schemaAlamatPengurus]);
        } else {
            console.log("C");
            return z.union([schemaMaster, schemaAlamat, schemaPengurus, schemaAlamatPengurus]);
        }
    };

    // validasi schema
    const validatedData = unionSchema().safeParse(body);
    if (!validatedData.success) {
        const validationErrorMessage = getValidationMessage(validatedData.error.format());
        return NextResponse.json(validationErrorMessage, { status: 400 });
    }
    return NextResponse.json({ message: "data berhasil ditambahkan, silahkan lakukan aktivasi" }, { status: 202 });
    // TODOS test api dengan membuat user berdasarkan 4 tipe user
    // try {
    // const resultMaster = await prisma.cis_master.create({
    //     data: dataMaster,
    // });
    // await prisma.cis_alamat.create({
    //     data: dataAlamat,
    // });
    // if (tipe_nas === 1) {
    //     await prisma.cis_perorangan.create({
    //         data: {
    //             ...dataPerorangan,
    //             no_nas: no_nas,
    //         },
    //     });
    // } else if (tipe_nas === 2 || tipe_nas === 4) {
    //     const fetchPerusahaan = await prisma.cis_perusahaan.create({
    //         data: {
    //             ...dataPerusahaan,
    //             no_nas: no_nas,
    //         },
    //         select: {
    //             id_perusahaan: true,
    //         },
    //     });
    //     const fetchPengurus = await prisma.cis_pengurus.create({
    //         data: {
    //             ...dataPengurus,
    //             no_nas: resultMaster.no_nas,
    //         },
    //     });
    //     await prisma.cis_alamat.create({
    //         data: {
    //             ...dataAlamatPengurus,
    //             id_pengurus: fetchPengurus.id_pengurus,
    //         },
    //     });
    // }
    // return NextResponse.json({ message: "data berhasil ditambahkan, silahkan lakukan aktivasi" }, { status: 202 });
    // } catch (error) {
    //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //         return NextResponse.json(
    //             {
    //                 error: error.name,
    //                 message: error.message,
    //             },
    //             { status: 500 }
    //         );
    //     }
    //     return NextResponse.json(
    //         {
    //             message: "Something went wrong!",
    //         },
    //         {
    //             status: 500,
    //         }
    //     );
    // }
}
