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

  interface IProfileHeaderParams {
    name: string,
    username: string,
    bio: string, 
    id: string, 
    auth: boolean
  }


  const ProfileHeader = ({name, username, bio, id, auth}: IProfileHeaderParams) => {
      const [badges, setBadges] = useState([]);

      useEffect(() => {
        const badgesFromSession = sessionStorage.getItem("badges");
        if(badgesFromSession){
          setBadges(JSON.parse(badgesFromSession));
        }
      }, [])

      return (
        <>
        <div className={"flex items-center w-full justify-between"}>
          <div className={"flex items-center gap-4"}>
            <div>
              <Avatar className="hidden h-20 w-20 sm:flex">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className="text-2xl">{(name && typeof name == "string") && avatarFallbacker(name)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex flex-col gap-2 mb-3">
                <h1 className={"text-xl font-semibold"}>{name}</h1>
                {badges.length > 0 && <div className="flex gap-1">
                  {badges.map((badge) => {
                    return <Badge variant={"outline"}>{badge}</Badge>
                  })}
                </div>}
              </div>
              <p className={"text-muted-foreground"}>@{username}</p>
            </div>
          </div>
          <div>
            <Sheet>
              <SheetTrigger>
              { auth && <Button variant="outline">Editar Perfil</Button> }
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edite Suas Informações</SheetTitle>
                  <SheetDescription>
                    <ProfileForm name={name} desc={bio} id={id} badges={badges} />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="mt-6 mb-8">
          <p className="text-base">
            {bio}
          </p>
        </div>
      </>
      )
    

}

export default ProfileHeader;