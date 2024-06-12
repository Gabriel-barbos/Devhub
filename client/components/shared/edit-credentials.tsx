"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bolt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const UpdateFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

interface IUpdateForm {
  email: string,
  password: string,
  id: string
}

const EditAccount = ({ email, password, id }: IUpdateForm) => {
  const UserID = id
  const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null
  const router = useRouter()

  const form = useForm<z.infer<typeof UpdateFormSchema>>({
    resolver: zodResolver(UpdateFormSchema),
    defaultValues: {
      email: email,
      password: password
    },
  })

  const onSubmit = async (values: z.infer<typeof UpdateFormSchema>) => {
    try {
      const response = await fetch(`http://localhost:8000/user/update-credentials/${UserID}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Informações atualizadas com sucesso",
        })
        router.refresh()
      } else {
        const errorData = await response.json()
        toast({
          title: "Erro",
          description: errorData.message || "Ocorreu um erro ao atualizar as informações",
          status: "error"
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar as informações",
        status: "error"
      })
    }
  }

  const deactivateAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8000/user/delete/${UserID}`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (response.ok) {
        toast({
          title: "Conta desativada",
          description: "Sua conta foi desativada com sucesso",
        })
        router.push("/login")
      } else {
        const errorData = await response.json()
        toast({
          title: "Erro",
          description: errorData.message || "Ocorreu um erro ao desativar a conta",
          status: "error"
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao desativar a conta",
        status: "error"
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Bolt />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edite as informações da sua conta</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altere seu Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu novo email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altere sua senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Digite sua nova senha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex space-x-4">
                  <Button type="submit">Salvar Alterações</Button>
                  <Button variant="destructive" type="button" onClick={deactivateAccount}>Desativar conta</Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default EditAccount
