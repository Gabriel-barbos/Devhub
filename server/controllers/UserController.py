from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from env_variables import ACESS_TOKEN_EXPIRE_MINUTES,ALGORITHM,SECRET_KEY
from serializer.user_serializer import convertUser, convertUsers
from serializer.post_serializer import convertPost, convertPosts
from db_config import usersCollection,codesCollection, postsCollection
from models.Token import TokenData
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')

ACESS_TOKEN_EXPIRE_MINUTES = 140
from jose import JWTError, jwt
from datetime import datetime,timedelta

from bson import ObjectId
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
         return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Erro ao processar token (JWT decode error)")
   
   def email_exists(email: str) -> bool:  
         user = usersCollection.find_one({'email': email})
         if not user:
            return False
         return True
   
   def username_exists(username:str) -> bool:
      user = usersCollection.find_one({'username': username})
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
   

   # Posts que já curti
   def get_liked_posts_count(id:str) -> int:
      posts_likes = list(postsCollection.find({},{"likes":1, "_id":0}))
      # convertPosts(posts)
      all_likes = []

      # Iterando sobre a lista de dicionários
      for post in posts_likes:
         if post['likes'] != None:
            all_likes.extend(post['likes'])
         # Adicionando os likes de cada post à lista all_likes_object_ids
         
   # verificar se o id está na lista de likes, se estiver, adiciona numa lista e faz a contagem
      count_list = []
      
      for item in all_likes:
         if item == str(ObjectId(id)):
            count_list.append(item)
      count = len(count_list)
      return count
   
#   TOTAL DE COMENTARIOS QUE MEUS POSTS RECEBERAM
   def replys_recieved_count(username:str) -> int:
      my_posts = list(postsCollection.find({"author_username": username},{"_id":1}))
      posts_ids =[]
      # converter object ids pra string
      for post_id in my_posts:
         posts_ids.append(str(post_id["_id"]))

      # Pegar todos os posts que respondem algum post da lista my_posts
      replys = list(postsCollection.find({"reply_to":{"$in":posts_ids}}))
      count = len(replys)
      return count
       
  
#   COMENTARIOS QUE FIZ
   def comments_made_count(username:str) ->int:
      query = {"reply_to": {"$ne": None}, "author_username": username}
    
    # Executar a query
      my_posts = list(postsCollection.find(query))
      
      # Contar a quantidade de posts que retornaram
      count = len(my_posts)
      return count
   
   # Quantidade de seguidores
   def followers_count(id:str) ->int:
      query = {"_id":id}
      projection = {"_id":0,"followers":1}
      result = list(usersCollection.find(query,projection))
      print(result[0]['followers'])
      if(result[0]['followers'] == None):
         return 0
      my_followers = result[0]['followers']
      return len(my_followers)
   

   def following_count(id:str) ->int:
      query = {"_id":id}
      projection = {"_id":0,"following":1}
      result = list(usersCollection.find(query,projection))

      if(result[0]['following'] == None):
         return 0
      
      my_following_list = result[0]['following']
      return len(my_following_list)
   
   
