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

import { BadgesCheckbox } from "./badges-checkbox"

export function BadgeDialog() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

 

 

  if (isDesktop) {
    return (
       <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger><Button variant="outline">Selecionar badges</Button></DialogTrigger>
            <DialogContent className="flex flex-col space-y-2">
                <DialogHeader className="flex space-y-6">
                    <DialogTitle>Selecione quais badges você deseja.</DialogTitle>
                </DialogHeader>
                <BadgesCheckbox />
            </DialogContent>
        </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Selecionar bagdes</Button>
      </DrawerTrigger>
      <DrawerContent className="flex items-center">
        <DrawerHeader className="text-left">
          <DrawerTitle>Selecione quais badges você deseja.</DrawerTitle>
        </DrawerHeader>
        <BadgesCheckbox />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="destructive" className="w-[100px]">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
