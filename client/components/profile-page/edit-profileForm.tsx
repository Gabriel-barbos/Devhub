"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from 'react'
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
  const [image, setImage] = useState('')
  // 1. Define your form.
  const {toast} = useToast()
  const router = useRouter()
  const Userid = id

  const token = sessionStorage.getItem("accessToken")

  const form = useForm<z.infer<typeof EditForm>>({
    resolver: zodResolver(EditForm),
    defaultValues: {
      name: name,
      bio: bio
    },
  })
function handleImage(e) {
  console.log(e.target.files)
  setImage(e.target.files[0])
}
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



const imageSubmit = async () => {
  const formData = new FormData()
  formData.append('image', image)
  
  try{
   
  
    const response = await fetch(`http://localhost:8000/images/update`,{
      method: 'PUT',
      headers:{
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Authorization":` Bearer ${token}` ,
          "Content-Type": "multiform/form-data"} ,
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
       </form>
     </Form>
     
    
     <div className="grid w-full max-w-sm items-center gap 3.5 mt-5">
      <Label htmlFor="picture">Insira sua foto de perfil</Label>
      <Input type="file" name="image" onChange={handleImage}/>
    </div>
    <Button type="submit">Salvar Alterações</Button>

     </>
);
}

export default ProfileForm;