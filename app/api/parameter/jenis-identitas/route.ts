import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kode = searchParams.get("kode");
    const jnsNas = searchParams.get("jenis-nasabah");

    const queryWhere: { where?: Prisma.para_jns_identWhereInput } = {}
    if (kode) queryWhere.where = { kode: parseInt(kode) }
    if (jnsNas) queryWhere.where = { jns_nas: parseInt(jnsNas) }


    try {
        const dataParameter = await prisma.para_jns_ident.findMany({
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