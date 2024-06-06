
from fastapi import  APIRouter, HTTPException,FastAPI, status, Depends
from models.Post import Post
from datetime import datetime
from bson import ObjectId
from db_config import postsCollection,usersCollection
from controllers.PostController import PostController
from controllers.UserController import UserController
import json

from serializer.post_serializer import convertPost,convertPosts
from serializer.user_serializer import convertUser,convertUsers 
from typing import List


post_router = APIRouter(tags=['Posts'])

#* Post Routes
@post_router.get("/posts")
async def get_all_posts():
    try:
        posts = await PostController.get_all_posts()

        if posts == []:
             raise HTTPException(status_code=500, detail="Nenhum post adicionado")
             
        return {"posts": posts}
    except HTTPException as error:
         return error
    

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


@post_router.get("/post/{id}/")
def get_one_post(id:str):
     try:
          post = postsCollection.find_one({"_id": ObjectId(id)})
          if not post:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                           detail="Erro ao consultar post")
          convertedPost = convertPost(post)

          return convertedPost
     except:
          return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                           detail="Um erro inesperado ocorreu ao consultar post")


 
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
   try:
     deletePost = await PostController.delete_post(id)
     if deletePost == False:
         return HTTPException(status_code=500, detail="Erro ao deletar post")
     return HTTPException(status_code=status.HTTP_200_OK, detail="Post deletado com sucesso!")
   except:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao deletar post")
     

@post_router.post("/post/comment/{actualPostId}")
def comment_post(actualPostId: str, commentPost: Post,current_user: str = Depends(UserController.get_current_user)):
      try:
          
          commentPost.created_at =  datetime.now()
          commentPost.author_username = current_user['username']
          commentPost.reply_to = actualPostId


          addComment = postsCollection.insert_one(dict(commentPost))
      
          if not addComment:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                    detail="Erro ao comentar")
          
          return HTTPException(status_code=status.HTTP_200_OK, 
                               detail="Comentario adicionado!")

      except: 
           return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Erro ao comentar post")
      
@post_router.get("/post/{id}/comments")
def get_all_comments_of_post(actualPostId: str):
     try:
          
          comments = postsCollection.find({"reply_to": actualPostId})
          convertedComments = convertPosts(comments)
         
          if not comments:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                    detail="Erro ao comentar")
          
          return convertedComments

     except: 
           return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Erro inesperado")
     

@post_router.post("/post/like/{id}")
def like_post(id:str,current_user: str = Depends(UserController.get_current_user)):
     try:
          userId = ObjectId(current_user['_id'])
          postId = id

          postLikes = postsCollection.find_one({"_id":ObjectId(postId)},{"_id": 0, "likes": 1})

          # #* Pegar os seguidores atuais no banco de dados e inserir o novo
          likes = []
          if postLikes["likes"] != None:
               for idLike in postLikes['likes']:
                    if idLike == str(userId):
                         return HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="post já curtido")
                    likes.append(idLike)
          likes.append(str(userId))

          if likes != []:
            likes_count = len(likes)

          updatedLike =  postsCollection.find_one_and_update({"_id": ObjectId(postId)}, {"$set":{"likes":likes,"likes_count":likes_count}})
          
          print(likes_count)

          if not updatedLike:
               return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                   detail="Erro ao curtir post")
          
          return HTTPException(status_code=status.HTTP_200_OK,
                                   detail="Post curtido!")
     except:
          return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Ocorreu um erro inesperado ao curtir post ")
     

@post_router.post("/post/dislike/{id}")
def dislike_post(id:str, current_user: str = Depends(UserController.get_current_user)):
     try:
          postId = id
          postLikes = postsCollection.find_one({"_id":ObjectId(postId)},{"_id": 0, "likes": 1})
          
          userId = current_user["_id"]
          likes = []
          if postLikes["likes"] != None:
               for idLike in postLikes['likes']:
                    if idLike != str(userId):
                         likes.append(idLike)
          likes_count = len(likes)

          updatedLike =  postsCollection.find_one_and_update({"_id": ObjectId(postId)}, {"$set":{"likes":likes,"likes_count":likes_count}})
          
          if not updatedLike:
                    return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                        detail="Erro ao curtir post")
          return HTTPException(status_code=status.HTTP_200_OK,
                                        detail="Curtida retirada!")
     except:
          return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Ocorreu um erro inesperado ao descurtir")
     
@post_router.get("/post/like-list/{postId}")
#* Caso o post não tenha likes, ele retorna um array vazio
def get_like_list(postId:str):
     try:

          #* Pegar a lista de likes do post
          post = postsCollection.find_one({"_id": ObjectId(postId)}, {"likes": 1, "_id": 0})

          # * Pegar os Ids que deram like no post coletado acima e jogar o object id numa lista
          lista = []
          for userId in post["likes"]:
               objectId = ObjectId(userId)
               lista.append(objectId)

          # * Consultar os usuários que estão nessa lista de likes
          result = usersCollection.find({"_id": {"$in": lista}})

          if not result:
               return HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Ocorreu um erro ao encontrar curtidas")
          result = convertUsers(result)

          return result
     except:
          return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Ocorreu um erro inesperado ao consultar lista de curtidas")