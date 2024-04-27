"use client";

import SearchBar from "@/app/components/cis/SearchBar";
import TableContent from "@/app/components/cis/TableContent";
import { useCisMaster } from "@/app/hooks/useCisMaster";
import { flatQueryParams } from "@/app/utilities";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type LTDataProps = {
    [key: string]: string;
};

const InformasiCustomer = () => {
    const queryParams = useSearchParams();
    const [qParams, setQParams] = useState({
        search: queryParams.get("search") ?? "",
        page: queryParams.get("page") ?? 1,
        orderby: queryParams.get("orderby") ?? "no_nas",
        direction: queryParams.get("direction") ?? "asc",
    });
    const { data: dataCis, isLoading, error } = useCisMaster(flatQueryParams(qParams));

    useEffect(() => {
        flatQueryParams(qParams);
    }, [qParams]);

    return (
        <section className="flex flex-col gap-3 flex-1 h-full">
            {/* search bar */}
            <SearchBar setQParams={setQParams} qParams={qParams} />
            {/* content */}
            <TableContent dataCis={dataCis} isLoading={isLoading} isError={error} setQParams={setQParams} qParams={qParams} />
        </section>
    );
};

export default InformasiCustomer;
