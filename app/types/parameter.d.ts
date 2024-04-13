type TTipeNasabah = "perorangan" | "perusahaan" | "pemerintahaan" | "Lembaga non-profit";
type TMasterSort = "no_nas" | "nm_nas" | "type";
type TSortDirection = "ascending" | "descending";

export interface IPaginateData<T> {
    data: T[];
    page: number;
    itemPerPage: number;
    totalPage: number;
    total: number;
}

export interface IPaginateDataAny {
    data: any[];
    page: number;
    itemPerPage: number;
    totalPage: number;
    total: number;
}

export interface ICommonParameter {
    kode: int;
    label: string;
}

export interface ISelectItem {
    label: string;
    value?: string | number;
}
