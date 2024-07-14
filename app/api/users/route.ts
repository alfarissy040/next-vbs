import { prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { isEmpty } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type QueryParams = {
    page: number;
    orderBy: string;
    direction: "asc" | "desc";
};

type TQuery = {
    skip: number;
    take: number;
    orderBy: Prisma.aks_pemakaiOrderByWithAggregationInput;
    where?: Prisma.aks_pemakaiWhereInput;
};
type TQueryTotal = {
    orderBy: Prisma.aks_pemakaiOrderByWithAggregationInput;
    where?: Prisma.aks_pemakaiWhereInput;
};

const getQueryParams = (url: URL): QueryParams => {
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const orderBy = url.searchParams.get("orderby") ?? "nama";
    const direction = (url.searchParams.get("direction") as "asc" | "desc") ?? "asc";

    return { page, orderBy, direction };
};

// Fungsi untuk mengatur urutan berdasarkan parameter
const getOrderBy = (orderBy: string, direction: "asc" | "desc"): any => {
    const sortDir = direction;
    switch (orderBy) {
        case "jenis-user":
            return { para_level_user: { keterangan: sortDir }}
        case "username":
            return { karyawan: { name: sortDir }};
        default:
            return { username: sortDir };
    }
};

export async function GET(request:NextRequest) {
    const { page, orderBy, direction } = getQueryParams(new URL(request.url));
    const itemPerPage = 25;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if(isEmpty(token)) return NextResponse.json({message: "Unauthorized"}, {status: 401})

    const query: TQuery = {
        skip: (page - 1) * itemPerPage,
        take: itemPerPage,
        orderBy: getOrderBy(orderBy, direction),
    };
    const totalQuery: TQueryTotal = {
        orderBy: getOrderBy(orderBy, direction),
    };

    if(token.level.level !== 1) {
        query.where = {
            karyawan : {
                kd_kantor: token?.kantor.kd_kantor
            }
        }
    }

    try {
        const users = await prisma.aks_pemakai.findMany({
            ...query,
            select: {
                id_pemakai:true,
                username: true,
                para_level_user: true,
                karyawan: {
                    select: {
                        name:true,
                        kantor:true,
                    }
                }
            },
        })
        const totalItems = await prisma.aks_pemakai.count(totalQuery)
        if (!users) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        return NextResponse.json({
            page: page,
            itemPerPage: itemPerPage,
            totalPage: Math.ceil(totalItems / itemPerPage),
            total: totalItems,
            data: users,
        });
    } catch (error) {
        console.log(error)
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