import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kode = searchParams.get("kode");
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;
    const itemPerPage = 25;

    const queryWhere: Prisma.para_gol_pmlkWhereInput = {
        keterangan: {
            contains: search,
            mode: "insensitive",
        },
        ...(kode && { kode: parseInt(kode, 10) }),
    };

    try {
        const dataParameter = await prisma.para_gol_pmlk.findMany({
            where: queryWhere,
            skip: (page - 1) * itemPerPage,
            take: itemPerPage,
            orderBy: {
                keterangan: "asc",
            },
        });

        const totalItems = await prisma.para_gol_pmlk.count({
            where: queryWhere,
            orderBy: {
                keterangan: "asc",
            },
        });

        if (dataParameter.length === 0) {
            return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
        }

        const totalPage = Math.ceil(totalItems / itemPerPage);

        return NextResponse.json({
            page,
            itemPerPage,
            totalPage,
            total: totalItems,
            data: dataParameter,
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({
                error: error.name,
                message: error.message,
            }, {
                status: 500,
            });
        }

        return NextResponse.json({
            message: "Something went wrong!",
        }, {
            status: 500,
        });
    }
}
