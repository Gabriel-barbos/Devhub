def convertUser(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "username": user["username"],
        "email": user["email"],
        "password": user["password"],
        "imagePath": user["imagePath"],
        "bio": user["bio"]
    }


def convertUsers(users) -> list:
    return [convertUser(user) for user in users]