"use client";

import { usePrefetchNavigate } from "@/app/utilities";
import { Button, Input } from "@nextui-org/react";
import { useCallback, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { MdSearch } from "react-icons/md";

interface SearchBarProps {
    doSearch: (input: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ doSearch }) => {
    const RefInputSearch = useRef<HTMLInputElement>(null);
    const navigateTo = usePrefetchNavigate();

    const handleSearch = (searchValue: string) => {
        doSearch(searchValue);
    };
    const handleClearValue = useCallback(() => {
        if (RefInputSearch.current) {
            RefInputSearch.current.value = "";
        }
    }, []);
    return (
        <div className="flex items-center sm:gap-2 gap-1">
            <Input
                ref={RefInputSearch}
                size="sm"
                placeholder="Cari Nomor nasabah, Nama atau Nomor Identitas"
                isClearable
                fullWidth
                onValueChange={handleSearch}
                onClear={handleClearValue}
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
