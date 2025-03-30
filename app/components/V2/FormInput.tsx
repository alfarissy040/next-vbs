import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { getFormRules } from "./inputUtils";

interface FormInputProps {
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    desctiption?: string;
    type?: React.HTMLInputTypeAttribute;
    inputMode?: "text" | "search" | "email" | "tel" | "url" | "none" | "numeric" | "decimal";
    rules?: RegisterOptions<FieldValues, string>;
    defaultValue?: string | number | Date | null;
    min?: string | number;
    max?: string | number;
    minLength?: number;
    maxLength?: number;
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ id, name, label, placeholder, desctiption, min, max, minLength, maxLength, type = "text", inputMode = "text", isRequired = false, isDisabled = false, isReadOnly = false }) => {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={name}
            rules={getFormRules({ isRequired, min, max, minLength, maxLength })}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type} inputMode={inputMode} placeholder={placeholder} disabled={isDisabled} readOnly={isReadOnly} min={min} max={max} {...field} />
                    </FormControl>
                    <FormDescription>{desctiption}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormInput;
