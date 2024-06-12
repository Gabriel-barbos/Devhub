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
import relativeTime from "@/lib/utils/relativeTime";

interface IUserStats {
    liked_posts_count?: number;
    comments_made?: number;
    replies_received?: number;
    articles_count?: number;
    projects_count?: number;
    created_at?: string;
    badges?: [];
}

const StatsButton = ({liked_posts_count, comments_made, replies_received, articles_count, projects_count, created_at, badges}: IUserStats) => {

    
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
                             <span>Quantidade de posts curtidos: {liked_posts_count}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MessageCircle className="w-5 h-5 text-red-500" />
                          <span>Quantidade de comentários feitos: {comments_made}</span> 
                        </div>
                        <div className="flex items-center space-x-2">
                            <MessageCircleReply className="w-5 h-5 text-red-500" />
                            <span>Comentários recebidos: {replies_received}</span> 
                        </div>
                        <div className="flex items-center space-x-2">
                            <Award className="w-5 h-5 text-red-500" />
                            <span>Quantidade de Badges: {badges?.length}</span> 
                        </div>
                        <div className="flex items-center space-x-2">
                            <Newspaper className="w-5 h-5 text-red-500" />
                           <span>Quantidade de Artigos: {articles_count}</span> 
                        </div>
                        <div className="flex items-center space-x-2">
                            <Folders className="w-5 h-5 text-red-500" />
                           <span>Quantidade de Projetos: {projects_count}</span> 
                        </div>
                        <div className="flex items-center space-x-2">
                            <CalendarDays className="w-5 h-5 text-red-500" />
                            <span>Conta criada em: {created_at ? relativeTime(created_at): "Nan"}</span> 
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
