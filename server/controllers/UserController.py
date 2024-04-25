from models.User import User
import hashlib
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from env_variables import ACESS_TOKEN_EXPIRE_MINUTES,ALGORITHM,SECRET_KEY
from serializer.user_serializer import convertUser, convertUsers
from db_config import usersCollection
from models.Token import TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')

ACESS_TOKEN_EXPIRE_MINUTES = 20
from jose import JWTError, jwt
from datetime import datetime,timedelta

class UserController:
   
   def create_acess_token(data:dict):
      to_encode = data.copy()

      expire = datetime.utcnow() + timedelta(minutes=ACESS_TOKEN_EXPIRE_MINUTES)
      to_encode.update({"exp": expire})

      encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
      return encoded_jwt

   def verify_access_token(token:str, credentials_exception):

      try:
         payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)

         email: str = payload.get("user_email")
         if email is None:
            raise credentials_exception
         token_data = TokenData(email=email)
      except JWTError:
         raise credentials_exception
      return token_data
      
   def get_current_user(token: str = Depends(oauth2_scheme)):
      credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                                            detail=f"Erro ao validar as credenciais", headers={"WWW-Authenticate": "Bearer"})
      

      token_dict = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)

      email = token_dict['user_email']
      user = usersCollection.find_one({'email': email})

      return user
   
  

   
