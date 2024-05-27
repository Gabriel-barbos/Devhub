def convertPost(post) -> dict:
  
    
    if post["likes"] != None:
                convertedLikeList = []
                for idLike in post["likes"]:
                    convertedLikeList.append(idLike)
                post["likes"] = convertedLikeList
    
    return {
        "id": str(post["_id"]),
        "content": post["content"],
        "media": post["media"],
        "author_username": post["author_username"],
        "likes": post["likes"],
        "likes_count": post["likes_count"],
        "countComments": post["countComments"],
        "created_at": post["created_at"],
        "reply_to": post["reply_to"]
    }

def convertPosts(posts) -> list:
    return [convertPost(post) for post in posts]