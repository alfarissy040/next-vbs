import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
/**
 * API endpoint for fetching parameter data for Kelurahan.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Object>} - The response object.
 */
export async function GET(request: Request) {
    // Parse the search parameters from the request URL
    const { searchParams } = new URL(request.url);
    const kd_kecamatan = searchParams.get("kecamatan") ?? "";
    const kd_kelurahan = searchParams.get("kelurahan") ?? "";
    const search = searchParams.get("search") ?? "";
    const page = parseInt(searchParams.get("page") ?? "1");
    const itemPerPage = 25;

    /**
     * The queryWhere object is used to filter the data based on the search parameters.
     * It includes the keterangan (description) field which is used for searching and also
     * the optional kd_kecamatan and kd_kelurahan fields.
     */
    const queryWhere: Prisma.para_kelurahanWhereInput = {
        AND: [
            { keterangan: { contains: search, mode: "insensitive" } },
            ...(kd_kecamatan ? [{ kd_kecamatan: { equals: parseInt(kd_kecamatan) } }] : []),
            ...(kd_kelurahan ? [{ kd_kelurahan: { equals: parseInt(kd_kelurahan) } }] : []),
        ],
    };

    try {
        // Fetch the parameter data from the database based on the queryWhere object
        const dataParameter = await prisma.para_kelurahan.findMany({
            where: queryWhere,
            skip: (page - 1) * itemPerPage,
            take: itemPerPage,
            orderBy: {
                keterangan: "asc"
            }
        })

        // Fetch the total count of items based on the queryWhere object
        const totalItems = await prisma.para_kelurahan.count({
            where: queryWhere,
            orderBy: {
                keterangan: "asc"
            }
        })

        // If no data is found, return a JSON response with a "Data not found" message
        if (dataParameter.length === 0) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        // Return a JSON response with the fetched data, pagination information and total count
        return NextResponse.json({
            page: page,
            itemPerPage: itemPerPage,
            totalPage: Math.ceil(totalItems / itemPerPage),
            total: totalItems,
            data: dataParameter,
        });
    } catch (error) {
        // If there is an error, return a JSON response with the error name and message
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                {
                    error: error.name,
                    message: error.message,
                },
                { status: 500 }
            );
        }
        // If there is any other error, return a generic error message
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
