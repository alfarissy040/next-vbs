"use client";

import { usePrefetchNavigate } from "@/app/utilities";
import { Button, Input } from "@nextui-org/react";
import { debounce } from "lodash";
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
        return () => {
            searchDebounce.current.cancel();
        };
    }, []);

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
            <Input
                size="sm"
                placeholder="Cari Nomor nasabah, Nama atau Nomor Identitas"
                isClearable
                fullWidth
                onValueChange={handleSearch}
                onClear={() => handleSearch("")}
                value={searchInput}
                startContent={<MdSearch className="w-5 h-5 dark:text-slate-400 text-slate-500" />}
                classNames={{
                    inputWrapper: [
                        "dark:bg-slate-800",
                        "dark:group-data-[focus=true]:bg-slate-800",
                        "dark:group-data-[hover=true]:bg-slate-700",
                        "bg-slate-200",
                        "group-data-[focus=true]:bg-slate-200",
                        "group-data-[hover=true]:bg-slate-300",
                    ],
                }}
            />
            {/* btn add */}
            <Button className="hidden md:grid md:grid-flow-col" size="lg" color="primary" radius="sm" onPress={() => navigateTo("/cis/create-nasabah")} endContent={<FaPlus className="w-4 h-4 text-white" />}>
                Nasabah baru
            </Button>
            {/* btn add icon only */}
            <Button className="flex md:hidden" size="lg" color="primary" radius="sm" onPress={() => navigateTo("/cis/create-nasabah")} isIconOnly>
                <FaPlus className="w-4 h-4 text-white" />
            </Button>
        </div>
    );
};

export default SearchBar;
