

const ProfileTabs = ({username, active}) => {
    return (
    <div className="flex sticky top-0 py-4 bg-gradient-to-b from-background to-transparent">
        <a href={`/${username}`} className={`flex-1 text-base text-center text-neutral-400 ${active == "posts" && "font-semibold !text-white"}`}>Posts</a>
        <a href={`/${username}/articles`} className={`flex-1 text-center text-base text-neutral-400 ${active == "articles" && "font-semibold !text-white"}`}>Artigos</a>
        <a href={`/${username}/projects`} className={`flex-1 text-center text-base text-neutral-400 ${active == "projects" && "font-semibold !text-white"}`}>Projetos</a>
    </div> )
}

export default ProfileTabs;