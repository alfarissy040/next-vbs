"use client";

import { Input } from "@nextui-org/react";
import { FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import { CINputA } from "./ClassnamesData";
import { useMemo } from "react";
import moment from "moment";

interface FormInputProps {
    label: string;
    id: string;
    type: "text" | "search" | "url" | "tel" | "email" | "password" | "date" | "number";
    placeholder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal";
    defaultValue?: string;
    min?: string | number;
    max?: string | number;
    rules?: RegisterOptions<FieldValues, string>;
    prefix?: string;
    formMethod: UseFormReturn<FieldValues>;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, type, placeholder, isRequired = false, inputMode, defaultValue, isDisabled = false, max, min, rules, prefix, formMethod }) => {
    const {
        register,
        getValues,
        formState: { errors },
    } = formMethod;

    const getRules = useMemo(() => {
        const result = rules ?? {};

        // memberikan rules required
        result.required = { value: isRequired, message: `${label} harus diisi` };

        // memberikan rules max
        if (max) {
            if (type === "date") {
                const maxVal = moment(max);
                result.max = {
                    value: maxVal.format("YYYY-MM-DD"),
                    message: `${label} tidak boleh lebih dari tanggal ${maxVal.format("DD MMM YYYY")}`,
                };
            } else {
                result.max = {
                    value: max,
                    message: `${label} tidak boleh lebih dari ${max}`,
                };
            }
        }

        // memberikan rules min
        if (min) {
            result.min = {
                value: min,
                message: `${label} tidak boleh kurang dari ${min}`,
            };
        }

        return result;
    }, [isRequired, label, max, min, rules, type]);

    const getDevaultvalue = useMemo(() => {
        const isExist = defaultValue && getValues(id);
        if (type === "date" && isExist) {
            return moment((defaultValue as string) ?? getValues(id)).format("YYYY-MM-DD");
        }
        return (defaultValue as string) ?? getValues(id);
    }, [defaultValue, getValues, id, type]);
    return (
        <Input
            type={type}
            label={label}
            placeholder={placeholder}
            inputMode={inputMode}
            classNames={CINputA}
            prefix={prefix}
            {...register(id, getRules)}
            errorMessage={(errors[id]?.message as string) ?? ""}
            defaultValue={getDevaultvalue}
            isDisabled={isDisabled}
            isRequired={isRequired}
            min={min ? moment(min).format("YYYY-MM-DD") : ""}
            {...(max && { max: moment(max).format("YYYY-MM-DD") })}
        />
    );
};

export default FormInput;
