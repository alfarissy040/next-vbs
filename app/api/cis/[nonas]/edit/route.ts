import PermintaanUbahData from "@/app/components/email/PermintaanUbahData";
import { isEqualCaseInsensitive } from "@/app/utilities/Cis";
import { prisma, transporter } from "@/app/utilities/ServerUtilities";
import { convertToCisUpdate } from "@/app/utilities/action";
import { cis_update, extendCisMaster, Prisma } from "@prisma/client";
import { render } from "@react-email/components";
import { has, isEmpty, startsWith, toPairs } from "lodash";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    nonas?: string;
}

const isInException = (key: string) => {
    return ["cis_perorangan", "cis_perusahaan", "alamat", "cis_pengurus", "cis_alamat"].includes(key.trim().toLowerCase())
}

const getCisDiffData = (nasabah: Record<string, any> | null, data: Record<string, any>) => {
    if (isEmpty(nasabah) || isEmpty(data)) return {};

    return toPairs(nasabah).reduce((acc, [key, value]) => {
        const isDate = startsWith((key), "tgl_");
        const isNotSame = isDate ? !isEqualCaseInsensitive(value, data[key]) : !isEqualCaseInsensitive(value, data[key], "date")
        if (!has(data, key) || isInException(key)) {
            return acc;
        }
        if (!isEqualCaseInsensitive(value, data[key])) {
            acc[key] = data[key];
        }
        return acc;
    }, {} as Record<string, any>);
};

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
        const tipeNasabah = (nasabah as extendCisMaster).tipe_nas
        const entries = (): cis_update[] => {
            const diffMaster = getCisDiffData(nasabah, body);
            const diffAlamat = getCisDiffData(nasabah.alamat, body.alamat);

            let result: cis_update[] = [
                ...convertToCisUpdate(nasabah, diffMaster, noNas, "cis_master", token.kantor.kd_kantor, token.username),
                ...convertToCisUpdate(nasabah.alamat, diffAlamat, noNas, "cis_alamat", token.kantor.kd_kantor, token.username),
            ];

            if (tipeNasabah === 1) {
                const diffPerorangan = getCisDiffData(nasabah.cis_perorangan, body);
                result = result.concat(
                    convertToCisUpdate(nasabah.cis_perorangan, diffPerorangan, noNas, "cis_perorangan", token.kantor.kd_kantor, token.username)
                );
            }

            if (tipeNasabah === 2 || tipeNasabah === 4) {
                const diffPerusahaan = getCisDiffData(nasabah.cis_perusahaan, body);
                result = result.concat(
                    convertToCisUpdate(nasabah.cis_perusahaan, diffPerusahaan, noNas, "cis_perusahaan", token.kantor.kd_kantor, token.username)
                );
            }

            if (tipeNasabah !== 1 && !isEmpty(nasabah.cis_pengurus)) {
                const diffPengurus = getCisDiffData(nasabah.cis_pengurus, body.pengurus);
                const diffAlamatPengurus = getCisDiffData(nasabah.cis_pengurus?.cis_alamat ?? null, body.pengurus.alamat);
                result = result.concat(
                    convertToCisUpdate(nasabah.cis_pengurus, diffPengurus, noNas, "cis_pengurus", token.kantor.kd_kantor, token.username),
                    convertToCisUpdate(nasabah.cis_pengurus.cis_alamat, diffAlamatPengurus, nasabah.cis_pengurus.no_pengurus, "cis_alamat", token.kantor.kd_kantor, token.username)
                );
            }

            const res = result.reduce((acc, item) => {
                if (
                    isEqualCaseInsensitive(item.current_record, item.new_record) ||
                    (has(acc, item.nm_field) && has(acc, item.db_field))
                ) {
                    return acc;
                }
                return [...acc, item];
            }, [] as cis_update[]);

            return res;
        };

        if (isEmpty(entries())) return NextResponse.json({ message: "Tidak ada data yang diperbarui" }, { status: 404 })
        await prisma.cis_update.createMany({
            data: entries()
        })

        const accOfficer = await prisma.aks_pemakai.findMany({
            where: {
                karyawan: {
                    kd_kantor: token.kantor.kd_kantor,
                },
                para_level_user: {
                    level: {
                        lte: 2,
                    }
                }
            },
            include: {
                karyawan: true,
            }
        })

        accOfficer.map((data) => {
            const emailBody = render(PermintaanUbahData(data.karyawan.name, token.name, nasabah.no_nas, nasabah.nm_nas));
            // const emailBody = render(PermintaanUbahData(data.karyawan.name, token.name, nasabah.no_nas, nasabah.nm_nas));
            transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL,
                to: data.email,
                subject: "Permintaan Perubahan Data - VBS",
                html: emailBody
            }, (err, info) => {
                throw ({
                    name: err?.name,
                    message: err?.message
                })
            })
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