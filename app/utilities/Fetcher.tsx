import { getCsrfToken } from "next-auth/react";
import { convertToSelectItems } from "./action";
import { TCommonApiError } from "../types";

export const fetchCisMaster = async (url: string) => {
    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .catch(() => {
            throw new Error("Something went wrong")
        });
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
        cache: "force-cache",
        next: {
            revalidate: 900, // 15 menit
            tags: [url],
        },
    })
        .then((res) => res.json())
        .catch(() => {
            throw new Error("Something went wrong")
        });
};

export const fetcherNoCache = async (url: string) => {
    try {
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        })
        const result = await res.json()

        if (!res.ok) {
            throw ({
                status: res.status,
                message: result.message
            })
        }
        return result
    } catch (err) {
        const error = err as TCommonApiError
        throw ({
            status: error.status,
            message: error.message
        })
    }
};

export const parameterFetcher = async (url: string) => {
    return await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: {
            revalidate: 3600,
            tags: [url],
        }
    })
        .then((res) => res.json())
        .catch(() => {
            throw new Error("Something went wrong")
        });
};
