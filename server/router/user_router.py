
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

