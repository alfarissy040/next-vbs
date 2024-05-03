import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
/**
 * This is the GET API endpoint for retrieving parameter kota data.
 * It supports filtering, pagination, and search functionality.
 *
 * @param {Request} request - The request object containing the query parameters.
 * @return {Promise<Response>} - The response containing the parameter kota data.
 */
export async function GET(request: Request) {
    // Extract the query parameters from the request URL
    const { searchParams } = new URL(request.url);

    // Extract the filter parameters
    const kd_provinsi = searchParams.get("provinsi") ?? "";
    const kd_kota = searchParams.get("kota") ?? "";
    const search = searchParams.get("search") ?? "";

    // Extract the pagination parameters
    const page = parseInt(searchParams.get("page") ?? "1");
    const itemPerPage = 25;

    // Build the queryWhere object for filtering the data
    const queryWhere: Prisma.para_kotaWhereInput = {
        AND: [
            { keterangan: { contains: search, mode: "insensitive" } },
            ...(kd_provinsi ? [{ kd_provinsi: { equals: parseInt(kd_provinsi) } }] : []),
            ...(kd_kota ? [{ kd_kota: { equals: parseInt(kd_kota) } }] : []),
        ],
    };

    try {
        // Fetch the parameter kota data using the query parameters
        const dataParameter = await prisma.para_kota.findMany({
            where: queryWhere,
            skip: (page - 1) * itemPerPage,
            take: itemPerPage,
            orderBy: {
                keterangan: "asc"
            }
        })

        // Fetch the total count of parameter kota data
        const totalItems = await prisma.para_kota.count({
            where: queryWhere,
            orderBy: {
                keterangan: "asc"
            }
        })

        // Return the response if data is found
        if (dataParameter.length === 0) {
            return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
        }

        // Return the paginated data with meta information
        return NextResponse.json({
            page: page,
            itemPerPage: itemPerPage,
            totalPage: Math.ceil(totalItems / itemPerPage),
            total: totalItems,
            data: dataParameter,
        });
    } catch (error) {
        // Handle Prisma known request errors and return the appropriate response
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                {
                    error: error.name,
                    message: error.message,
                },
                { status: 500 }
            );
        }

        // Handle other errors and return a generic error response
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
