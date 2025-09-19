import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"

export async function GET(req: NextRequest) {
  const s = await getSession(req)
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // s.user.id disponible
  return NextResponse.json({ ok: true })
}