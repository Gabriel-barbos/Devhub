from models.User import User
from serializer.user_serializer import convertUser, convertUsers
from db_config import usersCollection

class UserController:
   


    def create_user(user:User):
        usersCollection.insert_one(user)



