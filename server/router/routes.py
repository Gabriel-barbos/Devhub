from fastapi import APIRouter, HTTPException, Response
from models.User import User, UserLogin
from env_variables import hash
from db_config import usersCollection
from serializer.user_serializer import convertUser, convertUsers
from bson import ObjectId



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
    query = {"$and": [{"email": user_credentials.email}, {"password": user_credentials.password}, "limit:1"]}
    doc = usersCollection.find(query)
    print(doc)
    return {"data": doc}