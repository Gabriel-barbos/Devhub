
from typing import List
from fastapi import  APIRouter, Form, HTTPException,FastAPI, status, Depends
from bson import ObjectId,Binary
from db_config import badgesCollection,usersCollection

from controllers.BadgeController import BadgeController
from controllers.UserController import UserController
app = FastAPI()
import json
from models.Badge import Badge, UpdateBadge

from serializer.post_serializer import convertPost,convertPosts
from serializer.user_serializer import convertUser,convertUsers 
from serializer.badge_serializer import convertBadge,convertBadges 


badge_router = APIRouter(tags=['Badges'])

#* Post Routes
@badge_router.get("/badges")
async def get_all_badges():
    try:
        badges = await BadgeController.get_all_badges()
        print(badges)
        if badges == []:
             raise HTTPException(status_code=500, detail="Nenhum post adicionado")
             
        return badges
    except HTTPException as error:
         raise error
    

# @badge_router.get("/user/{username}/posts")
# async def get_all_posts_of_user(username:str):
#      try:

#           userPosts =  postsCollection.find({"author_username": username})
#           convertedPosts = convertPosts(userPosts)

#           user = usersCollection.find({"username": username})
#           convertedUsers = convertUsers(user)
#           author_name = convertedUsers[0]['name']

#           return {"posts": convertedPosts,
#                   "name": author_name}


#      except HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao encontrar posts") as error:
#           return error




#  media: List[UploadFile] = File(None, media_type="image/*")  // Usar mais tarde pra por imagem

@badge_router.post("/badge")
async def create_one_badge(badge: Badge):
     try:
          
          insert = await BadgeController.insert_badge(badge)
          if not insert:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                           detail="Erro ao inserir")
          return insert

     except HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                           detail="Erro ao adicionar badge") as error:
         return error
    
@badge_router.post("/badges")
async def create_many_badges(badges: List[Badge]):
     try:
          
          insert = await BadgeController.insert_badge(badges)
          if not insert:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                           detail="Erro ao inserir")
          return insert

     except HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                           detail="Erro ao adicionar badge") as error:
         return error


@badge_router.put("/badge/update/{id}")
async def update_badge(id:str, badge_request: List[str]):
     try: 
          print("====================================================")
          print(badge_request)
          print("====================================================")
          badgeDict = convertBadges(badge_request)
          updatedUser = await usersCollection.find_one_and_update({"_id": ObjectId(id)}, {"$set":badgeDict},False)
          print("====================================================")
          print(updatedUser)
          print("====================================================")
          if not updatedUser:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao realizar update")
          return updatedUser
     except HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Ocorreu um erro inesperado") as error:
          return error





# @badge_router.delete("/post/delete/{id}")
# async def delete_post(id:str,current_user: str = Depends(UserController.get_current_user)):
   
#      deletePost = await PostController.delete_post(id)
#      if deletePost == False:
#          return HTTPException(status_code=500, detail="Erro ao deletar usuário")
#      return {"message": "Usuário deletado com sucesso!"}
