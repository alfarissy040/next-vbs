"use client"

import moment from "moment"
import { DateTime } from "next-auth/providers/kakao"

interface CardUpdateProps {
    label: string
    newValue: string
    currentValue: string
    created_at: string | Date | DateTime
}

const CardUpdate: React.FC<CardUpdateProps> = ({ created_at, currentValue, label, newValue }) => {
    return (
        <div className="w-full px-3 py-2 rounded-lg shadow-md flex flex-col dark:bg-slate-800">
            {/* nm_field */}
            <div className="flex items-center justify-between">
                <div>
                    <small className="text-slate-400 text-xs leading-none">Keterangan</small>
                    <h3 className="text-lg leading-none">{label}</h3>
                </div>
                <div className="flex flex-col items-end gap-y-1 text-sm dark:text-slate-300 text-slate-400">
                    <p className="leading-none">{moment(created_at).format("HH:mm")}</p>
                    <p className="leading-none">{moment(created_at).format("DD/MM/YYYY")}</p>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center mt-2">
                <p className="flex flex-col text-sm">
                    <small className="text-slate-400 text-xs leading-none">Dari</small>
                    {currentValue}
                </p>
                <p className="flex flex-col text-sm mt-2">
                    <small className="text-slate-400 text-xs leading-none">Ke</small>
                    {newValue}
                </p>
            </div>
        </div>
    )
}

export default CardUpdate