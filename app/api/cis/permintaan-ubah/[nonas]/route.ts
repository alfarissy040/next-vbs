import { getValidationMessage, prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

interface IParams {
    nonas?: string;
}

export async function GET(request: NextRequest, { params }: { params: IParams }) {
    const { nonas } = params;
    const token = getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const res = await prisma.cis_update.findMany({
            where: {
                no_nas: nonas,
            },
            orderBy: {
                nm_field: "asc",
            },
        });

        if (!res || res.length < 1) return NextResponse.json({ message: "Data not found" }, { status: 404 });

        return NextResponse.json({ res });
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

interface Queue {
    [key: string]: {
        [key: string]: any; // Ubah 'any' ke tipe data yang sesuai jika diketahui
    };
}

export async function POST(request: NextRequest, { params }: { params: IParams }) {
    const { body } = request;
    const { nonas } = params;

    const schemaValidasi = z
        .object({
            isApprove: z.boolean(),
        })
        .required({
            isApprove: true,
        });
    // validasi
    const validated = schemaValidasi.safeParse(body);
    // get error message
    if (!validated.success) {
        const formatedError = validated.error.format();
        const validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);
        return NextResponse.json(validationErrorMessage, { status: 400 });
    }

    try {
        const isApprove = validated.data.isApprove;
        const dataUpdate = await prisma.cis_update.findMany({
            where: {
                AND: [
                    {
                        no_nas: nonas,
                    },
                    {
                        sts_update: { equals: "00" },
                    },
                ],
            },
        });

        if (isApprove) {
            // Membuat queue tanpa membuat objek baru di setiap iterasi
            const queue: Queue = dataUpdate.reduce<Queue>((acc, curr) => {
                if (!acc[curr.db_field]) {
                    acc[curr.db_field] = {};
                }
                acc[curr.db_field][curr.nm_field] = curr.new_record;
                return acc;
            }, {});

            const updates = [
                queue["cis_master"] &&
                    prisma.cis_master.update({
                        where: { no_nas: nonas },
                        data: queue["cis_master"],
                    }),
                queue["cis_perusahaan"] &&
                    prisma.cis_perusahaan.update({
                        where: { no_nas: nonas },
                        data: queue["cis_perusahaan"],
                    }),
                queue["cis_perorangan"] &&
                    prisma.cis_perorangan.update({
                        where: { no_nas: nonas },
                        data: queue["cis_perorangan"],
                    }),
                queue["cis_alamat"] &&
                    prisma.cis_alamat.updateMany({
                        where: {
                            OR: [{ no_nas: nonas }, { id_pengurus: nonas }],
                        },
                        data: queue["cis_alamat"],
                    }),
                queue["cis_pengurus"] &&
                    prisma.cis_pengurus.updateMany({
                        where: {
                            OR: [{ no_nas: nonas }, { id_pengurus: nonas }],
                        },
                        data: queue["cis_pengurus"],
                    }),
            ].filter(Boolean);

            await Promise.all(updates);
        }

        await prisma.cis_update.updateMany({
            where: { no_nas: nonas },
            data: { sts_update: isApprove ? "01" : "99" },
        });
        return NextResponse.json({ message: isApprove ? "Data berhasil diupdate" : "Penolakan perubahan berhasil dilakukan" });
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
