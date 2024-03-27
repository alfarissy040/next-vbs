import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kd_negara = searchParams.get("negara") ?? "";
    const page = searchParams.get("page") as unknown as number ?? 1;

    try {
        const dataParameter = await prisma.para_negara.findMany({
            where: {
                OR: [
                    {
                        kd_negara: {
                            contains: kd_negara,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            select: {
                kd_negara: true,
                keterangan: true
            },
            orderBy: {
                keterangan: "asc"
            },
            skip: (page - 1) * 25,
            take: 25
        })
        const dataPaginator = await prisma.para_negara.count({
            where: {
                OR: [
                    {
                        kd_negara: {
                            contains: kd_negara,
                            mode: "insensitive"
                        }
                    }
                ]
            },
        })

        if (dataParameter.length === 0) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
        return NextResponse.json({
            page: page,
            itemPerPage: 25,
            totalPage: Math.ceil(dataPaginator / 25),
            total: dataPaginator,
            data: dataParameter,
        })

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