"use client";

import { Input } from "@nextui-org/react";
import moment from "moment";
import { useMemo } from "react";
import { FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import { convertToDate, convertToNumber, convertToString } from "../utilities/Cis";
import { CINputA } from "./ClassnamesData";
import { isEmpty, isNull, isUndefined } from "lodash";

interface FormInputProps {
    label: string;
    id: string;
    type: "text" | "search" | "url" | "tel" | "email" | "password" | "date" | "number";
    placeholder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal";
    defaultValue?: string | number | Date | null;
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
            if (type === "date") {
                const minVal = moment(min);
                result.min = {
                    value: minVal.format("YYYY-MM-DD"),
                    message: `${label} tidak boleh Kurang dari tanggal ${minVal.format("DD MMM YYYY")}`,
                };
            } else {
                result.min = {
                    value: min,
                    message: `${label} tidak boleh kurang dari ${min}`,
                };
            }
        }

        if (type === "number") {
            result.pattern = {
                value: /^[0-9]*$/,
                message: `${label} harus berupa angka`,
            }
        }

        return result;
    }, [isRequired, label, max, min, rules, type]);

    const getDefaultvalue = useMemo(() => {
        const values = isUndefined(defaultValue) ? getValues(id) : defaultValue;
        if (type === "date") {
            const res = convertToDate(values, "YYYY-MM-DD")
            return isEmpty(res) ? undefined : res;
        }
        if (type === "number") {
            return convertToString(values) ?? "0";
        }
        return convertToString(values);
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
            defaultValue={getDefaultvalue}
            isDisabled={isDisabled}
            isRequired={isRequired}
            min={min ? moment(min).format("YYYY-MM-DD") : ""}
            {...(max && { max: moment(max).format("YYYY-MM-DD") })}
        />
    );
};

export default FormInput;
