import Article from "./article-component";


const ArticleList = ({ articles, name, auth, imageUrl }: IArticleList) => {
    return (
        <div className="py-4 flex flex-col gap-4">
            {articles.toReversed().map((article, i)=> {
                return <Article key={i} reply_to={article["reply_to"]} user={{name: name, username: article["author_username"]}} likes_count={article["countLikes"] || 0} content={article["content"]} created_at={article["created_at"]} id={article["id"]} auth={auth} imageUrl={imageUrl} />;
            })}
        </div>
    )
} 

export default ArticleList