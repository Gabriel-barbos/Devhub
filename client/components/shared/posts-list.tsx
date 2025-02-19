import Post from "@/components/shared/post-component"

interface Posts extends Array<any>{
    author_username: string
    likes_count: number
    content: string
    created_at: string
    id: string
    reply_to: string
}

interface IPostsListParams {
    posts: Posts | never[]
    name: string
    auth: boolean
    imageUrl: string
}


const PostsList = ({ posts, name, auth, imageUrl }: IPostsListParams) => {
    return (
        <div className="py-4 flex flex-col gap-4">
            {[...posts].toReversed().map((post: Posts, i) => {
                return <Post key={i} reply_to={post["reply_to"]} user={{name: name, username: post["author_username"]}} likes_count={post["likes_count"] || 0} content={post["content"]} created_at={post["created_at"]} id={post["id"]} auth={auth} imageUrl={imageUrl}/>
            })}
        </div>
    )
}

export default PostsList