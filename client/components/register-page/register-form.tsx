"use client"

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
import { error } from "console"



const User = z.object({
  name: z.string(),
  username: z.string().min(1, {
    message: "Nome de usuário precisa de no mínimo 1 caractere.",
  }),
  password: z.string().min(6, {
    message: "Senha precisa de ao menos 6 caracteres.",
  }),
  email: z.string().email({message: "Email inválido"}),
})

export function RegisterForm() {
  // ...
  const {toast} = useToast()
  const form = useForm<z.infer<typeof User>>({
    resolver: zodResolver(User),
    defaultValues: {
      username: "",
      password: "",
      email: ""
    },
  })

  const onSubmit = (values: z.infer<typeof User>) => {
    toast({
    title: "Sucesso!",
    description: "Você foi cadastrado!",
  })
    console.log(values)
  }

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-5">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de exibição</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Esse será seu nome público
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do usuário</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Esse será seu nome de usuário
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormDescription>
                Insira seu email
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
                Insira uma senha segura.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"
        >Enviar</Button>
      </form>
    </Form>
  )
}


