"use client"

import { useRouter } from "next/navigation"

export default function Page(){
    const router = useRouter()
    localStorage.removeItem("accessToken")
    router.push('/login')
}