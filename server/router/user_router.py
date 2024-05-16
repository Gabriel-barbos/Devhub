
from fastapi import APIRouter, HTTPException,FastAPI, Depends, status,File, UploadFile
from models.User import User, UpdateUserInfo, UpdateUserCredentials
from utils.util import hash

from db_config import usersCollection
from serializer.user_serializer import convertUser, convertUsers
from bson import ObjectId
from controllers.UserController import UserController
from typing import Optional, List
app = FastAPI()



user_router = APIRouter(tags=['User'])

@user_router.get("/")
def home():
    return {"bomdia": "gente"}


#* User Routes
@user_router.get("/users")
def get_all_users():
    try:
        users = usersCollection.find()
        convertedUsers = convertUsers(users)

        if convertedUsers == []:
             raise HTTPException(status_code=500, detail="Nenhum usuário adicionado")
             
        return {"data": convertedUsers}
    except HTTPException as error:
         raise error
    

@user_router.get("/user/{username}")
def get_one_user(username: str):
    try:
        user = usersCollection.find_one({'username': username})

        if not user:
            return HTTPException(status_code=401, detail="Usuário não encontrado")
        
        convertedUser = convertUser(user)
        return {
             "message":"Usuário encontrado",
             "data" : convertedUser}
    except HTTPException(status_code=500, detail="Ocorreu um erro inesperado") as error:
         return error


@user_router.post("/user/register")
def register_user(user: User):
    try:
        #* Converter lista de Badges (Objetos) em um dicionario python 
        if user.badges != None:
             convertedBadgeList = []
             for badge in user.badges:
                convertedBadgeList.append(dict(badge))
             user.badges = convertedBadgeList
        

        if UserController.email_exists(user.email):
            return HTTPException(status_code=404, detail="Email Já cadastrado")
        
        #* hashing password
        user.password = hash(user.password)

        insert = usersCollection.insert_one(dict(user))
        if not insert:
            raise HTTPException(status_code=500, detail="Erro ao inserir")
        
        return HTTPException(status_code=201, detail="Usuario cadastrado com sucesso")
    except HTTPException(status_code=500, detail="Ocorreu um erro ao registrar usuário") as error:
        return error

#* Atualizar name, bio
@user_router.put("/user/update/{id}")
def update_user_info(id: str,user:UpdateUserInfo,current_user: str = Depends(UserController.get_current_user)):
        print(user)
        userUpdated = usersCollection.find_one_and_update({"_id": ObjectId(current_user["_id"])}, {"$set" : dict(user)})
        if not userUpdated:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao atualizar informações")
        return HTTPException(status_code=200, detail="Atualizado com sucesso")


#* Atualizar email, senha
@user_router.put("/user/update-credentials/{id}")
def update_user_credentials(id: str,user:UpdateUserCredentials,current_user: str = Depends(UserController.get_current_user)):
        userUpdated = usersCollection.find_one_and_update({"_id": ObjectId(id)}, {"$set" : dict(user)})
        
        if not userUpdated:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao atualizar credenciais")
        return HTTPException(status_code=200, detail="Atualizado com sucesso")


@user_router.delete("/user/delete/{id}")
def delete_user(id:str,current_user: str = Depends(UserController.get_current_user)):
   
     delete_user = usersCollection.find_one_and_delete({"_id":ObjectId(id)})
 
     if not delete_user:
         return HTTPException(status_code=500, detail="Erro ao deletar usuário")
     return {"message": "Usuário deletado com sucesso!"}

@user_router.get("/user/non-follower/")
def get_non_follower_list(current_user: str = Depends(UserController.get_current_user)):
        id = ObjectId(current_user["_id"])

        #* Pegar todos os ids de usuários q n sejam o current user
        all_users_id = usersCollection.distinct("_id",{"_id": {"$ne": id}})

        query = {"followerlist": {"$exists": False}}
        result = usersCollection.find(query, {"_id": 1})

        print("===========================================================")
        print(all_users_id)
        print("===========================================================")
        
        if all_users_id == []:
            return "sem nada na lista"

        return {"data"}



@user_router.post("/user/add-follow/{idFollow}")
def add_follower(idFollow:str, current_user:str = Depends(UserController.get_current_user)):
    try:
        id = current_user['_id']

        followers = usersCollection.find_one({"_id":id},{"_id": 0, "followers": 1})

        #* Pegar os seguidores atuais no banco de dados e inserir o novo
        FollowerList = []
        for follow in followers['followers']:
            if follow == idFollow:
                return HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Usuário já está adicionado")
            FollowerList.append(follow)
                 
        FollowerList.append(idFollow)


        updatedUser =  usersCollection.find_one_and_update({"_id": ObjectId(current_user['_id'])}, {"$set":{"followers":FollowerList}})

        if not updatedUser:
            return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Erro ao adicionar seguidor")
        
        return HTTPException(status_code=status.HTTP_200_OK,
                                detail="Seguidor adicionado!")
    except:
         return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Ocorreu um erro inesperado ao adicionar seguidor")
    

@user_router.post("/user/remove-follower/{idFollower}")
def remove_follower(idFollower:str, current_user:str = Depends(UserController.get_current_user)):
    try:
        followers = usersCollection.find_one({"_id":ObjectId(current_user['_id'])},{"_id": 0, "followers": 1})


        if followers['followers'] == []:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum seguidor para ser removido")
        
        #* Pegar os seguidores atuais no banco de dados e remover o que bate com o id atual
        FollowerList = []
        for follow in followers['followers']:
            FollowerList.append(follow)

        for follow in FollowerList:
            if follow == idFollower:
                FollowerList.remove(follow)

        updatedUser =  usersCollection.find_one_and_update({"_id": ObjectId(current_user['_id'])}, {"$set":{"followers":FollowerList}})
        if not updatedUser:
            return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao remover seguidor!")
        return HTTPException(status_code=status.HTTP_202_ACCEPTED, detail="Seguidor removido com sucesso!")
    except:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro inesperado ao remover seguidor")
