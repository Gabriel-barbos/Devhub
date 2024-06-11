
import FollowCard from "./follow-card"

const FollowList = ({ following, token}) => {
    
    
    return (
        <div className="py-4 flex flex-col gap-4">
            {following.map((follow, i) => {
                return <FollowCard key={i} username={follow["username"]} name={follow["name"]} imagePath={follow["imagePath"]} bio={follow["bio"]} isFollowing = {true} token={token}/>
            })}
        </div>
    )
}

export default FollowList