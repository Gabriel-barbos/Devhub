"use client"

import ProfileHeader from "@/components/profile-page/profile-header"
import PostsList from "@/components/shared/posts-list"
import ProfileTabs from "@/components/profile-page/profile-tabs"
import PostMaker from "@/components/shared/post-maker";
import { useState, useEffect } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface IUserStats {
  liked_posts_count: number;
  comments_made: number;
  replies_received: number;
  articles_count: number;
  projects_count: number;
  created_at: string;
  badges: number;
}

interface IPayload extends JwtPayload{
  username: string
}

export default function Page({params} : {params: {username: string}}) {
  
    const [postsGroup, setPostsGroup] = useState({posts: [], name: ""});
    const [imageUrl, setImageUrl] = useState('')
    const [id, setId] = useState("")
    const [userId, setUserId] = useState('')
    const [name, setName] = useState("")
    const [bio, setBio] = useState("")
    const [isFollowing, setIsFollowing] = useState(false)
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
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

    useEffect(() => {
      fetchData()
      let isUserFollowing = false;
      if(followers){
        for (let i = 0; i < followers.length; i++) {
          if (userId === followers[i]) {
            isUserFollowing = true
            break
          }
        }
      }
      setIsFollowing(isUserFollowing); 
    }, [userId, followers]);

    const fetchUserStats = async () => {
      const res = await fetch('http://localhost:8000/analytics', {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " + token,
        }
      });

      if(res.ok){
        const stats: IUserStats = await res.json()
      }
    }

          
      


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
    
    const fetchPosts = async () => {
      const res = await fetch(`http://127.0.0.1:8000/user/${params.username}/posts`, {
          method: "GET",
        })
        if(res.ok) {
          const {posts} = await res.json()
          setPostsGroup({posts: posts, name: posts});
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

    const fetchImage = async (imagePath: string) => {
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
        fetchLoggedUserId()
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
          setFollowing(info.data.following)
          setFollowers(info.data.followers)
          setHasUser(true)
          fetchPosts()
          fetchDefaultBadges()
          fetchImage(info.data.imagePath)
          fetchUserStats()
          const decodedToken: IPayload = jwtDecode(String(token))
          const authUsername = decodedToken.username
          setAuth(authUsername === params.username)
          
        } 
        
      }

    

    if(!hasUser){
        return (
            <div>
                <ProfileHeader auth={auth} name={name} username={params.username} bio={bio} id={id} imagePath={imagePath} badges={badges} defaultBadges={defaultBadges} imageUrl={imageUrl} token={token} following={following} followers={followers} userId={userId} isFollowing={isFollowing}></ProfileHeader>
                <div className="flex flex-col justify-center items-start gap-2">
                    <h1 className="text-5xl font-bold">Essa conta não existe</h1>
                    <span className="font-light text-slate-400">Tente procurar outra conta</span>
                </div>
            </div>
        )
    }  



    return (
        <div>
        <ProfileHeader auth={auth} name={name} username={params.username} bio={bio} id={id} imagePath={imagePath} badges={badges} defaultBadges={defaultBadges} imageUrl={imageUrl} token={token} following={following} followers={followers} userId={userId} isFollowing={isFollowing}></ProfileHeader>
        <ProfileTabs username={params.username} active="posts" />
        {auth && <PostMaker name={name} username={params.username} imageUrl={imageUrl}/>}
        {postsGroup.posts.length > 0 && 
          <PostsList name={name} posts={postsGroup.posts} auth={auth} imageUrl={imageUrl} />
        } 
        
        </div>
       );
  }
  