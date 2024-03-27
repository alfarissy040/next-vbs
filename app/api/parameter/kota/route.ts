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
    const page = searchParams.get("page") as unknown as number ?? 1;
    const whereArray: Prisma.para_kotaWhereInput[] = []
    const searchQuery: TSearchQuery = {
        orderBy: {
            keterangan: "asc"
        }
    }

    if (kd_provinsi) {
        whereArray.push({
            kd_provinsi: {
                equals: parseInt(kd_provinsi)
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
        const dataParameter = await prisma.para_kota.findMany({
            ...searchQuery,
            skip: (page - 1) * 25,
            take: 25,
        })
        const dataPaginator = await prisma.para_kota.count({
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