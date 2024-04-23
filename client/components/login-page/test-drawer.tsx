"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "@/components/ui/button"
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

export function TestDrawer() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
       <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>Esqueceu a senha?</DialogTrigger>
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
        <ForgetPasswordForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="destructive">Cancel</Button>
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
      <Input type="email" id="email" defaultValue="exemplo@email.com" />
    </div>
    <Button type="submit">Enviar</Button>
  </form>
  )
}

