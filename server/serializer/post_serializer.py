def convertPost(post) -> dict:
    return {
        "id": str(post["_id"]),
        "content": post["content"],
        "media": post["media"],
        "author_username": post["author_username"],
        "created_at": post["created_at"]
    }


def convertPosts(posts) -> list:
    return [convertPost(post) for post in posts]

