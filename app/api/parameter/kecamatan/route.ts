import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface TSearchQuery {
    where?: {
        OR?: Prisma.para_kecamatanWhereInput[]
    }
    orderBy: Prisma.para_kecamatanOrderByWithAggregationInput
}

const prisma = new PrismaClient();
/**
 * Handles the GET request to retrieve data based on search parameters.
 *
 * @param {Request} request - The request object containing URL parameters.
 * @return {Promise} A JSON response with fetched data or error message.
 */
export async function GET(request: Request) {
    // Extract search parameters from the request URL
    const { searchParams } = new URL(request.url);
    const kd_kota = searchParams.get("kota");
    const kd_kecamatan = searchParams.get("kecamatan");
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const itemPerPage = 25;

    // Define the Prisma query conditions
    const queryWhere: Prisma.para_kecamatanWhereInput = {
        AND: [
            { keterangan: { contains: search, mode: "insensitive" } },
            ...(kd_kota ? [{ kd_kota: { equals: parseInt(kd_kota) } }] : []),
            ...(kd_kecamatan ? [{ kd_kecamatan: { equals: parseInt(kd_kecamatan) } }] : []),
        ],
    };

    try {
        // Fetch data based on the query conditions
        const dataParameter = await prisma.para_kecamatan.findMany({
            where: queryWhere,
            skip: (page - 1) * itemPerPage,
            take: itemPerPage,
            orderBy: {
                keterangan: "asc"
            }
        });

        // Count the total number of items matching the query conditions
        const totalItems = await prisma.para_kecamatan.count({
            where: queryWhere,
            orderBy: {
                keterangan: "asc"
            }
        });

        // If no data is found, return a 404 error
        if (dataParameter.length === 0) {
            return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
        }

        // Return the fetched data with pagination information
        return NextResponse.json({
            page: page,
            itemPerPage: itemPerPage,
            totalPage: Math.ceil(totalItems / itemPerPage),
            total: totalItems,
            data: dataParameter,
        });
    } catch (error) {
        // If there's a Prisma error, return a 500 error with the error details
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                {
                    error: error.name,
                    message: error.message,
                },
                { status: 500 }
            );
        }

        // If there's any other error, return a generic 500 error
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
