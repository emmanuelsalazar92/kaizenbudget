import { HandCoins } from "lucide-react"
import Link  from "next/link"

export function TopIcon({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
      <div className="flex items-center gap-2 font-medium">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-md">
              <HandCoins className="size-14" />
            </div>
              Kaizen Budget
            </Link>
          </div>
  )
}
