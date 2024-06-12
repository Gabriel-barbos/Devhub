'use client'

interface IArticle {
    user: string
    likes_count: number
    content: string
    created_at: string
    id: string
    auth: boolean
    imageUrl: string
    reply_to: string
}

const Article =({user, likes_count, content, created_at, id, auth, imageUrl, reply_to}: IArticle) => {

    interface IArticleReplied {
        author_username?: string;

    }

    return(
        <div className="article">
            aqui vai ter um artigo
        </div>
    ) 
            
}

export default Article;