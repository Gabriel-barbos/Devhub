
from typing import List
from fastapi import  APIRouter, Form, HTTPException,FastAPI, status, Depends
from bson import ObjectId,Binary
from db_config import badgesCollection,usersCollection

from controllers.BadgeController import BadgeController
from controllers.UserController import UserController
app = FastAPI()
import json
from typing import List
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
    




#  media: List[UploadFile] = File(None, media_type="image/*")  // Usar mais tarde pra por imagem




@badge_router.put("/badge/update")
def update_user_badge(badges_id: List[int], current_user: str = Depends(UserController.get_current_user)):
     try: 
          
          #* Pegar os badges do banco de dados pelo id
          BadgeList = []
          for id in badges_id:
             badge = badgesCollection.find_one({"_id":id})
             badge = convertBadge(badge)
             BadgeList.append(badge)
     
          #* Converter lista de Models para lista de Dict
          convertedBadgeList = []
          for badge in BadgeList:
                convertedBadgeList.append(dict(badge))
       
          updatedUser =  usersCollection.find_one_and_update({"_id": ObjectId(current_user['_id'])}, {"$set":{"badges":convertedBadgeList}})
          
          if not updatedUser:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao realizar update")
          
          return HTTPException(status_code=status.HTTP_200_OK, detail="Usuário atualizado com sucesso")
     
     except HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Ocorreu um erro inesperado") as error:
          return error





# @badge_router.delete("/post/delete/{id}")
# async def delete_post(id:str,current_user: str = Depends(UserController.get_current_user)):
   
#      deletePost = await PostController.delete_post(id)
#      if deletePost == False:
#          return HTTPException(status_code=500, detail="Erro ao deletar usuário")
#      return {"message": "Usuário deletado com sucesso!"}
