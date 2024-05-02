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
import avatarFallbacker from "@/lib/utils/avatarFallbacker";
import relativeTime from "@/lib/utils/relativeTime";

const Post = ({user, likes_count, content, created_at}) => {
    const [likes, setLikes] = useState(likes_count)
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
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback>{avatarFallbacker(user.name)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="scroll-m-20 text-base leading-7 tracking-tight">@{user.username}</CardTitle>
                </div>
                <CardDescription>{relativeTime(created_at)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p contentEditable={true} className="text-base">{content}</p>
            </CardContent>
            <CardFooter className="flex items-center gap-4"> 
                <Button className="text-sm" variant={liked ? "secondary" : "outline"} onClick={like}>
                    <ThumbsUp className="mr-2 h-4 w-4" /> {liked ? "Curtido" : "Curtir"}
                </Button> 
                <p className={"text-muted-foreground text-sm"}>{likes} like{likes != 1 && "s"}</p>
            </CardFooter>
        </Card>
    )
}


export default Post;