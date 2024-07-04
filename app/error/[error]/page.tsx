"use client"

import Forbidden from "@/app/components/error/Forbidden"

interface ForbiddenPage {
    error: string | number
}

const Forbbiden = ({ params }: { params: ForbiddenPage }) => {
  return (
    <Forbidden />
  )
}

export default Forbbiden