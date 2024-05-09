import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function DeletePostBtn() {
    const [token, setToken] = useState("");
    const {toast} = useToast();

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
            setToken(accessToken);
        }
    }, []) 


    const handleDelete = async (postId: number) => {
        try {
            let response = await fetch(`http://localhost:8000/post/delete/${postId}`, {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": "Bearer " + token,
                }
            });
    
            if(response.ok){
                toast({
                    variant: "default",
                    title: "Post deletado com sucesso"
                })
                location.reload()
            } else {
                toast({
                    variant: "default",
                    title: "Erro ao deletar o post"
                })
            }
        } catch (error) {
            console.error("Error:", error);
            toast({
                variant: "default",
                title: "Erro ao deletar o post"
            })
        }
    }


return <Button className="text-sm" variant={"destructive"} onClick={() => handleDelete(123)}> 
<Trash className="mr-2 h-4 w-4" />Deletar
</Button>

     
    }

