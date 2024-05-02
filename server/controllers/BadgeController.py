from db_config import badgesCollection
from models.Badge import Badge
from serializer.badge_serializer import convertBadge,convertBadges

from bson import ObjectId

class BadgeController:
   
    async def insert_badge(data: Badge):
        result = badgesCollection.insert_one(dict(data))
        return convertBadge(badgesCollection.find_one({"_id": ObjectId(result.inserted_id)}))
        
    async def get_all_badges() -> list:
        return convertBadges(badgesCollection.find())


    async def get_by_id(id):
        return convertBadge(badgesCollection.find_one({"_id": ObjectId(id)}))    
    
    async def get_by_username(username:str):
        return convertBadge(badgesCollection.find({"author_username": username}))    


    async def update_badge(id, data: Badge) -> bool:
        badgesCollection.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(data)})
        return True

    async def save_picture(id, imageUrl: str) -> bool:
        badgesCollection.find_one_and_update({"_id": ObjectId(id)}, {"$set": { "imageUrl": imageUrl }})
        return True


    async def delete_badge(id) -> bool:
        deletebadge = badgesCollection.find_one_and_delete({'_id': ObjectId(id)})
        if deletebadge:
            return True
        return False
        
    

    

   
