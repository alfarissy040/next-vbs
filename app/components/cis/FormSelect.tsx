"use client";

import { IPaginateDataAny, ISelectItem } from "@/app/types/parameter";
import { convertToSelectItems } from "@/app/utilities/action";
import { Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { debounce } from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, FieldValues, RegisterOptions, UseFormReturn } from "react-hook-form";
import { CSelectPopover, CSelectWarpA } from "../ClassnamesData";

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
    defaultValue?: string | null | number;
    onChange?: (value: any) => void;
    rules?: RegisterOptions<FieldValues, string>;
    formMethod: UseFormReturn<FieldValues>;
    currentPage?: number;
    maxPage?: number;
    handleChangePage?: (page: number) => void;
    handleSearch?: (page: string) => void;
    fetchUrl?: string;
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
}) => {
    const {
        control,
        getValues,
        setValue,
        formState: { errors },
    } = formMethod;
    const [isOpen, setIsOpen] = useState(false);
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
        if (paginateItems) {
            return paginateItems.flatMap((item) => convertToSelectItems(item.data));
        }
        return [];
    }, [paginateItems]);

    const searchDebounce = useRef(
        debounce((input: string) => {
            if (handleSearch) {
                handleSearch(input);
            }
        }, 510)
    ).current;

    const onSearch = (input: string) => {
        const lowerInput = input.toLowerCase().trim();
        const isExist = [...items ?? []].some((val) => val.label.toLowerCase().trim() === lowerInput);
        if (!isExist) {
            searchDebounce.cancel();
            searchDebounce(input);
        }
    };

    return (
        <Controller
            control={control}
            name={id}
            defaultValue={getValues(id) ?? defaultValue as string}
            rules={{
                required: {
                    value: isRequired,
                    message: `${label} harus diisi!`,
                },
                onChange: (e: any) => {
                    setValue(id, e.target.value);
                    if (onChange) {
                        onChange(e.target.value);
                    }
                    return e.target.value;
                },
                ...rules,
            }}
            render={({ field: { name, onChange, ref, value } }) => {
                return isSearchable ? (
                    <Autocomplete
                        id={id}
                        name={name}
                        ref={ref}
                        value={value}
                        label={label}
                        filterOptions={{
                            sensitivity: "base",
                        }}
                        defaultItems={[...items ?? []]}
                        errorMessage={(errors[id]?.message as string) ?? ""}
                        placeholder={placeholder}
                        defaultSelectedKey={value ?? ""}
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
