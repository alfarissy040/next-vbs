import { prisma } from "@/app/utilities/ServerUtilities";;
import { convertToCisUpdate } from "@/app/utilities/action";
import { Prisma, cis_perorangan, cis_perusahaan } from "@prisma/client";
import { get, has, isEmpty, isEqual, omitBy } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    nonas?: string;
}

export async function POST(request: NextRequest, { params }: { params: IParams }) {
    const body = await request.json()
    const { nonas: noNas } = params;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!noNas) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

    try {
        const nasabah = await prisma.cis_master.findUnique({
            where: { no_nas: noNas },
            include: {
                cis_perorangan: true,
                cis_perusahaan: true,
                cis_pengurus: {
                    include: {
                        cis_alamat: true
                    }
                },
                alamat: true
            }
        })
        if (!nasabah) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        const difMaster = omitBy(nasabah, (value, key) => isEqual(value, body[key]))
        const difPerorangan = omitBy(nasabah.cis_perorangan as cis_perorangan, (value, key) => isEqual(value, body[key]))
        const difPerusahaan = omitBy(nasabah.cis_perusahaan as cis_perusahaan, (value, key) => isEqual(value, body[key]))
        const difPengurus = omitBy(nasabah.cis_pengurus, (value, key) => isEqual(value, body.pengurus[key]))
        const difAlamat = omitBy(nasabah.alamat, (value, key) => isEqual(value, body[key]))
        const difAlamatPengurus = omitBy(nasabah.cis_pengurus?.cis_alamat, (value, key) => isEqual(value, body.pengurus[key]))

        const entries = [
            ...convertToCisUpdate(nasabah, difMaster, noNas, "cis_master", token.kantor.kd_kantor),
            ...convertToCisUpdate(nasabah, difPerorangan, noNas, "cis_perorangan", token.kantor.kd_kantor),
            ...convertToCisUpdate(nasabah, difPerusahaan, noNas, "cis_perusahaan", token.kantor.kd_kantor),
            ...convertToCisUpdate(nasabah, difPengurus, noNas, "cis_pengurus", token.kantor.kd_kantor),
            ...convertToCisUpdate(nasabah, difAlamat, noNas, "cis_alamat", token.kantor.kd_kantor),
            ...convertToCisUpdate(nasabah, difAlamatPengurus, noNas, "cis_alamat", token.kantor.kd_kantor),
        ]
        if (isEmpty(entries)) return NextResponse.json({ message: "Tidak ada data yang diperbarui" }, { status: 404 })

        await prisma.cis_update.createMany({
            data: entries
        })

        return NextResponse.json({ message: "Data berhasil diperbarui" })
    } catch (error) {
        console.log(error);
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