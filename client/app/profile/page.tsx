"use client"

import ProfileHeader from "@/components/profile-page/profile-header";
import ProfilePosts from "@/components/profile-page/profile-posts";
import ProfileTabs from "@/components/profile-page/profile-tabs";
import { useJwt } from "react-jwt"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
export default function Page() {
  const token = sessionStorage.getItem("accessToken")
  const router = useRouter()
  useEffect(() => {
    if(!token){
        router.push('/login')
  }
  })

  return (
    <div>
      <ProfileHeader></ProfileHeader>
      <ProfileTabs />
      <ProfilePosts />
    </div>
  );
}
