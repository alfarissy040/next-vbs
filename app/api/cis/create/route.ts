import schemaAlamat from "@/app/schema/schemaAlamat";
import schemaAlamatPengurus from "@/app/schema/schemaAlamatPengurus";
import { schemaMaster } from "@/app/schema/schemaMaster";
import schemaPengurus from "@/app/schema/schemaPengurus";
import schemaPerorangan from "@/app/schema/schemaPerorangan";
import schemaPerusahaan from "@/app/schema/schemaPerusahaan";
import { generateNoNas } from "@/app/utilities/Cis";
import { prisma, getValidationMessage } from "@/app/utilities/ServerUtilities";
import { Prisma } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodObject, z } from "zod";

// TODOS test api dengan membuat user berdasarkan 4 tipe user

type TTipeNas = 1 | 2 | 3 | 4;

export async function POST(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    
    })
    if(!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

        body.no_nas = generateNoNas(tipe_nas, body.created_at_kantor, countNas + 1);

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

        // mendapatkan schema gabungan (union) berdasarkan tipe nasabah
        const schemas: Record<number, ZodObject<any>> = {
            1: schemaMaster.merge(schemaPerorangan).merge(schemaAlamat),
            2: schemaMaster
                .merge(schemaPerusahaan)
                .merge(schemaAlamat)
                .merge(
                    z.object({
                        pengurus: schemaPengurus.merge(schemaAlamatPengurus),
                    })
                ),
            4: schemaMaster
                .merge(schemaPerusahaan)
                .merge(schemaAlamat)
                .merge(
                    z.object({
                        pengurus: schemaPengurus.merge(schemaAlamatPengurus),
                    })
                ),
        };
        const defaultSchema = schemaMaster.merge(schemaAlamat).merge(schemaPengurus).merge(schemaAlamatPengurus);
        const validated = (schemas[tipe_nas as TTipeNas] ?? defaultSchema).safeParse(body);

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

        await prisma.cis_master.create({
            data: {
                no_nas: validated.data.no_nas,
                created_at_kantor: validated.data.created_at_kantor,
                nm_nas: validated.data.nm_nas,
                tipe_nas: validated.data.tipe_nas,
                kd_jns_ident: validated.data.kd_jns_ident,
                no_ident: validated.data.no_ident,
                masa_ident: validated.data.masa_ident,
                tgl_ident: validated.data.tgl_ident,
                kd_acc_off: validated.data.kd_acc_off,
                kd_bntk_hkm: validated.data.kd_bntk_hkm,
                kd_gol_pemilik: validated.data.kd_gol_pemilik,
                status_nas: validated.data.status_nas,
                flag_hub_bank: validated.data.flag_hub_bank,
                kd_sumber_dana: validated.data.kd_sumber_dana,
                kd_tujuan_dana: validated.data.kd_tujuan_dana,
                kd_maks_trans: validated.data.kd_maks_trans,
                kd_penghasilan_bulan: validated.data.kd_penghasilan_bulan,
                kd_penghasilan_lainnya: validated.data.kd_penghasilan_lainnya,
                kd_pengeluaran_bulan: validated.data.kd_pengeluaran_bulan,
                kd_pengeluaran_lainnya: validated.data.kd_pengeluaran_lainnya,
                npwp: validated.data.npwp,
                no_telp: validated.data.no_telp,
                email: validated.data.email,
                kd_bidang_usaha: validated.data.bidang_usaha,
                usrid_create: validated.data.usrid_create,
            },
        });
        await prisma.cis_alamat.create({
            data: {
                no_nas: validated.data.no_nas,
                jns_alamat: validated.data.jns_alamat,
                kd_negara: validated.data.kd_negara,
                kd_provinsi: validated.data.kd_provinsi,
                kd_kota: validated.data.kd_kota,
                kd_kecamatan: validated.data.kd_kecamatan,
                kd_kelurahan: validated.data.kd_kelurahan,
                rt: validated.data.rt,
                rw: validated.data.rw,
                kd_pos: validated.data.kd_pos,
                alamat_detail: validated.data.alamat_detail,
                usrid_create: validated.data.usrid_create,
            },
        });
        if (tipe_nas === 1) {
            await prisma.cis_perorangan.create({
                data: {
                    no_nas: validated.data.no_nas,
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
                },
            });
        } else if (tipe_nas === 2 || tipe_nas === 4) {
            await prisma.cis_perusahaan.create({
                data: {
                    no_nas: validated.data.no_nas,
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
                },
                select: {
                    id_perusahaan: true,
                },
            });
            const fetchPengurus = await prisma.cis_pengurus.create({
                data: {
                    no_nas: validated.data.no_nas,
                    kd_kewarganegaraan: validated.data.kd_kewarganegaraan,
                    kd_jns_ident: validated.data.kd_jns_ident,
                    no_ident: validated.data.no_ident,
                    nm_nas: validated.data.nm_nas,
                    masa_ident: validated.data.masa_ident,
                    tgl_ident: validated.data.tgl_ident,
                    tempat_lahir: validated.data.tempat_lahir,
                    tgl_lahir: validated.data.tgl_lahir,
                    kd_agama: validated.data.kd_agama,
                    no_hp: validated.data.no_hp,
                    no_telp: validated.data.no_telp,
                    email: validated.data.email,
                    nm_ibu: validated.data.nm_ibu,
                    jabatan: validated.data.jabatan,
                    kepemilikan: validated.data.kepemilikan,
                    npwp: validated.data.npwp,
                    usrid_create: validated.data.usrid_create,
                },
            });
            await prisma.cis_alamat.create({
                data: {
                    id_pengurus: fetchPengurus.id_pengurus,
                    jns_alamat: validated.data.jns_alamat,
                    kd_negara: validated.data.kd_negara,
                    kd_provinsi: validated.data.kd_provinsi,
                    kd_kota: validated.data.kd_kota,
                    kd_kecamatan: validated.data.kd_kecamatan,
                    kd_kelurahan: validated.data.kd_kelurahan,
                    rt: validated.data.rt,
                    rw: validated.data.rw,
                    kd_pos: validated.data.kd_pos,
                    alamat_detail: validated.data.alamat_detail,
                    usrid_create: validated.data.usrid_create,
                },
            });
        }
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
