import { NextRequest } from "next/server"
import { prisma } from "./db"
import { generateTokenRaw, sha256 } from "./crypto"
import { NextResponse } from "next/server"

const COOKIE = process.env.SESSION_COOKIE_NAME || "kb_session"
const TTL_DAYS = parseInt(process.env.SESSION_TTL_DAYS || "30", 10)

export async function createSession(userId: string, ua?: string, ip?: string) {
  const tokenRaw = generateTokenRaw()
  const tokenHash = sha256(tokenRaw)
  const expires = new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000)

  await prisma.sessions.create({
    data: {
      user_id: userId,
      token_hash: tokenHash,
      user_agent: ua,
      ip_address: ip ?? undefined,
      expires_at: expires,
    },
  })

  const res = NextResponse.json({ ok: true },{ status: 200 })

  res.cookies.set({
    name: COOKIE,
    value: tokenRaw,
    expires,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  })

  return res
}

export async function getSession(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value

  if (!token) return null

  const tokenHash = sha256(token)

  const s = await prisma.sessions.findUnique({
    where: { token_hash: tokenHash },
    include: { users: true },
  })

  if (!s || s.revoked_at || s.expires_at <= new Date()) return null

  return { session: s, user: s.users }
}

export async function revokeCurrentSession(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value
  if (!token)
    return NextResponse.json(
      { ok: true },
      { status: 200 }
    )

  const tokenHash = sha256(token)
  await prisma.sessions.updateMany({
    where: { token_hash: tokenHash, revoked_at: null },
    data: { revoked_at: new Date() },
  })

  const res = NextResponse.json(
    { ok: true },
    { status: 200 }
  )
  
  res.cookies.set(COOKIE, "", { expires: new Date(0), path: "/" }) 
  
  return res
}