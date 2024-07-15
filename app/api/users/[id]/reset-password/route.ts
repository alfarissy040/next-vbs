import ForgotPassword from "@/app/components/email/ForgotPassword";
import { prisma, transporter } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { render } from '@react-email/components';
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    id: string
}

export async function POST(request: NextRequest, { params }: { params: IParams }) {
    const { id: idUser } = params
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    const level = token?.level.level ?? 99

    try {
        const user = await prisma.aks_pemakai.findFirstOrThrow({
            where: { karyawan: { id_karyawan: idUser } },
            select: { id_karyawan: true, email: true, karyawan: { select: { name: true } } }
        })
        if (level > 2 && (!token || user.id_karyawan !== idUser)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const emailBody = render(ForgotPassword(user.karyawan.name, "http://localhost:3000"));

        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: user.email,
            subject: "Reset Password",
            html: emailBody
        }, (err, info) => {
            throw ({
                name: err?.name,
                message: err?.message
            })
        })

        return NextResponse.json({ message: "Berhasil mengirim email" }, { status: 200 })
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