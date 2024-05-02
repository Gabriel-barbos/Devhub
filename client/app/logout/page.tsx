"use client"

import { useRouter } from "next/navigation"

export default function Page(){
    const router = useRouter()
    sessionStorage.removeItem("accessToken")
    router.push('/login')
}