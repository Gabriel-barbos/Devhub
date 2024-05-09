import { Badge } from "@/components/ui/badge";

interface IBadge {
    badge: string
}

export default function BadgeComponent({badge}: IBadge) {
    return (
        <Badge variant="outline">{badge}</Badge>
    )
}