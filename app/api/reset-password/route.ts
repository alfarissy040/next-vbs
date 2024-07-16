import { getValidationMessage, prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { isEmpty, isEqual } from "lodash";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token") ?? "";

    if (isEmpty(token)) return NextResponse.json({ message: "Invalid token" }, { status: 400 });

    try {
        const data = await prisma.aks_pemakai.findFirst({
            where: {
                reset_token: token,
            }
        })
        if (isEmpty(data)) return NextResponse.json({ message: "Invalid token" }, { status: 400 });

        const isExpired = moment().isAfter(moment(data.reset_expired));

        if (isExpired) return NextResponse.json({ message: "Token has expired" }, { status: 400 });

        return NextResponse.json({ message: "Valid token" }, { status: 200 });
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

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const body = await request.json();
    const token = searchParams.get("token") ?? "";
    if (isEmpty(token)) return NextResponse.json({ message: "Invalid token" }, { status: 400 });

    const schema = z.object({
        password: z.string(),
        confirm_password: z.string(),
    }).required();

    const validated = schema.safeParse(body);
    if (!validated.success) {
        const formatedError = validated.error.format();
        let validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);
        return NextResponse.json(validationErrorMessage, { status: 400 });
    }
    if (!isEqual(validated.data.password, validated.data.confirm_password)) return NextResponse.json({ "confirm_password": "Password not match" }, { status: 400 });

    try {
        const data = await prisma.aks_pemakai.findFirst({
            where: {
                reset_token: token,
            }
        })
        if (isEmpty(data)) return NextResponse.json({ message: "Invalid token" }, { status: 400 });

        const isExpired = moment().isAfter(moment(data.reset_expired));
        if (isExpired) return NextResponse.json({ message: "Token has expired" }, { status: 400 });

        await prisma.aks_pemakai.update({
            where: {
                id_pemakai: data.id_pemakai
            },
            data: {
                password: await hash(validated.data.password, 16),
                reset_token: null,
            }
        })

        return NextResponse.json({ message: "Success" });
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