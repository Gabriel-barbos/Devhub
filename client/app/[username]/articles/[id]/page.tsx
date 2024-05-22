"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import relativeTime from "@/lib/utils/relativeTime";
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link'

interface IArticles {
    author_username?: string,
    content?: string,
    created_at?: string,
    reply_to?: string
}

interface IComment {
    author_username: string,
    countLikes: boolean | number,
    content: string,
    id: string
}

export default function Page({params} : {params: {id: string}}) {
    const [articles, setArticles] = useState<IArticles>({});
    const [comments, setComments] = useState<IComment[]>([]);
    const [comment, setComment] = useState("");
   
    const { toast } = useToast();


    const [token, setToken] = useState(() => {
        if(typeof window !== "undefined"){
          return sessionStorage.getItem("accessToken") 
        } return ""
    })

    useEffect(() => {
        if(Object.keys(articles).length > 0) return;

        fetch(`http://127.0.0.1:8000/article/${params.id}/`)
        .then((data) => data.json())
        .then((res) => setArticles(res))
    }, [params.id, articles])    

    useEffect(() => {
        if(comments.length > 0) return;
        fetch(`http://127.0.0.1:8000/articles/${params.id}/comments?actualPostId=${params.id}`)
        .then((data) => data.json())
        .then((res) => setComments(res))
    }, [comments, params.id])

    const commentHandle = (e) => {
        setComment(e.target.value);
    }

    const commentArticleHandle = (e: { key: string; target: { value: any; }; }) => {
        if(e.key != "Enter") return;
        fetch(`http://127.0.0.1:8000/article/comment/${params.id}`, {
            "method": "POST",
            "headers": {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: `{"content":"${comment}"}`
        }).then((res) => {

            console.log(res)
            if(res.ok){
                toast({
                    variant: "default",
                    title: "Comentário feito com sucesso"
                })

                location.reload()
            }
        })
    }

    
    return (
        
        <div className="p-3 w-1/2 mx-auto">
            <div className="mb-3 flex items-center gap-2">
                <a href={articles.reply_to ? `/post/${articles.reply_to}` : `/${articles.author_username}`}>
                    <ArrowLeft />
                </a>
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">Artigo</h1>
            </div>
            <Card>
                <CardHeader className="flex items-center flex-row justify-between">
                    <div className="flex items-center gap-2">
                        <Link href={`/${articles.author_username}`}>
                            <CardTitle className="scroll-m-20 text-base leading-7 tracking-tight">@{articles.author_username}</CardTitle>
                        </Link>
                    </div>
                    <CardDescription>{articles.created_at && relativeTime(articles.created_at)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-base">{articles.content}</p>
                </CardContent>
                <Separator />
                <CardFooter className="py-6 px-3 w-100 !flex-col items-start">
                    <Textarea value={comment} onChange={commentHandle} onKeyDown={commentArticleHandle} placeholder={`Faça um comentário no post de @${articles.author_username}`} className="flex-1" />
                    <p className="mt-6 text-muted-foreground">Comentários <span className="text-muted">({comments.length})</span></p>
                    <Separator />
                    <div className="mt-4">
                        {comments.toReversed().map((comment, i) =>
                            <div key={i} className={"flex flex-col gap-1 mb-4"}>
                                <span className="text-xs text-muted-foreground">@{comment.author_username} disse:</span>
                                <p>{comment.content}</p>
                                <Link href={`/post/${comment.id}`} className="text-xs text-sky-400 flex align-center gap-2 text-sm">-> Ver comentários</Link>
                            </div>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
        
    )
}