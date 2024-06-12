'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { MessageCircleMore, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import avatarFallbacker from "@/lib/utils/avatarFallbacker";
import relativeTime from "@/lib/utils/relativeTime";
import DeletePostBtn from "./delete-post-btn";
import Link from 'next/link'

interface User {
    username: string
    name: string
}

interface IPost  {
    user: User
    likes_count: number
    content: string
    created_at: string
    id: string
    auth: boolean
    imageUrl: string
    reply_to: string
}

const Post = ({user, likes_count, content, created_at, id, auth, imageUrl, reply_to}: IPost) => {
    interface IPostReplied {
        author_username?: string
    }

    const [likes, setLikes] = useState(likes_count)
    const [liked, setLiked] = useState(false)
    const [postReplied, setPostReplied] = useState<IPostReplied>({})

    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
      };
      

    const like = () => {
        const newLikes = liked ? likes - 1 : likes + 1;
        setLikes(newLikes);
        setLiked(!liked);
    };

    useEffect(() => {
        if(reply_to) {
            fetch(`http://127.0.0.1:8000/post/${reply_to}`)
            .then((res) => res.json())
            .then((data) => setPostReplied(data))
        }
    }, [reply_to])
    
    return (
        <Card>
            <CardHeader className="flex items-center flex-row justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={imageUrl} /> 
                        <AvatarFallback>{avatarFallbacker(user.name)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="scroll-m-20 text-base leading-7 tracking-tight"> <Link href={`/${user.username}`}>@{user.username}</Link>

                    </CardTitle>
                </div>
                <CardDescription>{relativeTime(created_at)}</CardDescription>
            </CardHeader>
            <CardContent>
                <p contentEditable={true} className="text-base">{content}</p>
                {reply_to && <p className="text-xs text-muted-foreground mt-2">-{">"} Respondendo a <Link href={`/post/${reply_to}`} className="text-sky-400">@{postReplied["author_username"]}</Link></p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 !items-start"> 
                <div className="flex items-center gap-4">
                    <Button className="text-sm" variant={liked ? "secondary" : "outline"} onClick={like}>
                        <ThumbsUp className="mr-2 h-4 w-4" /> {liked ? "Curtido" : "Curtir"}
                    </Button>
                    <p className={"text-muted-foreground text-sm"}>{likes} like{likes != 1 && "s"}</p>
                    {auth && <DeletePostBtn postId={id}/>}
                    <Link href={`/post/${id}`} className="text-muted-foreground flex items-center gap-2 text-sm">
                        <MessageCircleMore color="#7A7A81"/>
                        Ver comentários
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}


export default Post;