"use client"

import { Input } from "@nextui-org/react"
import { FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form"
import { CINputA } from "./ClassnamesData"

interface FormInputProps {
    label: string
    id: string
    type: 'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | "date" | "number"
    placeholder?: string
    isRequired?: boolean
    isDisabled?: boolean
    inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal"
    defaultValue?: string
    max?: string | number
    rules?: RegisterOptions<FieldValues, string>
    prefix?: string
    formMethod: UseFormReturn<FieldValues>
}

const FormInput: React.FC<FormInputProps> = ({ id, label, type, placeholder, isRequired = false, inputMode, defaultValue, isDisabled = false, max, rules, prefix, formMethod }) => {
    const { register, getValues, formState: { errors } } = formMethod
    return (
        <Input
            type={type}
            label={label}
            placeholder={placeholder}
            inputMode={inputMode}
            classNames={CINputA}
            prefix={prefix}
            {...register(id, {
                required: { value: isRequired, message: `${label} harus diisi` },
                ...rules
            }
            )}
            errorMessage={errors[id]?.message as string ?? ""}
            defaultValue={defaultValue as string ?? getValues(id)}
            isDisabled={isDisabled}
            isRequired={isRequired}
            max={max} />
    )
}

export default FormInput