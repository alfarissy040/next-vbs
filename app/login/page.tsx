"use client"

import loginBackground from "@/assets/image/bg-login.jpeg"
import { Button, Spinner } from "@nextui-org/react"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { SiNginx } from "react-icons/si"
import FormInput from "../components/FormInput"


const LoginPage = () => {
    const form = useForm()
    const { handleSubmit } = form
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit: SubmitHandler<FieldValues> = async (credentials) => {
        setIsLoading(true)
        const { username, password } = credentials

        try {
            const login = await signIn("credentials", {
                username,
                password,
                redirect: false
            })
            console.log(login)
            if (login?.status === 200) {
                // route.push("/")
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    return (
        <div className="w-full h-screen flex items-center justify-center lg:p-8 md:p-5 p-0 bg-slate-200 dark:bg-slate-900">
            <div className="w-full max-w-5xl h-full rounded-md shadow-md bg-white dark:bg-slate-800 flex overflow-clip">
                {/* gambar */}
                <div className="h-full md:block hidden">
                    <Image priority={false} src={loginBackground} alt={"Login Image Background"} className="h-full w-auto object-cover" />
                </div>
                {/* login */}
                <div className="flex-1 px-5 py-3 flex flex-col items-center justify-center">
                    {/* logo */}
                    <SiNginx className="text-blue-500 dark:text-secondary w-10 h-10" />
                    <h1 className="font-bold text-3xl text-slate-900 dark:text-white">Neural Bank</h1>
                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-lg mt-10 space-y-3">
                        {/* username */}
                        <FormInput formMethod={form} type="text" id="username" label="Username" isDisabled={isLoading} isRequired />
                        {/* password */}
                        <FormInput formMethod={form} type="password" id="password" label="password" isDisabled={isLoading} isRequired />
                        {/* btn login */}
                        <Button variant="solid" color="primary" className="float-end md:w-auto w-full" type="submit" isDisabled={isLoading} isIconOnly={isLoading}>
                            {isLoading ? <Spinner color="secondary" size="sm" /> : "Login"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage