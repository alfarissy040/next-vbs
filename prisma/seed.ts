import para_agama from "@/dummy/para_agama.json";
import para_bidang_usaha from "@/dummy/para_bidang_usaha.json";
import para_bntk_hkm from "@/dummy/para_bntk_hkm.json";
import para_gol_pmlk from "@/dummy/para_gol_pmlk.json";
import para_grup_nas from "@/dummy/para_grup_nas.json";
import para_jns_ident from "@/dummy/para_jns_ident.json";
import para_jns_pekerjaan from "@/dummy/para_jns_pekerjaan.json";
import para_kecamatan from "@/dummy/para_kecamatan.json";
import para_kelurahan from "@/dummy/para_kelurahan.json";
import para_kota from "@/dummy/para_kota.json";
import para_negara from "@/dummy/para_negara.json";
import para_profesi from "@/dummy/para_profesi.json";
import para_provinsi from "@/dummy/para_provinsi.json";
import para_sts_nikah from "@/dummy/para_sts_nikah.json";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import nasabahA from "./seeder/nasabah perorangan.json";

const prisma = new PrismaClient();

async function main() {
    const kantor = await prisma.kantor.create({
        data: {
            kd_kantor: "1",
            nm_kantor: "Kantor Pusat Neural Bank",
            alamat: {
                create: {
                    jns_alamat: "1",
                    kd_negara: "ID",
                    kd_provinsi: 36,
                    kd_kota: 3671,
                    kd_kecamatan: 3671030,
                    kd_kelurahan: 3671011004,
                    kd_pos: "14145",
                    alamat_detail: "Jl. H. Nawi",
                    rt: "001",
                    rw: "001",
                    usrid_create: "faza",
                },
            },
        },
    });
    // ? generate level pemakai
    await prisma.para_level_user.createMany({
        data: [
            {
                level: 1,
                keterangan: "Administrator",
            },
            {
                level: 2,
                keterangan: "Kepala Cabang",
            },
            {
                level: 3,
                keterangan: "Customer Service",
            },
        ],
    });
    const level = await prisma.para_level_user.findFirstOrThrow({ where: { level: 1 } });
    // generate karyawan
    const karyawan = await prisma.karyawan.create({
        data: {
            name: "Muhammad Faza Alfarisy",
            jenis_kelamin: "Laki-laki",
            no_ident: "17200414",
            kd_jns_ident: 1,
            kd_kantor: kantor.kd_kantor,
        }
    })
    // ? generate data pemakai
    const pemakai = await prisma.aks_pemakai.create({
        data: {
            username: "faza",
            email: "faza@neuralbank.com",
            password: await hash("admin", 16),
            id_lvl: level?.id_level,
            id_karyawan: karyawan.id_karyawan,
        },
    });


    // ? generate data parameter
    await prisma.para_cs_tujuan.create({
        data: {
            kode: 1,
            keterangan: "pembuatan rekening baru",
            usrid_create: pemakai.username,
        },
    });
    await prisma.para_jns_ident.createMany({
        data: para_jns_ident.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_sts_nikah.createMany({
        data: para_sts_nikah.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_agama.createMany({
        data: para_agama.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_profesi.createMany({
        data: para_profesi.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_jns_pekerjaan.createMany({
        data: para_jns_pekerjaan.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_bntk_hkm.createMany({
        data: para_bntk_hkm.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_gol_pmlk.createMany({
        data: para_gol_pmlk.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_dana.createMany({
        data: [
            {
                kode: 1,
                keterangan: "gaji",
                usrid_create: pemakai.username,
            },
            {
                kode: 2,
                keterangan: "bisnis",
                usrid_create: pemakai.username,
            },
            {
                kode: 3,
                keterangan: "simpanan pribadi",
                usrid_create: pemakai.username,
            },
            {
                kode: 4,
                keterangan: "investasi",
                usrid_create: pemakai.username,
            },
            {
                kode: 5,
                keterangan: "bonus",
                usrid_create: pemakai.username,
            },
            {
                kode: 6,
                keterangan: "komisi",
                usrid_create: pemakai.username,
            },
            {
                kode: 99,
                keterangan: "lainnya",
                usrid_create: pemakai.username,
            },
        ],
    });
    await prisma.para_transaksi.createMany({
        data: [
            {
                kode: 1,
                keterangan: "Rp. 1.000.000 per hari",
                batas_maksimum: 1000000,
                usrid_create: pemakai.username,
            },
            {
                kode: 2,
                keterangan: "Rp. 5.000.000 per hari",
                batas_maksimum: 5000000,
                usrid_create: pemakai.username,
            },
            {
                kode: 3,
                keterangan: "Rp. 20.000.000 per hari",
                batas_maksimum: 20000000,
                usrid_create: pemakai.username,
            },
            {
                kode: 4,
                keterangan: "Rp. 50.000.000 per hari",
                batas_maksimum: 50000000,
                usrid_create: pemakai.username,
            },
            {
                kode: 5,
                keterangan: "Rp. 200.000.000 per hari",
                batas_maksimum: 200000000,
                usrid_create: pemakai.username,
            },
            {
                kode: 6,
                keterangan: "Rp. 500.000.000 per hari",
                batas_maksimum: 500000000,
                usrid_create: pemakai.username,
            },
        ],
    });
    await prisma.para_penghasilan.createMany({
        data: [
            {
                kode: 1,
                keterangan: "tidak ada penghasilan",
                usrid_create: pemakai.username,
            },
            {
                kode: 2,
                keterangan: "dibawah Rp.5 jt",
                usrid_create: pemakai.username,
            },
            {
                kode: 3,
                keterangan: "Rp.5 jt S/D Rp.15 jt",
                usrid_create: pemakai.username,
            },
            {
                kode: 4,
                keterangan: "Rp.15 jt S/D Rp.25 jt",
                usrid_create: pemakai.username,
            },
            {
                kode: 5,
                keterangan: "diatas Rp.25 jt",
                usrid_create: pemakai.username,
            },
        ],
    });
    await prisma.para_bidang_usaha.createMany({
        data: para_bidang_usaha.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_grup_nas.createMany({
        data: para_grup_nas.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_negara.createMany({
        data: para_negara.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_provinsi.createMany({
        data: para_provinsi.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_kota.createMany({
        data: para_kota.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_kecamatan.createMany({
        data: para_kecamatan.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.para_kelurahan.createMany({
        data: para_kelurahan.map((data) => ({ ...data, usrid_create: pemakai.username })),
    });
    await prisma.cis_master.create({
        data: {
            no_nas: "0100100001",
            created_at_kantor: nasabahA.created_at_kantor,
            nm_nas: nasabahA.nm_nas,
            tipe_nas: nasabahA.tipe_nas,
            no_ident: nasabahA.no_ident,
            masa_ident: nasabahA.masa_ident,
            tgl_ident: nasabahA.tgl_ident,
            npwp: nasabahA.npwp,
            no_telp: nasabahA.no_telp,
            email: nasabahA.email,
            kd_jns_ident: nasabahA.kd_jns_ident,
            kd_acc_off: nasabahA.kd_acc_off,
            kd_bntk_hkm: nasabahA.kd_bntk_hkm,
            kd_gol_pemilik: nasabahA.kd_gol_pemilik,
            kd_sumber_dana:nasabahA.kd_sumber_dana,
            kd_tujuan_dana: nasabahA.kd_tujuan_dana,
            kd_maks_trans: nasabahA.kd_maks_trans,
            kd_penghasilan_bulan: nasabahA.kd_penghasilan_bulan,
            kd_penghasilan_lainnya: nasabahA.kd_penghasilan_lainnya,
            kd_pengeluaran_bulan: nasabahA.kd_pengeluaran_bulan,
            kd_pengeluaran_lainnya: nasabahA.kd_pengeluaran_lainnya,
            kd_bidang_usaha: nasabahA.kd_bidang_usaha,
            usrid_create: pemakai.username,
            cis_perorangan: {
                create: {
                    nm_ibu: nasabahA.nm_ibu,
                    tempat_lahir: nasabahA.tempat_lahir,
                    tgl_lahir: nasabahA.tgl_lahir,
                    jns_kelamin: nasabahA.jns_kelamin,
                    nm_pasangan: nasabahA.nm_pasangan,
                    no_ident_pasangan: nasabahA.no_ident_pasangan,
                    nm_ahli_waris: nasabahA.nm_ahli_waris,
                    jabatan: nasabahA.jabatan,
                    nm_kntr: nasabahA.nm_kntr,
                    kd_status_pernikahan: nasabahA.kd_status_pernikahan,
                    kd_agama: nasabahA.kd_agama,
                    kd_kewarganegaraan: nasabahA.kd_kewarganegaraan,
                    kd_profesi: nasabahA.kd_profesi,
                    kd_jns_pekerjaan: nasabahA.kd_jns_pekerjaan,
                    usrid_create: pemakai.username
                },
            },
            alamat: {
                create: {
                    jns_alamat: nasabahA.jns_alamat,
                    kd_negara: nasabahA.kd_negara,
                    kd_provinsi: nasabahA.kd_provinsi,
                    kd_kota: nasabahA.kd_kota,
                    kd_kecamatan: nasabahA.kd_kecamatan,
                    kd_kelurahan: nasabahA.kd_kelurahan,
                    rt: nasabahA.rt,
                    rw: nasabahA.rw,
                    kd_pos: nasabahA.kd_pos,
                    alamat_detail: nasabahA.alamat_detail,
                    usrid_create: pemakai.username
                }
            }

        },
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
