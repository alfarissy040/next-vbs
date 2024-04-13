import { getCsrfToken } from "next-auth/react";
import { convertToSelectItems } from "./action";

export const fetchCisMaster = async (url: string) => {
    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch(() => new Error("Something went wrong"));
};

export async function postFetcher<T>(url: string, data: T) {
    const csrfToken = await getCsrfToken();

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                csrf: csrfToken ?? "",
            },
            method: "POST",
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export const fetcher = async (url: string) => {
    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch(() => new Error("Something went wrong"));
};
export const parameterFetcher = async (url: string) => {
    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => convertToSelectItems(res))
        .catch(() => new Error("Something went wrong"));
};
