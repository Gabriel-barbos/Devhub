"use client"

import ProfileHeader from "@/components/profile-page/profile-header";
import ProfilePosts from "@/components/profile-page/profile-posts";
import ProfileTabs from "@/components/profile-page/profile-tabs";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
export default function Page() {
  
  const router = useRouter()
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken")
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
