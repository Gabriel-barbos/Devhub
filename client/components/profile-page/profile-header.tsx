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
import { ProfileForm } from "./edit-profileForm"
import avatarFallbacker from "@/lib/utils/avatarFallbacker"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"


  const ProfileHeader = ({name, username, bio}) => {
    const [token, setToken] = useState(() => {
      if(typeof window !== "undefined"){
        return sessionStorage.getItem("accessToken") 
      } return ""
    })
    const decodedToken = jwtDecode(String(token))
    const authUsername = decodedToken.username
    if(username === authUsername){
      return (
        <>
        <div className={"flex items-center w-full justify-between"}>
          <div className={"flex items-center gap-4"}>
            <div>
              <Avatar className="hidden h-20 w-20 sm:flex">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className="text-2xl">a</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <h1 className={"text-xl font-semibold"}>{name}</h1>
                <div className="flex gap-1">
                  <Badge variant={"outline"}>HTML</Badge>
                  <Badge variant={"outline"}>CSS</Badge>
                  <Badge variant={"outline"}>Javascript</Badge>
                </div>
              </div>
              <p className={"text-muted-foreground"}>@{username}</p>
            </div>
          </div>
          <div>
            <Sheet>
              <SheetTrigger>
              <Button variant="outline">Editar Perfil</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edite Suas Informações</SheetTitle>
                  <SheetDescription>
                    <ProfileForm />
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
      
    return (
      <>
        <div className={"flex items-center w-full justify-between"}>
          <div className={"flex items-center gap-4"}>
            <div>
              <Avatar className="hidden h-20 w-20 sm:flex">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className="text-2xl">a</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <h1 className={"text-xl font-semibold"}>{name}</h1>
                <div className="flex gap-1">
                  <Badge variant={"outline"}>HTML</Badge>
                  <Badge variant={"outline"}>CSS</Badge>
                  <Badge variant={"outline"}>Javascript</Badge>
                </div>
              </div>
              <p className={"text-muted-foreground"}>@{username}</p>
            </div>
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