"use client"

import { jwtDecode } from "jwt-decode"
import ProfileHeader from "@/components/profile-page/profile-header";
import ProfilePosts from "@/components/profile-page/profile-posts";
import ProfileTabs from "@/components/profile-page/profile-tabs";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
export default function Page() {
  
  const router = useRouter()
  
  

  const token = sessionStorage.getItem("accessToken")
  const decodedToken = jwtDecode(token)

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")

  useEffect(() => {
    if(!token){
      router.push('/login')
    }
    fetchData()
  }, [])
  
  
  

  const fetchData = async() => {
    const res = await fetch(`http://127.0.0.1:8000/user/${decodedToken.username}`, {
      method: "GET",
    })
    if(res.ok) {
      const info = await res.json()
      console.log(info.data)
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
