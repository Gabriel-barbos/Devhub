"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle,
        SheetTrigger,
      } from "@/components/ui/sheet"
import  ProfileForm  from "./edit-profileForm"
import avatarFallbacker from "@/lib/utils/avatarFallbacker"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { ProfileBadges } from "./badge/profile-badges"
import { BadgeDialog } from "./badge/badge-dialog"

type Badge = {
  _id: string
  name: string
  imagePath: string
}

  interface IProfileHeaderParams {
    name: string,
    username: string,
    bio: string, 
    id: string,
    imagePath: string,
    badges: (Badge)[] ,
    defaultBadges: (string | number)[],
    auth: boolean
    imageUrl: string
  }


  
  const token = localStorage.getItem("accessToken")

  const ProfileHeader = ({name, username, bio, id, auth, imagePath, badges, defaultBadges, imageUrl}: IProfileHeaderParams) => {
      useEffect(() => {
        return () => URL.revokeObjectURL(imageUrl)
      }, [])

      const [isFollowing, setIsFollowing] = useState(false);

      const handleFollowClick = () => {
          const followUrl = !isFollowing ? "http://localhost:8000/user/add-follow/6645b430c0216bd7132ea07b" : "http://localhost:8000/user/remove-follower/6645b430c0216bd7132ea07b"
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
          })
          setIsFollowing(!isFollowing);
        };
      
        
      return (
        <>
          <div className={"flex items-center w-full justify-between"}>
            <div className={"flex items-center gap-4"}>
              <div>
                <Avatar className="hidden h-20 w-20 sm:flex">
                  <AvatarImage src={imageUrl} />
                  <AvatarFallback className="text-2xl">
                    {name && typeof name == "string" && avatarFallbacker(name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex flex-col gap-2 ">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                    <h1 className="text-xl font-semibold">{name}</h1>
                    <p className={"text-muted-foreground"}>@{username}</p>
                    </div>
                  </div>
                </div>
               
                <ProfileBadges badges={badges} />
                
                <div className="top-16 flex gap-2">
                <p><span className={"text-muted-foreground"}>seguidores:</span> 0</p>
                <p><span className={"text-muted-foreground"}>seguindo:</span> 0</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 items-start">
              {!auth &&    
              <Button variant={isFollowing ? "secondary": "outline"} onClick={handleFollowClick} >
                      {isFollowing ? 'Seguindo' : 'Seguir'}
              </Button>     
              }
                        
              <Sheet>
                <SheetTrigger>
                  {auth && <Button variant="outline">Editar Perfil</Button>}
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edite Suas Informações</SheetTitle>
                    <SheetDescription>
                      <ProfileForm
                        name={name}
                        bio={bio}
                        id={id}
                        imagePath={imagePath}
                      />
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              {auth && (
                <BadgeDialog badges={badges} defaultBadges={defaultBadges} />
              )}
            </div>
          </div>
          <div className="mt-6 mb-8">
            <p className="text-base">{bio}</p>
          </div>
        </>
      );
    

}

export default ProfileHeader;