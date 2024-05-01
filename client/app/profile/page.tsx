"use client"

import { jwtDecode } from "jwt-decode"
import ProfileHeader from "@/components/profile-page/profile-header";
import ProfilePosts from "@/components/profile-page/profile-posts";
import ProfileTabs from "@/components/profile-page/profile-tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")


  

 


  const fetchData = async() => {
    const res = await fetch(`http://127.0.0.1:8000/user/`, {
      method: "GET",
    })
    if(res.ok) {
      const info = await res.json()
      setName(info.data.name)
      setUsername(info.data.username)
      setBio(info.data.bio)
    }
  }


  
 

  return (
      <div>
      <ProfileHeader name={name} username={username} bio={bio}></ProfileHeader>
      <ProfileTabs />
      <ProfilePosts />
      </div>
     );
}
