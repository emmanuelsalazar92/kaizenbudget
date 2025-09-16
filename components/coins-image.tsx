
import Image from "next/image"

export function CoinsImage({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
      <div className="bg-muted relative hidden lg:block">
      <Image
        src="/images/close-up-coins-table.jpg"
        alt="Image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        priority
        />
      </div>
  )
}
