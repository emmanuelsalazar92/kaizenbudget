import { CoinsImage } from "@/components/coins-image"
import { LostPasswordForm } from "@/components/lost-password-form"
import { TopIcon } from "@/components/top-icon"

export default function LostPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <TopIcon />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LostPasswordForm />
          </div>
        </div>
      </div>
      <CoinsImage />
    </div>
  )
}

