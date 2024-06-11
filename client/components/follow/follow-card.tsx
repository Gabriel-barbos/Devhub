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

export default function FollowCard({username, name, imagePath, bio, isFollowing, token}){
    const[imageUrl, setImageUrl] = useState('')
    const fetchImage = async (imagePath) => {
        try {
          // Make the GET request with authorization headers
          const res = await fetch(`http://localhost:8000/images/${imagePath}`, {
            method: 'GET',
            headers: {
              // Replace 'your_access_token' with your actual access token
              "Access-Control-Allow-Headers" : "Content-Type",
              "Access-Control-Allow-Origin": "*",
              'Authorization': "Bearer " + token,
            }
          });
  
          // Check if the request was successful
          if (res.ok) {
            // Get the image URL from the response
            const imageUrl = await res.blob();
            // Convert blob to URL
            setImageUrl(URL.createObjectURL(imageUrl));
            console.log(imageUrl)
          } else {
            console.error('Failed to fetch image:', res.statusText);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
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
                    <CardTitle className="scroll-m-20 text-base leading-7 tracking-tight" asChild><span>{name}</span> <Link href={`/${username}`} className="text-muted-foreground">@{username}</Link>
                    </CardTitle>
                </div>
                {isFollowing && <Button variant="destructive"className="w-[150px]">Deixar de seguir</Button>}
            </CardHeader>
            <CardContent>
                {bio && truncateBio(bio, 5)}
            </CardContent>
        </Card>
        </>
    )
}