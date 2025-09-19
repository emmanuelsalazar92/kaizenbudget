import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { verifyPassword } from "@/lib/crypto"
import { createSession } from "@/lib/session"
import { LoginSchema } from "@/lib/validators/auth"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = LoginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: z.treeifyError(parsed.error) },
        { status: 400 }
      )
    }

    const { email, password } = parsed.data

    const user = await prisma.users.findUnique({ where: { email } })

    if (!user || !user.is_active) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      )
    }

    const ok = await verifyPassword(user.password_hash, password)

    if (!ok) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      )
    }

    await prisma.users.update(
      { where: { id: user.id }, data: { last_login_at: new Date() } }
    )

    const ua = req.headers.get("user-agent") || undefined
    const ipHeader = req.headers.get("x-forwarded-for") || ""
    const ip = ipHeader.split(",")[0]?.trim() || undefined

    return await createSession(user.id, ua, ip)
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}