"use client"

import { Card, CardBody, CardFooter } from "@nextui-org/react"
import { Dispatch, SetStateAction } from "react"
import { FaBuilding, FaHandsHelping, FaUser } from "react-icons/fa"
import { FaBuildingColumns } from "react-icons/fa6"
import { motion } from "framer-motion"

const ChooseNasabah = ({ setFormType }: { setFormType: Dispatch<SetStateAction<TAddFormState>> }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.5
            }}
            className="flex flex-col items-center justify-center w-full h-auto flex-1 gap-3">
            <h2 className="font-medium text-2xl w-full text-center">Pilih tipe nasabah</h2>
            <div className="grid md:grid-cols-4 grid-cols-2 items-center gap-3">
                <Card shadow="md" isPressable isHoverable onPress={() => setFormType("perorangan")} classNames={{
                    base: "dark:bg-slate-800 dark:data-[hover=true]:bg-slate-700 bg-slate-100 data-[hover=true]:bg-slate-200"
                }}>
                    <CardBody className="overflow-visible p-0">
                        <div className="flex items-center justify-items-center h-20 p-3">
                            <FaUser className="h-full w-full text-orange-600" />
                        </div>
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <p className="font-medium">Perorangan</p>
                    </CardFooter>
                </Card>
                <Card shadow="md" isPressable isHoverable onPress={() => setFormType("perusahaan")}
                    classNames={{
                        base: "dark:bg-slate-800 dark:data-[hover=true]:bg-slate-700 bg-slate-100 data-[hover=true]:bg-slate-200"
                    }}>
                    <CardBody className="overflow-visible p-0">
                        <div className="flex items-center justify-items-center h-20 p-3">
                            <FaBuilding className="w-full h-full text-yellow-600" />
                        </div>
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <p className="font-medium">Perusahaan</p>
                    </CardFooter>
                </Card>
                <Card shadow="md" isPressable isHoverable onPress={() => setFormType("pemerintah")}
                    classNames={{
                        base: "dark:bg-slate-800 dark:data-[hover=true]:bg-slate-700 bg-slate-100 data-[hover=true]:bg-slate-200"
                    }}>
                    <CardBody className="overflow-visible p-0">
                        <div className="flex items-center justify-items-center h-20 p-3">
                            <FaBuildingColumns className="w-full h-full text-blue-600" />
                        </div>
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <p className="font-medium">Instansi Pemerintah</p>
                    </CardFooter>
                </Card>
                <Card shadow="md" isPressable isHoverable onPress={() => setFormType("Lembaga non-profit")}
                    classNames={{
                        base: "dark:bg-slate-800 dark:data-[hover=true]:bg-slate-700 bg-slate-100 data-[hover=true]:bg-slate-200"
                    }}>
                    <CardBody className="overflow-visible p-0">
                        <div className="flex items-center justify-items-center h-20 p-3">
                            <FaHandsHelping className="w-full h-full text-green-600" />
                        </div>
                    </CardBody>
                    <CardFooter className="text-small justify-center">
                        <p className="font-medium">Lembaga non-profit</p>
                    </CardFooter>
                </Card>
            </div>
        </motion.div>
    )
}

export default ChooseNasabah