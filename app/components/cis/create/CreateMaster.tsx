"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { FaTrashAlt } from 'react-icons/fa'
import { CDialog } from '../../ClassnamesData'
import FormInput from '../../FormInput'
import FormSelect from '../FormSelect'
import { baseFormVariant } from '@/app/utilities/MotionVariant'

interface CreateMasterProps {
    navDirection: TNavDirection;
    handleReset: () => void;
    typeNasabah: TNasabahType;
    formMethod: UseFormReturn<FieldValues>
}




const CreateMaster: React.FC<CreateMasterProps> = ({ navDirection, handleReset, typeNasabah, formMethod }) => {
    const [isForeverMasaIdent, setIsForeverMasaIdent] = useState("")
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { unregister } = formMethod

    useEffect(() => {
        if (isForeverMasaIdent !== "1") {
            unregister("tgl_ident")
        }
    }, [isForeverMasaIdent, unregister])
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
                className="rounded-lg shadow-lg w-full p-3 bg-slate-100 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium md:text-lg">Nasabah Tipe <b className='capitalize'>{typeNasabah.toLowerCase()}</b></h2>
                    <Tooltip content="Hapus Form">
                        <Button isIconOnly size='sm' color='danger' variant='light' onPress={onOpen}>
                            <FaTrashAlt className='w-4 h-4 text-red-500' />
                        </Button>
                    </Tooltip>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                    {/* nama nasabah */}
                    <FormInput type="text" label="Nama Lengkap"
                        formMethod={formMethod}
                        id="nm_nas" placeholder="Masukan nama lengkap" isRequired />
                    {/* jenis identitas */}
                    <FormSelect
                        items={[
                            { label: "Cat", value: "cat" },
                            { label: "Dog", value: "dog" },
                        ]}

                        formMethod={formMethod}
                        id="jns_ident"
                        label="Jenis Identitas"
                        placeholder="Pilih jenis identitas"
                        isRequired
                    />
                    {/* nomor identitas */}
                    <FormInput type="text" label="Nomor Identitas"
                        formMethod={formMethod}
                        id="no_ident" placeholder="Masukan Nomor Identitas" isRequired />
                    {/* masa berlaku identitas */}
                    <FormSelect
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
                    {isForeverMasaIdent !== "1" && <FormInput type="date" label="Tanggal Masa Identitas"
                        formMethod={formMethod}
                        id="tgl_ident" placeholder="Masukan Tanggal Masa Identitas" max={new Date().toISOString().split('T')[0] as string} isRequired />}
                    {/* bentuk hukum */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="btnk_hkm"
                        label="Bentuk Hukum"
                        placeholder="Pilih Bentuk Hukum"

                        isRequired
                    />
                    {/* golongan pemilik */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="gol_pmlk"
                        label="Golongan Pemilik"
                        placeholder="Pilih Golongan Pemilik"

                        isRequired
                    />
                    {/* status nasabah */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="sts_nas"
                        label="Status"
                        placeholder="Pilih Status"

                        isRequired
                    />
                    {/* sumber dana */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="sumber_dana"
                        label="Sumber Dana"
                        placeholder="Pilih Sumber Dana"

                        isRequired
                    />

                    {/* tujuan dana */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="tujuan_dana"
                        label="Tujuan Dana"
                        placeholder="Pilih Tujuan Dana"

                        isRequired
                    />

                    {/* maksimal transaksi */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="maks_trans"
                        label="Maskimal Transaksi"
                        placeholder="Pilih Maskimal Transaksi"

                        isRequired
                    />

                    {/* penghasilan bulanan */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="penghasilan_bulan"
                        label="Penghasilan Bulanan"
                        placeholder="Pilih Penghasilan Bulanan"

                        isRequired
                    />

                    {/* penghasilan lainnya */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="penghasilan_lainnya"
                        label="Penghasilan Lainnya"
                        placeholder="Pilih Penghasilan Lainnya"

                    />
                    {/* pengeluaran bulanan */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="pengeluaran_bulan"
                        label="Pengeluaran Bulanan"
                        placeholder="Pilih Pengeluaran Bulanan"

                        isRequired
                    />
                    {/* pengeluaran lainnya */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="pengeluaran_lainnya"
                        label="Pengeluaran Lainnya"
                        placeholder="Pilih Pengeluaran Lainnya"

                    />
                    {/* npwp */}
                    <FormInput type="text" label="NPWP"
                        formMethod={formMethod}
                        id="npwp" placeholder="Masukan NPWP" />
                    {/* no telp */}
                    <FormInput type="text" label="Nomor Telp"
                        formMethod={formMethod}
                        id="no_telp" placeholder="Masukan Nomor Telp" isRequired />
                    {/* email */}
                    <FormInput type="email" label="Email"
                        formMethod={formMethod}
                        id="email" placeholder="Masukan Email" isRequired />
                    {/* bidang usaha */}
                    <FormSelect
                        items={[

                            { label: "Seumur Hidup", value: "1" },
                            { label: "Berlaku Sampai", value: "0" },
                        ]}

                        formMethod={formMethod}
                        id="bidang_usaha"
                        label="Bidang Usaha"
                        placeholder="Pilih Bidang Usaha"
                    />
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
                                <p>
                                    Apakah Anda yakin ingin menghapus data ini? Perubahan yang Anda buat akan tidak akan disimpan dan tidak dapat dibatalkan.
                                </p>
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
    )
}

export default CreateMaster