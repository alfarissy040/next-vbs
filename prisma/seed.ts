import seedCISAlamat from "@/dummy/seedCISAlamat.json";
import seedCISMasterA from "@/dummy/seedCISMasterA.json";
import seedCISPerorangan from "@/dummy/seedCISPerorangan.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
                tgl_ident: data.tgl_ident,
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
            },
        });

        await prisma.cis_perorangan.create({
            data: {
                no_nas: data.no_nas.toString(),
                nm_ibu: seedCISPerorangan[i].nm_ibu,
                tempat_lahir: seedCISPerorangan[i].tempat_lahir,
                tgl_lahir: seedCISPerorangan[i].tgl_lahir,
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
            },
        });
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
