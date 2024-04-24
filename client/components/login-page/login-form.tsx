
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ForgetPasswordDialog } from "@/components/login-page/forget-password-dialog"
import Link from "next/link"
import ForgetPasswordOtp from "./forget-password-otp"

export default function LoginForm() {
  return (
    <div className="w-full py-12">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Insira seu email abaixo para entrar na sua conta
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <ForgetPasswordDialog  />
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="w-full flex justify-center">
            <Button type="submit" className="w-[100px]">
              Entrar
            </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta? {"  "}
            <Link href="/register" className="underline">
              Registrar
            </Link>
          </div>
        </div>
      </div>
         </div>
  )
}

