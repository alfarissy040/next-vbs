import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import { IPaginateData } from "../types/parameter";
import { fetcher } from "../utilities/Fetcher";

export default function useFetchPaginateParameter<T>(parameter: string, QParams?: {}) {
    const [search, setSearch] = useState("");
    const arrayParam = Object.entries(QParams ?? {});
    const queryParams = arrayParam.map(([key, value]) => `${key}=${value}`).join("&");

    const getKey = (pageIndex = 0) => {
        return `/api/parameter/${parameter}?page=${pageIndex + 1}${search && `&search=${search}`}${`&${queryParams}` ?? ""}`;
    };
    const { data, error, isLoading, setSize, size } = useSWRInfinite<IPaginateData<T>>(getKey, fetcher, {
        parallel: true,
        refreshInterval: 10000,
    });

    return { data, error, isLoading, setSize, size, setSearch };
}
