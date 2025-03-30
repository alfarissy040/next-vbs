"use client";

import { usePrefetchNavigate } from "@/app/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdSearch } from "react-icons/md";

interface SearchBarProps {
    qParams: { search: string; page: string | number; orderby: string; direction: string };
    setQParams: Dispatch<SetStateAction<{ search: string; page: string | number; orderby: string; direction: string }>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ qParams, setQParams }) => {
    const [searchInput, setSearchInput] = useState(qParams.search);
    const navigateTo = usePrefetchNavigate();

    const searchDebounce = useRef(
        debounce((searchValue: string) => {
            setQParams((prevQParams) => ({
                ...prevQParams,
                search: searchValue,
            }));
        }, 500)
    );

    useEffect(() => {
        const debounceInstance = searchDebounce.current;
        return () => {
            debounceInstance?.cancel();
        };
    }, [searchDebounce]);

    const handleSearch = useCallback(
        (value: string) => {
            searchDebounce.current.cancel();
            setSearchInput(value);
            searchDebounce.current(value);
        },
        [searchDebounce]
    );

    return (
        <div className="flex items-center sm:gap-2 gap-1">
            <div className="relative flex items-center justify-center w-full">
                <MdSearch className="w-5 h-5 dark:text-slate-400 text-slate-600 absolute inset-0 my-auto mx-2 pointer-events-none" />
                <Input onChange={(e) => handleSearch(e.target.value)} className="text-background dark:text-foreground pl-9" placeholder="Cari Nomor nasabah, Nama atau Nomor Identitas" />
            </div>
            {/* btn add */}
            <Button className="hidden md:grid md:grid-flow-col text-foreground" variant={"default"} asChild>
                <Link href={"/cis/informasi-nasabah/create-nasabah"}>Nasabah baru</Link>
            </Button>
            {/* btn add icon only */}
            <Button className="flex md:hidden" size={"icon"} variant={"default"} onClick={() => navigateTo("/cis/informasi-nasabah/create-nasabah")} asChild>
                <Link href={"/cis/informasi-nasabah/create-nasabah"}>
                    <FaPlus className="w-4 h-4 text-white" />
                </Link>
            </Button>
        </div>
    );
};

export default SearchBar;
