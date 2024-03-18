"use client"

import { Button, Input } from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { MdSearch } from "react-icons/md"

interface SearchBarProps {
    doSearch: (input: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ doSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = useCallback(() => {
        doSearch(searchValue)
    }, [doSearch, searchValue])
    return (
        <div className="flex items-center sm:gap-3 gap-2">
            <Input
                size="sm"
                placeholder="Cari Nomor nasabah, Nama atau Nomor Identitas"
                isClearable
                fullWidth
                onValueChange={handleSearch}
                value={searchValue}
                onClear={() => setSearchValue("")}
                startContent={
                    <MdSearch className="w-5 h-5 dark:text-slate-400 text-slate-500" />
                }
                classNames={{
                    inputWrapper: [
                        "dark:bg-slate-800", "dark:group-data-[focus=true]:bg-slate-800", "dark:group-data-[hover=true]:bg-slate-700",
                        "bg-slate-200", "group-data-[focus=true]:bg-slate-200", "group-data-[hover=true]:bg-slate-300"
                    ],
                }}
            />
            <Link href={"/cis/create-nasabah"}>
                {/* btn add */}
                <Button
                    className="hidden md:grid md:grid-flow-col"
                    size="lg"
                    color="primary"
                    radius="sm"
                    endContent={<FaPlus className="w-4 h-4 text-white" />}
                >
                    Nasabah baru
                </Button>
                {/* btn add icon only */}
                <Button
                    className="flex md:hidden"
                    size="lg"
                    color="primary"
                    radius="sm"
                    isIconOnly
                >
                    <FaPlus className="w-4 h-4 text-white" />
                </Button>
            </Link>

        </div>
    )
}

export default SearchBar