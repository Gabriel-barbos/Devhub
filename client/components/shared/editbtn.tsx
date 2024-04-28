"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Bolt, } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
  
const formSchema = z.object({
    email: z.string(), 
    password: z.string().min(8, {
    message: "Sua senha precisa ter no mínimo 8 caracteres.",
  }),

})
const EditButton = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    
  console.log(values)
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

export default EditButton;