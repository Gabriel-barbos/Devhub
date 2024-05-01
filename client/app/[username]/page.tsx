"use client"

import ProfileHeader from "@/components/profile-page/profile-header"
import ProfilePosts from "@/components/profile-page/profile-posts"
import ProfileTabs from "@/components/profile-page/profile-tabs"
import PostMaker from "@/components/shared/post-maker";
import { useState } from "react";
export default function Page({params} : {params: {username: string}}) {

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [hasUser, setHasUser] = useState(false)

    const fetchData = async() => {
        const res = await fetch(`http://127.0.0.1:8000/user/${params.username}`, {
          method: "GET",
        })
        if(res.ok) {
          const info = await res.json()
          setName(info.data.name)
          setBio(info.data.bio)
          setId(info.data.id)
          setHasUser(true)
        }
      }

      fetchData()

    if(!hasUser){
        return (
            <div>
                <ProfileHeader name={name} username={params.username} bio={bio} id={id}></ProfileHeader>
                <div className="flex flex-col justify-center items-start gap-2">
                    <h1 className="text-5xl font-bold">Essa conta não existe</h1>
                    <span className="font-light text-slate-400">Tente procurar outra conta</span>
                </div>
            </div>
        )
    }  

    return (
        <div>
        <ProfileHeader name={name} username={params.username} bio={bio}></ProfileHeader>
        <ProfileTabs />
        <PostMaker name={name} username={params.username} />
        <ProfilePosts />
        </div>
       );
  }
  