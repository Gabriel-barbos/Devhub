"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast, useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bolt, } from "lucide-react";
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import {Dialog, DialogContent, DialogDescription,  DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const UpdateForm = z.object({
    email: z.string(),
    password: z.string(),
})

interface IUpdateForm {
    email: string,
    password: string,
    id: string
}

const EditAccount = ({email, password, id}: IUpdateForm) => {
    
    const UserID = id 
    const token = localStorage.getItem("accessToken")
    
    const {toast} = useToast()
    const router = useRouter()
    
    const form = useForm<z.infer<typeof UpdateForm>>({
      resolver: zodResolver(UpdateForm),
      defaultValues: {
        email: email
      },
    })

    const onSubmit = async (values: z.infer<typeof UpdateForm>) => {

        try{
            UpdateForm.parse(values)
          
            const response = await fetch(`http://localhost:8000/user/update-credentials/${UserID}`,{
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

export default EditAccount;