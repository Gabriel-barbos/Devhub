"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
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



const User = z.object({
  name: z.string().min(1,{message: "Nome de exibição precisa de no mínimo 1 caractere."}),
  username: z.string().min(1, {message: "Nome de usuário precisa de no mín"}),
  password: z.string().min(6, {
    message: "Senha precisa de ao menos 6 caracteres.",
  }),
  email: z.string().email({message: "Email inválido."}),
})


export function RegisterForm() {
  // ...
  const {toast} = useToast()
  const router = useRouter()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const form = useForm<z.infer<typeof User>>({
    resolver: zodResolver(User),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: ""
    },
  })

  


  const onSubmit = async (values: z.infer<typeof User>) => {
    toast({
    title: "Sucesso.",
    description: "Você foi registrado!",
  })
  try {
    User.parse(values)
    const response = await fetch("http://localhost:8000/user/register",{
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(values)
    })
    console.log(values)
    } catch(error) {
      console.log(error)
    }
    setFormSubmitted(true)
  }

  useEffect(() => {
    if (formSubmitted) {
      const timeoutId: any = setTimeout(() => {
        router.push('/login');
      }, 1000);
      return () => clearTimeout(timeoutId)
    }
  }, [formSubmitted, router])

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
                Esse será seu nome de usuário. Ele será único.
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
        <div className="w-full flex justify-center">
            <Button type="submit" className="w-[100px]">
              Enviar
            </Button>
        </div>
      </form>
    </Form>
  )
}


