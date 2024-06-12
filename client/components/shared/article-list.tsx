import Article from "./article-component";

interface IArticleList {
    articles: any
    name: string
    auth: boolean
    imageUrl: string
}

const ArticleList = ({ articles, name, auth, imageUrl }: IArticleList) => {
    return (
        <div className="py-4 flex flex-col gap-4">
            {articles.toReversed().map((article: any, i: number)=> {
                return <Article key={i} reply_to={article["reply_to"]} user={{name: name, username: article["author_username"]}} likes_count={article["countLikes"] || 0} content={article["content"]} created_at={article["created_at"]} id={article["id"]} auth={auth} imageUrl={imageUrl} />;
            })}
        </div>
    )
} 

export default ArticleList