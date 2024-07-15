import { getValidationMessage, prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { has } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface IParams {
    id?: string;
}

export async function GET(request: NextRequest, { params }: { params: IParams }) {
    const { id: idUser } = params;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    try {
        const user = await prisma.aks_pemakai.findFirstOrThrow({
            where: {
                karyawan: {
                    id_karyawan: idUser
                }
            },
            select: {
                id_pemakai: true,
                username: true,
                email: true,
                para_level_user: true,
                karyawan: {
                    select: {
                        id_karyawan: true,
                        name: true,
                        no_ident: true,
                        jenis_kelamin: true,
                        kantor: true,
                        jenis_identitas: true,
                    }
                }
            },
        })

        if (!user) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        if (!has(token, user.karyawan.kantor.kd_kantor) && token?.level.level !== 1) {
            return NextResponse.json({ message: "Unauthorized action!" }, { status: 401 })
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

export async function PUT(request: NextRequest, { params }: { params: IParams }) {
    const { id: idUser } = params;
    const body = await request.json();
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const level = token?.level.level ?? 99;

    try {
        const user = await prisma.aks_pemakai.findFirstOrThrow({
            where: {
                karyawan: {
                    id_karyawan: idUser
                }
            },
            select: {
                id_karyawan: true
            }
        })
        console.log({
            a: token?.id,
            b: token,
            bb: user.id_karyawan !== idUser,
            c: level > 2
        })

        if (level > 2 && (!token || user.id_karyawan !== idUser)) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const schema = z.object({
            kd_kantor: z.string(),
            kd_jns_ident: z.number(),
            no_ident: z.string(),
            name: z.string(),
            jenis_kelamin: z.string(),
            id_lvl: z.string(),
            email: z.string().email(),
            username: z.string(),
        })
        const validated = schema.safeParse(body);
        // validasi schema
        if (!validated.success) {
            const formatedError = validated.error.format();
            let validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);
            return NextResponse.json(validationErrorMessage, { status: 400 });
        }

        await prisma.karyawan.update({
            where: {
                id_karyawan: idUser
            },
            data: {
                no_ident: validated.data.no_ident,
                name: validated.data.name,
                jenis_kelamin: validated.data.jenis_kelamin,
                kd_jns_ident: validated.data.kd_jns_ident,
                kd_kantor: validated.data.kd_kantor,

                aks_pemakai: {
                    update: {
                        username: validated.data.username,
                        email: validated.data.email,
                        id_lvl: validated.data.id_lvl
                    }
                }
            }
        })
        return NextResponse.json({ message: "Success" }, { status: 200 });
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