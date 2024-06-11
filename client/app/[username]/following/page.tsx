"use client"

import ProfileHeader from "@/components/profile-page/profile-header"
import FollowList from "@/components/follow/follow-list";
import FollowTabs from "@/components/follow/follow-tabs";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export default function Page({ params }: { params: { username: string } }) {

 
    const [imageUrl, setImageUrl] = useState('')
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [following, setFollowing] = useState([])
    const [imagePath, setImagePath] = useState("")
    const [hasUser, setHasUser] = useState(false)
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(() => {
      if(typeof window !== "undefined"){
        return localStorage.getItem("accessToken") 
      } return ""
    })

    

    const fetchData = async() => {
        if(hasUser) return;
        const res = await fetch(`http://127.0.0.1:8000/u/following`, {
          method: "GET",
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            'Authorization': "Bearer " + token,
          }
        })
        if(res.ok) {
          const info = await res.json()
          setFollowing(info.following)
          setHasUser(true)
          const decodedToken = jwtDecode(String(token))
          const authUsername = decodedToken.username
          setAuth(authUsername == params.username)
        }
      }

    fetchData()


  return (
    <div>
      <FollowTabs username={params.username} active="following" />
      {following ?
        <div className="py-4 flex flex-col gap-4">
            <FollowList following={following} token={token}/>
        </div>
         : 
        <div className="flex flex-col items-center gap-2 p-4">
          <h1 className="text-4xl font-bold text-left">Você não segue nenhuma conta :(</h1>
          <span className="font-light text-4xl text-left text-slate-400">Todas as contas que você seguir aparecerão aqui.</span>
        </div>
      }
    </div>
  );
}
