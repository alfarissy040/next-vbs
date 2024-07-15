import { prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { isEmpty } from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const data = await prisma.kantor.findMany();

        if (isEmpty(data)) return NextResponse.json({ message: "Data not found" }, { status: 404 });
        return NextResponse.json(data);
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