from typing import List

from fastapi import  HTTPException, status
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from passlib.context import CryptContext
import hashlib

from env_variables import MAIL_USERNAME, MAIL_PASSWORD,MAIL_FROM,MAIL_PORT,MAIL_SERVER,MAIL_STARTTLS,MAIL_SSL_TLS,USE_CREDENTIALS,VALIDATE_CERTS



config = ConnectionConfig(
    MAIL_USERNAME ="henrique12095@gmail.com",
    MAIL_PASSWORD = "Mentira083!",
    MAIL_FROM = "henrique12095@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = True,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)

async def send_email(subject:str,recipient:List,message:str):
    try:
        message = MessageSchema(
            subject=subject,
            recipients=recipient,
            body=message,
            subtype="html"
        )
        fm = FastMail(config)
        await fm.send_message(message)
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
                            , detail="Ocorreu um erro ao enviar email")


#* HASH SENHA
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def hash(password: str):
    return hashlib.sha256(password.encode()).hexdigest()
