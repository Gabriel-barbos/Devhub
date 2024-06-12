"use client"

import { User, Home, Bell } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import EditButton from "./editbtn";
import { Button } from "../ui/button";
import Link from "next/link";
import StatsButton from "./stats-btn";
import { useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import EditAccount from "./edit-credentials";

interface IPayload extends JwtPayload{
  username: string
}

interface IEditAccountParams{
  email: string
  id: string
  password: string
}

interface IUserStats {
  liked_posts_count?: number;
  comments_made?: number;
  replies_received?: number;
  articles_count?: number;
  projects_count?: number;
  created_at?: string;
  badges?: [];
}

const Sidebar = ({email,password,id}: IEditAccountParams) => {
  
  const [hasUser, setHasUser] = useState(false)
  const [stats, setStats] = useState<IUserStats | null>([])
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken") 
})
  const decodedToken: IPayload = jwtDecode(String(token))
  const fetchUserStats = async () => {
    if(hasUser) return
    const res = await fetch('http://localhost:8000/analytics', {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        'Authorization': "Bearer " + token,
      }
    });
    if(res.ok){
      const stats: IUserStats = await res.json()
      setStats(stats)
      setHasUser(true)
    }
  }

  fetchUserStats()
    return (
        <div className={"p-8 sm:h-screen relative flex sm:flex-col items-center sm:items-start justify-between"}>
          <h1 className="font-black sm:text-6xl md:text-2xl dark:text-slate-50">devhub</h1>
          <div className="flex flex-col sm:mt-10 sm:gap-4 justify-between">
            <Link href={`/${decodedToken.username}/feed`}  className="flex items-center gap-2">
              <Home />
                Página Inicial
            </Link>
            <Link href={`/${decodedToken.username}`}  className="flex items-center gap-2">
              <User />
              Meu perfil
            </Link>
            <Link href={`/${decodedToken.username}/notifications`} className="flex items-center gap-2">
              <Bell />
              Notificações
            </Link>
            <Button variant={"destructive"} className="w-[100px] hidden sm:flex" asChild>
              <Link href="/logout">Sair</Link>
            </Button>
          </div>
          <div className="sm:mt-auto sm:block">
            <div className="flex items-center space-x-2">
                <ThemeToggle />
                <EditAccount email={email} password={password} id={id} />
               <StatsButton liked_posts_count={stats?.liked_posts_count} comments_made={stats?.comments_made} replies_received={stats?.replies_received} articles_count={stats?.articles_count} projects_count={stats?.projects_count} created_at={stats?.created_at} badges={stats?.badges}></StatsButton>
            </div>
          </div>
        </div>
    )
}

export default Sidebar;