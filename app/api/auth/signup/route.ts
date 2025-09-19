import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { hashPassword } from "@/lib/crypto"
import { SignUpSchema } from "@/lib/validators/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = SignUpSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: z.treeifyError(parsed.error) },
        { status: 400 }
      )
    }

    const { email, password, fullName } = parsed.data

    const exists = await prisma.users.findUnique({ where: { email } })

    if (exists) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      )
    }

    const password_hash = await hashPassword(password)
    
    await prisma.users.create(
      {
        data: { email, password_hash, full_name: fullName },
      }
    )

    return NextResponse.json(
      { ok: true },
      { status: 201 }
    )
  } catch (err) {
    console.error("Signup error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}