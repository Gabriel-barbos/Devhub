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
    following: (Following)[];
    followers: (Followers)[];
    isFollowingPage: boolean
    token: string
    userId: string
}

const FollowList = ({ following, followers, token, isFollowingPage, userId}: IFollowListParams) => {
    const checkIfFollowing = (follow: Following | Followers): boolean => {
        return follow.followers.includes(userId)
      };
    return (
        <div className="py-4 flex flex-col gap-4">
            {isFollowingPage ? following && following.map((follow, i) => {
                const isFollowing = checkIfFollowing(follow)
                return <FollowCard key={i} username={follow["username"]} name={follow["name"]} imagePath={follow["imagePath"]} bio={follow["bio"]} id={follow["id"]} isFollowing = {isFollowing} token={token} />
            }) : followers && followers.map((follow, i) => {
                const isFollowing = checkIfFollowing(follow)
                return <FollowCard key={i} username={follow["username"]} name={follow["name"]} imagePath={follow["imagePath"]} bio={follow["bio"]} id={follow["id"]} isFollowing = {isFollowing} token={token} />
            })}
        </div>
    )
}

export default FollowList