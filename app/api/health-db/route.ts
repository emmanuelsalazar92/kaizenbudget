import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  // cuenta usuarios como ping
  const n = await prisma.users.count();
  return NextResponse.json({ ok: true, users: n });
}