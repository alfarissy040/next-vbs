"use client"

import SearchBar from "@/app/components/cis/SearchBar"
import TableContent from "@/app/components/cis/TableContent"
import { useCisMaster } from "@/app/hooks/useCisMaster"
import { useCallback, useState } from "react"

const InformasiCustomer = () => {
  const [searchParams, setSearchParams] = useState({
    page: 1, orderBy: "no_nas", direction: "ascending", search: ""
  })
  const { data, isLoading, error } = useCisMaster({
    page: searchParams.page,
    orderBy: searchParams.orderBy as "no_nas" | "nm_nas" | "type",
    direction: searchParams.direction as "ascending" | "descending",
    search: searchParams.search
  })


  const handleSearch = useCallback((inputData: string) => {
    setSearchParams({
      ...searchParams,
      search: inputData
    })
  }, [searchParams])
  const handleSort = useCallback((orderBy: TMasterSort, direction: TSortDirection) => {
    setSearchParams({
      ...searchParams,
      orderBy: orderBy as TMasterSort,
      direction: direction as TSortDirection
    })
  }, [searchParams])
  const handleChangePage = useCallback((page: number) => {
    setSearchParams({
      ...searchParams,
      page: page
    })
  }, [searchParams])

  return (
    <section className="flex flex-col gap-3 flex-1 h-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold">Informasi Customer</h1>
      </div>
      {/* search bar */}
      <SearchBar doSearch={handleSearch} />
      {/* content */}
      <TableContent dataCis={data} isLoading={isLoading} isError={error} handleSort={handleSort} handleChangePage={handleChangePage} />
    </section>
  )
}

export default InformasiCustomer