import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface TSearchQuery {
    where?: {
        OR?: Prisma.para_provinsiWhereInput[]
    }
    orderBy: Prisma.para_provinsiOrderByWithAggregationInput
}

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kd_negara = searchParams.get("negara");
    const kd_provinsi = searchParams.get("provinsi");
    const whereArray: Prisma.para_provinsiWhereInput[] = []
    const searchQuery: TSearchQuery = {
        orderBy: {
            keterangan: "asc"
        }
    }

    if (kd_negara) {
        whereArray.push({
            kd_negara: {
                contains: kd_negara,
                mode: "insensitive"
            }
        })
    }
    if (kd_provinsi) {
        whereArray.push({
            kd_provinsi: {
                equals: parseInt(kd_provinsi)
            }
        })
    }
    if (whereArray.length > 0) searchQuery.where = { OR: whereArray }

    try {
        const dataParameter = await prisma.para_provinsi.findMany(searchQuery)

        if (dataParameter.length === 0) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
        return NextResponse.json(dataParameter)
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
