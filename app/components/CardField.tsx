"use client"

import clsx from "clsx"

interface CardFieldProps {
    label?: string
    value?: string | number | null
    isTextarea?: boolean
}

const CardField: React.FC<CardFieldProps> = ({ label, value, isTextarea = false }) => {
    return (
        <div className={clsx("py-2 px-3 rounded-xl dark:bg-slate-800 bg-slate-200 flex flex-col gap-0.5 w-full", isTextarea && "min-h-32 h-auto")}>
            <label className="text-xs dark:text-slate-300 text-slate-600">{label}</label>
            <p className="text-sm">{value ?? "-"}</p>
        </div>
    )
}

export default CardField