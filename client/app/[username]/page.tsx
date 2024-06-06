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
      const res = await fetch(`http://127.0.0.1:8000/user/${params.username}/posts`, {
          method: "GET",
        })
        if(res.ok) {
          const {name, posts} = await res.json()
          setPostsGroup({posts: posts, name: name});
        }
    }

    const fetchDefaultBadges = async() => {
      const res = await fetch("http://127.0.0.1:8000/badges", {
              method: "GET",
            })
            if(res.ok) {
              const badges = await res.json()
              setDefaultBadges(badges);
            }
    }

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
        const res = await fetch(`http://127.0.0.1:8000/user/${params.username}`, {
          method: "GET",
        })
        if(res.ok) {
          const info = await res.json()
          setName(info.data.name)
          setBio(info.data.bio)
          setId(info.data.id)
          setImagePath(info.data.imagePath)
          setBadges(info.data.badges)
          setHasUser(true)
          fetchPosts()
          fetchDefaultBadges()
          fetchImage(info.data.imagePath)
          
          const decodedToken = jwtDecode(String(token))
          const authUsername = decodedToken.username
          setAuth(authUsername == params.username)
        }
      }

    fetchData()



    if(!hasUser){
        return (
            <div>
                <ProfileHeader auth={auth} name={name} username={params.username} bio={bio} id={id} imagePath={imagePath} badges={badges} defaultBadges={defaultBadges} imageUrl={imageUrl}></ProfileHeader>
                <div className="flex flex-col justify-center items-start gap-2">
                    <h1 className="text-5xl font-bold">Essa conta não existe</h1>
                    <span className="font-light text-slate-400">Tente procurar outra conta</span>
                </div>
            </div>
        )
    }  



    return (
        <div>
        <ProfileHeader auth={auth} name={name} username={params.username} bio={bio} id={id} imagePath={imagePath} badges={badges} defaultBadges={defaultBadges} imageUrl={imageUrl}></ProfileHeader>
        <ProfileTabs username={params.username} active="posts" />
        {auth && <PostMaker name={name} username={params.username} imageUrl={imageUrl}/>}
        {postsGroup.posts.length > 0 && 
          <PostsList name={name} posts={postsGroup.posts} auth={auth} imageUrl={imageUrl} />
        } 
        
        </div>
       );
  }
  