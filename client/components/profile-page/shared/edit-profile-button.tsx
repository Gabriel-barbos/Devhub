"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"

const EditProfileButton = () => {
    const [name, setName] = useState("");

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const save = () => {
        
    }

    return(
        <Sheet>
            <SheetTrigger>
                <div className="px-3 py-2 border-2 border-white rounded-full">Editar perfil</div>
            </SheetTrigger>
            <SheetContent>
            <SheetHeader>
                <SheetTitle>Edite suas informações</SheetTitle>
                <SheetDescription>
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
                    <Label htmlFor="email">Altere seu nome</Label>
                    <Input type="name" id="name" placeholder="Digite seu nome" value={name} onChange={(e) => handleName(e)} />
                </div>
        
                <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
                    <Label htmlFor="email">Edite seu nome de usuario</Label>
                    <Input type="username" id="username" placeholder="Digite aqui seu novo nome de usuario" />
                </div>
                
                <div className="grid w-full gap-1.5 pb-6 mt-6">
                    <Label htmlFor="message">Altere sua Descrição</Label>
                    <Textarea placeholder="Digite aqui sua descrição" id="message" />
                </div> 
                <Button onClick={save}>Salvar alterações</Button>
                </SheetDescription>
            </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}

export default EditProfileButton;