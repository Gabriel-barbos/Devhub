"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Award, BarChartBig, CalendarDays, Folders, Heart, MessageCircle, MessageCircleReply, Newspaper } from "lucide-react"
import { useState, useEffect } from 'react';

interface UserStats {
    liked_posts_count: number;
    commments_made: number;
    replys_recieved: number;
    articles_count: number;
    projects_count:number;
    created_at;
    badges
  }


  const StatsButton: React.FC = () => {

    const [userStats, setUserStats] = useState({});
    const [badges, setBadges] = useState([])

    useEffect(() => {
        const fetchUserStats = async () => {
          try {
            const response = await fetch('http://127.0.0.1:8000/analytics');
            
            if (!response.ok) {
              throw new Error('Erro ao buscar estatísticas do usuário');
            }
          
            const data: UserStats = await response.json();
            setBadges(data.badges)
            setUserStats(data);
            if (response.ok) {
              console.log(data);
              }
          } catch (error) {
            console.error(error);
          } 
        };
    
        fetchUserStats();
      }, []);



    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <BarChartBig />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-6">Estatísticas da sua conta</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
            
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
                <span>Quantidade de posts curtidos: {userStats?.liked_posts_count}0</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle  className="w-5 h-5 text-red-500" />
                <span>Quantidade de comentarios feitos: {userStats?.commments_made}0</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircleReply className="w-5 h-5 text-red-500" />
                <span>Comentarios recebidos: {userStats?.replys_recieved}0</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award  className="w-5 h-5 text-red-500" />
                <span>Quantidade de Badges: {badges}4</span>
            </div>
            <div className="flex items-center space-x-2">
              <Newspaper  className="w-5 h-5 text-red-500" />
                <span>Quantidade de Artigos: {userStats?.articles_count} 0</span>
            </div>
            <div className="flex items-center space-x-2">
              <Folders  className="w-5 h-5 text-red-500" />
                <span>Quantidade de Projetos: {userStats?.projects_count} 0</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDays  className="w-5 h-5 text-red-500" />
                <span>Conta criada em: 2024</span>
            </div>
          

            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
export default StatsButton;