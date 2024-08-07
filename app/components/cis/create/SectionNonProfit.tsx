"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { extendCisMaster } from "@prisma/client"
import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form"
import { CDialog } from "../../ClassnamesData"
import FormAlamat from "../form/FormAlamat"
import FormAlamatPengurus from "../form/FormAlamatPengurus"
import FormMaster from "../form/FormMaster"
import FormPengurus from "../form/FormPengurus"
import FormPerusahaan from "../form/FormPerusahaan"

interface SectionNonProfitProps {
    setFormType?: Dispatch<SetStateAction<TAddFormState>>
    onSubmit: SubmitHandler<FieldValues>
    formMethod: UseFormReturn<FieldValues>
    isLoading: boolean
    defaultValue?: extendCisMaster
}

const SectionNonProfit:React.FC<SectionNonProfitProps> = ({ setFormType, onSubmit, isLoading, formMethod, defaultValue }) => {
    const {
        trigger, handleSubmit, getValues, unregister, formState: { errors },
    } = formMethod;
    
    const [step, setStep] = useState(1);
    const [navDirection, setNavDirection] = useState<TNavDirection>("initial");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handlePrevStep = useCallback(() => {
        const prevStep = step !== 1 ? step - 1 : step;
        setStep(prevStep);
        setNavDirection("out");
    }, [step]);
    const handleNextStep = useCallback(() => {
        const nextStep = step < 4 ? step + 1 : step;
        trigger().then((res) => {
            if (res) {
                setNavDirection("in");
                setStep(nextStep);
            }
        });
    }, [step, trigger]);
    const handleReset = useCallback(() => {
        if(setFormType) {
            const allValues = getValues();
            Object.keys(allValues).map((fieldName) => {
                unregister(fieldName);
            });
            
            setFormType("home");
        }
    }, [getValues, setFormType, unregister]);
    return (
        <>
            <FormProvider {...formMethod}>
                <motion.form
                    initial={{ translateY: 100, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 100 }}
                    transition={{
                        type: "spring",
                        duration: 0.5,
                    }}
                    onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 gap-3 overflow-x-clip" noValidate>
                    <AnimatePresence mode="popLayout">
                        {step === 1 && <FormMaster formMethod={formMethod} kdTypeNasabah={4} typeNasabah="Lembaga non-profit" navDirection={navDirection} handleReset={handleReset} />}
                        {step === 2 && <FormPerusahaan formMethod={formMethod} kdTypeNasabah={4} typeNasabah="Lembaga non-profit" navDirection={navDirection} />}
                        {step === 3 && <FormAlamat formMethod={formMethod} kdTypeNasabah={4} typeNasabah="Lembaga non-profit" navDirection={navDirection} />}
                        {step === 4 && <FormPengurus formMethod={formMethod} kdTypeNasabah={4} typeNasabah="Lembaga non-profit" navDirection={navDirection} />}
                        {step === 5 && <FormAlamatPengurus formMethod={formMethod} kdTypeNasabah={4} typeNasabah="Lembaga non-profit" navDirection={navDirection} />}
                    </AnimatePresence>
                    <div className="flex items-center justify-end gap-3">
                        <Button variant="solid" color={step === 1 ? "default" : "primary"} onClick={handlePrevStep} isDisabled={step === 1}>Sebelumnya</Button>
                        {step !== 5 ?
                            (
                                <Button variant="solid" color="primary" onClick={handleNextStep}>Selanjutnya</Button>
                            ) : (
                                <Button variant="solid" color="primary" onPress={onOpen} >Simpan</Button>
                            )
                        }
                    </div>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={CDialog}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Konfirmasi Simpan Data!</ModalHeader>
                                    <ModalBody>
                                        <p>
                                            Apakah Anda yakin ingin menyimpan data ini? Perubahan yang Anda buat akan disimpan dan tidak dapat dibatalkan.
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Batal
                                        </Button>
                                        <Button color="primary" onPress={onClose} onClick={handleSubmit(onSubmit)} type="submit">
                                            Simpan
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </motion.form>
            </FormProvider>
        </>
    )
}

export default SectionNonProfit