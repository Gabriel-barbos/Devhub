export default function FollowTabs({username, active}){
    return (
    <div className="flex sticky top-0 py-4 bg-gradient-to-b from-background to-transparent">
        <a href={`/${username}/followers`} className={`flex-1 text-center text-base text-neutral-400 ${active == "followers" && "font-semibold !text-white"}`}>Seguidores</a>
        <a href={`/${username}/following`} className={`flex-1 text-base text-center text-neutral-400 ${active == "following" && "font-semibold !text-white"}`}>Seguindo</a>
    </div> )
}