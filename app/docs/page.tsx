// app/docs/page.tsx
"use client"
import { useEffect } from "react"

const CSS = "https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
const JS  = "https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"

export default function ApiDocsPage() {
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = CSS
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = JS
    script.onload = () => {
      // @ts-expect-error: expuesto global por el bundle
      window.SwaggerUIBundle({
        url: "/api/openapi",
        dom_id: "#swagger",
        docExpansion: "list",
        defaultModelsExpandDepth: -1,
      })
    }
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
      document.head.removeChild(link)
    }
  }, [])

  return <div className="min-h-screen p-4"><div id="swagger" /></div>
}