import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
export default function DeletePostBtn({id}) {
    const [token, setToken] = useState("");
    const {toast} = useToast();

    useEffect(() => {
        setToken(sessionStorage.getItem("accessToken") || "");
    }, [token])

    const handleDelete   = async () => {
        let response = await fetch(`http://localhost:8000/post/delete/`, {
            method: "DELETE",
            headers: { 
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json", 
                "Authorization": "Bearer " + token,
            }
        })

        if(response.ok){
            toast({
                variant: "default",
                title: "Post deletado com sucesso"
            })
            location.reload()
        }
        
    }
    return <Button variant={"destructive"}><Trash />Deletar</Button>
}