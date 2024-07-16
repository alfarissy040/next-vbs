import ForgotPassword from "@/app/components/email/ForgotPassword";
import { baseUrl } from "@/app/utilities/action";
import { prisma, transporter } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { render } from '@react-email/components';
import { randomBytes } from "crypto";
import moment from "moment";
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
            select: { id_karyawan: true, email: true, id_pemakai: true, karyawan: { select: { name: true } } }
        })
        if (level > 2 && (!token || user.id_karyawan !== idUser)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const resetToken = await randomBytes(32).toString('hex')
        const expiredToken = moment().add(1, "hour").toISOString()

        await prisma.aks_pemakai.update({
            where: { id_pemakai: user.id_pemakai },
            data: { reset_token: resetToken, reset_expired: expiredToken }
        })

        const emailBody = render(ForgotPassword(user.karyawan.name, `${baseUrl}/reset-password/${resetToken}`, moment(expiredToken).format("DD MMMM YYYY HH:mm:ss")));

        transporter.sendMail({
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