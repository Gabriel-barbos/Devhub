"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"


 
const FormSchema = z.object({
  badges: z.array(z.number()),
})
 
export function BadgesCheckbox({defaultBadges}) {
  const [token, setToken] = useState("")

    useEffect(() => {
        setToken(localStorage.getItem("accessToken") || "");
    }, [token])



  const badges = defaultBadges

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      badges: [],
    },
  })

  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    FormSchema.parse(data)
    let response = await fetch("http://localhost:8000/badge/update", {
            method: "PUT",
            headers: { 
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(data.badges)
        })

        if(response.ok){
            toast({
                variant: "default",
                title: "Badges alteradas com sucesso."
            })
            location.reload()
        }
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="badges"
          render={() => (
            <FormItem>
              {badges.map((item: object) => (
                <FormField
                  key={item._id}
                  control={form.control}
                  name="badges"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item._id} 
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item._id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item._id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item._id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}