import { useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { IPaginateData, ISelectItem } from "../types/parameter";
import { fetcher } from "../utilities/Fetcher";
import { convertToSelectItems } from "../utilities/action";

export type UseFetchPaginateParameterProps<T> = {
    parameter: string;
    queryParams?: Record<string, any>;
    initialSize?: number;
    refreshInterval?: number;
    revalidateOnFocus?: boolean;
    initialData?: any;
    option?: {
        keterangan?: string;
        value?: string;
        keepPreviousData?: boolean;
    }
};

export default function useFetchPaginateParameter<T>(props: UseFetchPaginateParameterProps<T>) {
    const { parameter, queryParams = {}, initialSize = 1, refreshInterval = 30000, revalidateOnFocus = false, initialData = [], option = { keepPreviousData: true, value: "value", keterangan: "keterangan" } } = props;
    const [search, setSearch] = useState("");
    const arrayParam = Object.entries(queryParams);
    const queryParamsString = arrayParam.map(([key, value]) => `${key}=${value}`).join("&");

    const getKey = (pageIndex: number) => {
        return `/api/parameter/${parameter}?page=${pageIndex + 1}${search ? `&search=${search}` : ""}${queryParamsString ? `&${queryParamsString}` : ""}`;
    };

    const { data, error, isLoading, setSize, size } = useSWRInfinite<IPaginateData<T>>(getKey, fetcher, {
        initialSize,
        refreshInterval,
        revalidateOnFocus,
        keepPreviousData: option?.keepPreviousData,
        fallbackData: initialData,
    });

    const sanitizedData = useMemo<ISelectItem[]>(() => {
        if (data) {
            return data.flatMap((item) => convertToSelectItems(item.data, (option?.keterangan ?? "keterangan"), (option?.value ?? "kode")));
        }
        return [];
    }, [data, option?.keterangan, option?.value]);

    return { data, sanitizedData, error, isLoading, setSize, size, setSearch };
}


