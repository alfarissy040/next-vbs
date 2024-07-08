import schemaAlamat from "@/app/schema/schemaAlamat";
import schemaAlamatPengurus from "@/app/schema/schemaAlamatPengurus";
import { schemaTypeInstansi, schemaTypePerorangan, schemaTypePerusahaanNonProfit } from "@/app/schema/schemaCis";
import { schemaMaster } from "@/app/schema/schemaMaster";
import schemaPengurus from "@/app/schema/schemaPengurus";
import { generateNoNas } from "@/app/utilities/Cis";
import { getValidationMessage, prisma } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodObject } from "zod";

// TODOS test api dengan membuat user berdasarkan 4 tipe user

type TTipeNas = 1 | 2 | 3 | 4;

export async function POST(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,

    })
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    let body = await request.json();
    const { tipe_nas } = body;
    const isHavePengurus = "pengurus" in body;
    const validTipeNas = ["1", "2", "3", "4"];
    const isValidTipeNas = validTipeNas.includes((tipe_nas ?? "").toString());

    // validasi tipe nasabah
    if (!isValidTipeNas) {
        const errorMessage = `tipe nasabah harus diisi`;
        return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    try {
        const countNas = await prisma.cis_master.count({
            where: {
                AND: [
                    {
                        created_at_kantor: {
                            contains: body.created_at_kantor,
                        },
                    },
                    {
                        tipe_nas: parseInt(tipe_nas as string),
                    },
                ],
            },
        });
        body.usrid_create = token.username;
        body.no_nas = generateNoNas(tipe_nas, token.kantor.kd_kantor, countNas + 1);

        const noUrutAlamat = await prisma.cis_alamat.count({ where: { no_nas: body.no_nas } });
        body = {
            ...body,
            no_urut: noUrutAlamat + 1,
        };

        if (isHavePengurus) {
            const noUrutAlamatPengurus = await prisma.cis_alamat.count({ where: { no_nas: body.no_nas } });
            body = {
                ...body,
                pengurus: {
                    ...body.pengurus,
                    no_urut: noUrutAlamatPengurus + 1,
                },
            };
        }
        const schemas: Record<number, ZodObject<any>> = {
            1: schemaTypePerorangan,
            2: schemaTypePerusahaanNonProfit,
            3: schemaTypeInstansi,
            4: schemaTypePerusahaanNonProfit,
        };
        const validated = schemas[tipe_nas as TTipeNas].safeParse(body);

        // validasi schema
        if (!validated.success) {
            const formatedError = validated.error.format();
            let validationErrorMessage: Record<string, string | Record<string, string>> = getValidationMessage(formatedError);
            if ("pengurus" in formatedError) {
                const errorMessagePengurus = getValidationMessage(formatedError.pengurus ?? {});
                validationErrorMessage = {
                    ...validationErrorMessage,
                    pengurus: errorMessagePengurus,
                };
            }
            return NextResponse.json(validationErrorMessage, { status: 400 });
        }

        const createQuery: Prisma.cis_masterCreateArgs = {
            data: {
                no_nas: validated.data.no_nas,
                created_at_kantor: token.kantor.kd_kantor,
                nm_nas: validated.data.nm_nas,
                tipe_nas: validated.data.tipe_nas,
                no_ident: validated.data.no_ident,
                masa_ident: validated.data.masa_ident,
                tgl_ident: validated.data.tgl_ident,
                status_nas: validated.data.status_nas,
                flag_hub_bank: validated.data.flag_hub_bank,
                kd_acc_off: validated.data.kd_acc_off,
                kd_jns_ident: validated.data.kd_jns_ident,
                kd_bntk_hkm: validated.data.kd_bntk_hkm,
                kd_gol_pemilik: validated.data.kd_gol_pemilik,
                kd_sumber_dana: validated.data.kd_sumber_dana,
                kd_tujuan_dana: validated.data.kd_tujuan_dana,
                kd_maks_trans: validated.data.kd_maks_trans,
                kd_penghasilan_bulan: validated.data.kd_penghasilan_bulan,
                kd_penghasilan_lainnya: validated.data.kd_penghasilan_lainnya,
                kd_pengeluaran_bulan: validated.data.kd_pengeluaran_bulan,
                kd_pengeluaran_lainnya: validated.data.kd_pengeluaran_lainnya,
                usrid_create: validated.data.usrid_create,
                kd_bidang_usaha: validated.data.bidang_usaha,
                npwp: validated.data.npwp,
                no_telp: validated.data.no_telp,
                email: validated.data.email,
                // relasi
                alamat: {
                    create: {
                        jns_alamat: validated.data.alamat.jns_alamat,
                        kd_negara: validated.data.alamat.kd_negara,
                        kd_provinsi: validated.data.alamat.kd_provinsi,
                        kd_kota: validated.data.alamat.kd_kota,
                        kd_kecamatan: validated.data.alamat.kd_kecamatan,
                        kd_kelurahan: validated.data.alamat.kd_kelurahan,
                        rt: validated.data.alamat.rt,
                        rw: validated.data.alamat.rw,
                        kd_pos: validated.data.alamat.kd_pos,
                        alamat_detail: validated.data.alamat.alamat_detail,
                        usrid_create: validated.data.alamat.usrid_create,
                    },
                },
                // parameter relasi
                jenis_identitas: { connect: { kode: validated.data.kd_jns_ident } },
                bentuk_hukum: { connect: { kode: validated.data.kd_bntk_hkm } },
                golongan_pemilik: { connect: { kode: validated.data.kd_gol_pemilik } },
                sumber_dana: { connect: { kode: validated.data.kd_sumber_dana } },
                tujuan_dana: { connect: { kode: validated.data.kd_tujuan_dana } },
                transaksi: { connect: { kode: validated.data.kd_maks_trans } },
                penghasilan: { connect: { kode: validated.data.kd_penghasilan_bulan } },
                penghasilan_lainnya: { connect: { kode: validated.data.kd_penghasilan_lainnya } },
                pengeluaran: { connect: { kode: validated.data.kd_pengeluaran_bulan } },
                pengeluaran_lainnya: { connect: { kode: validated.data.kd_pengeluaran_lainnya } },
                bidang_usaha: { connect: { kode: validated.data.kd_bidang_usaha } },
                kantor: { connect: { kd_kantor: token.kantor.kd_kantor } },
                aks_pemakai_create: { connect: { username: validated.data.usrid_create } },

            },
        }
        if (tipe_nas === 1) {
            createQuery.data.cis_perorangan = {
                create: {
                    nm_ibu: validated.data.nm_ibu,
                    tempat_lahir: validated.data.tempat_lahir,
                    tgl_lahir: validated.data.tgl_lahir,
                    jns_kelamin: validated.data.jns_kelamin,
                    flag_karyawan: validated.data.flag_karyawan,
                    kd_status_pernikahan: validated.data.kd_status_pernikahan,
                    nm_pasangan: validated.data.nm_pasangan,
                    no_ident_pasangan: validated.data.no_ident_pasangan,
                    nm_ahli_waris: validated.data.nm_ahli_waris,
                    kd_agama: validated.data.agama,
                    kd_kewarganegaraan: validated.data.kd_kewarganegaraan,
                    kd_profesi: validated.data.profesi,
                    kd_jns_pekerjaan: validated.data.kd_jns_pekerjaan,
                    jabatan: validated.data.jabatan,
                    nm_kntr: validated.data.nm_kntr,
                    usrid_create: validated.data.usrid_create,
                }
            }
        }
        if (tipe_nas === 2 || tipe_nas === 4) {
            createQuery.data.cis_perusahaan = {
                create: {
                    flag_bank: validated.data.flag_bank,
                    kd_group_nas: validated.data.kd_group_nas,
                    modal_sendiri: validated.data.modal_sendiri,
                    modal_setor: validated.data.modal_setor,
                    no_akte_awal: validated.data.no_akte_awal,
                    tgl_akte_awal: validated.data.tgl_akte_awal,
                    no_akte_akhir: validated.data.no_akte_akhir,
                    tgl_akte_akhir: validated.data.tgl_akte_akhir,
                    nm_notaris: validated.data.nm_notaris,
                    no_notaris: validated.data.no_notaris,
                    tgl_notaris: validated.data.tgl_notaris,
                    no_permohonan_dep: validated.data.no_permohonan_dep,
                    tgl_permohonan_dep: validated.data.tgl_permohonan_dep,
                    no_izin_dep: validated.data.no_izin_dep,
                    tgl_izin_dep: validated.data.tgl_izin_dep,
                    no_pub: validated.data.no_pub,
                    tgl_pub: validated.data.tgl_pub,
                    usrid_create: validated.data.usrid_create,
                }
            }
        }
        if (tipe_nas !== 1) {
            createQuery.data.cis_pengurus = {
                create: {
                    kd_kewarganegaraan: validated.data.pengurus.kd_kewarganegaraan,
                    kd_jns_ident: validated.data.pengurus.kd_jns_ident,
                    no_ident: validated.data.pengurus.no_ident,
                    nm_nas: validated.data.pengurus.nm_nas,
                    masa_ident: validated.data.pengurus.masa_ident,
                    tgl_ident: validated.data.pengurus.tgl_ident,
                    tempat_lahir: validated.data.pengurus.tempat_lahir,
                    tgl_lahir: validated.data.pengurus.tgl_lahir,
                    kd_agama: validated.data.pengurus.kd_agama,
                    no_hp: validated.data.pengurus.no_hp,
                    no_telp: validated.data.pengurus.no_telp,
                    email: validated.data.pengurus.email,
                    nm_ibu: validated.data.pengurus.nm_ibu,
                    jabatan: validated.data.pengurus.jabatan,
                    kepemilikan: validated.data.pengurus.kepemilikan,
                    npwp: validated.data.pengurus.npwp,
                    usrid_create: validated.data.pengurus.usrid_create,
                    cis_alamat: {
                        create: {
                            jns_alamat: validated.data.pengurus.alamat.jns_alamat,
                            kd_negara: validated.data.pengurus.alamat.kd_negara,
                            kd_provinsi: validated.data.pengurus.alamat.kd_provinsi,
                            kd_kota: validated.data.pengurus.alamat.kd_kota,
                            kd_kecamatan: validated.data.pengurus.alamat.kd_kecamatan,
                            kd_kelurahan: validated.data.pengurus.alamat.kd_kelurahan,
                            rt: validated.data.pengurus.alamat.rt,
                            rw: validated.data.pengurus.alamat.rw,
                            kd_pos: validated.data.pengurus.alamat.kd_pos,
                            alamat_detail: validated.data.pengurus.alamat.alamat_detail,
                            usrid_create: validated.data.pengurus.alamat.usrid_create,
                        }
                    }
                }
            }
        }

        await prisma.cis_master.create(createQuery);
        // if (tipe_nas === 1) {
        //     await prisma.cis_perorangan.create({
        //         data: {
        //             no_nas: validated.data.no_nas,
        //             nm_ibu: validated.data.nm_ibu,
        //             tempat_lahir: validated.data.tempat_lahir,
        //             tgl_lahir: validated.data.tgl_lahir,
        //             jns_kelamin: validated.data.jns_kelamin,
        //             flag_karyawan: validated.data.flag_karyawan,
        //             kd_status_pernikahan: validated.data.kd_status_pernikahan,
        //             nm_pasangan: validated.data.nm_pasangan,
        //             no_ident_pasangan: validated.data.no_ident_pasangan,
        //             nm_ahli_waris: validated.data.nm_ahli_waris,
        //             kd_agama: validated.data.agama,
        //             kd_kewarganegaraan: validated.data.kd_kewarganegaraan,
        //             kd_profesi: validated.data.profesi,
        //             kd_jns_pekerjaan: validated.data.kd_jns_pekerjaan,
        //             jabatan: validated.data.jabatan,
        //             nm_kntr: validated.data.nm_kntr,
        //             usrid_create: validated.data.usrid_create,
        //         },
        //     });
        // } else if (tipe_nas === 2 || tipe_nas === 4) {
        //     await prisma.cis_perusahaan.create({
        //         data: {
        //             no_nas: validated.data.no_nas,
        //             flag_bank: validated.data.flag_bank,
        //             kd_group_nas: validated.data.kd_group_nas,
        //             modal_sendiri: validated.data.modal_sendiri,
        //             modal_setor: validated.data.modal_setor,
        //             no_akte_awal: validated.data.no_akte_awal,
        //             tgl_akte_awal: validated.data.tgl_akte_awal,
        //             no_akte_akhir: validated.data.no_akte_akhir,
        //             tgl_akte_akhir: validated.data.tgl_akte_akhir,
        //             nm_notaris: validated.data.nm_notaris,
        //             no_notaris: validated.data.no_notaris,
        //             tgl_notaris: validated.data.tgl_notaris,
        //             no_permohonan_dep: validated.data.no_permohonan_dep,
        //             tgl_permohonan_dep: validated.data.tgl_permohonan_dep,
        //             no_izin_dep: validated.data.no_izin_dep,
        //             tgl_izin_dep: validated.data.tgl_izin_dep,
        //             no_pub: validated.data.no_pub,
        //             tgl_pub: validated.data.tgl_pub,
        //             usrid_create: validated.data.usrid_create,
        //         },
        //         select: {
        //             id_perusahaan: true,
        //         },
        //     });
        //     const fetchPengurus = await prisma.cis_pengurus.create({
        //         data: {
        //             no_nas: validated.data.no_nas,
        //             kd_kewarganegaraan: validated.data.kd_kewarganegaraan,
        //             kd_jns_ident: validated.data.kd_jns_ident,
        //             no_ident: validated.data.no_ident,
        //             nm_nas: validated.data.nm_nas,
        //             masa_ident: validated.data.masa_ident,
        //             tgl_ident: validated.data.tgl_ident,
        //             tempat_lahir: validated.data.tempat_lahir,
        //             tgl_lahir: validated.data.tgl_lahir,
        //             kd_agama: validated.data.kd_agama,
        //             no_hp: validated.data.no_hp,
        //             no_telp: validated.data.no_telp,
        //             email: validated.data.email,
        //             nm_ibu: validated.data.nm_ibu,
        //             jabatan: validated.data.jabatan,
        //             kepemilikan: validated.data.kepemilikan,
        //             npwp: validated.data.npwp,
        //             usrid_create: validated.data.usrid_create,
        //         },
        //     });
        //     await prisma.cis_alamat.create({
        //         data: {
        //             id_pengurus: fetchPengurus.id_pengurus,
        //             jns_alamat: validated.data.jns_alamat,
        //             kd_negara: validated.data.kd_negara,
        //             kd_provinsi: validated.data.kd_provinsi,
        //             kd_kota: validated.data.kd_kota,
        //             kd_kecamatan: validated.data.kd_kecamatan,
        //             kd_kelurahan: validated.data.kd_kelurahan,
        //             rt: validated.data.rt,
        //             rw: validated.data.rw,
        //             kd_pos: validated.data.kd_pos,
        //             alamat_detail: validated.data.alamat_detail,
        //             usrid_create: validated.data.usrid_create,
        //         },
        //     });
        // }
        return NextResponse.json({ message: "data berhasil ditambahkan, silahkan lakukan aktivasi" }, { status: 202 });
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
