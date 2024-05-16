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


  const ProfileHeader = ({name, username, bio, id, auth, imagePath, badges, defaultBadges, imageUrl}: IProfileHeaderParams) => {
      useEffect(() => {
        return () => URL.revokeObjectURL(imageUrl)
      }, [])

      const [isFollowing, setIsFollowing] = useState(false);

      const handleFollowClick = () => {
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
                <div className="flex flex-col gap-2 mb-1">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">{name}</h1>
                    <Button variant={isFollowing ? "secondary": "outline"} onClick={handleFollowClick} className="px-3 ml-2 py-1">
                    {isFollowing ? 'Seguindo' : 'Seguir'}
                    </Button>                  </div>
                </div>
                <ProfileBadges badges={badges} />
                <p className={"text-muted-foreground"}>@{username}</p>
                
                <div className="top-16">
                <p className={"text-muted-foreground"}>seguidores: 0</p>
                <p className={"text-muted-foreground"}>seguindo: 0</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 items-start">
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