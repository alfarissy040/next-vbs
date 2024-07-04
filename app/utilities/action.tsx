import { get, has, isEmpty, toPairs } from "lodash";
import moment from "moment";
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

const convertToString = (value: string | number | Date | boolean | unknown): string => {
    if (typeof value === "undefined") {
        return "";
    }
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number") {
        return value.toString();
    }
    if (value instanceof Date) {
        return moment(value).format("YYYY-MM-DD");
    }
    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }
    return JSON.stringify(value);
};

export const convertToCisUpdate = (currentData: Record<string, any>, newData: Record<string, any>, noNas: string, dbName: string, kd_kantor: string, usrid_create: string) => {
    if(isEmpty(currentData) || isEmpty(newData)) return [];
    return toPairs(newData).reduce((acc: any[], [key, value]) => {
        if (!has(currentData, key)) return acc
        return [
            ...acc,
            {
                no_nas: noNas,
                db_field: dbName,
                nm_field: key,
                current_record: convertToString(get(currentData, key)),
                new_record: convertToString(value),
                kd_kantor_update: kd_kantor,
                usrid_create: usrid_create
            }
        ]
    }, []);
}
