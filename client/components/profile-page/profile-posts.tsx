import Post from "@/components/shared/post-component"

const ProfilePosts = (posts) => {
    return (
        <div className="py-4 flex flex-col gap-4">
            <Post user={{name: "aa", username: "bb"}} likes={1} content={"safadeza"} created_at="11/11" />
        </div>
    )
}

export default ProfilePosts