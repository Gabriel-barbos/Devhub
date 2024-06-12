"use client"
import FollowCard from "./follow-card"
import { useEffect, useState } from "react"

type Following = {
    id: string
    name: string
    username: string
    imagePath: string
    bio: string
    followers: (string)[]
}

type Followers = {
    id: string
    name: string
    username: string
    imagePath: string
    bio: string
    followers: (string)[]
}

interface IFollowListParams {
    following?: (Following)[];
    followers?: (Followers)[];
    isFollowingPage: boolean
    token: string | null
    userId: string
    auth: boolean
}

const FollowList = ({ following, followers, token, isFollowingPage, userId, auth}: IFollowListParams) => {
    const checkIfFollowing = (follow: Following | Followers): boolean => {
        return follow.followers.includes(userId)
      };
    return (
        <div className="py-4 flex flex-col gap-4">
            {isFollowingPage ? following && following.map((follow, i) => {
                const isFollowing = checkIfFollowing(follow)
                return <FollowCard key={i} username={follow["username"]} name={follow["name"]} imagePath={follow["imagePath"]} bio={follow["bio"]} id={follow["id"]} isFollowing = {isFollowing} token={token}  userId={userId} />
            }) : followers && followers.map((follow, i) => {
                const isFollowing = checkIfFollowing(follow)
                return <FollowCard key={i} username={follow["username"]} name={follow["name"]} imagePath={follow["imagePath"]} bio={follow["bio"]} id={follow["id"]} isFollowing = {isFollowing} token={token} userId={userId}/>
            })}
        </div>
    )
}

export default FollowList