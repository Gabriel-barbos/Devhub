
from fastapi import APIRouter, HTTPException,FastAPI, Depends, status,File, UploadFile
from models.User import User, UpdateUser
from utils.util import hash

from db_config import usersCollection
from serializer.user_serializer import convertUser, convertUsers
from bson import ObjectId
from controllers.UserController import UserController
from typing import Optional
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
        
        if UserController.email_exists(user.email):
            return HTTPException(status_code=404, detail="Email Já cadastrado")
        # hashing password
        user.password = hash(user.password)
        insert = usersCollection.insert_one(dict(user))
        if not insert:
            raise HTTPException(status_code=500, detail="Erro ao inserir")
        
        return {"message": "Usuário cadastrado com sucesso"}
    except HTTPException(status_code=500, detail="Ocorreu um erro ao registrar usuário") as error:
        raise error


@user_router.put("/user/update/{username}")
def update_user(username: str,user:UpdateUser,current_user: str = Depends(UserController.get_current_user)):
        userUpdated = usersCollection.find_one_and_update({"username": username}, {"$set" : dict(user)})
        if not userUpdated:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao atualizar")
        return HTTPException(status_code=200, detail="Atualizado com sucesso")

@user_router.delete("/user/delete/{id}")
def delete_user(id:str,current_user: str = Depends(UserController.get_current_user)):
   
     delete_user = usersCollection.find_one_and_delete({"_id":ObjectId(id)})
 
     if not delete_user:
         return HTTPException(status_code=500, detail="Erro ao deletar usuário")
     return {"message": "Usuário deletado com sucesso!"}

