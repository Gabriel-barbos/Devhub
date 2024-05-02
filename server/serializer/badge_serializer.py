def convertBadge(badges) -> dict:
    return {
        "id": str(badges["_id"]),
        "name": badges["name"]
    }


def convertBadges(badges) -> list:
    return [convertBadge(badges) for badges in badges]

