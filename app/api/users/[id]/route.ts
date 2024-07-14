import { prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { has } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    id?: string;
}

export async function GET(request:NextRequest, { params }: { params: IParams }) {
    const { id: idUser } = params;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    try {
        const user = await prisma.aks_pemakai.findFirstOrThrow({
            where: {
                id_pemakai: idUser
            },
            select: {
                id_pemakai:true,
                username: true,
                email: true,
                para_level_user: true,
                karyawan: {
                    select: {
                        kantor:true,
                    }
                }
            },
        })

        if (!user) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        if(!has(token, user.karyawan.kantor.kd_kantor) && token?.level.level !== 1){
            return NextResponse.json({message: "Unauthorized action!"}, {status: 401})
        }

        return NextResponse.json(user);
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