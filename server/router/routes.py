
from fastapi import APIRouter, HTTPException, Response,FastAPI, File, UploadFile, Depends, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from models.User import User, UserLogin
from env_variables import hash

from db_config import usersCollection
from serializer.user_serializer import convertUser, convertUsers
from bson import ObjectId
from controllers.UserController import UserController


import random
from fastapi.responses import FileResponse
import os
import hashlib

app = FastAPI()



router = APIRouter()

@router.get("/")
def home():
    return {"bomdia": "gente"}


#* User Routes
@router.get("/users")
def get_all_users():
    try:
        users = usersCollection.find()
        convertedUsers = convertUsers(users)
        if convertedUsers == []:
             raise HTTPException(status_code=500, detail="Nenhum usuário adicionado")
             
        return {"data": convertedUsers}
    except HTTPException as error:
         raise error
    

@router.get("/user/${id}")
def get_one_user(id: str):
    try:
        user = usersCollection.find_one({"_id": ObjectId(id)})

        if not user:
            raise HTTPException(status_code=401, detail="Usuário não encontrado")
        
        convertedUser = convertUser(user)
        return {
             "message":"Usuário encontrado",
             "data" : convertedUser}
    except HTTPException(status_code=500, detail="Ocorreu um erro inesperado") as error:
         raise error


# avatar: UploadFile = File(...)

@router.post("/user/register")
def register_user(user: User):
    try:
        # hashing password
        user.password = hash(user.password)
        insert = usersCollection.insert_one(dict(user))
        if not insert:
            raise HTTPException(status_code=500, detail="Erro ao inserir")
        
        return {"message": "Usuário cadastrado com sucesso"}
    except HTTPException(status_code=500, detail="Ocorreu um erro ao registrar usuário") as error:
        raise error


@router.put("/user/update/{id}")
def update_user(id: str, user: User):
        usersCollection.find_one_and_update({"_id":ObjectId(id)}, {"$set" : dict(user)})
        return {"message": "Usuário adicionado com sucesso"}

@router.delete("/user/delete/{id}")
def delete_user(id:str):
     usersCollection.find_one_and_delete({"_id":ObjectId(id)})
     return {"message": "Usuário deletado com sucesso!"}

@router.post('/login')
def login(user_credentials: UserLogin):
   try:
    
    user = usersCollection.find_one({'email':user_credentials.username})

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Informações inválidas")
    
    if user['password'] == hash(user_credentials.password):
        acess_token = UserController.create_acess_token(data={"user_email": user['email']})
        return {"logado": acess_token,"token_type": "bearer"}
    
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")
   except HTTPException as error:
       raise error
  
  
# rotas imagens:
IMAGES_DIRECTORY = "imagens"
@router.put("/images/update")
async def upload_image(file: UploadFile = File(...), current_user: str = Depends(UserController.get_current_user)):
    if not os.path.exists(IMAGES_DIRECTORY):
        os.makedirs(IMAGES_DIRECTORY)
    
    filename = f"{random.randint(373, 373773)}{random.randint(373, 373773)}{file.filename}"

    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    with open(file_path, "wb") as image:
        image.write(await file.read())

    insert = usersCollection.find_one_and_update({'email': current_user['email']},{"$set": {'imagePath':filename}})
    return filename

@router.get("/images/{filename}")
async def get_image(filename: str,current_user: str = Depends(UserController.get_current_user)):
    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")

@router.delete("/images/{filename}")
async def delete_image(filename: str):
    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"menssagem": f"Imagem {filename} excluída com sucesso."}
    else:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")
