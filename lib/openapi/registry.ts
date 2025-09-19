// lib/openapi/registry.ts
import {
  OpenAPIRegistry,
  OpenApiGeneratorV31, // o OpenApiGeneratorV3 si prefieres 3.0.x
} from "@asteasolutions/zod-to-openapi"
import {
  SignUpSchema,
  SignUpResponse, 
  SignUpErrorResponse,
  SignUpInvalidPayloadResponse,
  LoginSchema,
  LoginResponse,
  LoginInvalidCredentialsResponse,
  LoginInvalidPayloadResponse,
  MeResponse,
  MeInvalidResponse,
  LogoutResponse
} from "@/lib/validators/auth"

export const registry = new OpenAPIRegistry()

registry.register("SignUpRequest", SignUpSchema)
registry.register("SignUpResponse", SignUpResponse)
registry.register("SignUpErrorResponse", SignUpErrorResponse)
registry.register("SignUpInvalidPayloadResponse", SignUpInvalidPayloadResponse)
registry.register("LoginRequest", LoginSchema)
registry.register("LoginResponse", LoginResponse)
registry.register("LoginInvalidCredentialsResponse", LoginInvalidCredentialsResponse)
registry.register("LoginInvalidPayloadResponse", LoginInvalidPayloadResponse)
registry.register("MeResponse", MeResponse)
registry.register("MeInvalidResponse", MeInvalidResponse)
registry.register("LogoutResponse", LogoutResponse)


// --- Path /api/auth/signup ---
registry.registerPath({
  method: "post",
  path: "/api/auth/signup",
  summary: "Sign up a new user",
  tags: ["Auth"],
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: SignUpSchema } },
    },
  },
  responses: {
    201: {
      description: "Sign up success.",
      content: { "application/json": { schema: SignUpResponse } },
    },
    400: {
      description: "Bad Request",
      content: {"application/json": { schema: SignUpInvalidPayloadResponse }},
    },
    409: {
      description: "Conflict",
      content: { "application/json": { schema: SignUpErrorResponse } }
    },
    500: {
      description: "Internal Server Error",
    },
  },
})

// --- Path /api/auth/login ---
registry.registerPath({
  method: "post",
  path: "/api/auth/login",
  summary: "Login a user",
  tags: ["Auth"],
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: LoginSchema } },
    },
  },
  responses: {
    200: {
      description: "Login success.",
      content: { "application/json": { schema: LoginResponse } },
      headers: {
        "Set-Cookie": {
          description: "HttpOnly session cookie named `kb_session`",
          schema: { type: "string", example: "kb_session=abc123; HttpOnly; Path=/; Secure" },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {"application/json": { schema: LoginInvalidPayloadResponse }},
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: LoginInvalidCredentialsResponse } }
    },
    500: {
      description: "Internal Server Error",
    },
  },
})

// --- Path /api/auth/login ---
registry.registerPath({
  method: "get",
  path: "/api/auth/me",
  summary: "Get the current user",
  tags: ["Auth"],
  parameters: [
    {
      name: "kb_session",
      in: "cookie",
      required: true,
      description: "Session cookie set at login",
      schema: { type: "string", example: "eyJhbGciOi..." },
    },
  ],
  responses: {
    200: {
      description: "User information returned successfully.",
      content: { "application/json": { schema: MeResponse } },
    },
    401: {
      description: "Unauthorized",
      content: { "application/json": { schema: MeInvalidResponse } }
    },
    500: {
      description: "Internal Server Error",
    },
  },
})

// --- Path /api/auth/logout ---
registry.registerPath({
  method: "post",
  path: "/api/auth/logout",
  summary: "Remove the current session",
  tags: ["Auth"],
  parameters: [
    {
      name: "kb_session",
      in: "cookie",
      required: true,
      description: "Session cookie set at login",
      schema: { type: "string", example: "eyJhbGciOi..." },
    },
  ],
  responses: {
    200: {
      description: "Logout successful.",
      content: { "application/json": { schema: LogoutResponse } },
    },
    500: {
      description: "Internal Server Error",
    },
  },
})

// --- Genera el documento OpenAPI ---
export function getOpenApiDocument() {
  const generator = new OpenApiGeneratorV31(registry.definitions) // ó V3
  return generator.generateDocument({
    openapi: "3.1.0",
    info: { title: "Kaizen Budget API", version: "1.0.0" },
    servers: [{ url: process.env.APP_URL || "http://localhost:3000" }],
  })
}