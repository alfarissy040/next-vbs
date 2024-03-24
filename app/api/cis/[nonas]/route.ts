import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface IParams {
    nonas?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
    const prisma = new PrismaClient();
    const { nonas: noNas } = params;

    if (!noNas) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

    try {
        const userMaster = await prisma.cis_master.findUnique({
            where: {
                no_nas: noNas,
            },
            include: {
                cis_perorangan: true,
                cis_perusahaan: {
                    include: {
                        cis_pengurus: {
                            orderBy: {
                                nm_nas: "asc",
                            },
                        },
                    },
                },
                alamat: {
                    orderBy: {
                        no_urut: "asc",
                    },
                },
            },
        });

        if (!userMaster) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        return NextResponse.json(userMaster);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
            } else {
                return NextResponse.json(
                    {
                        error: error.name,
                        message: error.message,
                    },
                    { status: 500 }
                );
            }
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
