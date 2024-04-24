'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react";

const Post = () => {
    const [likes, setLikes] = useState(1)
    const [liked, setLiked] = useState(false)

    const like = () => {
        const newLikes = liked ? likes - 1 : likes + 1;
        setLikes(newLikes);
        setLiked(!liked);
    };
    

    return (
        <Card>
            <CardHeader className="flex items-center flex-row justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback>GM</AvatarFallback>
                    </Avatar>
                    <CardTitle className="scroll-m-20 text-lg leading-7 tracking-tight">@gabrielmeira</CardTitle>
                </div>
                <CardDescription>Agora</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Esse é o primeiro post</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4"> 
                <Button variant={liked ? "secondary" : "outline"} onClick={like}>
                    <ThumbsUp className="mr-2 h-4 w-4" /> {liked ? "Curtido" : "Curtir"}
                </Button> 
                <p className={"text-muted-foreground"}>{likes} like{likes > 1 && "s"}</p>
            </CardFooter>
        </Card>
    )
}


export default Post;