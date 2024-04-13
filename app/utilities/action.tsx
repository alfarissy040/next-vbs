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
