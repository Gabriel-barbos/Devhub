import Post from "@/components/shared/post-component"

const ProfilePosts = () => {
    return (
        <div className="py-4 flex flex-col gap-4">
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    )
}

export default ProfilePosts