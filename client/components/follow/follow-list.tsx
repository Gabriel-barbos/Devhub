import FollowCard from "./follow-card"

const FollowList = ({ following }) => {
    return (
        <div className="py-4 flex flex-col gap-4">
            {following.map((follow, i) => {
                return <FollowCard key={i} username={follow["username"]} name={follow["name"]} imageUrl={follow["imagePath"]} bio={follow["bio"]} isFollowing = {true}/>
            })}
        </div>
    )
}

export default FollowList