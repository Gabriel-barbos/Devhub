def convertBadge(badge) -> dict:
    return {
        "id": str(badge["_id"]),
        "name": badge["name"],
        "imagePath": badge["imagePath"]
    }


def convertBadges(badges) -> list:
    return [convertBadge(badges) for badges in badges]

