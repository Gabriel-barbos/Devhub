
from fastapi import  APIRouter, HTTPException,FastAPI, status, Depends
from models.Post import Post
from datetime import datetime
from bson import ObjectId
from db_config import postsCollection,usersCollection
from controllers.PostController import PostController
from controllers.UserController import UserController
app = FastAPI()
import json

from serializer.post_serializer import convertPost,convertPosts
from serializer.user_serializer import convertUser,convertUsers 



post_router = APIRouter(tags=['Posts'])

#* Post Routes
@post_router.get("/posts")
async def get_all_posts():
    try:
        posts = await PostController.get_all_posts()

        if posts == []:
             raise HTTPException(status_code=500, detail="Nenhum post adicionado")
             
        return posts
    except HTTPException as error:
         raise error
    

@post_router.get("/user/{username}/posts")
async def get_all_posts_of_user(username:str):
     try:

          userPosts =  postsCollection.find({"author_username": username})
          convertedPosts = convertPosts(userPosts)

          user = usersCollection.find({"username": username})
          convertedUsers = convertUsers(user)
          author_name = convertedUsers[0]['name']

          return {"posts": convertedPosts,
                  "name": author_name}


     except HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao encontrar posts") as error:
          return error




#  media: List[UploadFile] = File(None, media_type="image/*")  // Usar mais tarde pra por imagem

@post_router.post("/post")
async def create_post(post: Post,current_user: str = Depends(UserController.get_current_user)):
     try:

          post.created_at =  datetime.now()
          post.author_username = current_user['username']
          print("==============================")
          print(current_user['username'])
          print("==============================")
          
          insert = await PostController.insert_post(post)
          if not insert:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                           detail="Erro ao inserir")
          return insert

     except HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                           detail="Erro ao adicionar post") as error:
         raise error
    
# @post_router.get("/post/{username}")


@post_router.put("/post/update/{id}")
async def update_post(id:str, post_request: Post, current_user: str = Depends(UserController.get_current_user)):
     try: 
          print("====================================================")
          print(post_request)
          print("====================================================")
          updatedUser = await PostController.update_post(id,post_request)
          if updatedUser == False:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao realizar update")
          return updatedUser
     except HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Ocorreu um erro inesperado") as error:
          return error





@post_router.delete("/post/delete/{id}")
async def delete_post(id:str,current_user: str = Depends(UserController.get_current_user)):
   
     deletePost = await PostController.delete_post(id)
     if deletePost == False:
         return HTTPException(status_code=500, detail="Erro ao deletar usuário")
     return {"message": "Usuário deletado com sucesso!"}
