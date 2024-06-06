"use client"

import ProfileHeader from "@/components/profile-page/profile-header"
import PostsList from "@/components/shared/posts-list"
import FollowTabs from "@/components/follow/follow-tabs";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export default function Page({ params }: { params: { username: string } }) {

 
    const [imageUrl, setImageUrl] = useState('')
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [followers, setFollowers] = useState([])
    const [imagePath, setImagePath] = useState("")
    const [hasUser, setHasUser] = useState(false)
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(() => {
      if(typeof window !== "undefined"){
        return localStorage.getItem("accessToken") 
      } return ""
    })

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
        } else {
          console.error('Failed to fetch image:', res.statusText);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    const fetchData = async() => {
        if(hasUser) return;
        const res = await fetch(`http://127.0.0.1:8000/u/followers}`, {
          method: "GET",
        })
        if(res.ok) {
          const info = await res.json()
          setName(info.data.name)
          setBio(info.data.bio)
          setId(info.data.id)
          setImagePath(info.data.imagePath)
          setFollowers(info.data.followers)
          setHasUser(true)
          fetchImage(info.data.imagePath)
          
          const decodedToken = jwtDecode(String(token))
          const authUsername = decodedToken.username
          setAuth(authUsername == params.username)
        }
      }

    fetchData()


  return (
    <div>
      <FollowTabs username={params.username} active="followers" />
      {followers ?
        <div><h1>testezinho</h1>
        
        
        
        <div className="py-4 flex flex-col gap-4">
            {followers.toReversed().map((follower, i) => {
                return <p>
                nome: {name}, bio: {bio}, username: @{params.username}
              </p>
            })}
        </div>
        </div> : 
        <div className="flex items-center gap-2 p-4">
          <h1 className="text-4xl font-bold">Você não possui seguidores</h1>
          <span className="font-light text-4xl text-slate-400">:Todos que seguirem sua conta aparecerão aqui </span>
        </div>
      }
    </div>
  );
}
