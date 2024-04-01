import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface TSearchQuery {
    where?: {
        OR?: Prisma.para_kelurahanWhereInput[]
    }
    orderBy: Prisma.para_kelurahanOrderByWithAggregationInput
}

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kd_kecamatan = searchParams.get("kecamatan") ?? "";
    const kd_kelurahan = searchParams.get("kelurahan") ?? "";
    const search = searchParams.get("search") ?? "";
    const page = parseInt(searchParams.get("page") as unknown as string) ?? 1;
    const itemPerPage = 25;

    const queryWhere: { where?: Prisma.para_kelurahanWhereInput } = {}
    if (kd_kecamatan) queryWhere.where = { kd_kecamatan: parseInt(kd_kecamatan) }
    if (kd_kelurahan) queryWhere.where = { kd_kelurahan: parseInt(kd_kelurahan) }

    try {
        const dataParameter = await prisma.para_kelurahan.findMany({
            where: {
                keterangan: {
                    contains: search,
                    mode: "insensitive"
                },
                ...queryWhere
            },
            skip: (page - 1) * itemPerPage,
            take: itemPerPage,
            orderBy: {
                keterangan: "asc"
            }
        })
        const totalItems = await prisma.para_kelurahan.count({
            ...queryWhere,
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