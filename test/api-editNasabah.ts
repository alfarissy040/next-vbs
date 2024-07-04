import { prisma } from "@/app/utilities/ServerUtilities"
import { cis_master } from "@prisma/client"
import { has, isEmpty, isEqual, omitBy, pickBy, toPairs, toPairsIn } from "lodash"
import moment from "moment"

const isInExcaption = (key:string) => {
    return ["cis_perorangan", "cis_perusahaan", "alamat", "cis_pengurus", "cis_alamat"].includes(key.trim().toLowerCase())
}

const getCisDiffData = (nasabah:Record<string, any> | null, data:Record<string, any>) => {
    if(isEmpty(nasabah) || isEmpty(data)) return {}

    return toPairs(nasabah as Record<string, any>).reduce((acc, [key, value]) => {
        if(!has(data, key) || isInExcaption(key)) {
            return acc
        }
        return !isEqual(value, data[key]) ? ({...acc, [key] : data[key]}):acc
    }, {})
}
async function main() {
    const data:Record<string, any> = {
        nm_nas: 'Papa Zola',
        tipe_nas: 1,
        no_ident: '123456789',
        masa_ident: 0,
        status_nas: '00',
        flag_hub_bank: false,
        npwp: '987654321',
        no_telp: '08123456789',
        email: 'adudu@example.com',
        kd_jns_ident: 1,
        kd_acc_off: '1',
        kd_bntk_hkm: 1,
        kd_gol_pemilik: 1,
        kd_sumber_dana: 1,
        kd_tujuan_dana: 1,
        kd_maks_trans: 1,
        kd_penghasilan_bulan: 1,
        kd_penghasilan_lainnya: 1,
        kd_pengeluaran_bulan: 1,
        kd_pengeluaran_lainnya: 1,
        kd_bidang_usaha: 1,
        // cis perorangan
        nm_ibu: 'Nenek Zola',
        tempat_lahir: 'Jakarta',
        tgl_lahir: moment('1990-01-01T00:00:00.000Z').format('YYYY-MM-DD'),
        jns_kelamin: 'L',
        flag_karyawan: false,
        nm_pasangan: 'Mama Zola',
        no_ident_pasangan: '987654321',
        nm_ahli_waris: 'Zila',
        jabatan: 'Manager',
        nm_kntr: 'ABC Corp',
        kd_status_pernikahan: 1,
        kd_agama: 1,
        kd_kewarganegaraan: 'ID',
        kd_profesi: 1,
        kd_jns_pekerjaan: 1,
        alamat: {
          jns_alamat: '1',
          kd_negara: 'ID',
          kd_provinsi: 31,
          kd_kota: 3171,
          kd_kecamatan: 3171050,
          kd_kelurahan: 3171050002,
          rt: '001',
          rw: '002',
          kd_pos: '12345',
          alamat_detail: 'Jl. Kebon Jeruk No. 1',
        }
      }
      const nasabah = await prisma.cis_master.findUnique({
        where: { no_nas: "0100100001" },
        include: {
            cis_perorangan: true,
            cis_perusahaan: true,
            cis_pengurus: {
                include: {
                    cis_alamat: true
                }
            },
            alamat: true
        }
    })
    if (!nasabah) {
        console.log("Data tidak ditemukan")
        return null
    }
    const diffMaster = getCisDiffData(nasabah, data);
    const diffPerorangan = getCisDiffData(nasabah.cis_perorangan, data)
    const diffPerusahaan = getCisDiffData(nasabah.cis_perusahaan, data)
    const diffAlamat = getCisDiffData(nasabah.alamat, data.alamat)
    const diffPengurus = getCisDiffData(nasabah.cis_pengurus, data.pengurus)
    const diffAlamatPengurus = getCisDiffData(nasabah.cis_pengurus?.cis_alamat ?? null, data.pengurus.alamat)
    console.log("result")

    console.log(diffPerorangan)
}

main()
