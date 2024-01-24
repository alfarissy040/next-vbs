"use client"

import { Button, Input } from "@nextui-org/react"
import Image from "next/image"
import loginBackground from "@/assets/image/bg-login.jpeg"


const LoginPage = () => {
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
                    <h1 className="font-bold text-3xl text-slate-900 dark:text-white">VBS</h1>
                    <div className="w-full max-w-lg mt-10 space-y-3">
                        {/* username */}
                        <Input type="text" variant="bordered" label="Username" isRequired />
                        {/* password */}
                        <Input type="password" variant="bordered" label="Password" isRequired />
                        {/* btn login */}
                        <Button variant="solid" color="primary" className="float-end md:w-auto w-full">Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage