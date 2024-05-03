"use client"

import FormInput from "@/app/components/FormInput"
import FormTextarea from "@/app/components/FormTextarea"
import FormSelect from "@/app/components/cis/FormSelect"
import background from "@/assets/image/cs-background.jpeg"
import { Button, Tooltip } from "@nextui-org/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { FaMoon, FaSun } from "react-icons/fa6"
import { MdOutlineDone } from "react-icons/md"
import { SiNginx } from "react-icons/si"

const CSPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm()
    const { theme, setTheme } = useTheme()
    const searchParams = useSearchParams()
    const { handleSubmit, setError } = form

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        // const loadingToast = toast.loading("Sedang memproses...")

        try {
            const res = await fetch("/api/cs/", {
                method: "POST",
                body: JSON.stringify(data)
            })
            const result = await res.json()

            if (!res.ok) {
                throw {
                    status: res.status,
                    message: result.message
                }
            }

            // toast.success("Sukses")
            // navigateTo(`/cs?token=${token}&status=success`)
        } catch (error) {
            // const errorMessage = error as TCommonApiError
            // toast.error(errorMessage.message)
        } finally {
            setIsLoading(false)
            // toast.dismis(loadingToast)
        }
    }
    return (
        <div className="w-full min-h-screen h-full bg-slate-50 dark:bg-slate-950 md:p-5">
            <div className="w-full md:max-w-4xl md:rounded-lg md:shadow-lg border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 mx-auto overflow-clip">
                <div className="w-full h-36 flex items-center justify-center relative">
                    {/* title */}
                    <div className="absolute m-auto md:rounded-xl flex flex-col items-center justify-center bg-slate-950 bg-opacity-75 px-5 py-3 gap-y-3  md:w-auto md:h-auto w-full h-full">
                        <SiNginx className="text-blue-500 w-14 h-14" />
                        <h1 className="text-xl font-bold text-white">Form Permintaan Nasabah</h1>
                    </div>
                    {/* toggle theme */}
                    <Tooltip content="Tema">
                        <Button size="sm" radius="full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="absolute right-3 top-3 bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-950" isIconOnly>
                            {theme === "dark" ? <FaMoon className="w-5 h-5" /> : <FaSun className="w-5 h-5" />}
                        </Button>
                    </Tooltip>
                    <Image src={background} alt="background image" className="object-cover w-full h-full" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="md:grid flex flex-col md:grid-cols-2 md:gap-3 gap-2 p-5" noValidate>
                    {/* tujuan */}
                    <FormSelect
                        items={[
                            {
                                label: "Buat tabungan baru",
                                value: 1
                            }
                        ]}
                        formMethod={form}
                        id="tujuan"
                        label="Tujuan"
                        placeholder="Pilih tujuan"
                        isDisabled
                        isRequired

                    />
                    {/* nama */}
                    <FormInput
                        formMethod={form}
                        id="nama"
                        label="Nama Lengkap"
                        type="text"
                        placeholder="Masukan Nama Lengkap"
                        isDisabled={isLoading}
                        isRequired
                    />
                    {/* jenis ident */}
                    <FormSelect
                        items={[
                            {
                                label: "KTP",
                                value: 1
                            },
                            {
                                label: "SIM",
                                value: 2
                            },
                        ]}
                        formMethod={form}
                        id="jns_ident"
                        label="Jenis Identitas"
                        placeholder="Pilih Jenis Identitas"
                        isDisabled={isLoading}
                        isRequired
                    />
                    {/* no ident */}
                    <FormInput
                        formMethod={form}
                        id="nama"
                        label="Nomor Identitas"
                        type="text"
                        placeholder="Masukan Nomor Identitas"
                        isDisabled={isLoading}
                        isRequired
                    />
                    {/* email */}
                    <FormInput
                        formMethod={form}
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Masukan Email"
                        isDisabled={isLoading}
                        isRequired
                    />
                    {/* no telp */}
                    <FormInput
                        formMethod={form}
                        id="no_telp"
                        label="Nomor Telepon"
                        type="number"
                        placeholder="Masukan Nomor Telepon"
                        isDisabled={isLoading}
                        isRequired
                    />
                    {/* no rek */}
                    <FormInput
                        formMethod={form}
                        id="no_rek"
                        label="Nomor Rekening"
                        type="number"
                        placeholder="Masukan Nomor Rekening"
                        isDisabled={isLoading}
                    />
                    {/* provinsi */}
                    <FormSelect
                        // fetchUrl={urlProvinsi}
                        // isLoading={isLoadingProvinsi}
                        // items={IProvinsi}
                        // handleChangePage={setPageProvinsi}
                        // handleSearch={setSearchProvinsi}
                        // onChange={(value) => setKdProvinsi(value)}
                        formMethod={form}
                        id="provinsi"
                        label="Provinsi"
                        placeholder="Pilih Provinsi"
                        isSearchable
                        isRequired
                    />
                    {/* kota */}
                    <FormSelect
                        // fetchUrl={urlKota}
                        // items={IKota}
                        // handleChangePage={setPageKota}
                        // onChange={setKdKota}
                        formMethod={form}
                        id="kota"
                        label="Kota"
                        placeholder="Pilih Kota"
                        // isLoading={isLoadingKota}
                        isSearchable isRequired />
                    {/* kecamatan */}
                    <FormSelect
                        // fetchUrl={urlKecamatan}
                        // isLoading={isLoadingKecamatan}
                        // items={IKecamatan}
                        // handleChangePage={setPageKecamatan}
                        // onChange={setKdKecamatan}
                        formMethod={form}
                        id="kecamatan"
                        label="Kecamatan"
                        placeholder="Pilih Kecamatan"
                        isSearchable
                        isRequired
                    />
                    {/* kelurahan */}
                    <FormSelect
                        // fetchUrl={urlKelurahan}
                        // isLoading={isLoadingKelurahan}
                        // items={IKelurahan}
                        // handleChangePage={setPageKelurahan}
                        formMethod={form}
                        id="kelurahan"
                        label="Kelurahan"
                        placeholder="Pilih Kelurahan"
                        isSearchable
                        isRequired
                    />
                    {/* rt rw */}
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <FormInput
                            type="text"
                            rules={{
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Hanya angka yang diperbolehkan",
                                },
                            }}
                            inputMode="numeric"
                            label="RT"
                            formMethod={form}
                            id="rt"
                            placeholder="Masukan RT"
                            isRequired
                        />
                        <FormInput
                            type="text"
                            rules={{
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Hanya angka yang diperbolehkan",
                                },
                            }}
                            inputMode="numeric"
                            label="RW"
                            formMethod={form}
                            id="rw"
                            placeholder="Masukan RW"
                            isRequired
                        />
                    </div>
                    {/* kode pos */}
                    <FormInput
                        type="text"
                        rules={{
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "Hanya angka yang diperbolehkan",
                            },
                        }}
                        inputMode="numeric"
                        label="Kode Pos"
                        formMethod={form}
                        id="kd_pos"
                        placeholder="Masukan Kode Pos"
                        isRequired
                    />
                    {/* alamat detail */}
                    <div className="md:col-span-2">
                        <FormTextarea formMethod={form} id="alamat" label="Detail Alamat" placeholder="Masukan Alamat" isRequired />
                    </div>
                    <div className="flex items-center justify-end col-span-2">
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                            Kirim
                        </Button>
                    </div>
                </form>
                <div className="flex flex-col items-center justify-center">
                    <MdOutlineDone className="w-44 h-44 text-blue-600" />
                    <p className="text-sm font-medium">Permintaan berhasil dikirim</p>
                </div>
            </div>
        </div>
    )
}

export default CSPage