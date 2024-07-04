import { prisma } from "@/app/utilities/ServerUtilities";
import { convertToCisUpdate } from "@/app/utilities/action";
import { Prisma } from "@prisma/client";
import { has, isEmpty, isEqual, toPairs } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    nonas?: string;
}

const isInException = (key:string) => {
    return ["cis_perorangan", "cis_perusahaan", "alamat", "cis_pengurus", "cis_alamat"].includes(key.trim().toLowerCase())
}

const getCisDiffData = (nasabah: Record<string, any> | null, data: Record<string, any>) => {
    if (isEmpty(nasabah) || isEmpty(data)) return {};
  
    return toPairs(nasabah).reduce((acc, [key, value]) => {
      if (!has(data, key) || isInException(key)) {
        return acc;
      }
      if (!isEqual(value, data[key])) {
        acc[key] = data[key];
      }
      return acc;
    }, {} as Record<string, any>);
  };

// TODOS test this fnction with 4 types of user

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

        const diffMaster = getCisDiffData(nasabah, body);
        const diffPerorangan = getCisDiffData(nasabah.cis_perorangan, body)
        const diffPerusahaan = getCisDiffData(nasabah.cis_perusahaan, body)
        const diffAlamat = getCisDiffData(nasabah.alamat, body.alamat)
        const diffPengurus = getCisDiffData(nasabah.cis_pengurus, body.pengurus)
        const diffAlamatPengurus = getCisDiffData(nasabah.cis_pengurus?.cis_alamat ?? null, body.pengurus.alamat)

        const entries = [
            ...convertToCisUpdate(nasabah, diffMaster, noNas, "cis_master", token.kantor.kd_kantor, token.username),
            ...convertToCisUpdate(nasabah, diffPerorangan, noNas, "cis_perorangan", token.kantor.kd_kantor, token.username),
            ...convertToCisUpdate(nasabah, diffPerusahaan, noNas, "cis_perusahaan", token.kantor.kd_kantor, token.username),
            ...convertToCisUpdate(nasabah, diffPengurus, noNas, "cis_pengurus", token.kantor.kd_kantor, token.username),
            ...convertToCisUpdate(nasabah, diffAlamat, noNas, "cis_alamat", token.kantor.kd_kantor, token.username),
            ...convertToCisUpdate(nasabah, diffAlamatPengurus, noNas, "cis_alamat", token.kantor.kd_kantor, token.username),
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