
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
const EditButton = () => {


    return (
     <>
      
        <Dialog>
  <DialogTrigger>
                <Ellipsis  />

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edite as informações da sua conta</DialogTitle>
      <DialogDescription>
      <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
            <Label htmlFor="email">Altere seu Email</Label>
            <Input type="Email" id="email" placeholder="Digite seu novo email" />
         </div>

         <div className="grid w-full max-w-sm items-center gap-1.5 mt-6 pb-6">
            <Label htmlFor="email">Altere sua senha</Label>
            <Input type="string" id="senha" placeholder="Digite sua nova senha" />
         </div>
         <Button>Salvar Alterações</Button>
         <Button  variant="destructive" className="ml-4">Desativar conta</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </>
    )
}

export default EditButton;