import { para_bntk_hkm, para_jns_ident } from "@prisma/client"
import useSWR from "swr"
import { fetchParameter } from "../utilities/Fetcher"

const useFetchParameter = () => {
    const fetchJnsIdent = useSWR<para_jns_ident[]>("https://my.api.mockaroo.com/next_vbs__para_jns_ident.json", fetchParameter)
    const fetchBntkHkm = useSWR<para_bntk_hkm[]>("https://my.api.mockaroo.com/next_vbs__para_bntk_hkm.json", fetchParameter)
    return { fetchJnsIdent }

}

export default useFetchParameter