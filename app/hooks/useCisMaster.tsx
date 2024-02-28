import useSWR from "swr";
import { fetchCisMaster } from "../utilities/Fetcher";

interface UseCisMasterProps {
    page?: number;
    orderBy?: "no_nas" | "nm_nas" | "type";
    direction?: "ascending" | "descending";
}

export const useCisMaster = ({ page, orderBy, direction }: UseCisMasterProps = {}) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/cis?page=${page}&orderby=${orderBy}&direction=${direction}`, fetchCisMaster);
    return { data, error, isLoading, isValidating, mutate };
}