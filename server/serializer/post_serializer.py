def convertPost(post) -> dict:
  
    
   
    
    return {
        "id": str(post["_id"]),
        "content": post["content"],
        "media": post["media"],
        "author_username": post["author_username"],
        "countLikes": post["countLikes"],
        "countComments": post["countComments"],
        "created_at": post["created_at"],
        "reply_to": post["reply_to"]
    }

def convertPosts(posts) -> list:
    return [convertPost(post) for post in posts]

