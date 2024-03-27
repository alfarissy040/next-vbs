import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface TSearchQuery {
    where?: {
        OR?: Prisma.para_kecamatanWhereInput[]
    }
    orderBy: Prisma.para_kecamatanOrderByWithAggregationInput
}

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kd_kota = searchParams.get("kota");
    const kd_kecamatan = searchParams.get("kecamatan");
    const page = searchParams.get("page") as unknown as number ?? 1;
    const whereArray: Prisma.para_kecamatanWhereInput[] = []
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
    if (kd_kota) {
        whereArray.push({
            kd_kota: {
                equals: parseInt(kd_kota)
            }
        })
    }
    if (whereArray.length > 0) searchQuery.where = { OR: whereArray }


    try {
        const dataParameter = await prisma.para_kecamatan.findMany({
            ...searchQuery,
            skip: (page - 1) * 25,
            take: 25,
        })
        const dataPaginator = await prisma.para_kecamatan.count({
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