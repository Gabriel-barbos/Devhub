"use client"

import { User, Home, Bell } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import EditButton from "./editbtn";
import { Button } from "../ui/button";
import Link from "next/link";
import StatsButton from "./stats-btn";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import EditAccount from "./edit-credentials";

interface IEditAccountParams{
  email: string,
  id: string,
  password: string
}

const Sidebar = ({email,password,id}: IEditAccountParams) => {
  const [token, setToken] = useState(() => {
    if(typeof window !== "undefined"){
      return localStorage.getItem("accessToken") 
    } return ""
  })
  const decodedToken = jwtDecode(String(token))

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
               <StatsButton liked_posts_count={0} commments_made={0} replys_recieved={0} articles_count={0} projects_count={0} created_at={undefined} badges={undefined}></StatsButton>
            </div>
          </div>
        </div>
    )
}

export default Sidebar;