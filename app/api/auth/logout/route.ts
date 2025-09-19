import { NextRequest, NextResponse } from "next/server"
import { revokeCurrentSession } from "@/lib/session"

export async function POST(req: NextRequest) {
  try {
    return await revokeCurrentSession(req)
  } catch (err) {
    console.error("Me error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}