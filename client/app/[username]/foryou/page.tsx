"use client"

import ProfileHeader from "@/components/profile-page/profile-header"
import PostsList from "@/components/shared/posts-list"
import FeedTabs from "@/components/feed/feed-tabs";
import PostMaker from "@/components/shared/post-maker";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export default function Page({params} : {params: {username: string}}) {
  
    const [postsGroup, setPostsGroup] = useState({posts: [], name: ""});
    const [imageUrl, setImageUrl] = useState('')
    const [id, setId] = useState("")
    const [name, setName] = useState("n")
    const [bio, setBio] = useState("")
    const [imagePath, setImagePath] = useState("")
    const[defaultBadges, setDefaultBadges] = useState([])
    const [badges, setBadges] = useState([])
    const [hasUser, setHasUser] = useState(false)
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(() => {
      if(typeof window !== "undefined"){
        return localStorage.getItem("accessToken") 
      } return ""
    })

    const fetchPosts = async () => {
      const res = await fetch(`http://127.0.0.1:8000/posts`, {
          method: "GET",
          headers: {
            // Replace 'your_access_token' with your actual access token
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            'Authorization': "Bearer " + token,
          }
        })
        if(res.ok) {
          const data = await res.json()
          setPostsGroup({posts: data.posts, name: data.posts.author_username})
          console.log(postsGroup)
        }
    }
    
    useEffect(() => {
      fetchPosts()
    }, []); 
    

    return (
      <div>
      <FeedTabs username={params.username} active="foryou" />
      {postsGroup.posts.length > 0 ?
        <PostsList name={name} posts={postsGroup.posts} auth={auth} imageUrl={imageUrl} /> : 
        <div className="flex items-center gap-2 p-4">
          <h1 className="text-4xl font-bold">Não há posts para exibição</h1>
          <span className="font-light text-4xl text-slate-400">:{"("} </span>
        </div>
      }
    </div>
       );
  }
  