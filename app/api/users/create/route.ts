import { getValidationMessage, prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { isEmpty } from "lodash";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    const body = await request.json();
    const schema = z.object({
        kd_kantor: z.string(),
        kd_jns_ident: z.number(),
        no_ident: z.string(),
        name: z.string(),
        jenis_kelamin: z.string(),
        id_lvl: z.string(),
        email: z.string().email(),
        username: z.string(),
        password: z.string()
    })

    const validated = schema.safeParse(body);
    // validasi schema
    if (!validated.success) {
        const formatedError = validated.error.format();
        let validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);
        return NextResponse.json(validationErrorMessage, { status: 400 });
    }

    try {
        const isExist = await prisma.aks_pemakai.findMany({
            where: {
                OR: [
                    {
                        username: validated.data.username
                    },
                    {
                        email: validated.data.email
                    }
                ]
            },
            select: {
                username: true,
                email: true
            }
        })

        if (!isEmpty) {
            Object.entries(isExist).reduce((acc, [key, value]) => {
                return ({ ...acc, [key]: `${key} already exist` })
            }, {})
            return NextResponse.json(isExist, { status: 400 })
        }

        await prisma.karyawan.create({
            data: {
                no_ident: validated.data.no_ident,
                name: validated.data.name,
                jenis_kelamin: validated.data.jenis_kelamin,
                kd_jns_ident: validated.data.kd_jns_ident,
                kd_kantor: validated.data.kd_kantor,

                aks_pemakai: {
                    create: {
                        username: validated.data.username,
                        email: validated.data.email,
                        password: await hash(validated.data.password, 16),
                        id_lvl: validated.data.id_lvl
                    }
                }
            }
        })

        return NextResponse.json({ message: "success" })
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