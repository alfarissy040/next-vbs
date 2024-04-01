import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface TSearchQuery {
    where?: {
        OR?: Prisma.para_kotaWhereInput[]
    }
    orderBy: Prisma.para_kotaOrderByWithAggregationInput
}

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kd_provinsi = searchParams.get("provinsi");
    const kd_kota = searchParams.get("kota");
    const search = searchParams.get("search") ?? "";
    const page = parseInt(searchParams.get("page") as unknown as string) ?? 1;
    const itemPerPage = 25;

    const queryWhere: { where?: Prisma.para_kotaWhereInput } = {}
    if (kd_provinsi) queryWhere.where = { kd_provinsi: parseInt(kd_provinsi) }
    if (kd_kota) queryWhere.where = { kd_kota: parseInt(kd_kota) }

    try {
        const dataParameter = await prisma.para_kota.findMany({
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
        const totalItems = await prisma.para_kota.count({
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