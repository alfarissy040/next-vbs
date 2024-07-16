import { prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const getOrderby = (order: string, direction: "asc" | "desc") => {
    const result: Record<string, any> = {
        "nomor-identitas": { no_ident: direction },
        nama: { nm_nas: direction },
        "tipe-nasabah": { tipe_nas: direction },
    };
    return result[order] ?? { no_nas: direction };
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const search = searchParams.get("search") || "";
    const orderBy = searchParams.get("orderby") ?? "no_nas";
    const direction = (searchParams.get("direction") as "asc" | "desc") ?? "asc";

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const result = await prisma.cis_master.findMany({
            where: {
                cis_update: {
                    some: {
                        kd_kantor_update: token?.kantor.kd_kantor,
                        sts_update: "00"
                    },
                },
            },
            distinct: ["no_nas"],
            select: {
                no_nas: true,
                no_ident: true,
                nm_nas: true,
                tipe_nas: true,
                created_at: true,
                cis_update: {
                    select: {
                        usrid_create: true,
                        nm_field: true,
                        current_record: true,
                        new_record: true,
                        created_at: true,
                        id_update: true,
                    }
                }
            },
            orderBy: getOrderby(orderBy, direction),
        });

        if (!result || result.length === 0) return NextResponse.json({ message: "Data not found" }, { status: 404 });

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error);
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
