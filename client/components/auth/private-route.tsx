"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter()
  const [hasToken, setHasToken] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if(token){
        setHasToken(true)
    }
    if (!token) {
      router.push('/login')
    }
  }, [])
  return hasToken ? <>{children}</> : null;
};

export default PrivateRoute