import { Prisma, PrismaClient, cis_alamat, cis_master, cis_pengurus, cis_perorangan, cis_perusahaan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Mendefinisikan tipe untuk parameter query
type QueryParams = {
    page: number;
    orderBy: string;
    direction: "asc" | "desc";
    search?: string | null;
};

type TQuery = {
    select: Prisma.cis_masterSelect;
    skip: number;
    take: number;
    orderBy: Prisma.cis_masterOrderByWithAggregationInput;
    where?: Prisma.cis_masterWhereInput;
};
type TQueryTotal = {
    orderBy: Prisma.cis_masterOrderByWithAggregationInput;
    where?: Prisma.cis_masterWhereInput;
};

// Fungsi untuk mengambil parameter query dari URL
const getQueryParams = (url: URL): QueryParams => {
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const orderBy = url.searchParams.get("orderby") ?? "no_nas";
    const direction = (url.searchParams.get("direction") as "asc" | "desc") ?? "asc";
    const search = url.searchParams.get("search") ?? "";

    return { page, orderBy, direction, search };
};

// Fungsi untuk mengatur urutan berdasarkan parameter
const getOrderBy = (orderBy: string, direction: "asc" | "desc"): any => {
    const sortDir = direction;
    switch (orderBy) {
        case "nm_nas":
            return { nm_nas: sortDir };
        case "type":
            return { tipe_nas: sortDir };
        default:
            return { no_nas: sortDir };
    }
};

const prisma = new PrismaClient();
export async function GET(request: Request) {
    const { page, orderBy, direction, search } = getQueryParams(new URL(request.url));
    const itemPerPage = 25;

    const query: TQuery = {
        select: {
            no_nas: true,
            nm_nas: true,
            tipe_nas: true,
            no_ident: true,
            status_nas: true,
        },
        skip: (page - 1) * itemPerPage,
        take: itemPerPage,
        orderBy: getOrderBy(orderBy, direction),
    };
    const totalQuery: TQueryTotal = {
        orderBy: getOrderBy(orderBy, direction),
    };

    if (search) {
        query.where = {
            OR: [
                {
                    status_nas: {
                        equals: "01",
                    },
                },
                {
                    no_nas: {
                        startsWith: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    nm_nas: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    no_ident: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
            ],
        };
        totalQuery.where = {
            OR: [
                {
                    status_nas: {
                        equals: "01",
                    },
                },
                {
                    no_nas: {
                        startsWith: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    nm_nas: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    no_ident: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
            ],
        };
    }

    try {
        const users = await prisma.cis_master.findMany(query);
        const totalItems = await prisma.cis_master.count(totalQuery);

        if (!users) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        return NextResponse.json({
            page: page,
            itemPerPage: itemPerPage,
            totalPage: Math.ceil(totalItems / itemPerPage),
            total: totalItems,
            data: users,
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
