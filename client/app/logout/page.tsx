"use client"

import { useRouter } from "next/navigation"

export default function Page(){
    const route = useRouter()
    sessionStorage.removeItem("accessToken")
    route.push('/login')
}