import { useCallback } from "react";

export const useNasabahType = () => {
    const getTypeName = useCallback((tipe: number) => {
        switch (tipe) {
            case 1:
                return "Perorangan";
            case 2:
                return "Perusahaan";
            case 3:
                return "Instansi Pemerintah";
            case 4:
                return "Lembaga non-profit"; // or whatever default value you want
        }
    }, [])
    const getBadgeColor = useCallback((tipe: number) => {
        switch (tipe) {
            case 1:
                return "bg-rose-600";
            case 2:
                return "bg-yellow-600";
            case 3:
                return "bg-blue-600";
            default:
                return "bg-green-600"; // or whatever default value you want
        }
    }, []);
    return { getTypeName, getBadgeColor }
}