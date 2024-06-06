import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import avatarFallbacker from "@/lib/utils/avatarFallbacker";
import Link from "next/link";

export default function FollowCard({username, name, imageUrl, bio, isFollowing}){
   
    return (
        <>
        <Card>
            <CardHeader className="flex items-center flex-row justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="hidden h-16 w-16 sm:flex">
                        <AvatarImage src={imageUrl} /> 
                        <AvatarFallback>{avatarFallbacker(name)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="scroll-m-20 text-base leading-7 tracking-tight" asChild><span>{name}</span> <Link href={`/${username}`} className="text-muted-foreground">@{username}</Link>
                    </CardTitle>
                </div>
                {isFollowing && <Button variant="destructive"className="w-[150px]">Deixar de seguir</Button>}
            </CardHeader>
            <CardContent>
                {bio}
            </CardContent>
        </Card>
        </>
    )
}