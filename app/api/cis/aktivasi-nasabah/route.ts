import { getValidationMessage } from "@/app/utilities";
import { Prisma, PrismaClient } from "@prisma/client";
import moment from "moment";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getOrderBy = (orderBy: string, direction: "asc" | "desc"): any => {
    const sortDir = direction;
    switch (orderBy) {
        case "nama-nasabah":
            return { nm_nas: sortDir };
        case "tipe-nasabah":
            return { tipe_nas: sortDir };
        default:
            return { no_nas: sortDir };
    }
};

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const orderBy = url.searchParams.get("orderby") ?? "nomor-nasabah";
    const direction = (url.searchParams.get("direction") as "asc" | "desc") ?? "asc";
    const limitDay = moment().subtract(2, "days").toISOString()

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    try {
        const nasabah = await prisma.cis_master.findMany({
            orderBy: getOrderBy(orderBy, direction),
            where: {
                AND: [
                    {
                        status_nas: {
                            equals: '00'
                        },
                    },
                    {
                        created_at_kantor: {
                            // equals: token.user.kd_kantor
                            equals: '1'
                        }
                    },
                    // {
                    //     created_at: {
                    //         gte: limitDay
                    //     }
                    // }
                ],
            },
            select: {
                no_nas: true,
                no_ident: true,
                nm_nas: true,
                tipe_nas: true,
            },
        })

        if (nasabah.length === 0) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        return NextResponse.json({
            data: nasabah
        })
    } catch (error) {
        console.log(error)
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

export async function POST(request: NextRequest) {
    const body = await request.json();

    const schemaValidasi = z.object({
        no_nas: z.string(),
        isApprove: z.boolean()
    }).required({
        no_nas: true,
        isApprove: true
    })
    const validated = schemaValidasi.safeParse(body);
    // validasi schema
    if (!validated.success) {
        const formatedError = validated.error.format();
        const validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);

        return NextResponse.json(validationErrorMessage, { status: 400 });
    }

    try {
        const errorNasabahCase: Record<string, string> = {
            "01": "Nasabah sudah aktif",
            "99": "Nasabah sudah dinon-aktifkan",
            "98": "Nasabah tidak ditemukan",
            "error": "something went wrong!"
        }
        const nasabah = await prisma.cis_master.findUnique({
            where: {
                no_nas: body.no_nas
            }
        })

        if (nasabah?.status_nas != "00") return NextResponse.json({ message: errorNasabahCase[nasabah?.status_nas ?? "error"] }, { status: 400 });

        await prisma.cis_master.update({
            where: {
                no_nas: body.no_nas
            },
            data: {
                status_nas: body.isApprove ? "01" : "99"
            }
        })

        return NextResponse.json({ message: "Nasabah berhasil diaktifkan" }, { status: 200 })

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