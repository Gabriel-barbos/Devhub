"use client"

import { User, Home } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import EditButton from "./editbtn";
import { Button } from "../ui/button";
import Link from "next/link";
import StatsButton from "./stats-btn";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
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
            <a href={`/${decodedToken.username}/feed`} className="flex items-center gap-2">
                <Home />
                Feed
            </a>
            <a href={`/${decodedToken.username}`} className="flex items-center gap-2">
                <User />
                Meu perfil
            </a>
            <Button variant={"destructive"} className="w-[100px] hidden sm:flex" asChild>
              <Link href="/logout">Sair</Link>
            </Button>
          </div>
          <div className="sm:mt-auto sm:block">
            <div className="flex items-center space-x-2">
                <ThemeToggle />
              <EditButton email={undefined} id={undefined} password={undefined} />
                <StatsButton></StatsButton>
            </div>
          </div>
        </div>
    )
}

export default Sidebar;