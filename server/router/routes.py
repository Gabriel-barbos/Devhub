
from fastapi import APIRouter, HTTPException, Response,FastAPI, File, UploadFile
from models.User import User, UserLogin
from env_variables import hash

from db_config import usersCollection
from serializer.user_serializer import convertUser, convertUsers
from bson import ObjectId

import random
from fastapi.responses import FileResponse
import os
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


@router.post("/user/register")
def register_user(user: User,avatar: UploadFile = File(...)):
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
    query = {"$and": [{"email": user_credentials.email}, {"password": user_credentials.password}, "limit:1"]}
    doc = usersCollection.find(query)
    print(doc)
    return {"data": doc}
  
  
  
# rotas imagens:
IMAGES_DIRECTORY = "imagens"

async def upload_image(file: UploadFile = File(...)):
    if not os.path.exists(IMAGES_DIRECTORY):
        os.makedirs(IMAGES_DIRECTORY)

    filename = f"{random.randint(373, 373773)}{random.randint(373, 373773)}{file.filename}"

    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    with open(file_path, "wb") as image:
        image.write(await file.read())

    return filename

@router.get("/images/{filename}")
async def get_image(filename: str):
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
