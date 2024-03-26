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
    const defaultPassword = await hash("admin", 16);
    const date = new Date().toISOString();
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
            username: "faza",
            name: "Muhammad Faza Alfarisy",
            email: "alfarissy040@gmail.com",
            password: defaultPassword,
            id_lvl: level.id_level,
        },
    });
    // ? generate data tipe A Perorangan
    seedCISMasterA.map(async (data, i) => {
        if (i > 250) return;
        await prisma.cis_master.create({
            data: {
                no_nas: data.no_nas.toString(),
                created_at_kantor: data.created_at_kantor.toString(),
                nm_nas: data.nm_nas,
                tipe_nas: data.tipe_nas,
                jns_ident: data.jns_ident,
                no_ident: data.no_ident,
                masa_ident: data.masa_ident,
                tgl_ident: date,
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
                usrid_create: "faza",
            },
        });

        await prisma.cis_perorangan.create({
            data: {
                no_nas: data.no_nas.toString(),
                nm_ibu: seedCISPerorangan[i].nm_ibu,
                tempat_lahir: seedCISPerorangan[i].tempat_lahir,
                tgl_lahir: date,
                jns_kelamin: seedCISPerorangan[i].jns_kelamin,
                flag_karyawan: seedCISPerorangan[i].flag_karyawan,
                status_pernikahan: seedCISPerorangan[i].status_pernikahan,
                nm_pasangan: seedCISPerorangan[i].nm_pasangan,
                no_ident_pasangan: seedCISPerorangan[i].no_ident_pasangan,
                nm_ahli_waris: seedCISPerorangan[i].nm_ahli_waris,
                agama: seedCISPerorangan[i].agama,
                kewarganegaraan: 'ID',
                profesi: seedCISPerorangan[i].profesi,
                jns_pekerjaan: seedCISPerorangan[i].jns_pekerjaan,
                jabatan: "karyawan",
                nm_kntr: seedCISPerorangan[i].nm_kntr,
                usrid_create: "faza",
            },
        });

        await prisma.cis_alamat.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_alamat: seedCISAlamat[i].jns_alamat.toString(),
                negara: 'ID',
                provinsi: seedCISAlamat[i].provinsi ?? "jakarta",
                kota: seedCISAlamat[i].kota,
                kecamatan: seedCISAlamat[i].kecamatan,
                kelurahan: seedCISAlamat[i].kelurahan,
                rt: seedCISAlamat[i].rt,
                rw: seedCISAlamat[i].rw,
                kd_pos: seedCISAlamat[i].kd_pos,
                alamat_detail: seedCISAlamat[i].alamat_detail,
                usrid_create: "faza",
            },
        });
    });
    // ? generate data tipe B perusahaan
    seedCISMasterB.map(async (data, i) => {
        if (i > 250) return;
        await prisma.cis_master.create({
            data: {
                no_nas: data.no_nas.toString(),
                created_at_kantor: data.created_at_kantor.toString(),
                nm_nas: data.nm_nas,
                tipe_nas: data.tipe_nas,
                jns_ident: data.jns_ident,
                no_ident: data.no_ident,
                masa_ident: data.masa_ident,
                tgl_ident: date,
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
                usrid_create: "faza",
            },
        })
        const perusahaan = await prisma.cis_perusahaan.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_usaha_tkt: seedCISPerusahaan[i].jns_usaha_tkt,
                flag_bank: seedCISPerusahaan[i].flag_bank,
                group_nas: seedCISPerusahaan[i].group_nas,
                modal_sendiri: seedCISPerusahaan[i].modal_sendiri,
                modal_setor: seedCISPerusahaan[i].modal_setor,
                no_akte_awal: seedCISPerusahaan[i].no_akte_awal,
                tgl_akte_awal: date,
                no_akte_akhir: seedCISPerusahaan[i].no_akte_akhir,
                tgl_akte_akhir: date,
                nm_notaris: seedCISPerusahaan[i].nm_notaris,
                no_notaris: seedCISPerusahaan[i].no_notaris,
                tgl_notaris: date,
                no_permohonan_dep: seedCISPerusahaan[i].no_permohonan_dep,
                tgl_permohonan_dep: date,
                no_izin_dep: seedCISPerusahaan[i].no_izin_dep,
                tgl_izin_dep: date,
                no_pub: seedCISPerusahaan[i].no_pub,
                tgl_pub: date,
                usrid_create: "faza"
            }
        })
        await prisma.cis_alamat.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_alamat: seedCISAlamat[i].jns_alamat.toString(),
                negara: 'ID',
                provinsi: seedCISAlamat[i].provinsi ?? "jakarta",
                kota: seedCISAlamat[i].kota,
                kecamatan: seedCISAlamat[i].kecamatan,
                kelurahan: seedCISAlamat[i].kelurahan,
                rt: seedCISAlamat[i].rt,
                rw: seedCISAlamat[i].rw,
                kd_pos: seedCISAlamat[i].kd_pos,
                alamat_detail: seedCISAlamat[i].alamat_detail,
                usrid_create: "faza",
            },
        });
        const pengurus = await prisma.cis_pengurus.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_pengurus: seedCISPengurus[i].jns_pengurus,
                kewarganegaraan: seedCISPengurus[i].kewarganegaraan,
                jns_ident: seedCISPengurus[i].jns_ident,
                no_ident: seedCISPengurus[i].no_ident,
                nm_nas: seedCISPengurus[i].nm_nas,
                masa_ident: seedCISPengurus[i].masa_ident,
                tgl_ident: date,
                tempat_lahir: seedCISPengurus[i].tempat_lahir,
                tgl_lahir: date,
                agama: 1,
                no_hp: seedCISPengurus[i].no_hp,
                no_telp: seedCISPengurus[i].no_telp,
                email: seedCISPengurus[i].email,
                nm_ibu: seedCISPengurus[i].nm_ibu,
                jabatan: seedCISPengurus[i].jabatan,
                kepemilikan: seedCISPengurus[i].kepemilikan,
                npwp: seedCISPengurus[i].npwp,
                usrid_create: "faza"
            }
        })
        await prisma.cis_alamat.create({
            data: {
                id_pengurus: pengurus.id_pengurus,
                jns_alamat: seedCISAlamat[i].jns_alamat.toString(),
                negara: 'ID',
                provinsi: seedCISAlamat[i].provinsi ?? "jakarta",
                kota: seedCISAlamat[i].kota,
                kecamatan: seedCISAlamat[i].kecamatan,
                kelurahan: seedCISAlamat[i].kelurahan,
                rt: seedCISAlamat[i].rt,
                rw: seedCISAlamat[i].rw,
                kd_pos: seedCISAlamat[i].kd_pos,
                alamat_detail: seedCISAlamat[i].alamat_detail,
                usrid_create: "faza",
            },
        });
    })
    // ? generate data tipe C instansi pemerintah
    seedCISMasterC.map(async (data, i) => {
        if (i > 250) return;
        await prisma.cis_master.create({
            data: {
                no_nas: data.no_nas.toString(),
                created_at_kantor: data.created_at_kantor.toString(),
                nm_nas: data.nm_nas,
                tipe_nas: data.tipe_nas,
                jns_ident: data.jns_ident,
                no_ident: data.no_ident,
                masa_ident: data.masa_ident,
                tgl_ident: date,
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
                usrid_create: "faza",
            },
        })
        await prisma.cis_alamat.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_alamat: seedCISAlamat[i].jns_alamat.toString(),
                negara: 'ID',
                provinsi: seedCISAlamat[i].provinsi ?? "jakarta",
                kota: seedCISAlamat[i].kota,
                kecamatan: seedCISAlamat[i].kecamatan,
                kelurahan: seedCISAlamat[i].kelurahan,
                rt: seedCISAlamat[i].rt,
                rw: seedCISAlamat[i].rw,
                kd_pos: seedCISAlamat[i].kd_pos,
                alamat_detail: seedCISAlamat[i].alamat_detail,
                usrid_create: "faza",
            },
        });
        const pengurus = await prisma.cis_pengurus.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_pengurus: seedCISPengurus[i].jns_pengurus,
                kewarganegaraan: seedCISPengurus[i].kewarganegaraan,
                jns_ident: seedCISPengurus[i].jns_ident,
                no_ident: seedCISPengurus[i].no_ident,
                nm_nas: seedCISPengurus[i].nm_nas,
                masa_ident: seedCISPengurus[i].masa_ident,
                tgl_ident: date,
                tempat_lahir: seedCISPengurus[i].tempat_lahir,
                tgl_lahir: date,
                agama: 1,
                no_hp: seedCISPengurus[i].no_hp,
                no_telp: seedCISPengurus[i].no_telp,
                email: seedCISPengurus[i].email,
                nm_ibu: seedCISPengurus[i].nm_ibu,
                jabatan: seedCISPengurus[i].jabatan,
                kepemilikan: seedCISPengurus[i].kepemilikan,
                npwp: seedCISPengurus[i].npwp,
                usrid_create: "faza"
            }
        })
        await prisma.cis_alamat.create({
            data: {
                id_pengurus: pengurus.id_pengurus,
                jns_alamat: seedCISAlamat[i].jns_alamat.toString(),
                negara: 'ID',
                provinsi: seedCISAlamat[i].provinsi ?? "jakarta",
                kota: seedCISAlamat[i].kota,
                kecamatan: seedCISAlamat[i].kecamatan,
                kelurahan: seedCISAlamat[i].kelurahan,
                rt: seedCISAlamat[i].rt,
                rw: seedCISAlamat[i].rw,
                kd_pos: seedCISAlamat[i].kd_pos,
                alamat_detail: seedCISAlamat[i].alamat_detail,
                usrid_create: "faza",
            },
        });
    })
    // ? generate data tipe D instansi non-profit
    seedCISMasterD.map(async (data, i) => {
        if (i > 250) return;
        await prisma.cis_master.create({
            data: {
                no_nas: data.no_nas.toString(),
                created_at_kantor: data.created_at_kantor.toString(),
                nm_nas: data.nm_nas,
                tipe_nas: data.tipe_nas,
                jns_ident: data.jns_ident,
                no_ident: data.no_ident,
                masa_ident: data.masa_ident,
                tgl_ident: date,
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
                usrid_create: "faza",
            },
        })
        const perusahaan = await prisma.cis_perusahaan.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_usaha_tkt: seedCISPerusahaan[i].jns_usaha_tkt,
                flag_bank: seedCISPerusahaan[i].flag_bank,
                group_nas: seedCISPerusahaan[i].group_nas,
                modal_sendiri: seedCISPerusahaan[i].modal_sendiri,
                modal_setor: seedCISPerusahaan[i].modal_setor,
                no_akte_awal: seedCISPerusahaan[i].no_akte_awal,
                tgl_akte_awal: date,
                no_akte_akhir: seedCISPerusahaan[i].no_akte_akhir,
                tgl_akte_akhir: date,
                nm_notaris: seedCISPerusahaan[i].nm_notaris,
                no_notaris: seedCISPerusahaan[i].no_notaris,
                tgl_notaris: date,
                no_permohonan_dep: seedCISPerusahaan[i].no_permohonan_dep,
                tgl_permohonan_dep: date,
                no_izin_dep: seedCISPerusahaan[i].no_izin_dep,
                tgl_izin_dep: date,
                no_pub: seedCISPerusahaan[i].no_pub,
                tgl_pub: date,
                usrid_create: "faza"
            }
        })
        await prisma.cis_alamat.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_alamat: seedCISAlamat[i].jns_alamat.toString(),
                negara: 'ID',
                provinsi: seedCISAlamat[i].provinsi ?? "jakarta",
                kota: seedCISAlamat[i].kota,
                kecamatan: seedCISAlamat[i].kecamatan,
                kelurahan: seedCISAlamat[i].kelurahan,
                rt: seedCISAlamat[i].rt,
                rw: seedCISAlamat[i].rw,
                kd_pos: seedCISAlamat[i].kd_pos,
                alamat_detail: seedCISAlamat[i].alamat_detail,
                usrid_create: "faza",
            },
        });
        const pengurus = await prisma.cis_pengurus.create({
            data: {
                no_nas: data.no_nas.toString(),
                jns_pengurus: seedCISPengurus[i].jns_pengurus,
                kewarganegaraan: seedCISPengurus[i].kewarganegaraan,
                jns_ident: seedCISPengurus[i].jns_ident,
                no_ident: seedCISPengurus[i].no_ident,
                nm_nas: seedCISPengurus[i].nm_nas,
                masa_ident: seedCISPengurus[i].masa_ident,
                tgl_ident: date,
                tempat_lahir: seedCISPengurus[i].tempat_lahir,
                tgl_lahir: date,
                agama: 1,
                no_hp: seedCISPengurus[i].no_hp,
                no_telp: seedCISPengurus[i].no_telp,
                email: seedCISPengurus[i].email,
                nm_ibu: seedCISPengurus[i].nm_ibu,
                jabatan: seedCISPengurus[i].jabatan,
                kepemilikan: seedCISPengurus[i].kepemilikan,
                npwp: seedCISPengurus[i].npwp,
                usrid_create: "faza"
            }
        })
        await prisma.cis_alamat.create({
            data: {
                id_pengurus: pengurus.id_pengurus,
                jns_alamat: seedCISAlamat[i].jns_alamat.toString(),
                negara: 'ID',
                provinsi: seedCISAlamat[i].provinsi ?? "jakarta",
                kota: seedCISAlamat[i].kota,
                kecamatan: seedCISAlamat[i].kecamatan,
                kelurahan: seedCISAlamat[i].kelurahan,
                rt: seedCISAlamat[i].rt,
                rw: seedCISAlamat[i].rw,
                kd_pos: seedCISAlamat[i].kd_pos,
                alamat_detail: seedCISAlamat[i].alamat_detail,
                usrid_create: "faza",
            },
        });
    })

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
    await prisma.para_bntk_hkm.createMany({
        data: para_bntk_hkm
    })
    await prisma.para_gol_pmlk.createMany({
        data: para_gol_pmlk
    })
    await prisma.para_dana.createMany({
        data: [
            {
                kode: 1,
                keterangan: "gaji"
            },
            {
                kode: 2,
                keterangan: "bisnis"
            },
            {
                kode: 3,
                keterangan: "simpanan pribadi"
            },
            {
                kode: 4,
                keterangan: "investasi"
            },
            {
                kode: 5,
                keterangan: "bonus"
            },
            {
                kode: 6,
                keterangan: "komisi"
            },
            {
                kode: 99,
                keterangan: "lainnya"
            },
        ]
    })
    await prisma.para_transaksi.createMany({
        data: [
            {
                "kode": 1,
                "keterangan": "Rp. 1.000.000 per hari",
                "batas_maksimum": 1000000
            },
            {
                "kode": 2,
                "keterangan": "Rp. 5.000.000 per hari",
                "batas_maksimum": 5000000
            },
            {
                "kode": 3,
                "keterangan": "Rp. 20.000.000 per hari",
                "batas_maksimum": 20000000
            },
            {
                "kode": 4,
                "keterangan": "Rp. 50.000.000 per hari",
                "batas_maksimum": 50000000
            },
            {
                "kode": 5,
                "keterangan": "Rp. 20.000.000 per hari",
                "batas_maksimum": 20000000
            },
            {
                "kode": 6,
                "keterangan": "Rp. 500.000.000 per hari",
                "batas_maksimum": 500000000
            }
        ]
    })
    await prisma.para_penghasilan.createMany({
        data: [
            {
                kode: 1,
                keterangan: "tidak ada penghasilan"
            },
            {
                kode: 2,
                keterangan: "dibawah Rp.5 jt"
            },
            {
                kode: 3,
                keterangan: "Rp.5 jt S/D Rp.15 jt"
            },
            {
                kode: 4,
                keterangan: "Rp.15 jt S/D Rp.25 jt"
            },
            {
                kode: 5,
                keterangan: "diatas Rp.25 jt"
            }
        ]
    })
    await prisma.para_bidang_usaha.createMany({
        data: para_bidang_usaha
    })
    await prisma.para_jns_usaha_tkt.createMany({
        data: para_jns_usaha_tkt
    })
    await prisma.para_grup_nas.createMany({
        data: para_grup_nas
    })
    await prisma.para_negara.createMany({
        data: para_negara
    })
    await prisma.para_provinsi.createMany({
        data: para_provinsi
    })
    await prisma.para_kota.createMany({
        data: para_kota
    })
    await prisma.para_kecamatan.createMany({
        data: para_kecamatan
    })
    await prisma.para_kelurahan.createMany({
        data: para_kelurahan
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
