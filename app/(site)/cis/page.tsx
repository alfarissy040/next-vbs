"use client"

import SearchBar from "@/app/components/cis/SearchBar"
import TableContent from "@/app/components/cis/TableContent"
import { useCisMaster } from "@/app/hooks/useCisMaster"
import { useCallback, useState } from "react"

const InformasiCustomer = () => {
  const [searchParams, setSearchParams] = useState({
    page: 1, orderBy: "no_nas", direction: "ascending", search: ""
  })
  const { data: dataCis, isLoading, error } = useCisMaster({
    page: searchParams.page,
    orderBy: searchParams.orderBy as "no_nas" | "nm_nas" | "type",
    direction: searchParams.direction as "ascending" | "descending"
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
      {/* search bar */}
      <SearchBar doSearch={handleSearch} />
      {/* content */}
      <TableContent dataCis={dataCis} isLoading={isLoading} isError={error} handleSort={handleSort} handleChangePage={handleChangePage} />
    </section>
  )
}

export default InformasiCustomer