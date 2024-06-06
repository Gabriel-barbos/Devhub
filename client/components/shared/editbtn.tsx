"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bolt, } from "lucide-react";
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import {Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
const UserConfigForm = z.object({
    email: z.string(), 
    password: z.string().min(8, {
    message: "Sua senha precisa ter no mínimo 8 caracteres.",
  }),

})

interface ConfigProfileParams {
  email: String,
  id: String, 
  password: String
}
const EditButton = ({id,email,password}: ConfigProfileParams ) => {


  const {toast} = useToast()
  const router = useRouter()
  const token = sessionStorage.getItem("accessToken")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const Userid = id
  const form = useForm<z.infer<typeof UserConfigForm>>({
    resolver: zodResolver(UserConfigForm),
    defaultValues: {
    email: email,
    password: password
    },
  })

  const onSubmit = async (values: z.infer<typeof UserConfigForm>) => {
    toast({
    title: "Sucesso.",
    description: "Informações atualizadas com sucesso!",
  })
  try {
    UserConfigForm.parse(values)
    const response = await fetch(`http://localhost:8000/user/update-credentials/${Userid}`,{
    method: "PUT",
    headers: { 
      "Authorization":` Bearer ${token}` ,
      "Content-Type": "application/json"},
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
        router.push('/profile');
      }, 1000);
      return () => clearTimeout(timeoutId)
    }
  }, [formSubmitted, router])


    return (
      <>
 <Dialog>
  <DialogTrigger>
  <Bolt />
  </DialogTrigger>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>Edite as informações da sua conta</DialogTitle>
      
      <DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <FormField
            control={form.control}
            name ="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altere seu Email</FormLabel>
                <FormControl>
                  <Input placeholder ="Digite seu novo email" {...field} />
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
                <Input placeholder ="Digite sua nova senha" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
      ></FormField>
      
      <Button>Salvar Alterações</Button>
      <Button  variant="destructive" className="ml-4">Desativar conta</Button>        </form>
      </Form>

   
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
      </>
    )
}

export default EditButton;