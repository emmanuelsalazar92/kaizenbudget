import { randomBytes, createHash } from "crypto"
import argon2 from "argon2"

export function generateTokenRaw(bytes = 32) {
  return randomBytes(bytes).toString("base64url")
}

export function sha256(input: string) {
  return createHash("sha256").update(input).digest("base64url")
}

export async function hashPassword(pw: string) {
  return argon2.hash(pw, { type: argon2.argon2id })
}

export async function verifyPassword(hash: string, pw: string) {
  return argon2.verify(hash, pw)
}