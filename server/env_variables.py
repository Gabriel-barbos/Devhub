import os 
from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)


# DATABSE
DBPASSWORD = os.getenv("DBPASSWORD")
DBUSER = os.getenv("DBUSER")
DBCONNECTIONSTRING = os.getenv("DBCONNECTIONSTRING")


# JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACESS_TOKEN_EXPIRE_MINUTES")


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