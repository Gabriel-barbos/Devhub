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

interface IUserStats {
    liked_posts_count: number;
    comments_made: number;
    replies_received: number;
    articles_count: number;
    projects_count: number;
    created_at: string;
    badges: number;
}

const StatsButton = () => {

    const [userStats, setUserStats] = useState<IUserStats | null>(null);
    
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
                            {/* <span>Quantidade de posts curtidos: {userStats.liked_posts_count}</span> */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <MessageCircle className="w-5 h-5 text-red-500" />
                            {/* <span>Quantidade de comentários feitos: {userStats.comments_made}</span> */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <MessageCircleReply className="w-5 h-5 text-red-500" />
                            {/* <span>Comentários recebidos: {userStats.replies_received}</span> */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Award className="w-5 h-5 text-red-500" />
                            {/* <span>Quantidade de Badges: {userStats.badges}</span> */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Newspaper className="w-5 h-5 text-red-500" />
                            {/* <span>Quantidade de Artigos: {userStats.articles_count}</span> */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Folders className="w-5 h-5 text-red-500" />
                            {/* <span>Quantidade de Projetos: {userStats.projects_count}</span> */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <CalendarDays className="w-5 h-5 text-red-500" />
                            {/* <span>Conta criada em: {new Date(userStats.created_at).toLocaleDateString()}</span> */}
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
