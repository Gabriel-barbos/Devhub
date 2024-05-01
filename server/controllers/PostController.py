from db_config import postsCollection
from models.Post import Post
from serializer.post_serializer import convertPost,convertPosts

from bson import ObjectId

class PostController:
   
    async def insert_post(data: Post):
        result = postsCollection.insert_one(dict(data))
        return convertPost(postsCollection.find_one({"_id": ObjectId(result.inserted_id)}))
        
    async def get_all_posts() -> list:
        return convertPosts(postsCollection.find())


    async def get_by_id(id):
        return convertPost(postsCollection.find_one({"_id": ObjectId(id)}))    
    
    async def get_by_username(username:str):
        return convertPost(postsCollection.find({"author_username": username}))    


    async def update_post(id, data: Post) -> bool:
        postsCollection.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(data)})
        return True

    async def save_picture(id, imageUrl: str) -> bool:
        postsCollection.find_one_and_update({"_id": ObjectId(id)}, {"$set": { "imageUrl": imageUrl }})
        return True


    async def delete_post(id) -> bool:
        deletePost = postsCollection.find_one_and_delete({'_id': ObjectId(id)})
        if deletePost:
            return True
        return False
        
    

    

   
