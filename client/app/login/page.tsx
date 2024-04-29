import { LoginForm } from "@/components/login-page/login-form";
import { ForgetPasswordDialog } from "@/components/login-page/forget-password-dialog";
import Link from "next/link";
export default function Page() {
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
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Não tem uma conta? {"  "}
            <Link href="/register" className="underline">
              Registrar
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            <ForgetPasswordDialog />
          </div>
        </div>
      </div>
    </div>
  );
}
