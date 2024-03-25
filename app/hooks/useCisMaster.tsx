import useSWR from "swr";
import { fetchCisMaster } from "../utilities/Fetcher";

interface UseCisMasterProps {
    page?: number;
    orderBy?: "no_nas" | "nm_nas" | "type";
    direction?: "ascending" | "descending";
    search?: string
}

export const useCisMaster = ({ page, orderBy, direction, search }: UseCisMasterProps = {}) => {
    const queryParams = [
        search ? `search=${search}` : '',
        page ? `page=${page}` : '',
        orderBy ? `orderby=${orderBy}` : '',
        direction ? `direction=${direction}` : '',
    ].join('&');
    console.log(queryParams)
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/cis?${queryParams}`, fetchCisMaster);
    return { data, error, isLoading, isValidating, mutate };
}