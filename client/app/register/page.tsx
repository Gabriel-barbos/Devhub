import { RegisterForm } from "@/components/register-page/register-form"

export default function Page() {
    return (
        <div  className="">
            <div className="w-full py-12">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-4">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Registro</h1>
                        <p className="text-balance text-muted-foreground">
                            Crie sua conta.
                        </p>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
        </div>
        
    )
}