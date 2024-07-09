"use client";

import { IPaginateDataAny, ISelectItem } from "@/app/types/parameter";
import { convertToSelectItems } from "@/app/utilities/action";
import { Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { debounce, has, isEmpty, some } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import { CSelectPopover, CSelectWarpA } from "../ClassnamesData";
import { isEqualCaseInsensitive } from "@/app/utilities/Cis";

interface FormSelectProps {
    label: string;
    id: string;
    placeholder: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    isSearchable?: boolean;
    isLoading?: boolean;
    items?: ISelectItem[];
    paginateItems?: IPaginateDataAny[];
    filteredItems?: ISelectItem[];
    defaultValue?: string | number | null;
    onChange?: (value: any) => void;
    rules?: RegisterOptions<FieldValues, string>;
    formMethod: UseFormReturn<FieldValues>;
    currentPage?: number;
    maxPage?: number;
    handleChangePage?: (page: number) => void;
    handleSearch?: (page: string) => void;
    fetchUrl?: string;
    config?: {
        paginateItems?: {
            label?: string;
            value?: string
        }
    }
}

const FormSelect: React.FC<FormSelectProps> = ({
    id,
    label,
    placeholder,
    items,
    paginateItems,
    defaultValue,
    isRequired = false,
    isDisabled = false,
    isSearchable = false,
    isLoading = false,
    onChange,
    rules,
    formMethod,
    currentPage = 1,
    maxPage = 1,
    handleChangePage,
    handleSearch,
    config
}) => {
    const {
        control,
        getValues,
        setValue,
        formState: { errors },
    } = formMethod;
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState<ISelectItem>({
        label: getValues(`label.${id}`) ?? "",
        value: getValues(id) ?? "",
    });
    const hasMore = currentPage < maxPage;
    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore: () => {
            if (handleChangePage) {
                handleChangePage(currentPage + 1);
            }
        },
    });

    const sanitizedData = useMemo<ISelectItem[]>(() => {
        if (!paginateItems || isEmpty(paginateItems)) return [];
        const items = paginateItems.flatMap((item) => convertToSelectItems(item.data, config?.paginateItems?.label, config?.paginateItems?.value));
        const isExist = some(items, (item) => isEqualCaseInsensitive(item.value, currentValue.value))
        if (!isExist && isEmpty(currentValue.value)) {
            return items
        }

        return [currentValue, ...items]
    }, [config?.paginateItems?.label, config?.paginateItems?.value, currentValue, paginateItems]);


    const searchDebounce = useRef(
        debounce((input: string) => {
            if (handleSearch) {
                handleSearch(input);
            }
        }, 500)
    ).current;

    const onSearch = (input: string) => {
        const isExist = !!sanitizedData.find((item) => isEqualCaseInsensitive(item.label, input))
        if (!isExist) {
            searchDebounce.cancel();
            searchDebounce(input);
        }
    };
    const handleSelectedValue = useCallback((value: string) => {
        const item = sanitizedData.find((item) => isEqualCaseInsensitive(item.value, value))
        if (!isEmpty(item)) {
            setCurrentValue(item)
            setValue(`label.${id}`, item.label);
        }
    }, [id, sanitizedData, setValue])
    return (
        <Controller
            control={control}
            name={id}
            defaultValue={getValues(id) ?? defaultValue}
            rules={{
                required: {
                    value: isRequired,
                    message: `${label} harus diisi!`,
                },
                onChange: useCallback((e: any) => {
                    const value = e.target.value
                    setValue(id, value);
                    handleSelectedValue(value)
                    if (onChange) {
                        onChange(value);
                    }
                    return value;
                }, [handleSelectedValue, id, onChange, setValue]),
                ...rules,
            }}
            render={({ field: { name, onChange, ref, value } }) => {
                return isSearchable ? (
                    <Autocomplete
                        id={id}
                        name={name}
                        ref={ref}
                        label={label}
                        filterOptions={{
                            sensitivity: "base",
                        }}
                        defaultItems={[...sanitizedData ?? []]}
                        errorMessage={(errors[id]?.message as string) ?? ""}
                        placeholder={placeholder}
                        defaultSelectedKey={value}
                        isDisabled={isDisabled}
                        isRequired={isRequired}
                        // onChange={onChange}
                        onSelectionChange={onChange}
                        isLoading={isLoading}
                        scrollRef={scrollerRef}
                        onOpenChange={setIsOpen}
                        onInputChange={onSearch}
                        inputProps={{
                            classNames: {
                                inputWrapper: [
                                    "dark:bg-slate-700 dark:group-data-[focus=true]:bg-slate-700 dark:group-data-[hover=true]:bg-slate-600",
                                    "bg-slate-200 group-data-[focus=true]:bg-slate-300 group-data-[hover=true]:bg-slate-300",
                                ],
                                errorMessage: "text-red-400",
                            },
                        }}
                    >
                        {(item) => (
                            <AutocompleteItem key={item.value ?? item.label} classNames={CSelectPopover} className="capitalize">
                                {item.label.toLowerCase()}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                ) : (
                    <Select
                        name={name}
                        ref={ref}
                        value={value}
                        items={items ?? []}
                        label={label}
                        placeholder={placeholder}
                        classNames={CSelectWarpA}
                        errorMessage={(errors[id]?.message as string) ?? ""}
                        defaultSelectedKeys={value && [value]}
                        isDisabled={isDisabled}
                        isRequired={isRequired}
                        isLoading={isLoading}
                        onChange={onChange}
                    >
                        {(item) => (
                            <SelectItem key={item.value ?? item.label} classNames={CSelectPopover}>
                                {item.label}
                            </SelectItem>
                        )}
                    </Select>
                );
            }}
        />
    );
};

export default FormSelect;
