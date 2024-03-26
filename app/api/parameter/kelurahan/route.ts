import dummyData from "@/dummy/para_kelurahan.json"
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { parse } from "path";

const prisma = new PrismaClient();
export async function GET(request: Request) {
    return NextResponse.json(dummyData)
}