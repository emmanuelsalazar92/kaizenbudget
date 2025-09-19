import { z } from "zod"

export const Email = z.email().transform(s => s.trim().toLowerCase())
export const UUID = z.uuid()

// validators/common.ts
export const InvalidPayloadResponse = z.object({
  error: z.literal("Invalid payload"),
  fieldErrors: z.record(z.string(), z.array(z.string())).default({}),
  formErrors: z.array(z.string()).default([]),
}).openapi("InvalidPayloadResponse")