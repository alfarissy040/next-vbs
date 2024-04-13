import useSWR from "swr";
import { fetcher } from "../utilities/Fetcher";
import { convertToSelectItems } from "../utilities/action";

export default function useFetchParameter<T>(parameter: string, QParams?: {}, metaDataConvert?: { keterangan?: string; value?: string }) {
    const arrayParam = Object.entries(QParams ?? {});
    const queryParams = arrayParam.map(([key, value]) => `${key}=${value}`).join("&");
    const apiUrl = `/api/parameter/${parameter}?${queryParams ?? ""}`;

    const { data, error, isLoading } = useSWR<T[]>(apiUrl, fetcher, {
        refreshInterval: 10000,
        revalidateOnFocus: false,
    });
    const convertedData = convertToSelectItems(data, metaDataConvert?.keterangan ?? "keterangan", metaDataConvert?.value ?? "kode");

    return { data, convertedData, error, isLoading, apiUrl };
}
