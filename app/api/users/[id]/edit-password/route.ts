import { getValidationMessage, prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { isEmpty, isEqual } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface IParams {
    id?: string;
}

export async function PUT(request: NextRequest, { params }: { params: IParams }) {
    const { id: idUser } = params;
    const body = await request.json();
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
                id_karyawan: true
            }
        })

        if (!token || user.id_karyawan !== idUser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const schema = z.object({
            password: z.string(),
            new_password: z.string(),
            confirm_password: z.string(),
        }).required()
        const validated = schema.safeParse(body);
        // validasi schema
        if (!validated.success) {
            const formatedError = validated.error.format();
            let validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);
            return NextResponse.json(validationErrorMessage, { status: 400 });
        }
        let errorMessage = {}
        if (isEqual(validated.data.password, validated.data.new_password)) {
            errorMessage = {
                ...errorMessage,
                "new_password": "password tidak boleh sama seperti password lama"
            }
        }
        if (!isEqual(validated.data.new_password, validated.data.confirm_password)) {
            errorMessage = {
                ...errorMessage,
                "confirm_password": "Password tidak sama dengan password baru"
            }
        }
        if (!isEmpty(errorMessage)) {
            return NextResponse.json({ status: "Failed", message: errorMessage }, { status: 400 });
        }

        await prisma.aks_pemakai.update({
            where: {
                id_karyawan: idUser
            },
            data: {
                password: await hash(validated.data.new_password, 16)
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