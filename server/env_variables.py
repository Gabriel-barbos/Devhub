import os 

from dotenv import find_dotenv, load_dotenv
from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

dotenv_path = find_dotenv()

load_dotenv(dotenv_path)


DBPASSWORD = os.getenv("DBPASSWORD")
DBUSER = os.getenv("DBUSER")
DBCONNECTIONSTRING = os.getenv("DBCONNECTIONSTRING")


# JWT

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACESS_TOKEN_EXPIRE_MINUTES")

def hash(password: str):
    return hashlib.sha256(password.encode()).hexdigest()


# MAIL

MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_FROM = os.getenv("MAIL_FROM")
MAIL_PORT = os.getenv("MAIL_PORT")
MAIL_SERVER = os.getenv("MAIL_SERVER")
MAIL_STARTTLS = os.getenv("MAIL_STARTTLS")
MAIL_SSL_TLS = os.getenv("MAIL_SSL_TLS")
USE_CREDENTIALS = os.getenv("USE_CREDENTIALS")
VALIDATE_CERTS = os.getenv("VALIDATE_CERTS")