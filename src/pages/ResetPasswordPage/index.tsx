import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[300px] items-center gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">SOS - ADMIN</h1>
          <p className="text-balance text-muted-foreground">
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Resetar Senha
          </Button>
        </div>
      </div>
    </div>
    <div className="hidden bg-muted lg:block h-screen">
      
      <div className="relative w-full h-full">
        <img
        src="../.././../public/image.png"
        width="1920"
        height="1080"
        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale opacity-80 "
      />
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundColor: "rgba(154, 2, 120, 0.5)"}}></div>
      </div>
    </div>
  </div>
  )
}
