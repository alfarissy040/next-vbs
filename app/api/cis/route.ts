import dummyData from "@/dummy/dummyCis.json"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const pageParams = searchParams.get("page")
    const orderByParams = searchParams.get("orderby")
    const directionParams = searchParams.get("direction")
    console.log(pageParams, orderByParams, directionParams)
    return NextResponse.json(dummyData)
}