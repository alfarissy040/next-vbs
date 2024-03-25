import { getCsrfToken } from "next-auth/react"

export const fetchCisMaster = async (url: string) => {
    const csrfToken = await getCsrfToken()

    return await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'csrf': csrfToken ?? "",
        }
    }).then((res) => res.json())
        .catch(() => new Error("Something went wrong"))
}

export const fetchParameter = async (url: string) => {
    return await fetch(url, {
        headers: {
            'X-API-Key': 'a14c6770'
        }
    })
        .then((data) => data.json())
        .catch(() => new Error("Something went wrong"))
}