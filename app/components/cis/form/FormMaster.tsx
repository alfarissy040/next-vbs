"use client";

import useFetchPaginateParameter from "@/app/hooks/useFetchPaginateParameter";
import useFetchParameter from "@/app/hooks/useFetchParameter";
import { baseFormVariant } from "@/app/utilities/MotionVariant";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react";
import { extendCisMaster, para_bidang_usaha, para_bntk_hkm, para_dana, para_gol_pmlk, para_jns_ident, para_penghasilan, para_transaksi } from "@prisma/client";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { CDialog } from "../../ClassnamesData";
import FormInput from "../../FormInput";
import FormSelect from "../FormSelect";
import { findStaticParameterValue, paraHubunganBank, paraMasaBelakuIdentitas } from "@/app/utilities/staticParameter";
import { convertToString } from "@/app/utilities/Cis";
import { convertToSelectItems, convertToSelectObject } from "@/app/utilities/action";
import { isEmpty } from "lodash";

interface FormMasterProps {
    navDirection: TNavDirection;
    kdTypeNasabah: number;
    handleReset?: () => void;
    typeNasabah: TNasabahType;
    formMethod: UseFormReturn<FieldValues>;
    isLoading?: boolean;
    defaultValue?: extendCisMaster
}

const FormMaster: React.FC<FormMasterProps> = ({ navDirection, handleReset, typeNasabah, kdTypeNasabah, formMethod, isLoading = false, defaultValue }) => {
    const [isForeverMasaIdent, setIsForeverMasaIdent] = useState(defaultValue?.masa_ident ?? '1');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { unregister } = formMethod;

    // fetch parameter
    const { convertedData: IJnsIdent, isLoading: isLoadingJnsIdent } = useFetchParameter<para_jns_ident>({
        parameter: "jenis-identitas",
        queryParams: { "jenis-nasabah": kdTypeNasabah },
    });
    const { convertedData: IBntkHkm, isLoading: isLoadingBntkHkm } = useFetchParameter<para_bntk_hkm>({
        parameter: "bentuk-hukum",
        queryParams: { "jenis-nasabah": kdTypeNasabah },
    });
    const { isLoading: isLoadingGolPmlk, data: IGolPmlk, setSize: setPageGolPmlk, setSearch: setSearchGolPmlk, size: sizeGolPmlk } = useFetchPaginateParameter<para_gol_pmlk>({ parameter: "golongan-pemilik" });
    const { convertedData: IDana, isLoading: isLoadingDana } = useFetchParameter<para_dana>({ parameter: "dana" });
    const { convertedData: ITransaksi, isLoading: isLoadingTransaksi } = useFetchParameter<para_transaksi>({ parameter: "transaksi" });
    const { convertedData: IPenghasilan, isLoading: isLoadingPenghasilan } = useFetchParameter<para_penghasilan>({ parameter: "penghasilan" });
    const { convertedData: IBidangUsaha, isLoading: isLoadingBidangUsaha } = useFetchParameter<para_bidang_usaha>({ parameter: "bidang-usaha" });

    // Refactored to use a custom hook for better readability and reusability
    useEffect(() => {
        const unregisterIfNotForeverMasaIdent = (): void => {
            if (isForeverMasaIdent !== "1") {
                unregister("tgl_ident");
            }
        };

        unregisterIfNotForeverMasaIdent();
    }, [isForeverMasaIdent, unregister]);
    return (
        <>
            <motion.div
                layout
                initial={"initial"}
                animate={"show"}
                exit={"hide"}
                variants={baseFormVariant(navDirection)}
                transition={{
                    type: "spring",
                    duration: 0.5,
                }}
                className="rounded-lg shadow-lg w-full p-3 bg-slate-100 dark:bg-slate-800"
            >
                <div className="flex items-center justify-between">
                    <h2 className="font-medium md:text-lg">
                        Nasabah Tipe <b className="capitalize">{typeNasabah.toLowerCase()}</b>
                    </h2>
                    {handleReset && (
                        <Tooltip content="Hapus Form">
                            <Button isIconOnly size="sm" color="danger" variant="light" onPress={onOpen} isDisabled={isLoading}>
                                <FaTrashAlt className="w-4 h-4 text-red-500" />
                            </Button>
                        </Tooltip>
                    )}
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                    {/* nama nasabah */}
                    <FormInput type="text" label="Nama Lengkap" formMethod={formMethod} id="nm_nas" placeholder="Masukan nama lengkap" defaultValue={defaultValue?.nm_nas} isRequired />
                    {/* jenis identitas */}
                    <FormSelect items={IJnsIdent} isLoading={isLoadingJnsIdent} formMethod={formMethod} id="kd_jns_ident" label="Jenis Identitas" placeholder="Pilih jenis identitas" defaultValue={convertToSelectObject(defaultValue?.jenis_identitas)} isRequired />
                    {/* nomor identitas */}
                    <FormInput type="text" label="Nomor Identitas" formMethod={formMethod} id="no_ident" placeholder="Masukan Nomor Identitas" defaultValue={defaultValue?.no_ident} isRequired />
                    {/* masa berlaku identitas */}
                    <FormSelect
                        items={paraMasaBelakuIdentitas}
                        formMethod={formMethod}
                        id="masa_ident"
                        label="Masa Belaku Identitas"
                        placeholder="Pilih Masa Belaku Identitas"
                        onChange={setIsForeverMasaIdent}
                        defaultValue={findStaticParameterValue(paraMasaBelakuIdentitas, (defaultValue?.masa_ident ?? 1).toString())}
                        isRequired
                    />
                    {/* tanggal identitas */}
                    {isForeverMasaIdent !== "1" && <FormInput type="date" label="Tanggal Masa Identitas" formMethod={formMethod} id="tgl_ident" placeholder="Masukan Tanggal Masa Identitas" defaultValue={defaultValue?.tgl_ident} isRequired />}
                    {/* bentuk hukum */}
                    <FormSelect items={IBntkHkm} isLoading={isLoadingBntkHkm} formMethod={formMethod} id="kd_bntk_hkm" label="Bentuk Hukum" placeholder="Pilih Bentuk Hukum" defaultValue={convertToSelectObject(defaultValue?.bentuk_hukum)} isRequired />
                    {/* golongan pemilik */}
                    <FormSelect
                        paginateItems={IGolPmlk}
                        isLoading={isLoadingGolPmlk}
                        formMethod={formMethod}
                        id="kd_gol_pemilik"
                        label="Golongan Pemilik"
                        placeholder="Pilih Golongan Pemilik"
                        handleChangePage={setPageGolPmlk}
                        handleSearch={setSearchGolPmlk}
                        currentPage={sizeGolPmlk}
                        maxPage={IGolPmlk ? IGolPmlk[0]?.totalPage : 0}
                        defaultValue={convertToSelectObject(defaultValue?.golongan_pemilik)}
                        isSearchable
                        isRequired
                    />
                    {/* sumber dana */}
                    <FormSelect isLoading={isLoadingDana} items={IDana} formMethod={formMethod} id="kd_sumber_dana" label="Sumber Dana" placeholder="Pilih Sumber Dana" defaultValue={convertToSelectObject(defaultValue?.sumber_dana)} isRequired />

                    {/* tujuan dana */}
                    <FormSelect isLoading={isLoadingDana} items={IDana} formMethod={formMethod} id="kd_tujuan_dana" label="Tujuan Dana" placeholder="Pilih Tujuan Dana" defaultValue={convertToSelectObject(defaultValue?.tujuan_dana)} isRequired />

                    {/* maksimal transaksi */}
                    <FormSelect isLoading={isLoadingTransaksi} items={ITransaksi} formMethod={formMethod} id="kd_maks_trans" label="Maskimal Transaksi" placeholder="Pilih Maskimal Transaksi" defaultValue={convertToSelectObject(defaultValue?.transaksi)} isRequired />

                    {/* penghasilan bulanan */}
                    <FormSelect isLoading={isLoadingPenghasilan} items={IPenghasilan} formMethod={formMethod} id="kd_penghasilan_bulan" label="Penghasilan Bulanan" placeholder="Pilih Penghasilan Bulanan" defaultValue={convertToSelectObject(defaultValue?.penghasilan)} isRequired />

                    {/* penghasilan lainnya */}
                    <FormSelect isLoading={isLoadingPenghasilan} items={IPenghasilan} formMethod={formMethod} id="kd_penghasilan_lainnya" label="Penghasilan Lainnya" placeholder="Pilih Penghasilan Lainnya" defaultValue={(convertToSelectObject(defaultValue?.penghasilan_lainnya))} />
                    {/* pengeluaran bulanan */}
                    <FormSelect isLoading={isLoadingPenghasilan} items={IPenghasilan} formMethod={formMethod} id="kd_pengeluaran_bulan" label="Pengeluaran Bulanan" placeholder="Pilih Pengeluaran Bulanan" defaultValue={convertToSelectObject(defaultValue?.pengeluaran)} isRequired />
                    {/* pengeluaran lainnya */}
                    <FormSelect isLoading={isLoadingPenghasilan} items={IPenghasilan} formMethod={formMethod} id="kd_pengeluaran_lainnya" label="Pengeluaran Lainnya" placeholder="Pilih Pengeluaran Lainnya" defaultValue={convertToSelectObject(defaultValue?.pengeluaran_lainnya)} />
                    {/* npwp */}
                    {kdTypeNasabah === 1 && <FormInput type="text" label="NPWP" formMethod={formMethod} id="npwp" placeholder="Masukan NPWP" defaultValue={defaultValue?.npwp} />}
                    {/* no telp */}
                    <FormInput type="text" label="Nomor Telp" formMethod={formMethod} id="no_telp" placeholder="Masukan Nomor Telp" defaultValue={defaultValue?.no_telp} isRequired />
                    {/* email */}
                    <FormInput type="email" label="Email" formMethod={formMethod} id="email" placeholder="Masukan Email" defaultValue={defaultValue?.email} isRequired />
                    {/* bidang usaha */}
                    {kdTypeNasabah !== 1 && <FormSelect isLoading={isLoadingBidangUsaha} items={IBidangUsaha} formMethod={formMethod} id="kd_bidang_usaha" label="Bidang Usaha" placeholder="Pilih Bidang Usaha" defaultValue={(convertToSelectObject(defaultValue?.bidang_usaha))} isRequired />}
                    {/* flag hubungan bank */}
                    <FormSelect
                        items={paraHubunganBank}
                        formMethod={formMethod}
                        id="flag_hub_bank"
                        label="Hubungan Bank"
                        placeholder="Pilih Hubungan Bank"
                        defaultValue={findStaticParameterValue(paraHubunganBank, defaultValue?.flag_hub_bank ? "true" : "false")}
                        isRequired
                    />
                </div>
            </motion.div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={CDialog}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Konfirmasi Hapus Data!</ModalHeader>
                            <ModalBody>
                                <p>Apakah Anda yakin ingin menghapus data ini? Perubahan yang Anda buat akan tidak akan disimpan dan tidak dapat dibatalkan.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Batal
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={handleReset} type="submit">
                                    Hapus
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default FormMaster;
