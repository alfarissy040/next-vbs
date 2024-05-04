import schemaAlamat from "@/app/schema/schemaAlamat";
import schemaAlamatPengurus from "@/app/schema/schemaAlamatPengurus";
import { schemaMaster } from "@/app/schema/schemaMaster";
import schemaPengurus from "@/app/schema/schemaPengurus";
import schemaPerorangan from "@/app/schema/schemaPerorangan";
import schemaPerusahaan from "@/app/schema/schemaPerusahaan";
import { getValidationMessage } from "@/app/utilities";
import { generateNoNas } from "@/app/utilities/Cis";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodObject, z } from "zod";

// TODOS test api dengan membuat user berdasarkan 4 tipe user

type TTipeNas = 1 | 2 | 3 | 4;

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    let body = await request.json();
    const { tipe_nas } = body;
    const isHavePengurus = "pengurus" in body;
    const validTipeNas = ["1", "2", "3", "4"];
    const isValidTipeNas = validTipeNas.includes(tipe_nas.toString());

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
                jns_ident: validated.data.jns_ident,
                no_ident: validated.data.no_ident,
                masa_ident: validated.data.masa_ident,
                tgl_ident: validated.data.tgl_ident,
                acc_off: validated.data.acc_off,
                bntk_hkm: validated.data.bntk_hkm,
                gol_pemilik: validated.data.gol_pemilik,
                status_nas: validated.data.status_nas,
                flag_hub_bank: validated.data.flag_hub_bank,
                sumber_dana: validated.data.sumber_dana,
                tujuan_dana: validated.data.tujuan_dana,
                maks_trans: validated.data.maks_trans,
                penghasilan_bulan: validated.data.penghasilan_bulan,
                penghasilan_lainnya: validated.data.penghasilan_lainnya,
                pengeluaran_bulan: validated.data.pengeluaran_bulan,
                pengeluaran_lainnya: validated.data.pengeluaran_lainnya,
                npwp: validated.data.npwp,
                no_telp: validated.data.no_telp,
                email: validated.data.email,
                bidang_usaha: validated.data.bidang_usaha,
                usrid_create: validated.data.usrid_create,
            },
        });
        await prisma.cis_alamat.create({
            data: {
                no_nas: validated.data.no_nas,
                no_urut: validated.data.no_urut,
                jns_alamat: validated.data.jns_alamat,
                negara: validated.data.negara,
                provinsi: validated.data.provinsi,
                kota: validated.data.kota,
                kecamatan: validated.data.kecamatan,
                kelurahan: validated.data.kelurahan,
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
                    status_pernikahan: validated.data.status_pernikahan,
                    nm_pasangan: validated.data.nm_pasangan,
                    no_ident_pasangan: validated.data.no_ident_pasangan,
                    nm_ahli_waris: validated.data.nm_ahli_waris,
                    agama: validated.data.agama,
                    kewarganegaraan: validated.data.kewarganegaraan,
                    profesi: validated.data.profesi,
                    jns_pekerjaan: validated.data.jns_pekerjaan,
                    jabatan: validated.data.jabatan,
                    nm_kntr: validated.data.nm_kntr,
                    usrid_create: validated.data.usrid_create,
                },
            });
        } else if (tipe_nas === 2 || tipe_nas === 4) {
            await prisma.cis_perusahaan.create({
                data: {
                    no_nas: validated.data.no_nas,
                    jns_usaha_tkt: validated.data.jns_usaha_tkt,
                    flag_bank: validated.data.flag_bank,
                    group_nas: validated.data.group_nas,
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
                    jns_pengurus: validated.data.jns_pengurus,
                    kewarganegaraan: validated.data.kewarganegaraan,
                    jns_ident: validated.data.jns_ident,
                    no_ident: validated.data.no_ident,
                    nm_nas: validated.data.nm_nas,
                    masa_ident: validated.data.masa_ident,
                    tgl_ident: validated.data.tgl_ident,
                    tempat_lahir: validated.data.tempat_lahir,
                    tgl_lahir: validated.data.tgl_lahir,
                    agama: validated.data.agama,
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
                    no_urut: validated.data.no_urut,
                    jns_alamat: validated.data.jns_alamat,
                    negara: validated.data.negara,
                    provinsi: validated.data.provinsi,
                    kota: validated.data.kota,
                    kecamatan: validated.data.kecamatan,
                    kelurahan: validated.data.kelurahan,
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
