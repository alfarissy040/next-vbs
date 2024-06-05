import { get, has, toPairs } from "lodash";
import { JWT } from "next-auth/jwt";

export const getFormatedDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

export const convertToSelectItems = (sourceArray?: any[], label: string = "keterangan", value: string = "kode") => {
    const array = Array.isArray(sourceArray) ? sourceArray : [];
    const result = array.map((item) => ({
        label: item[label],
        value: item[value],
    }));
    return result;
};

export const convertToCisUpdate = (currentData: Record<string, any>, newData: Record<string, any>, noNas: string, dbName: string, kd_kantor: string) => {
    return toPairs(newData).reduce((acc: any[], [key, value]) => {
        if (!has(currentData, key)) return acc
        return [
            ...acc,
            {
                no_nas: noNas,
                db_field: dbName,
                nm_field: key,
                current_record: get(currentData, key),
                new_record: value,
                kd_kantor_update: kd_kantor
            }
        ]
    }, []);
}
