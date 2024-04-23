import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from 'usehooks-ts'
export function ForgetPasswordDialog() {
    return (
        <Dialog>
            <DialogTrigger>Esqueceu a senha?</DialogTrigger>
            <DialogContent className="flex flex-col space-y-2">
                <DialogHeader className="flex space-y-6">
                    <DialogTitle>Insira seu email para recuperar sua senha</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )


}