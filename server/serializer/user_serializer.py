from serializer.badge_serializer import convertBadges

def convertUser(user) -> dict:


    if user["badges"] != None:
             convertedBadgeList = []
             for badge in user["badges"]:
                convertedBadgeList.append(badge)
             user["badges"] = convertedBadgeList

    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "username": user["username"],
        "email": user["email"],
        "password": user["password"],
        "imagePath": user["imagePath"],
        "bio": user["bio"],
        "badges": user["badges"]
    }


def convertUsers(users) -> list:
    return [convertUser(user) for user in users]