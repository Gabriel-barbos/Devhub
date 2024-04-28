"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Textarea } from "@/components/ui/textarea"
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string(),
  description: z.string(),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      description: ""
    },
  })


  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values)
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu novo nome de usuario" {...field} />
              </FormControl>
              <FormDescription>
                Esse será o seu nome público 
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
    <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Altere seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
    ></FormField>
    <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
              <Textarea placeholder="Digite aqui sua descrição" id="message"{...field}  />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
    ></FormField>
    
        <Button type="submit">Salvar Alterações</Button>
      </form>
    </Form>
    </>
  )
}


