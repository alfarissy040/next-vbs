import {
    aks_pemakai,
    cis_alamat,
    cis_master,
    cis_pengurus,
    cis_perorangan,
    cis_perusahaan,
    cis_update,
    kantor,
    karyawan,
    para_agama,
    para_bidang_usaha,
    para_bntk_hkm,
    para_dana,
    para_gol_pmlk,
    para_grup_nas,
    para_jns_ident,
    para_jns_pekerjaan,
    para_kecamatan,
    para_kelurahan,
    para_kota,
    para_level_user,
    para_negara,
    para_penghasilan,
    para_profesi,
    para_provinsi,
    para_sts_nikah,
    para_transaksi,
} from "@prisma/client";

export type TCommonApiError = {
    status: number;
    message: string;
};

export type TCisQParam = "search" | "orderby" | "direction" | "page";

declare module "@prisma/client" {
    interface extendCisUpdate extends cis_master {
        cis_update: cis_update
    }
    interface extendCisMaster extends cis_master {
        aks_pemakai_create: aks_pemakai;
        aks_pemakai_update?: aks_pemakai;
        alamat: ?extendCisAlamat;
        cis_perusahaan?: extendCisPerusahaan;
        cis_perorangan?: extendCisPerorangan;
        cis_pengurus?: extendCisPengurus;
        jenis_identitas: para_jns_ident;
        bentuk_hukum: para_bntk_hkm;
        golongan_pemilik: para_gol_pmlk;
        sumber_dana: para_dana;
        tujuan_dana: para_dana;
        transaksi: para_transaksi;
        penghasilan: para_penghasilan;
        penghasilan_lainnya?: para_penghasilan;
        pengeluaran: para_penghasilan;
        pengeluaran_lainnya?: para_penghasilan;
        bidang_usaha?: para_bidang_usaha;
    }

    interface extendCisAlamat extends cis_alamat {
        aks_pemakai_create: aks_pemakai;
        aks_pemakai_update?: aks_pemakai;
        cis_master?: cis_master;
        cis_pengurus?: cis_pengurus;
        negara: para_negara;
        provinsi: para_provinsi;
        kota: para_kota;
        kecamatan: para_kecamatan;
        kelurahan: para_kelurahan;
    }

    interface extendCisPerorangan extends cis_perorangan {
        aks_pemakai_create: aks_pemakai;
        aks_pemakai_update?: aks_pemakai;
        cisMaster: cis_master;
        status_nikah: para_sts_nikah;
        agama: para_agama;
        negara: para_negara;
        profesi: para_profesi;
        jenis_pekerjaan: para_jns_pekerjaan;
    }

    interface extendCisPerusahaan extends cis_perusahaan {
        aks_pemakai_create: aks_pemakai;
        aks_pemakai_update?: aks_pemakai;
        cisMaster: cis_master;
        grup_nasabah: para_grup_nas;
    }
    interface extendCisPengurus extends cis_pengurus {
        aks_pemakai_create: aks_pemakai;
        aks_pemakai_update?: aks_pemakai;
        cis_master?: cis_master;
        cis_alamat: extendCisAlamat;
        jenis_identitas: para_jns_ident;
        negara: para_negara;
        agama: para_agama;
    }
    interface extendKaryawan extends karyawan {
        kantor: kantor;
        jenis_identitas: para_jns_ident;
    }
    interface extendAksPemakai extends aks_pemakai {
        karyawan: extendKaryawan;
        para_level_user: para_level_user;
    }
}
