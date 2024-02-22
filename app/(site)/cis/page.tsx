"use client"

import SearchBar from "@/app/components/cis/SearchBar"
import TableContent from "@/app/components/cis/TableContent"
import { fetchCisMaster } from "@/app/utilities/Fetcher"
import { useCallback } from "react"
import useSWR from "swr"

const InformasiCustomer = () => {
  const { data: dataCis, error, isLoading } = useSWR("/api/cis", fetchCisMaster)

  const handleSearch = useCallback((inputData: string) => {
    console.log(inputData)
  }, [])

  return (
    <section className="w-full h-full flex flex-col gap-3">
      {/* search bar */}
      <SearchBar doSearch={handleSearch} />
      {/* content */}
      <TableContent dataCis={dataCis ?? []} isLoading={isLoading} isError={error} />
    </section>
  )
}

export default InformasiCustomer