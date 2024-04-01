import useSWR from "swr"
import { fetcher } from "../utilities/Fetcher"
import { convertToSelectItems } from "../utilities/action"
import { IPaginateData } from "../types/parameter"
import { useState } from "react"

export default function useFetchPaginateParameter<T>(parameter: string, QParams?: {}, metaDataConvert?: { keterangan?: string, value?: string }) {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const arrayParam = Object.entries(QParams ?? {})
    const queryParams = arrayParam.map(([key, value]) => `${key}=${value}`).join("&")
    const apiUrl = `/api/parameter/${parameter}?page=${page}${search && `&search=${search}`}${`&${queryParams}` ?? ""}`

    const { data, error, isLoading } = useSWR<IPaginateData<T>>(apiUrl, fetcher);
    const convertedData = data ? convertToSelectItems(data.data, (metaDataConvert?.keterangan ?? "keterangan"), (metaDataConvert?.value ?? "kode")) : []

    return { data, convertedData, error, isLoading, setPage, setSearch, apiUrl };
}