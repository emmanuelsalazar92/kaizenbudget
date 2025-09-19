// lib/openapi/setup.ts
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi"
import { z } from "zod"

extendZodWithOpenApi(z) // llámalo una sola vez en tu app
export { z }