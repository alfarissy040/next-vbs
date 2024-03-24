import para_jns_ident from "@/dummy/para_jns_ident.json";
import para_sts_nikah from "@/dummy/para_sts_nikah.json";
import para_agama from "@/dummy/para_agama.json";
import para_profesi from "@/dummy/para_profesi.json";
import para_jns_pekerjaan from "@/dummy/para_jns_pekerjaan.json";
import seedCISAlamat from "@/dummy/seedCISAlamat.json";
import seedCISMasterA from "@/dummy/seedCISMasterA.json";
import seedCISPerorangan from "@/dummy/seedCISPerorangan.json";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const defaultPassword = await hash("admin", 16);
    // ? generate level pemakai
    const level = await prisma.para_level_user.create({
        data: {
            level: 1,
            keterangan: "Administrator",
        },
    });
    // ? generate data pemakai
    const pemakai = await prisma.aks_pemakai.create({
        data: {
            username: "FAZA",
            name: "Muhammad Faza Alfarisy",
            email: "alfarissy040@gmail.com",
            password: defaultPassword,
            id_lvl: level.id_level,
        },
    });
    // ? generate data tipe A Perorangan
    seedCISMasterA.map(async (data, i) => {
        await prisma.cis_master.create({
            data: {
                no_nas: data.no_nas.toString(),
                created_at_kantor: data.created_at_kantor.toString(),
                nm_nas: data.nm_nas,
                tipe_nas: data.tipe_nas,
                jns_ident: data.jns_ident,
                no_ident: data.no_ident,
                masa_ident: data.masa_ident,
                tgl_ident: new Date(),
                acc_off: data.acc_off,
                bntk_hkm: data.bntk_hkm,
                gol_pemilik: data.gol_pemilik,
                status_nas: data.status_nas,
                flag_hub_bank: data.flag_hub_bank,
                sumber_dana: data.sumber_dana,
                tujuan_dana: data.tujuan_dana,
                maks_trans: data.maks_trans,
                penghasilan_bulan: data.penghasilan_bulan,
                penghasilan_lainnya: data.penghasilan_lainnya,
                pengeluaran_bulan: data.pengeluaran_bulan,
                pengeluaran_lainnya: data.pengeluaran_lainnya,
                npwp: data.npwp,
                no_telp: data.no_telp,
                email: data.email,
                bidang_usaha: data.bidang_usaha,
                usrid_create: pemakai.username,
            },
        });

        await prisma.cis_perorangan.create({
            data: {
                no_nas: data.no_nas.toString(),
                nm_ibu: seedCISPerorangan[i].nm_ibu,
                tempat_lahir: seedCISPerorangan[i].tempat_lahir,
                tgl_lahir: new Date(),
                jns_kelamin: seedCISPerorangan[i].jns_kelamin,
                flag_karyawan: seedCISPerorangan[i].flag_karyawan,
                status_pernikahan: seedCISPerorangan[i].status_pernikahan.toString(),
                nm_pasangan: seedCISPerorangan[i].nm_pasangan,
                no_ident_pasangan: seedCISPerorangan[i].no_ident_pasangan,
                nm_ahli_waris: seedCISPerorangan[i].nm_ahli_waris,
                agama: seedCISPerorangan[i].agama as unknown as string,
                kewarganegaraan: seedCISPerorangan[i].kewarganegaraan,
                profesi: seedCISPerorangan[i].profesi,
                jns_pekerjaan: seedCISPerorangan[i].jns_pekerjaan.toString(),
                jabatan: seedCISPerorangan[i].jabatan,
                nm_kntr: seedCISPerorangan[i].nm_kntr,
                usrid_create: pemakai.username,
            },
        });

        await prisma.cis_alamat.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_alamat: seedCISAlamat[i].jns_alamat.toString(),
                negara: seedCISAlamat[i].negara,
                provinsi: seedCISAlamat[i].provinsi ?? "jakarta",
                kota: seedCISAlamat[i].kota,
                kecamatan: seedCISAlamat[i].kecamatan,
                kelurahan: seedCISAlamat[i].kelurahan,
                rt: seedCISAlamat[i].rt,
                rw: seedCISAlamat[i].rw,
                kd_post: seedCISAlamat[i].kd_post,
                alamat_detail: seedCISAlamat[i].alamat_detail,
                usrid_create: pemakai.username,
            },
        });
    });

    // ? generate data parameter
    await prisma.para_jns_ident.createMany({
        data: para_jns_ident,
    });
    await prisma.para_sts_nikah.createMany({
        data: para_sts_nikah,
    });
    await prisma.para_agama.createMany({
        data: para_agama,
    });
    await prisma.para_profesi.createMany({
        data: para_profesi,
    });
    await prisma.para_jns_pekerjaan.createMany({
        data: para_jns_pekerjaan,
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
