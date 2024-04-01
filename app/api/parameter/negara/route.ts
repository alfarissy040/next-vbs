import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kd_negara = searchParams.get("negara") ?? "";
    const search = searchParams.get("search") ?? "";
    const page = parseInt(searchParams.get("page") ?? "1");
    const itemPerPage = 25;

    try {
        const dataParameter = await prisma.para_negara.findMany({
            where: {
                OR: [
                    {
                        keterangan: {
                            contains: search,
                            mode: "insensitive"
                        },
                    },
                    {
                        kd_negara: {
                            contains: kd_negara,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            skip: (page - 1) * itemPerPage,
            take: itemPerPage,
            orderBy: {
                keterangan: "asc"
            }
        })
        const totalItems = await prisma.para_negara.count({
            where: {
                OR: [
                    {
                        keterangan: {
                            contains: search,
                            mode: "insensitive"
                        },
                    },
                    {
                        kd_negara: {
                            contains: kd_negara,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            orderBy: {
                keterangan: "asc"
            }
        })
        if (dataParameter.length === 0) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
        return NextResponse.json({
            page: page,
            itemPerPage: itemPerPage,
            totalPage: Math.ceil(totalItems / itemPerPage),
            total: totalItems,
            data: dataParameter,
        });

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