from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from models.User import ForgotPassword
from utils import util

from db_config import usersCollection
from controllers.UserController import UserController
from controllers.PerfilController import PerfilController

import uuid

auth_router  = APIRouter(tags=['Authentication'])

@auth_router.post('/login')
def login(user_credentials: OAuth2PasswordRequestForm= Depends()):
   try:
    #* Procura um usuárion com o mesmo email que o campo username traz
    user = usersCollection.find_one({'email':user_credentials.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Informações inválidas")
    if user['password'] == util.hash(user_credentials.password):
        acess_token = UserController.create_acess_token(data={"username": user['username']})
        return {"token": acess_token,"token_type": "bearer"}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")
   except HTTPException as error:
       raise error

@auth_router.post("/change-password")
async def password_change(password_change: PerfilController.PasswordChange):
    try:
        email = await PerfilController.change_password(password_change)
        return {"message": f"Senha alterada com sucesso para: {str(email)}"}
    except HTTPException as error:
       raise error
    
@auth_router.post("/forgot-password")
async def forgot_password(request: ForgotPassword):
    #* Checar se o usuario existe
    # user =  usersCollection.find_one({'email': request.email})
    if not UserController.email_exists(request.email):
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

    teste = await util.send_email(subject,recipient,message)
    # print(teste) 
    return {"code": 200,
            "message": "email enviado"
            }
