import os 

from dotenv import find_dotenv, load_dotenv
from passlib.context import CryptContext
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
    return pwd_context.hash(password)