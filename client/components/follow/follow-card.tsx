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
import truncateBio from "@/lib/utils/truncateBio";
import Link from "next/link";

interface IFollowCardParams {
  username: string
  name: string
  imagePath: string
  bio: string
  isFollowing: boolean
  token: string | null
  id: string
  userId: string
}

export default function FollowCard({username, name, imagePath, bio, isFollowing, token, id, userId}: IFollowCardParams){
    const[imageUrl, setImageUrl] = useState('')
    const showBtn = () => {
      return !(id === userId)
    }
    const fetchImage = async (imagePath: string) => {
        try {
          const res = await fetch(`http://localhost:8000/images/${imagePath}`, {
            method: 'GET',
            headers: {
              "Access-Control-Allow-Headers" : "Content-Type",
              "Access-Control-Allow-Origin": "*",
              'Authorization': "Bearer " + token,
            }
          });
          if (res.ok) {
            const imageUrl = await res.blob();
            setImageUrl(URL.createObjectURL(imageUrl));
            console.log(imageUrl)
          } else {
            console.error('Failed to fetch image:', res.statusText);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };
      const handleFollowClick = () => {
        const followUrl = isFollowing ?  `http://localhost:8000/user/remove-follower/${id}` : `http://localhost:8000/user/add-follow/${id}` 
        fetch(followUrl, 
          {
            method: "POST",
            headers:{
              "Access-Control-Allow-Headers" : "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Authorization":` Bearer ${token}`
              },
          }
        )
        .then(res => res.json())
        .then(data => {
          console.log(data)
          location.reload()
        })
      };
    useEffect(() => {
        fetchImage(imagePath)
        return () => URL.revokeObjectURL(imageUrl)
      }, [])

    return (
        <>
        <Card>
            <CardHeader className="flex items-center flex-row justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="hidden h-16 w-16 sm:flex">
                        {imageUrl && <AvatarImage src={imageUrl} />}
                        <AvatarFallback>{avatarFallbacker(name)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="scroll-m-20 text-base leading-7 tracking-tight"><span>{name}</span> <Link href={`/${username}`} className="text-muted-foreground">@{username}</Link>
                    </CardTitle>
                </div>
                {showBtn() && (isFollowing ? <Button variant="destructive"className="w-[150px]" onClick={handleFollowClick}>Deixar de seguir</Button> : <Button variant="outline"className="w-[150px]" onClick={handleFollowClick}>Seguir</Button>)
                }
            </CardHeader>
            <CardContent>
                {bio && truncateBio(bio, 30)}
            </CardContent>
        </Card>
        </>
    )
}