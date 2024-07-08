"use client"

import { Textarea } from "@nextui-org/react"
import { FieldValues, UseFormReturn, useFormContext } from "react-hook-form"

interface FormTextareaProps {
    id: string
    label: string
    placeholder: string
    isRequired?: boolean
    isDisabled?: boolean
    defaultValue?: string
    formMethod: UseFormReturn<FieldValues>
}

const FormTextarea: React.FC<FormTextareaProps> = ({ id, label, placeholder, isRequired = false, isDisabled = false, defaultValue, formMethod }) => {
    const { register, formState: { errors }, getValues } = formMethod
    return (
        <Textarea
            {...register(id, {
                required: {
                    value: isRequired,
                    message: `${label} harus diisi!`
                }
            })}
            classNames={{
                inputWrapper: ["dark:bg-slate-700 dark:group-data-[focus=true]:bg-slate-700 dark:group-data-[hover=true]:bg-slate-600",
                    "bg-slate-200 group-data-[focus=true]:bg-slate-300 group-data-[hover=true]:bg-slate-300"],
                errorMessage: "text-red-400"
            }}
            label={label}
            placeholder={placeholder}
            errorMessage={errors[id]?.message as string}
            defaultValue={getValues(id) ?? defaultValue}
            isRequired={isRequired}
            isDisabled={isDisabled}
        />

    )
}

export default FormTextarea