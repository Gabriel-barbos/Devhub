"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState, useRef } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"

const EditForm = z.object({
  name: z.string(),
  bio: z.string(),
})


interface IProfileForm {
  name: string,
  bio: string,
  id: string,
  imagePath: string
}

const ProfileForm = ({name, bio, imagePath, id}: IProfileForm) => {

  const fileInputRef = useRef(null)
  // 1. Define your form.
  const {toast} = useToast()
  const router = useRouter()
  const Userid = id

  const token = localStorage.getItem("accessToken")

  const form = useForm<z.infer<typeof EditForm>>({
    resolver: zodResolver(EditForm),
    defaultValues: {
      name: name,
      bio: bio
    },
  })

const onSubmit = async (values: z.infer<typeof EditForm>) => {
  
try{
  EditForm.parse(values)

  const response = await fetch(`http://localhost:8000/user/update/${Userid}`,{
    method: 'PUT',
    headers:{
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Authorization":` Bearer ${token}` ,
        "Content-Type": "application/json"} ,
    body: JSON.stringify(values)
  })
  if(response.ok) {
    toast({
      title:"Sucesso",
      description: "Informações atualizadas com sucesso",
    })
    location.reload()
  }
    } catch(error) {
      console.log(error)
    }
}



const imageSubmit = async (event) => {
  event.preventDefault()
  const formData = new FormData();
  const file = fileInputRef.current.files[0]
  console.log(file)
  formData.append('file', file)
  try{
    const response = await fetch(`http://localhost:8000/images/update`,{
      method: 'PUT',
      headers:{
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Authorization":` Bearer ${token}`
          },
      body: formData
    
    }) 
    if(response.ok) {
    toast({
      title:"Imagem enviada",
      description: "Informações atualizadas com sucesso",
    })
    location.reload()
    }
      } catch(error) {
        console.log(error)
      }
  }


   return (
     <>
     <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" >
         
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
           name="bio"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Biografia</FormLabel>
               <FormControl>
               <Textarea placeholder="Digite aqui sua biografia" id="message"{...field}  />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
     ></FormField>
      <Button type="submit">Salvar Alterações</Button>
       </form>
     </Form>
     
    
     <div className="grid w-full max-w-sm items-center gap 3.5 mt-5">

      <form onSubmit={imageSubmit} encType="multipart/form-data">
      <Label htmlFor="picture">Insira sua foto de perfil</Label>
      <Input type="file" name="file" ref={fileInputRef} accept="image/*"/>
      <Button type="submit">Salvar foto</Button>
      </form>
      
    </div>
     </>
);
}

export default ProfileForm;