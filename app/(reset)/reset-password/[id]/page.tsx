"use client"

import FormInput from '@/app/components/FormInput'
import MainLoading from '@/app/components/MainLoading'
import { TCommonApiError } from '@/app/types'
import { usePrefetchNavigate } from '@/app/utilities'
import { fetcherNoCache } from '@/app/utilities/Fetcher'
import { Button, Spinner } from '@nextui-org/react'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { SiNginx } from 'react-icons/si'
import useSWR from 'swr'

interface IParamSlug {
    id: string
}

const ResetPasswordPage = ({ params }: { params: IParamSlug }) => {
    const { id: token } = params
    const [isLoading, setIsLoading] = useState(false)
    const formMethod = useForm()
    const navigateTo = usePrefetchNavigate()
    const { handleSubmit, watch } = formMethod

    const { data: validToken, error: isValid, isLoading: isLoadingToken } = useSWR(`/api/reset-password?token=${token}`, fetcherNoCache)
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        const toastLoading = toast.loading('Sedang memproses...')

        try {
            const response = await fetch(`/api/reset-password?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()

            if (!response.ok) {
                throw ({
                    status: response.status,
                    message: result.message
                })
            }

            toast.success("Berhasil mereset password")
            navigateTo("/login")
        } catch (error) {
            const errorMessage = error as TCommonApiError
            toast.error(errorMessage.message)
        } finally {
            setIsLoading(false)
            toast.dismiss(toastLoading)
        }
    }

    return (
        <>
            {isLoadingToken && (
                <div className="w-full h-dvh bg-white dark:bg-slate-900">
                    <MainLoading />
                </div>)}
            {!isLoadingToken && (
                <div className="w-full h-screen flex items-center justify-center lg:p-8 md:p-5 p-0 bg-slate-200 dark:bg-slate-900">
                    <div className="w-full max-w-5xl h-full rounded-md shadow-md bg-white dark:bg-slate-800 flex overflow-clip">
                        {/* login */}
                        <div className="flex-1 px-5 py-3 flex flex-col items-center justify-center">
                            {/* logo */}
                            <SiNginx className="text-blue-500 dark:text-secondary w-10 h-10" />
                            <h1 className="font-bold text-3xl text-slate-900 dark:text-white">Neural Bank</h1>
                            {/* form */}
                            {!isEmpty(isValid) && (
                                <div className="px-3 py-2 rounded shadow bg-red-600 text-white h-24 w-1/2 flex items-center justify-center mt-4">
                                    {isValid.message}
                                </div>
                            )}
                            {isEmpty(isValid) && (
                                <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-lg mt-10 space-y-3">
                                    {/* password */}
                                    <FormInput formMethod={formMethod} type="password" id="password" label="New Password" isDisabled={isLoading} isRequired />
                                    {/* confirm password */}
                                    <FormInput
                                        formMethod={formMethod}
                                        type="password"
                                        id="confirm_password"
                                        label="Confirm Password"
                                        rules={{
                                            validate: (val: string) => {
                                                if (watch('password') != val) {
                                                    return "Password tidak sama";
                                                }
                                            }
                                        }}
                                        isDisabled={isLoading} isRequired />
                                    {/* btn login */}
                                    <Button variant="solid" color="primary" className="float-end md:w-auto w-full" type="submit" isDisabled={isLoading} isIconOnly={isLoading}>
                                        {isLoading ? <Spinner color="secondary" size="sm" /> : "Simpan"}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ResetPasswordPage