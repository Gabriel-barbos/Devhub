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
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const PostMaker = () => {
    

    return (
        <Card>
            <CardHeader className="flex items-center flex-row justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback>GM</AvatarFallback>
                    </Avatar>
                    <CardTitle className="scroll-m-20 text-base leading-7 tracking-tight">@gabrielmeira</CardTitle>
                </div>
                {/* <CardDescription>a</CardDescription> */}
            </CardHeader>
            <CardContent>
                <Textarea placeholder="No que você está pensando?" className={"border-0 focus:!ring-transparent text-base"} />
            </CardContent>
            <CardFooter className="flex items-center gap-4"> 
                <Button className="text-sm" variant={"default"} onClick={()=>{}}>
                    Publicar <SendHorizontal className="ml-2 h-4 w-4" /> 
                </Button> 
                {/* <p className={"text-muted-foreground text-sm"}>{likes} like{likes > 1 && "s"}</p> */}
            </CardFooter>
        </Card>
    )
}


export default PostMaker;