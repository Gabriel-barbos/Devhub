"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface IPayload extends JwtPayload{
  username: string
}

interface PrivateRouteProps {
  children: ReactNode
}

const PublicRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)
  const token = localStorage.getItem("accessToken")
    useEffect(() => {
      
      if(token){
        setIsAuth(true)
        const decodedToken: IPayload = jwtDecode(String(token))
        router.push(`${decodedToken.username}`)
      }
    }, [token])
   
  
  return isAuth ? null : <>{children}</>
};

export default PublicRoute