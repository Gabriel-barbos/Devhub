'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { SendHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import avatarFallbacker from "@/lib/utils/avatarFallbacker";
import { useToast } from "@/components/ui/use-toast"


const ArticleMaker = ({name, username, imageUrl}) => {
    
    const [content, setContent] = useState("");
    const [token, setToken] = useState("");
    const {toast} = useToast();

    
    useEffect(() => {
        setToken(localStorage.getItem("accessToken") || "");
    }, [token])

    // const handlePublish = async () => {
    //     let response = await fetch("http://localhost:8000/post", {
    //         method: "POST",
    //         headers: { 
    //             "Access-Control-Allow-Headers" : "Content-Type",
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "application/json", 
    //             "Authorization": "Bearer " + token,
    //         },
    //         body: JSON.stringify({"content": content})
    //     })

    //     if(response.ok){
    //         toast({
    //             variant: "default",
    //             title: "Post criado com sucesso"
    //         })
    //         location.reload()
    //     }
    // }
    
    return(
        <Card className={"border-[--tw-ring-color]"}>
        <CardHeader className="flex items-center flex-row justify-between">
            <div className="flex items-center gap-2">
                <Avatar className="hidden h-9 w-9 sm:flex">
                   <AvatarImage src={imageUrl} /> 
                    <AvatarFallback>{avatarFallbacker(name)}</AvatarFallback>
                </Avatar>
                <CardTitle className="scroll-m-20 text-base leading-7 tracking-tight">@{username}</CardTitle>
            </div>
            <CardDescription>Postando agora</CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea value={content} onChange={(e) => {setContent(e.target.value)}} placeholder="Publique aqui seu artigo" className={"border-0 focus:!ring-transparent text-base"} />
        </CardContent>
        <CardFooter className="flex items-center gap-4"> 
            <Button className="text-sm" variant={"default"} >
                Publicar <SendHorizontal className="ml-2 h-4 w-4" /> 
            </Button> 
            {/* <p className={"text-muted-foreground text-sm"}>{likes} like{likes > 1 && "s"}</p> */}
        </CardFooter>
    </Card>
    )
}

export default ArticleMaker