import { prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kode = searchParams.get("kode");

    const queryWhere: { where?: Prisma.para_agamaWhereInput } = {}
    if (kode) queryWhere.where = { kode: parseInt(kode) }


    try {
        const dataParameter = await prisma.para_agama.findMany({
            ...queryWhere,
            orderBy: {
                keterangan: "asc"
            }
        })

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