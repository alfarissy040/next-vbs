"use client";
import useFetchPaginateParameter from "@/app/hooks/useFetchPaginateParameter";
import useFetchParameter from "@/app/hooks/useFetchParameter";
import { baseFormVariant } from "@/app/utilities/MotionVariant";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react";
import { para_bidang_usaha, para_bntk_hkm, para_dana, para_gol_pmlk, para_jns_ident, para_penghasilan, para_transaksi } from "@prisma/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { CDialog } from "../../ClassnamesData";
import FormInput from "../../FormInput";
import FormSelect from "../FormSelect";

interface CreateMasterProps {
    navDirection: TNavDirection;
    kdTypeNasabah: number;
    handleReset: () => void;
    typeNasabah: TNasabahType;
    formMethod: UseFormReturn<FieldValues>;
}

const CreateMaster: React.FC<CreateMasterProps> = ({ navDirection, handleReset, typeNasabah, kdTypeNasabah, formMethod }) => {
    const [isForeverMasaIdent, setIsForeverMasaIdent] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { unregister } = formMethod;
    // fetch parameter
    const { convertedData: IJnsIdent, isLoading: isLoadingJnsIdent, apiUrl: urlJnsIdent } = useFetchParameter<para_jns_ident>("jenis-identitas", { "jenis-nasabah": kdTypeNasabah });
    const { convertedData: IBntkHkm, isLoading: isLoadingBntkHkm, apiUrl: urlBntkHkm } = useFetchParameter<para_bntk_hkm>("bentuk-hukum", { "jenis-nasabah": kdTypeNasabah });
    const { isLoading: isLoadingGolPmlk, data: IGolPmlk, setSize: setPageGolPmlk, setSearch: setSearchGolPmlk, size: sizeGolPmlk } = useFetchPaginateParameter<para_gol_pmlk>("golongan-pemilik");
    const { convertedData: IDana, isLoading: isLoadingDana, apiUrl: urlDana } = useFetchParameter<para_dana>("dana");
    const { convertedData: ITransaksi, isLoading: isLoadingTransaksi, apiUrl: urlTransaksi } = useFetchParameter<para_transaksi>("transaksi");
    const { convertedData: IPenghasilan, isLoading: isLoadingPenghasilan, apiUrl: urlPenghasilan } = useFetchParameter<para_penghasilan>("penghasilan");
    const { convertedData: IBidangUsaha, isLoading: isLoadingBidangUsaha, apiUrl: urlBidangUsaha } = useFetchParameter<para_bidang_usaha>("bidang-usaha");

    console.log(IGolPmlk);
    useEffect(() => {
        if (isForeverMasaIdent !== "1") {
            unregister("tgl_ident");
        }
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
                    <Tooltip content="Hapus Form">
                        <Button isIconOnly size="sm" color="danger" variant="light" onPress={onOpen}>
                            <FaTrashAlt className="w-4 h-4 text-red-500" />
                        </Button>
                    </Tooltip>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                    {/* nama nasabah */}
                    <FormInput type="text" label="Nama Lengkap" formMethod={formMethod} id="nm_nas" placeholder="Masukan nama lengkap" isRequired />
                    {/* jenis identitas */}
                    <FormSelect fetchUrl={urlJnsIdent} items={IJnsIdent} isLoading={isLoadingJnsIdent} formMethod={formMethod} id="jns_ident" label="Jenis Identitas" placeholder="Pilih jenis identitas" isRequired />
                    {/* nomor identitas */}
                    <FormInput type="text" label="Nomor Identitas" formMethod={formMethod} id="no_ident" placeholder="Masukan Nomor Identitas" isRequired />
                    {/* masa berlaku identitas */}
                    <FormSelect
                        fetchUrl="masa_ident"
                        items={[
                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}
                        formMethod={formMethod}
                        id="masa_ident"
                        label="Masa Belaku Identitas"
                        placeholder="Pilih Masa Belaku Identitas"
                        onChange={(e) => setIsForeverMasaIdent(e.target.value)}
                        isRequired
                    />
                    {/* tanggal identitas */}
                    {isForeverMasaIdent !== "1" && (
                        <FormInput type="date" label="Tanggal Masa Identitas" formMethod={formMethod} id="tgl_ident" placeholder="Masukan Tanggal Masa Identitas" max={new Date().toISOString().split("T")[0] as string} isRequired />
                    )}
                    {/* bentuk hukum */}
                    <FormSelect fetchUrl={urlBntkHkm} items={IBntkHkm} isLoading={isLoadingBntkHkm} formMethod={formMethod} id="btnk_hkm" label="Bentuk Hukum" placeholder="Pilih Bentuk Hukum" isRequired />
                    {/* golongan pemilik */}
                    <FormSelect
                        paginateItems={IGolPmlk}
                        isLoading={isLoadingGolPmlk}
                        formMethod={formMethod}
                        id="gol_pmlk"
                        label="Golongan Pemilik"
                        placeholder="Pilih Golongan Pemilik"
                        handleChangePage={(i: number) => setPageGolPmlk(i)}
                        handleSearch={(i: string) => setSearchGolPmlk(i)}
                        currentPage={sizeGolPmlk}
                        maxPage={IGolPmlk ? IGolPmlk[0].totalPage : 0}
                        isSearchable
                        isRequired
                    />
                    {/* sumber dana */}
                    <FormSelect fetchUrl={urlDana} isLoading={isLoadingDana} items={IDana} formMethod={formMethod} id="sumber_dana" label="Sumber Dana" placeholder="Pilih Sumber Dana" isRequired />

                    {/* tujuan dana */}
                    <FormSelect fetchUrl={urlDana} isLoading={isLoadingDana} items={IDana} formMethod={formMethod} id="tujuan_dana" label="Tujuan Dana" placeholder="Pilih Tujuan Dana" isRequired />

                    {/* maksimal transaksi */}
                    <FormSelect fetchUrl={urlTransaksi} isLoading={isLoadingTransaksi} items={ITransaksi} formMethod={formMethod} id="maks_trans" label="Maskimal Transaksi" placeholder="Pilih Maskimal Transaksi" isRequired />

                    {/* penghasilan bulanan */}
                    <FormSelect fetchUrl={urlPenghasilan} isLoading={isLoadingPenghasilan} items={IPenghasilan} formMethod={formMethod} id="penghasilan_bulan" label="Penghasilan Bulanan" placeholder="Pilih Penghasilan Bulanan" isRequired />

                    {/* penghasilan lainnya */}
                    <FormSelect fetchUrl={urlPenghasilan} isLoading={isLoadingPenghasilan} items={IPenghasilan} formMethod={formMethod} id="penghasilan_lainnya" label="Penghasilan Lainnya" placeholder="Pilih Penghasilan Lainnya" />
                    {/* pengeluaran bulanan */}
                    <FormSelect fetchUrl={urlPenghasilan} isLoading={isLoadingPenghasilan} items={IPenghasilan} formMethod={formMethod} id="pengeluaran_bulan" label="Pengeluaran Bulanan" placeholder="Pilih Pengeluaran Bulanan" isRequired />
                    {/* pengeluaran lainnya */}
                    <FormSelect fetchUrl={urlPenghasilan} isLoading={isLoadingPenghasilan} items={IPenghasilan} formMethod={formMethod} id="pengeluaran_lainnya" label="Pengeluaran Lainnya" placeholder="Pilih Pengeluaran Lainnya" />
                    {/* npwp */}
                    <FormInput type="text" label="NPWP" formMethod={formMethod} id="npwp" placeholder="Masukan NPWP" />
                    {/* no telp */}
                    <FormInput type="text" label="Nomor Telp" formMethod={formMethod} id="no_telp" placeholder="Masukan Nomor Telp" isRequired />
                    {/* email */}
                    <FormInput type="email" label="Email" formMethod={formMethod} id="email" placeholder="Masukan Email" isRequired />
                    {/* bidang usaha */}
                    <FormSelect fetchUrl={urlBidangUsaha} isLoading={isLoadingBidangUsaha} items={IBidangUsaha} formMethod={formMethod} id="bidang_usaha" label="Bidang Usaha" placeholder="Pilih Bidang Usaha" />
                    {/* flag hubungan bank */}
                    <FormSelect
                        items={[
                            { label: "Berhubungan dengan Bank", value: 1 },
                            { label: "Tidak ada hubungan", value: 0 },
                        ]}
                        formMethod={formMethod}
                        id="flag_hub_bank"
                        label="Hubungan Bank"
                        placeholder="Pilih Hubungan Bank"
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

export default CreateMaster;
