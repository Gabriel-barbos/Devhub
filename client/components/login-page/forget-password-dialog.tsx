"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "@/components/ui/button"
import { useToast } from "../ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgetPasswordDialog() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
       <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger><Button variant="outline">Esqueceu a senha?</Button></DialogTrigger>
            <DialogContent className="flex flex-col space-y-2">
                <DialogHeader className="flex space-y-6">
                    <DialogTitle>Insira seu email para recuperar sua senha</DialogTitle>
                </DialogHeader>
                <ForgetPasswordForm />
            </DialogContent>
        </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Esqueceu a senha?</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Insira seu email para recuperar sua senha</DrawerTitle>
        </DrawerHeader>
        <div>

        </div>
        <ForgetPasswordForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="destructive" className="w-full">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ForgetPasswordForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" defaultValue="" placeholder="exemplo@email.com"/>
    </div>
    <div className="w-full flex justify-center">
      <Button type="submit" className="w-full md:w-[100px]">
        Enviar
      </Button>
    </div>
  </form>
  )
}

