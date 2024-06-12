"use client"

import ProfileHeader from "@/components/profile-page/profile-header"
import PostsList from "@/components/shared/posts-list"
import FollowTabs from "@/components/follow/follow-tabs";
import FollowList from "@/components/follow/follow-list";
import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface IPayload extends JwtPayload{
  username: string
}
export default function Page({ params }: { params: { username: string } }) {
  const [followers, setFollowers] = useState([])
  const [userId, setUserId] = useState('')
  const [hasUser, setHasUser] = useState(false)
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    } return ""
  })
  const fetchLoggedUserId = async() => {
    const decodedToken: IPayload = jwtDecode(String(token))
    const res = await fetch(`http://127.0.0.1:8000/user/${decodedToken.username}`, {
      method: "GET",
    })
    if(res.ok) {
      const info = await res.json()
      setUserId(info.data.id)
    }
  }
  const fetchData = async () => {
    if (hasUser) return;
    const res = await fetch(`http://127.0.0.1:8000/u/followers`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        'Authorization': "Bearer " + token,
      }
    })
    if (res.ok) {
      const info = await res.json()
      setFollowers(info.followers)
      setHasUser(true)
      const decodedToken = jwtDecode(String(token))
      const authUsername = decodedToken.username
      setAuth(authUsername == params.username)
      fetchLoggedUserId()
    }
  }

  fetchData()


  return (
    <div>
      <FollowTabs username={params.username} active="followers" />
      {followers ?
        <div className="py-4 flex flex-col gap-4">
          <FollowList followers={followers} token={token} isFollowingPage={false} userId={userId} />
        </div> :
        <div className="flex items-center gap-2 p-4">
          <h1 className="text-4xl font-bold">Você não possui seguidores :(</h1>
          <span className="font-light text-4xl text-slate-400">Todos que seguirem sua conta aparecerão aqui </span>
        </div>
      }
    </div>
  );
}
