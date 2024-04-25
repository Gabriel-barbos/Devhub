"use client"

import { Label } from "@/components/ui/label"
import { ForgetPasswordDialog } from "@/components/login-page/forget-password-dialog"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const UserLogin = z.object({
  email: z.string().email({message: "Email inválido"}),
  password: z.string(),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof UserLogin>>({
    resolver: zodResolver(UserLogin),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  const onSubmit = async (values: z.infer<typeof UserLogin>) => {
    try {
      UserLogin.parse(values)
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      })  
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form  {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-5">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>
              Insira seu mail
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>
              Insira sua senha
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="w-full flex justify-center">
          <Button type="submit" className="w-[100px]">
            Entrar
          </Button>
      </div>
    </form>
  </Form>
  )
}

