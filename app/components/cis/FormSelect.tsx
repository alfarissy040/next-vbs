"use client";

import { IPaginateDataAny, ISelectItem } from "@/app/types/parameter";
import { convertToSelectItems } from "@/app/utilities/action";
import { Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { debounce } from "lodash";
import { useMemo, useState } from "react";
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
    defaultValue?: string;
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
        formState: { errors },
    } = formMethod;
    const [isOpen, setIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const hasMore = currentPage < maxPage;
    const [, scrollerRef] = useInfiniteScroll({
        hasMore,
        isEnabled: isOpen,
        shouldUseLoader: false,
        onLoadMore: () => {
            if (handleChangePage) {
                const newPage = currentPage + 1;
                handleChangePage(newPage);
            }
        },
    });

    const sanitizedData = useMemo<ISelectItem[]>(() => {
        if (paginateItems) {
            return paginateItems.flatMap((item) => convertToSelectItems(item.data));
        }

        return [];
    }, [paginateItems]);

    const debounceSearch = debounce((input: string) => {
        if (handleSearch) {
            console.log(`doSearch : ${input}`);
            handleSearch(input);
        }
    }, 510);

    const onSearch = (input: string) => {
        debounceSearch.cancel();
        console.log(`setSearch : ${input}`);
        setSearchInput(input);
        debounceSearch(input);
    }; // FIXME fix debounce untuk search item

    // useEffect(() => {
    //     const shouldUpdateData = lastFetchUrl.trim() !== fetchUrl.trim() || data.length === 0 || lastPage !== currentPage;
    //     const shouldFilterItems = searchInput.trim() == "";
    //     if (shouldFilterItems) {
    //         if (shouldUpdateData) {
    //             const combinedData = [...data, ...items];
    //             setData(combinedData);
    //             setLastPage(currentPage);
    //             setLastFetchUrl(fetchUrl);
    //         }
    //     } else {
    //         setFilteredItems(data);
    //     }
    // }, [fetchUrl, items, searchInput]);

    return (
        <Controller
            control={control}
            name={id}
            defaultValue={getValues(id)}
            rules={{
                required: {
                    value: isRequired,
                    message: `${label} harus diisi!`,
                },
                onChange: (e: any) => onChange && onChange(e.target.value),
                ...rules,
            }}
            render={({ field: { name, onChange, ref, value } }) => {
                return isSearchable ? (
                    <Autocomplete
                        name={name}
                        ref={ref}
                        value={value}
                        label={label}
                        filterOptions={{
                            sensitivity: "base",
                        }}
                        defaultItems={sanitizedData}
                        errorMessage={(errors[id]?.message as string) ?? ""}
                        placeholder={placeholder}
                        defaultSelectedKey={value ?? ""}
                        isDisabled={isDisabled}
                        isRequired={isRequired}
                        onChange={onChange}
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
                            <SelectItem key={item.value ?? item.label} classNames={CSelectPopover} className="capitalize">
                                {item.label.toLowerCase()}
                            </SelectItem>
                        )}
                    </Select>
                );
            }}
        />
    );
};

export default FormSelect;
