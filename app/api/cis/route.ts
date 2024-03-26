import { Prisma, PrismaClient, cis_alamat, cis_master, cis_pengurus, cis_perorangan, cis_perusahaan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
                        mode: "insensitive"
                    },
                },
                {
                    nm_nas: {
                        contains: search as string,
                        mode: "insensitive"
                    },
                },
                {
                    no_ident: {
                        contains: search as string,
                        mode: "insensitive"
                    },
                },
            ],
        };
        totalQuery.where = {
            OR: [
                {
                    no_nas: {
                        startsWith: search as string,
                        mode: "insensitive"
                    },
                },
                {
                    nm_nas: {
                        contains: search as string,
                        mode: "insensitive"
                    },
                },
                {
                    no_ident: {
                        contains: search as string,
                        mode: "insensitive"
                    },
                },
            ],
        };
    }

    try {
        const users = await prisma.cis_master.findMany(query);
        const totalItems = await prisma.cis_master.count(totalQuery);

        if (!users) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        console.log({
            query,
            data: users
        })

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

export async function POST(request: NextRequest) {
    const body = await request.json();
    const dataMaster: cis_master = body;
    const dataAlamat: cis_alamat = body;
    const dataPerorangan: cis_perorangan = body;
    const dataPerusahaan: cis_perusahaan = body;
    const dataPengurus: cis_pengurus = body;
    const dataAlamatPengurus: cis_alamat = body;

    const { no_nas, tipe_nas } = dataMaster;

    // const currentUser = await getCurrentUser(); @todo

    // if (!currentUser) return NextResponse.json(); @todo

    try {
        const resultMaster = await prisma.cis_master.create({
            data: dataMaster,
        });

        await prisma.cis_alamat.create({
            data: dataAlamat,
        });

        if (tipe_nas === 1) {
            await prisma.cis_perorangan.create({
                data: {
                    ...dataPerorangan,
                    no_nas: no_nas,
                },
            });
        } else if (tipe_nas === 2 || tipe_nas === 4) {
            const fetchPerusahaan = await prisma.cis_perusahaan.create({
                data: {
                    ...dataPerusahaan,
                    no_nas: no_nas,
                },
                select: {
                    id_perusahaan: true,
                },
            });

            const fetchPengurus = await prisma.cis_pengurus.create({
                data: {
                    ...dataPengurus,
                    no_nas: resultMaster.no_nas,
                },
            });

            await prisma.cis_alamat.create({
                data: {
                    ...dataAlamatPengurus,
                    id_pengurus: fetchPengurus.id_pengurus,
                },
            });
        }

        return NextResponse.json({ message: "data berhasil ditambahkan, silahkan lakukan aktivasi" }, { status: 202 });
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
