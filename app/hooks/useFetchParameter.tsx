import useSWR from "swr";
import { parameterFetcher } from "../utilities/Fetcher";
import { convertToSelectItems } from "../utilities/action";

type ParameterFetchProps<T> = {
    parameter: string;
    queryParams?: Record<string, any>;
    metaDataConvert?: { keterangan?: string; value?: string };
    initialData?: any[];
    refreshInterval?: number;
    revalidateOnFocus?: boolean;
    fallbackData?: any[];
};

export default function useFetchParameter<T>({
    parameter,
    queryParams = {},
    metaDataConvert = {},
    initialData = [],
    refreshInterval = 30000,
    revalidateOnFocus = false,
    fallbackData = initialData,
}: ParameterFetchProps<T>) {
    const apiUrl = `/api/parameter/${parameter}?${new URLSearchParams(queryParams).toString()}`;

    const { data, error, isLoading } = useSWR<T[]>(apiUrl, parameterFetcher, {
        refreshInterval,
        revalidateOnFocus,
        fallbackData,
    });

    const convertedData = data
        ? convertToSelectItems(data, metaDataConvert.keterangan ?? "keterangan", metaDataConvert.value ?? "kode")
        : [];

    return { data, convertedData, error, isLoading, apiUrl };
}

