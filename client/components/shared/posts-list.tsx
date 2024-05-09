import Post from "@/components/shared/post-component"



const PostsList = ({ posts, name, auth, imageUrl }) => {
    return (
        <div className="py-4 flex flex-col gap-4">
            {posts.toReversed().map((post) => {
                return <Post user={{name: name, username: post["author_username"]}} likes_count={post["countLikes"] || 0} content={post["content"]} created_at={post["created_at"]} id={post["id"]} auth={auth} imageUrl={imageUrl}/>
            })}
           
        </div>
    )
}

export default PostsList