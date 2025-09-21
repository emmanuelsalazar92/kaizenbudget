import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"

export async function GET(req: NextRequest) {
  try {
    const s = await getSession(req)
    
    if (!s)
      return NextResponse.json(
        { user: null },
        { status: 401 })
    
    const { user } = s
    
    return NextResponse.json(
      { user: { id: user.id, email: user.email, fullName: user.full_name } },
      { status: 200 }
    )
  } catch (err) {
    console.error("Me error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}