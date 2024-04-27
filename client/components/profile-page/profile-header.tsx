import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"


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
import { Ellipsis } from "lucide-react"

const ProfileHeader = () => {
    return (
        <>
            <div className={"flex items-center w-full justify-between"}>
                <div className={"flex items-center gap-4"}>
                    <div>
                        <Avatar className="hidden h-20 w-20 sm:flex">
                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                            <AvatarFallback className="text-2xl">GM</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className={"text-xl font-semibold"}>Gabriel Meira</h1>
                            <div className="flex gap-1">
                                <Badge variant={"outline"}>HTML</Badge>
                                <Badge variant={"outline"}>CSS</Badge>
                                <Badge variant={"outline"}>Javascript</Badge>
                            </div>
                        </div>
                        <p className={"text-muted-foreground"}>@gabrielmeira</p>
                    </div>
                </div>
                <div>
           
                <Sheet>
  <SheetTrigger>
    <div className="px-3 py-2 border-2 border-white rounded-full"> Editar Perfil</div>
   </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edite Suas Informações</SheetTitle>
      <SheetDescription>
         <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
            <Label htmlFor="email">Altere seu nome</Label>
            <Input type="name" id="name" placeholder="Digite seu nome" />
         </div>

         <div className="grid w-full max-w-sm items-center gap-1.5 mt-6">
            <Label htmlFor="email">Edite seu nome de usuario</Label>
            <Input type="username" id="username" placeholder="Digite aqui seu novo nome de usuario" />
         </div>
        
         <div className="grid w-full gap-1.5 pb-6 mt-6">
      <Label htmlFor="message">Altere sua Descrição</Label>
      <Textarea placeholder="Digite aqui sua descrição" id="message" />
    </div>

         <Button>Salvar Alterações</Button>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

                </div>
            </div>
            <div className="mt-6 mb-8">
                <p className="text-base">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, aspernatur.</p>
            </div>
      </>
    );
}

export default ProfileHeader;