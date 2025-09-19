import { z } from "@/lib/openapi/setup"

export const SignUpSchema = z.object({
  email: z.email().toLowerCase().openapi({ description: "The user's email address", example: "user@example.com" }),
  password: z.string().min(16).max(64).openapi({ description: "The user's password", example: "P@ssw0rd12345678" }),
  fullName: z.string().min(1).max(200).openapi({ description: "The user's full name", example: "John Doe" }),
}).openapi("SignUpRequest");

export const SignUpResponse = z.object({
  ok: z.boolean().openapi({ description: "Indicates if the signup was successful", example: true }),
}).openapi("SignUpResponse");

export const SignUpErrorResponse = z.object({
  error: z.string().openapi({ description: "Error message", example: "Email already in use" }),
}).openapi("SignUpErrorResponse");

export const SignUpInvalidPayloadResponse = z.object({
  error: z.literal("Invalid payload").openapi({ description: "Indicates the payload was invalid", example: "Invalid payload" }),
  details: z.any().optional().openapi({ description: "Details about the validation errors" }),
}).openapi("SignUpInvalidPayloadResponse");

export const LoginSchema = z.object({
  email: z.email().toLowerCase().openapi({ description: "The user's email address", example: "user@example.com" }),
  password: z.string().min(16).max(64).openapi({ description: "The user's password", example: "P@ssw0rd12345678" }),
}).openapi("LoginRequest");

export const LoginResponse = z.object({
  ok: z.boolean().openapi({ description: "Indicates if the login was successful", example: true }),
}).openapi("LoginResponse");

export const LoginInvalidCredentialsResponse = z.object({
  error: z.string().openapi({ description: "Error message", example: "Invalid Credentials" }),
}).openapi("LoginInvalidCredentialsResponse");

export const LoginInvalidPayloadResponse = z.object({
  error: z.literal("Invalid payload").openapi({ description: "Indicates the payload was invalid", example: "Invalid payload" }),
  details: z.any().optional().openapi({ description: "Details about the validation errors" }),
}).openapi("LoginInvalidPayloadResponse");

export const MeInvalidResponse = z.object({
  user: z.null().openapi({ description: "No user is authenticated", example: null }),
}).openapi("MeInvalidResponse");

export const MeResponse = z.object({
  user: z.object({
    id: z.uuid().openapi({ description: "The user's unique identifier", example: "123e4567-e89b-12d3-a456-426614174000" }),
    email: z.email().openapi({ description: "The user's email address", example: "user@example.com" }),
    fullName: z.string().min(2).max(200).openapi({ description: "The user's full name", example: "John Doe" }),
  }),
}).openapi("MeResponse");

export const LogoutResponse = z.object({
  ok: z.boolean().openapi({ description: "Indicates if the logout was successful", example: true }),
}).openapi("LogoutResponse");

export type SignUpType = z.infer<typeof SignUpSchema>
export type SignUpResponseType = z.infer<typeof SignUpResponse>
export type SignUpErrorResponseType = z.infer<typeof SignUpErrorResponse>
export type SignUpInvalidPayloadResponseType = z.infer<typeof SignUpInvalidPayloadResponse>
export type LoginType = z.infer<typeof LoginSchema>
export type LoginResponseType = z.infer<typeof LoginResponse>
export type LoginInvalidCredentialsResponseType = z.infer<typeof LoginInvalidCredentialsResponse>
export type LoginInvalidPayloadResponseType = z.infer<typeof LoginInvalidPayloadResponse>
export type MeResponseType = z.infer<typeof MeResponse>
export type MeInvalidResponseType = z.infer<typeof MeInvalidResponse>
export type LogoutResponseType = z.infer<typeof LogoutResponse>
