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
import seedCISPerorangan from "@/dummy/seedCISPerorangan.json";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // ? generate level pemakai
    await prisma.para_level_user.deleteMany();
    // ? generate data pemakai
    await prisma.aks_pemakai.deleteMany();
    // ? generate data tipe A Perorangan
    await prisma.cis_master.deleteMany();
    await prisma.cis_perorangan.deleteMany();
    await prisma.cis_alamat.deleteMany();

    // ? generate data parameter
    await prisma.para_jns_ident.deleteMany();
    await prisma.para_sts_nikah.deleteMany();
    await prisma.para_agama.deleteMany();
    await prisma.para_profesi.deleteMany();
    await prisma.para_jns_pekerjaan.deleteMany();
    await prisma.para_bntk_hkm.deleteMany()
    await prisma.para_gol_pmlk.deleteMany()
    await prisma.para_dana.deleteMany()
    await prisma.para_transaksi.deleteMany()
    await prisma.para_penghasilan.deleteMany()
    await prisma.para_bidang_usaha.deleteMany()
    await prisma.para_jns_usaha_tkt.deleteMany()
    await prisma.para_grup_nas.deleteMany()
    await prisma.para_negara.deleteMany()
    await prisma.para_provinsi.deleteMany()
    await prisma.para_kota.deleteMany()
    await prisma.para_kecamatan.deleteMany()
    await prisma.para_kelurahan.deleteMany()
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
