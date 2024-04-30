
from fastapi import APIRouter, HTTPException,FastAPI, Depends, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from models.User import User, ForgotPassword
from env_variables import hash

from db_config import codesCollection, usersCollection
from serializer.user_serializer import convertUser, convertUsers
from bson import ObjectId
from controllers.UserController import UserController
from controllers.PerfilController import PerfilController

from utils import email_util
import uuid
app = FastAPI()



user_router = APIRouter()

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
    

@user_router.get("/user/{id}")
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


@user_router.post("/user/register")
def register_user(user: User):
    try:
        
        # user_email = usersCollection.find_one({"email": user.email})
        # if user_email != None:
        #     raise HTTPException(status_code=404, detail="Email Já cadastrado")
        # hashing password
        user.password = hash(user.password)
        insert = usersCollection.insert_one(dict(user))
        if not insert:
            raise HTTPException(status_code=500, detail="Erro ao inserir")
        
        return {"message": "Usuário cadastrado com sucesso"}
    except HTTPException(status_code=500, detail="Ocorreu um erro ao registrar usuário") as error:
        raise error


@user_router.put("/user/update/{id}")
def update_user(id: str, user: User):
        usersCollection.find_one_and_update({"_id":ObjectId(id)}, {"$set" : dict(user)})
        return {"message": "Usuário adicionado com sucesso"}

@user_router.delete("/user/delete/{id}")
def delete_user(id:str):
     usersCollection.find_one_and_delete({"_id":ObjectId(id)})
     return {"message": "Usuário deletado com sucesso!"}

@user_router.post('/login')
def login(user_credentials: OAuth2PasswordRequestForm= Depends()):
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

@user_router.post("/change-password")
async def password_change(password_change: PerfilController.PasswordChange):
    try:
        email = await PerfilController.change_password(password_change)
        return {"message": f"Senha alterada com sucesso para: {str(email)}"}
    except HTTPException as error:
       raise error
    
@user_router.post("/forgot-password")
async def forgot_password(request: ForgotPassword):
    #* Checar se o usuario existe
    user =  usersCollection.find_one({'email': request.email})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    
    #* Criar o resetcode e inserir no banco de dados
    reset_code = str(uuid.uuid1())
    isResetCodeInserted = UserController.create_reset_code(request.email, reset_code)
    if not isResetCodeInserted:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
                            , detail="Ocorreu um erro ao inserir")
    
    #* Enviar Email
    subject = "Hello"
    recipient = [request.email]
    message= """
    <!DOCTYPE HTML>
    <html>
    <title>Reset Password</title>
    <body>
    <div style="width100%,font-family:monospace;">
        <h1>Hello, {0:} </h1>
        <p>Trocar senha</p>
        <a href="http:127.0.0.1:8000/forgot-password?reset_password_token={1:}" style="box-sizing:border-box;border-color:red">
    </body>
    </html>
    """.format(request.email, reset_code)

    teste = await email_util.send_email(subject,recipient,message)
    # print(teste)
    return {"code": 200,
            "message": "email enviado"
            }
