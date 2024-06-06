"use client"

import ProfileHeader from "@/components/profile-page/profile-header"
import PostsList from "@/components/shared/posts-list"
import ProfileTabs from "@/components/profile-page/profile-tabs"
import PostMaker from "@/components/shared/post-maker";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
export default function Page({params} : {params: {username: string}}) {
  
    const [postsGroup, setPostsGroup] = useState({posts: [], name: ""});
    const [imageUrl, setImageUrl] = useState('')
    const [id, setId] = useState("")
    const [name, setName] = useState("")
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
      const res = await fetch(`http://127.0.0.1:8000/following-feed`, {
          method: "GET",
          headers: {
            // Replace 'your_access_token' with your actual access token
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            'Authorization': "Bearer " + token,
          }
        })
        if(res.ok) {
          const posts = await res.json()
          setPostsGroup(posts)
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA / " + posts)
        }
    }

    const fetchData = async() => {
        if(hasUser) return;
        fetchPosts()
      }

    fetchData()

    return (
        <div>
        {postsGroup.posts.length > 0 && 
          <PostsList name={name} posts={postsGroup.posts} auth={auth} imageUrl={imageUrl} />
        } 
        </div>
       );
  }
  