"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { ForgetPasswordDialog } from "@/components/login-page/forget-password-dialog"
import Link from "next/link"
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

const UserLogin = z.object({
  username: z.string().email({message: "Email inválido"}),
  password: z.string(),
})

export function LoginForm() {
  

  
  const {toast} = useToast()
  const router = useRouter()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [accessToken, setAccessToken] = useState(() => {
    if (typeof sessionStorage !== "undefined") {
      return sessionStorage.getItem("accessToken") || ""
    } else {
      return ""
    }
  })
  const form = useForm<z.infer<typeof UserLogin>>({
    resolver: zodResolver(UserLogin),
    defaultValues: {
      username: "",
      password: ""
    },
  })
  
 

  const onSubmit = async (values: z.infer<typeof UserLogin>) => {
    const formData = new URLSearchParams()
    formData.append('grant_type', '')
    formData.append('username', values.username)
    formData.append('password', values.password)
    formData.append('scope', '')
    formData.append('client_id', '')
    formData.append('client_secret', '')
    try {
      UserLogin.parse(values)
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      })
        if(response.ok) {
          const data = await response.json()
          console.log(data)
          setAccessToken(data.token);
          sessionStorage.setItem("accessToken", data.token)
          setFormSubmitted(true)
        }
        if(response.status === 401) throw new Error('Senha inválida.')
        if(response.status === 404) throw new Error('Conta não encontrada, verifique se seu email está escrito corretamente.')
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message
      })
      console.log(error)
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken")
    if(token){
      router.push('/profile')
    }
    if (formSubmitted) {
      const timeoutId: any = setTimeout(() => { 
        router.push('/profile')
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [formSubmitted, router])

  return (
    <Form  {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-5">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="" required {...field} />
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
              <Input placeholder="" type="password" required {...field} />
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

