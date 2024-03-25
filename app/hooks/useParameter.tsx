import { para_bntk_hkm, para_jns_ident } from "@prisma/client"
import useFetchParameter from "./useFetchParameter"

type TGetJnsIdent = para_jns_ident[] | undefined
type TGetBntkHkm = para_bntk_hkm[] | undefined

const useParameter = () => {
    const { fetchJnsIdent } = useFetchParameter()
    const getJnsIdent = (id?: string | number) => {
        const data: TGetJnsIdent = fetchJnsIdent.data
        return id ? data?.filter((item: para_jns_ident) => item.id === id) : data
    }

    const getBntkHkm = (id?: string | number) => {
        const data: TGetBntkHkm = fetchJnsIdent.data
        return id ? data?.filter((item: para_bntk_hkm) => item.id === id) : data
    }

    return { getJnsIdent, getBntkHkm }
}

export default useParameter