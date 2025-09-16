import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateUserForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Fill your information in order to create your account
        </p>
      </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" required />
        </div>
        <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
              </div>
              <div className="grid gap-3">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </div>
    </form>
  )
}
