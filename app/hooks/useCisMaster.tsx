import useSWR from "swr";
import { fetchCisMaster } from "../utilities/Fetcher";

export const useCisMaster = (queryParams: string) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/cis?${queryParams}`, fetchCisMaster);
    return { data, error, isLoading, isValidating, mutate };
};
