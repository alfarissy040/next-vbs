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
    const page = searchParams.get("page") as unknown as number ?? 1;
    const whereArray: Prisma.para_kelurahanWhereInput[] = []
    const searchQuery: TSearchQuery = {
        orderBy: {
            keterangan: "asc"
        }
    }

    if (kd_kecamatan) {
        whereArray.push({
            kd_kecamatan: {
                equals: parseInt(kd_kecamatan)
            }
        })
    }
    if (kd_kelurahan) {
        whereArray.push({
            kd_kelurahan: {
                equals: parseInt(kd_kelurahan)
            }
        })
    }
    if (whereArray.length > 0) searchQuery.where = { OR: whereArray }


    try {
        const dataParameter = await prisma.para_kelurahan.findMany({
            ...searchQuery,
            skip: (page - 1) * 25,
            take: 25,
        })
        const dataPaginator = await prisma.para_kelurahan.count({
            ...searchQuery
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