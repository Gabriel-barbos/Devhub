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
import { ForgetPasswordForm } from "./forget-passoword/forget-password-form"


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
      <DrawerContent className="flex items-center">
        <DrawerHeader className="text-left">
          <DrawerTitle>Insira seu email para recuperar sua senha</DrawerTitle>
        </DrawerHeader>
        <ForgetPasswordForm className="px-4" />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="destructive" className="w-[100px]">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

