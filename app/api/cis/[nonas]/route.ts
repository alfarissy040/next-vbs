import { prisma } from "@/app/utilities/ServerUtilities";;
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface IParams {
    nonas?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
    const { nonas: noNas } = params;
    if (!noNas) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

    try {
        const userMaster = await prisma.cis_master.findUnique({
            where: { no_nas: noNas },
            include: {
                cis_perorangan: {
                    include: {
                        status_nikah: true,
                        agama: true,
                        negara: true,
                        profesi: true,
                        jenis_pekerjaan: true,
                    },
                },
                cis_perusahaan: {
                    include: {
                        grup_nasabah: true,
                    },
                },
                cis_pengurus: {
                    include: {
                        jenis_identitas: true,
                        negara: true,
                        agama: true,
                        cis_alamat: {
                            include: {
                                negara: true,
                                provinsi: true,
                                kota: true,
                                kecamatan: true,
                                kelurahan: true,
                            },
                        },
                    },
                },
                alamat: {
                    include: {
                        negara: true,
                        provinsi: true,
                        kota: true,
                        kecamatan: true,
                        kelurahan: true,
                    },
                },
                // parameter cis_master
                jenis_identitas: true,
                bentuk_hukum: true,
                golongan_pemilik: true,
                sumber_dana: true,
                tujuan_dana: true,
                transaksi: true,
                penghasilan: true,
                penghasilan_lainnya: true,
                pengeluaran: true,
                pengeluaran_lainnya: true,
                bidang_usaha: true,
            },
        });

        if (!userMaster) return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });

        return NextResponse.json(userMaster);
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
