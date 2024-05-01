"use client"

import { useParams } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

const EditForm = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string(),
  description: z.string(),
})

const ProfileForm = ({name, username, bio}) => {

  // 1. Define your form.
  const {toast} = useToast()
  const router = useRouter()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const usernameID = username

  const token = sessionStorage.getItem("accessToken")

  const form = useForm<z.infer<typeof EditForm>>({
    resolver: zodResolver(EditForm),
    defaultValues: {
      username: username,
      name: name,
      description: bio
    },
  })

const onSubmit = async (values: z.infer<typeof EditForm>) => {
  toast({
    title:"Sucesso",
    description: "Informações atualizadas com sucesso",
  })
  
try{
  EditForm.parse(values)
  const response = await fetch(`http://localhost:8000/user/update/${usernameID}`,{
    method: 'PUT',
    headers:{
        "Authorization": `${token}`,
        "WWW-Authenticate" :`Bearer`,
        "Content-Type": "application/json"} ,
    body: JSON.stringify(values)
  })
  console.log(values)
    } catch(error) {
      console.log(error)
      console.log("token:" + token)
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
     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
         
         <FormField
           control={form.control}
           name="username"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Nome de Usuario</FormLabel>
               <FormControl>
                 <Input  {...field} />
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
);
}

export default ProfileForm;