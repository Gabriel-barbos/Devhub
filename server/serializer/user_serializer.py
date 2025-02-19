from serializer.badge_serializer import convertBadges

def convertUser(user) -> dict:

    if user["following"] != None:
             convertedFollowingList = []
             for follower in user["following"]:
                convertedFollowingList.append(follower)
             user["following"] = convertedFollowingList

    if user["followers"] != None:
             convertedFollowerList = []
             for follow in user["followers"]:
                convertedFollowerList.append(follow)
             user["followers"] = convertedFollowerList


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
        "badges": user["badges"],
        "following": user["following"],
        "followers": user["followers"],
        "created_at": user["created_at"]
    }


def convertUsers(users) -> list:
    return [convertUser(user) for user in users]