"use client"

import { Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react"
import { CSelectPopover, CSelectWarp } from "../ClassnamesData"
import { Controller, FieldValues, RegisterOptions, UseFormReturn, useFormContext } from "react-hook-form"

interface FormSelectProps {
    label: string
    id: string
    placeholder: string
    isRequired?: boolean
    isDisabled?: boolean
    isSearchable?: boolean
    isLoading?: boolean
    items: { label: string, value: string | number | undefined }[]
    defaultValue?: string
    onChange?: (e: any) => void
    rules?: RegisterOptions<FieldValues, string>
    formMethod: UseFormReturn<FieldValues>
}

const FormSelect: React.FC<FormSelectProps> = ({ id, label, placeholder, items, defaultValue, isRequired = false, isDisabled = false, isSearchable = false, isLoading = false, onChange, rules, formMethod }) => {
    const { control, getValues, formState: { errors } } = formMethod
    return (
        <Controller
            control={control}
            name={id}
            defaultValue={getValues(id)}
            rules={{
                required: {
                    value: isRequired,
                    message: `${label} harus diisi!`
                },
                onChange: onChange,
                ...rules
            }}
            render={({ field: { name, onChange, ref, value } }) => {
                return isSearchable ?
                    <Autocomplete
                        name={name}
                        ref={ref}
                        value={value}
                        label={label}
                        defaultItems={items ?? []}
                        errorMessage={errors[id]?.message as string ?? ""}
                        placeholder={placeholder}
                        defaultSelectedKey={value ?? ""}
                        isDisabled={isDisabled}
                        isRequired={isRequired}
                        onChange={onChange}
                        isLoading={isLoading}
                        inputProps={{
                            classNames: {
                                inputWrapper: ["dark:bg-slate-700 dark:group-data-[focus=true]:bg-slate-700 dark:group-data-[hover=true]:bg-slate-600",
                                    "bg-slate-200 group-data-[focus=true]:bg-slate-300 group-data-[hover=true]:bg-slate-300"],
                                errorMessage: "text-red-400"
                            }
                        }}
                    >
                        {(item) => <AutocompleteItem key={item.value ?? item.label} classNames={CSelectPopover}>{item.label}</AutocompleteItem>}
                    </Autocomplete> : <Select
                        name={name}
                        ref={ref}
                        value={value}
                        items={items ?? []}
                        label={label}
                        placeholder={placeholder}
                        classNames={CSelectWarp}
                        errorMessage={errors[id]?.message as string ?? ""}
                        defaultSelectedKeys={value && [value]}
                        isDisabled={isDisabled}
                        isRequired={isRequired}
                        isLoading={isLoading}
                        onChange={onChange}
                    >
                        {(item) => <SelectItem key={item.value ?? item.label}
                            classNames={CSelectPopover}
                        >{item.label}</SelectItem>}
                    </Select>
            }}
        />
    )
}

export default FormSelect