import dummyData from "@/dummy/dummyCis.json"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    return NextResponse.json(dummyData)
}