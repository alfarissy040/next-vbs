import para_agama from "@/dummy/para_agama.json";
import para_bidang_usaha from "@/dummy/para_bidang_usaha.json";
import para_bntk_hkm from "@/dummy/para_bntk_hkm.json";
import para_gol_pmlk from "@/dummy/para_gol_pmlk.json";
import para_grup_nas from "@/dummy/para_grup_nas.json";
import para_jns_ident from "@/dummy/para_jns_ident.json";
import para_jns_pekerjaan from "@/dummy/para_jns_pekerjaan.json";
import para_jns_usaha_tkt from "@/dummy/para_jns_usaha_tkt.json";
import para_kecamatan from "@/dummy/para_kecamatan.json";
import para_kelurahan from "@/dummy/para_kelurahan.json";
import para_kota from "@/dummy/para_kota.json";
import para_negara from "@/dummy/para_negara.json";
import para_profesi from "@/dummy/para_profesi.json";
import para_provinsi from "@/dummy/para_provinsi.json";
import para_sts_nikah from "@/dummy/para_sts_nikah.json";
import seedCISAlamat from "@/dummy/seedCISAlamat.json";
import seedCISMasterA from "@/dummy/seedCISMasterA.json";
import seedCISMasterB from "@/dummy/seedCISMasterB.json";
import seedCISMasterC from "@/dummy/seedCISMasterC.json";
import seedCISMasterD from "@/dummy/seedCISMasterD.json";
import seedCISPerorangan from "@/dummy/seedCISPerorangan.json";
import seedCISPerusahaan from "@/dummy/seedCISPerusahaan.json";
import seedCISPengurus from "@/dummy/seedCISPengurus.json";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // ? generate level pemakai
    const level = await prisma.para_level_user.createMany({
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
    console.log(level);
    // ? generate data pemakai
    const pemakai = await prisma.aks_pemakai.create({
        data: {
            username: "faza",
            name: "Muhammad Faza Alfarisy",
            email: "alfarissy040@gmail.com",
            password: await hash("admin", 16),
            id_lvl: level[0].id,
            kd_kntr: "1",
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
    await prisma.para_jns_usaha_tkt.createMany({
        data: para_jns_usaha_tkt.map((data) => ({ ...data, usrid_create: pemakai.username })),
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
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
