import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Mendefinisikan tipe untuk parameter query
type QueryParams = {
    page: number;
    orderBy: string;
    direction: "ascending" | "descending";
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
    const direction = (url.searchParams.get("direction") as "ascending" | "descending") ?? "ascending";
    const search = url.searchParams.get("search") ?? "";

    return { page, orderBy, direction, search };
};

// Fungsi untuk mengatur urutan berdasarkan parameter
const getOrderBy = (orderBy: string, direction: "ascending" | "descending"): any => {
    const sortDir = direction === "ascending" ? "asc" : "desc";
    switch (orderBy) {
        case "nm_nas":
            return { nm_nas: sortDir };
        case "type":
            return { tipe_nas: sortDir };
        default:
            return { no_nas: sortDir };
    }
};

export async function GET(request: Request) {
    const prisma = new PrismaClient();
    const { page, orderBy, direction, search } = getQueryParams(new URL(request.url));
    const itemPerPage = 25;

    const query: TQuery = {
        select: {
            no_nas: true,
            nm_nas: true,
            tipe_nas: true,
            no_ident: true,
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
                    no_nas: {
                        startsWith: search as string,
                    },
                },
                {
                    nm_nas: {
                        contains: search as string,
                    },
                },
                {
                    no_ident: {
                        contains: search as string,
                    },
                },
            ],
        };
        totalQuery.where = {
            OR: [
                {
                    no_nas: {
                        startsWith: search as string,
                    },
                },
                {
                    nm_nas: {
                        contains: search as string,
                    },
                },
                {
                    no_ident: {
                        contains: search as string,
                    },
                },
            ],
        };
    }

    try {
        const users = await prisma.cis_master.findMany(query);
        const totalItems = await prisma.cis_master.count(totalQuery);

        return NextResponse.json({
            page: page,
            itemPerPage: itemPerPage,
            totalPage: Math.ceil(totalItems / itemPerPage),
            total: totalItems,
            data: users,
        });
    } catch (error) {
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
