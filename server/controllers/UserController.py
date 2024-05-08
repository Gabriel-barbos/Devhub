from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from env_variables import ACESS_TOKEN_EXPIRE_MINUTES,ALGORITHM,SECRET_KEY
from serializer.user_serializer import convertUser, convertUsers
from db_config import usersCollection,codesCollection
from models.Token import TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')

ACESS_TOKEN_EXPIRE_MINUTES = 50
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
         username: str = payload.get("username")
         if username is None:
            raise credentials_exception
         token_data = TokenData(username=username)
         return token_data
      except JWTError:
         raise credentials_exception
      
      
   def get_current_user(token: str = Depends(oauth2_scheme)):
      credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                                            detail=f"Erro ao validar as credenciais", headers={"WWW-Authenticate": "Bearer"})
      
      try:
         token_dict = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
         if not token_dict:
            return credentials_exception
         username = token_dict['username']
         user = usersCollection.find_one({'username': username})

         if not user:
            raise credentials_exception

         return user
      except:
         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Erro ao processar token (JWT decode error)")
   
   def email_exists(email: str) -> bool:  
         user = usersCollection.find_one({'email': email})
         if not user:
            return False
         return True
   
   def create_reset_code(email:str,reset_code:str):
      dict_reset_code = {
         "email": email,
         "reset_code": reset_code,
         "status": True,
         "expired_in": datetime.now()
      }
      insert = codesCollection.insert_one(dict_reset_code)
      if not insert:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ocorreu um erro ao inserir")
      return True

  

   
