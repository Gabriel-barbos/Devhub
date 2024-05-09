import { Badge } from "@/components/ui/badge";

type Badge = {
    _id: string
    name: string
    imagePath: string
}

interface IProfileBadgesParams {
    badges: (Badge)[]
}

export function ProfileBadges({badges}: IProfileBadgesParams) {
    return (
        <div className="w-full flex flex-row flex-wrap gap-1">
            {badges.map((badge) => {
                return <Badge>{badge.name}</Badge>
            })}
            
        </div>
    )
}