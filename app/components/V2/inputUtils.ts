import { FieldValues, RegisterOptions } from "react-hook-form";

interface getFormRulesProps {
    isRequired?: boolean;
    min?: string | number;
    max?: string | number;
    minLength?: number;
    maxLength?: number;
}

export const getFormRules = ({ isRequired = false, min, max, minLength, maxLength }: getFormRulesProps): RegisterOptions<FieldValues, string> => {
    const inputRules: RegisterOptions<FieldValues, string> = {
        required: {
            value: isRequired,
            message: "This field is required",
        },
    };

    if (min) {
        inputRules.min = {
            value: min,
            message: `Minimum value is ${min}`,
        };
    }

    if (max) {
        inputRules.max = {
            value: max,
            message: `Maximum value is ${max}`,
        };
    }

    if (minLength) {
        inputRules.minLength = {
            value: minLength,
            message: `Minimum length is ${minLength}`,
        };
    }

    if (maxLength) {
        inputRules.maxLength = {
            value: maxLength,
            message: `Maximum length is ${maxLength}`,
        };
    }

    return inputRules;
};
