import { getValidationMessage, prisma } from "@/app/utilities";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface IParams {
    nonas: string;
}

export async function POST(request: NextRequest, { params }: { params: IParams }): Promise<NextResponse> {
    const body = await request.json();
    const { nonas } = params;

    const errorNasabahCase: Record<string, string> = {
        "01": "Nasabah sudah aktif",
        "99": "Nasabah sudah dinon-aktifkan",
        "98": "Nasabah tidak ditemukan",
        error: "something went wrong!",
    };
    // schema validasi
    const schemaValidasi = z
        .object({
            isApprove: z.boolean(),
        })
        .required({
            isApprove: true,
        });
    // validasi
    const validated = schemaValidasi.safeParse(body);
    // get error message
    if (!validated.success) {
        const formatedError = validated.error.format();
        const validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);
        return NextResponse.json(validationErrorMessage, { status: 400 });
    }

    try {
        const nasabah = await prisma.cis_master.findUnique({
            where: {
                no_nas: nonas,
            },
        });

        if (nasabah?.status_nas != "00") return NextResponse.json({ message: errorNasabahCase[nasabah?.status_nas ?? "error"] }, { status: 400 });

        await prisma.cis_master.update({
            where: {
                no_nas: nonas,
            },
            data: {
                status_nas: body.isApprove ? "01" : "99",
            },
        });

        return NextResponse.json({ message: body.isApprove ? "Nasabah berhasil diaktifkan" : "Penolakan Aktivasi Berhasil" }, { status: 200 });
    } catch (error) {
        console.log(error);
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
