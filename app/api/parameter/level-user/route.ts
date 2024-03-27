import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");

    const queryWhere: { where?: Prisma.para_level_userWhereInput } = {}
    if (level) queryWhere.where = { level: parseInt(level) }


    try {
        const dataParameter = await prisma.para_level_user.findMany({
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