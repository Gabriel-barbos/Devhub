def convertUser(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "hashed_password": user["hashed_password"]
    }


def convertUsers(users) -> list:
    return [convertUser(user) for user in users]