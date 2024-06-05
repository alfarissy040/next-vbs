import { prisma } from "@/app/utilities";
import { Prisma, PrismaClient } from "@prisma/client";
import moment from "moment";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const orderBy = url.searchParams.get("orderby") ?? "nomor-nasabah";
    const direction = (url.searchParams.get("direction") as "asc" | "desc") ?? "asc";
    const limitDay = moment().subtract(2, "days").toISOString();

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const nasabah = await prisma.cis_master.findMany({
            orderBy: getOrderBy(orderBy, direction),
            where: {
                AND: [
                    {
                        status_nas: {
                            equals: "00",
                        },
                    },
                    {
                        created_at_kantor: {
                            equals: token.kantor.kd_kantor,
                        },
                    },
                    {
                        created_at: {
                            gte: limitDay,
                        },
                    },
                ],
            },
            select: {
                no_nas: true,
                no_ident: true,
                nm_nas: true,
                tipe_nas: true,
            },
        });

        if (nasabah.length === 0) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        return NextResponse.json({
            data: nasabah,
        });
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
