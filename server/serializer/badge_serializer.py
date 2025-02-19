def convertBadge(badge) -> dict:
    return {
        "_id": badge["_id"],
        "name": badge["name"],
        "imagePath": badge["imagePath"]
    }


def convertBadges(badges) -> list:
    return [convertBadge(badge) for badge in badges]

