"use client"
import { Spinner } from "@nextui-org/react"

const loading = () => {
    return (
        <section className="w-full h-full flex items-center justify-center">
            <Spinner size="lg" />
        </section>
    )
}

export default loading