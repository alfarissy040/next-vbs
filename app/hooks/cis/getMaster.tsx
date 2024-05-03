import { IPaginateData } from "@/app/types/parameter";
import { para_bidang_usaha, para_bntk_hkm, para_dana, para_gol_pmlk, para_jns_ident, para_penghasilan, para_transaksi } from "@prisma/client";

type Props = {
    kdTypeNasabah: number;
}

type Data = {
    jnsIdentData: para_jns_ident[],
    danaData: para_dana[],
    transaksiData: para_transaksi[],
    penghasilanData: para_penghasilan[],
    bntkHkmData: para_bntk_hkm[],
    bidangUsahaData: para_bidang_usaha[],
    golPmlkData: IPaginateData<para_gol_pmlk>,
}

const getMaster = async ({ kdTypeNasabah }: Props): Promise<Data> => {
    const responseJnsIdent = await fetch(`/api/parameter/jenis-identitas?jenis-nasabah=${kdTypeNasabah}`);
    const jnsIdentData = await responseJnsIdent.json();

    const responseBntkHkm = await fetch(`/api/parameter/bentuk-hukum?jenis-nasabah=${kdTypeNasabah}`);
    const bntkHkmData = await responseBntkHkm.json();

    const responseGolPmlk = await fetch("/api/parameter/golongan-pemilik");
    const golPmlkData = await responseGolPmlk.json();

    const responseDana = await fetch(`/api/parameter/dana`);
    const danaData = await responseDana.json();

    const responseTransaksi = await fetch(`/api/parameter/transaksi`);
    const transaksiData = await responseTransaksi.json();

    const responsePenghasilan = await fetch(`/api/parameter/penghasilan`);
    const penghasilanData = await responsePenghasilan.json();

    const responseBidangUsaha = await fetch(`/api/parameter/bidang-usaha`);
    const bidangUsahaData = await responseBidangUsaha.json();

    return {
        jnsIdentData,
        bntkHkmData,
        golPmlkData,
        danaData,
        transaksiData,
        penghasilanData,
        bidangUsahaData,
    }
}

export default getMaster
