
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-transparent border-transparent">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl dark:text-slate-50">Login</CardTitle>
        <CardDescription className="dark:text-slate-50"></CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-3">
          <Label htmlFor="email" className="dark:text-slate-50"></Label>
          <Input id="email" placeholder="Insira seu email ou username para logar na sua conta." required type="email" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="password"  className="dark:text-slate-50">Senha</Label>
          <Input id="password" required type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full dark:text-slate-800">Entrar</Button>
      </CardFooter>
    </Card>
  )
}

