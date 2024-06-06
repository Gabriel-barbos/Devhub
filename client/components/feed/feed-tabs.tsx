export default function FeedTabs({username, active}){
    return (
    <div className="flex sticky top-0 py-4 bg-gradient-to-b from-background to-transparent">
        <a href={`/${username}/feed`} className={`flex-1 text-center text-base text-neutral-400 ${active == "feed" && "font-semibold !text-white"}`}>Seguindo</a>
        <a href={`/${username}/foryou`} className={`flex-1 text-base text-center text-neutral-400 ${active == "foryou" && "font-semibold !text-white"}`}>Para você</a>
    </div> )
}