// app/api/openapi/route.ts
import { NextResponse } from "next/server"
import { getOpenApiDocument } from "@/lib/openapi/registry"

const runtime = "node" as const

export async function GET() {
  return NextResponse.json(getOpenApiDocument())
}