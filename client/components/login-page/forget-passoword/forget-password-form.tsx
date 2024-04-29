import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

const User = z.object({
  email: z.string().email({ message: "Email inválido" })
})

export function ForgetPasswordForm({ className }: React.ComponentProps<"form">) {
  const { toast } = useToast()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const form = useForm<z.infer<typeof User>>({
    resolver: zodResolver(User),
    defaultValues: {
      email: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof User>) => {
    toast({
      title: "Código enviado.",
      description: "Insira o código único que foi enviado ao seu email no campo solicitado.",
    })
    try {
      User.parse(values)
      const response = await fetch("http://localhost:8000/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      })
      console.log(values)
    } catch (error) {
      console.log(error)
    }
    setFormSubmitted(true)
  }
  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-5 px-5">
        <FormField
          control={form.control}
          name="email"
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
        <div className="w-full flex justify-center">
          <Button type="submit" className="w-[100px]">
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  )
}