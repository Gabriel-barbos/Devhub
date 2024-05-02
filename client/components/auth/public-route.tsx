"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';


interface PrivateRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)
  const token = sessionStorage.getItem("accessToken")
    useEffect(() => {
      
      if(token){
        setIsAuth(true)
        const decodedToken = jwtDecode(token)
        router.push(`/profile/${decodedToken.username}`)
      }
    }, [token])
   
  
  return isAuth ? null : <>{children}</>
};

export default PublicRoute